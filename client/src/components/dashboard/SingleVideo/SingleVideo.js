import React, { useContext, useState, useEffect } from 'react';

import DashboardHOC from '../DashboardHOC';
import { Typography, Popconfirm, Button } from 'antd';
import SingleVideoStyled from './SingleVideoStyled';
import { UserContext } from '../../../context/userState/userContext';
import PasswordForm from '../password/PasswordForm';
import VideoForm from '../form/VideoForm';
import CustomLoader from '../../common/CustomLoader';

function SingleVideo(props) {
  const {
    state,
    fetchSingleVideo,
    editVideoAction,
    deleteVideoAction,
    changeUserPasswordAction
  } = useContext(UserContext);
  const [passwordFormVisibility, setpasswordFormVisibility] = useState(false);

  const { loading, video } = state;

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
    fetchSingleVideo(id);
  }, [fetchSingleVideo, id]);

  const onFinish = (values) => {
    values._id = video._id;
    const payload = {
      ...video,
      ...values,
      theme: video.theme ?? [],
      views: video.views ?? 0
    };
    editVideoAction(payload);
  };

  const onConfirmDelete = () => {
    deleteVideoAction(id);
    props.history.push('/dashboard/videos');
  };

  return (
    <SingleVideoStyled>
      {video ? (
        <>
          <Typography>Edit {video.title}</Typography>
          {
            <Popconfirm
              title="Are you sure you want to delete this video?"
              onConfirm={onConfirmDelete}
              // onCancel={cancel}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button className="float-right" danger>
                Delete {video.title}
              </Button>
            </Popconfirm>
          }

          <VideoForm
            video={video}
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
    </SingleVideoStyled>
  );
}

export default DashboardHOC(SingleVideo);
