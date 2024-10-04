import React, { useContext, useState } from 'react';
import VideoForm from './form/VideoForm';
import DashboardHOC from './DashboardHOC';
import { UserContext } from '../../context/userState/userContext';

function AddNewVideo() {
  const { addVideo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);

      await addVideo({ ...values, role: 'admin' });
      window.location.replace('/dashboard/videos');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VideoForm onFinish={onFinish} loading={loading} />
    </>
  );
}

export default DashboardHOC(AddNewVideo);
