import React, { useRef } from 'react';
import { Row, Col, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, Switch, Tooltip } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  TableOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';

function ScriptForm({ onFinish, loading, scripts }) {
  return (
    <>
      <Form
        name="video_details_form"
        className="login-form"
        initialValues={scripts}
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
                placeholder="New Script"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'Text'}
              rules={[
                {
                  required: true,
                  message: 'Please input  Text!'
                }
              ]}
              name="script"
            >
              <Input.TextArea
                prefix={<TableOutlined className="site-form-item-icon" />}
                placeholder="Lorem description"
              />
            </Form.Item>
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
              <Select placeholder="Select genre" mode="multiple">
                <Option value="comedy">Comedy</Option>
                <Option value="adventure">Adventure</Option>
                <Option value="action">Action</Option>
                <Option value="fiction">Fiction</Option>
                <Option value="documentary">Documentary</Option>
                <Option value="drama">Drama</Option>
                <Option value="horror">Horror</Option>
                <Option value="romance">Romance</Option>
                <Option value="thriller">Thriller</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Author'} name="author">
              <Input
                prefix={<TableOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="admin"
                value={'admin'}
                readOnly={true}
              />
            </Form.Item>
          </Col>
        </Row>

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

export default ScriptForm;
