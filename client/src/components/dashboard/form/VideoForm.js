import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, Switch, Tooltip } from 'antd';
import {
  VideoCameraOutlined,
  TableOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';

function VideoForm({ video, user, onFinish, loading }) {
  const [selectedGenres, setSelectedGenres] = useState(video.genre || []);

  const handleChange = (value) => {
    setSelectedGenres(value);
  };
  useEffect(() => {
    setSelectedGenres(video.genre);
  }, [video]);

  return (
    <>
      <Form
        name="video_details_form"
        className="login-form"
        initialValues={video}
        onFinish={onFinish}
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
            {user?.role !== 'admin' ? (
              <Form.Item
                label={'Description'}
                rules={
                  video
                    ? []
                    : [
                        {
                          required: true,
                          message: 'Please input  Description!'
                        }
                      ]
                }
                name="description"
              >
                <Input
                  prefix={<TableOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="Lorem discription"
                  // {user ? readOnly: false}

                  // readOnly={video ? true : false}
                  value={video.description}
                />
              </Form.Item>
            ) : null}
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: 'Please select images!'
                }
              ]}
            >
              <Upload
                beforeUpload={() => false}
                onChange={(info) => {
                  console.log(info.fileList);
                }}
              >
                <Button icon={<UploadOutlined />}>Select image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Active Status" name="status">
          <Switch defaultChecked={true} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="mr-2"
            disabled={loading}
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
