import React, { useContext, useState, useEffect } from 'react';

import DashboardHOC from '../DashboardHOC';
import { Typography, Popconfirm, Button } from 'antd';
import SingleScriptStyled from './SingleScriptStyled';
import { UserContext } from '../../../context/userState/userContext';
import PasswordForm from '../password/PasswordForm';
import CustomLoader from '../../common/CustomLoader';
import ScriptForm from '../form/ScriptForm';

function SingleScript(props) {
  const {
    state,
    fetchSingleScript,
    editScriptAction,
    deleteScriptAction,
    changeUserPasswordAction
  } = useContext(UserContext);
  const [passwordFormVisibility, setpasswordFormVisibility] = useState(false);

  const { loading, script } = state;

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
    fetchSingleScript(id);
  }, [fetchSingleScript, id]);

  const onFinish = (values) => {
    values._id = script._id;
    const payload = {
      ...script,
      ...values
    };
    editScriptAction(payload);
  };

  const onConfirmDelete = () => {
    deleteScriptAction(id);
    props.history.push('/dashboard/scripts');
  };

  return (
    <SingleScriptStyled>
      {script ? (
        <>
          <Typography>Edit {script.title}</Typography>
          {
            <Popconfirm
              title="Are you sure you want to delete this script?"
              onConfirm={onConfirmDelete}
              // onCancel={cancel}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button className="float-right" danger>
                Delete {script.title}
              </Button>
            </Popconfirm>
          }

          <ScriptForm
            script={script}
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
    </SingleScriptStyled>
  );
}

export default DashboardHOC(SingleScript);
