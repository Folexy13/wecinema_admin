import React, { useContext, useState, useEffect } from 'react';

import DashboardHOC from '../DashboardHOC';
import { Typography, Popconfirm, Button } from 'antd';
import SingleUserStyled from './SingleUserStyled';
import { UserContext } from '../../../context/userState/userContext';
import PasswordForm from '../password/PasswordForm';
import UserForm from '../form/UserForm';
import CustomLoader from '../../common/CustomLoader';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function SingleUser(props) {
  const {
    state,
    fetchSingleUser,
    editUserAction,
    deleteUserAction,
    changeUserPasswordAction
  } = useContext(UserContext);
  const [passwordFormVisibility, setpasswordFormVisibility] = useState(false);

  const { loading, user } = state;

  const payload = useLocation();
  // const [initialValues, setinitialValues] = useState(null);
  const handlePasswordChange = (data) => {
    changeUserPasswordAction(data);
    setpasswordFormVisibility(false);
  };

  const changePasswordModal = () => {
    setpasswordFormVisibility(!passwordFormVisibility);
  };
  const id = props.match.params.id;

  useEffect(() => {
    fetchSingleUser(id, payload?.state?.userRole);
  }, [fetchSingleUser, id]);

  const onFinish = (values) => {
    values._id = user._id;
    // console.log(values);
    if (user?.role != 'admin') {
      delete values.password;
    } else {
      delete user.password;
    }
    const payload = {
      ...user,
      ...values,
      date: user.date
    };
    editUserAction(payload);
  };

  const onConfirmDelete = () => {
    deleteUserAction(id);
    props.history.push('/dashboard/users');
  };

  return (
    <SingleUserStyled>
      {user ? (
        <>
          <Typography>Edit {user.name || user.username}'s Profile</Typography>
          {user.role !== 'admin' ? (
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={onConfirmDelete}
              // onCancel={cancel}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button className="float-right" danger>
                Delete {user.name}
              </Button>
            </Popconfirm>
          ) : null}

          <UserForm
            user={user}
            onFinish={onFinish}
            changePasswordModal={changePasswordModal}
            loading={loading}
          />
        </>
      ) : (
        <CustomLoader
          text={'Chill out, I am trying to get some data for you'}
        />
      )}
      <PasswordForm
        visible={passwordFormVisibility}
        onCreate={handlePasswordChange}
        loading={loading}
        onCancel={() => {
          setpasswordFormVisibility(false);
        }}
        id={id}
      />
    </SingleUserStyled>
  );
}

export default DashboardHOC(SingleUser);
