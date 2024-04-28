import React, { useContext, useState } from 'react';
import VideoForm from './form/VideoForm';
import DashboardHOC from './DashboardHOC';
import { UserContext } from '../../context/userState/userContext';
import axios from 'axios';

function AddNewVideo() {
  const { addVideo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    const { title, description, genre, image, status } = values;
    console.log(image);
    const formData = new FormData();
    setLoading(true);
    formData.append('file', image.file);
    formData.append('upload_preset', 'zoahguuq');

    axios
      .post(
        'https://api.cloudinary.com/v1_1/folajimidev/image/upload',
        formData
      )
      .then(async (res) => {
        let payload = {
          title,
          description,
          genre,
          file: res.data['secure_url'],
          role: 'admin',
          status
        };
        await addVideo(payload);
        setLoading(false);
        window.location.replace('/dashboard/videos');
      });
  };

  return (
    <>
      <VideoForm onFinish={onFinish} loading={loading} />
    </>
  );
}

export default DashboardHOC(AddNewVideo);
