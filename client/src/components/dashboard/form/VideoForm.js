import React, { useEffect, useState } from 'react';
import { Row, Col, Upload, message, Progress } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, Switch } from 'antd';
import {
  VideoCameraOutlined,
  TableOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';

function VideoForm({ video, onFinish, loading }) {
  const [selectedGenres, setSelectedGenres] = useState(video?.genre || []);
  const [selectedRatings, setSelectedRatings] = useState(video?.rating || []);
  const [videoUrl, setVideoUrl] = useState(video?.file || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (value) => {
    setSelectedGenres(value);
  };

  const handleChange2 = (value) => {
    setSelectedRatings(value?.toLowerCase());
  };

  useEffect(() => {
    setSelectedGenres(video?.genre);
    setSelectedRatings(video?.rating?.toLowerCase());
  }, [video]);

  const handleFileUpload = ({ file }) => {
    const CLOUDINARY_UPLOAD_URL =
      'https://api.cloudinary.com/v1_1/folajimidev/video/upload';
    const UPLOAD_PRESET = 'zoahguuq';

    const formData = new FormData();
    formData.append('file', file); // Append the video file
    formData.append('upload_preset', UPLOAD_PRESET); // Upload preset (if unsigned)

    setUploading(true);
    setUploadProgress(0);

    // Upload the file to Cloudinary with progress
    axios
      .post(CLOUDINARY_UPLOAD_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted); // Update progress
        }
      })
      .then((response) => {
        const { secure_url } = response.data; // Extract the secure URL
        setVideoUrl(secure_url); // Save the secure URL
        message.success('done');
        setUploading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setUploading(false);
        console.error(err);
      });

    return false; // Prevent default upload behavior (since we handle it)
  };

  return (
    <>
      <Form
        name="video_details_form"
        className="login-form"
        initialValues={video}
        onFinish={(value) =>
          onFinish({
            ...value,
            file: videoUrl,
            status: !!value?.status
          })
        }
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please input title!'
                }
              ]}
            >
              <Input
                prefix={<VideoCameraOutlined className="site-form-item-icon" />}
                placeholder="New Video"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'Description'}
              rules={
                video
                  ? []
                  : [
                      {
                        required: true,
                        message: 'Please input Description!'
                      }
                    ]
              }
              name="description"
            >
              <Input
                prefix={<TableOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Description"
                value={video?.description}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>
            <Form.Item
              name="genre"
              label="Genre"
              rules={[
                {
                  required: true,
                  message: 'Please select genre!'
                }
              ]}
            >
              <Select
                placeholder="Select genre"
                mode="multiple"
                value={selectedGenres} // Set selected genres here
                onChange={handleChange}
              >
                <Option value="Comedy">Comedy</Option>
                <Option value="Adventure">Adventure</Option>
                <Option value="Action">Action</Option>
                <Option value="Fiction">Fiction</Option>
                <Option value="Documentary">Documentary</Option>
                <Option value="Drama">Drama</Option>
                <Option value="Horror">Horror</Option>
                <Option value="Romance">Romance</Option>
                <Option value="Thriller">Thriller</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="rating"
              label="Ratings"
              rules={[
                {
                  required: true,
                  message: 'Please select a rating!'
                }
              ]}
            >
              <Select
                placeholder="Select Rating"
                value={selectedRatings}
                onChange={handleChange2}
              >
                <Option value="G">G</Option>
                <Option value="PG">PG</Option>
                <Option value="PG-13">PG-13</Option>
                <Option value="R">R</Option>
                <Option value="X">X</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={videoUrl ? 'Change Video' : 'Upload Video'}
              required={!videoUrl}
              rules={[
                {
                  required: true,
                  message: 'Please upload a video!'
                }
              ]}
            >
              <Upload
                name="video"
                multiple={false}
                customRequest={handleFileUpload}
                showUploadList={false} // Hide the default upload list UI
              >
                <Button icon={<UploadOutlined />} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Click to Upload Video'}
                </Button>
              </Upload>
              {uploading && <Progress percent={uploadProgress} />}
            </Form.Item>

            <Form.Item name="file" hidden>
              <Input value={videoUrl} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Active Status" name="status">
          <Switch defaultChecked={false} />
        </Form.Item>

        {videoUrl && (
          <Col span={12}>
            <Form.Item label="Uploaded Video URL">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                {videoUrl}
              </a>
            </Form.Item>
          </Col>
        )}

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="mr-2"
            disabled={loading || !videoUrl}
          >
            Save
          </Button>
          <Button type="info" className="login-form-button">
            <Link to="/dashboard/videos">Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default VideoForm;
