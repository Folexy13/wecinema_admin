import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

function VideoTable({ data }) {
  const { changeVideoStatus } = useContext(UserContext);

  const [loading, setLoading] = useState('');
  const handleSwitchChange = async (videoId, checked) => {
    setLoading(videoId);
    try {
      await changeVideoStatus(videoId, checked);
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      console.log('Loading stop');
      setLoading();
    }, 1500);
  }, [loading]);
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      responsive: ['lg']
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/dashboard/user/${record._id}`}>{text}</Link>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },

    {
      title: 'Author',
      dataIndex: 'author',
      render: (author) => author.username
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      filters: [
        {
          text: 'Action',
          value: 'action'
        },
        {
          text: 'Comedy',
          value: 'comedy'
        },
        {
          text: 'Adventure',
          value: 'adventure'
        },
        {
          text: 'Action',
          value: 'action'
        },
        {
          text: 'Drama',
          value: 'drama'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.role.indexOf(value) === 0
    },
    {
      title: 'Description',
      dataIndex: 'description',
      responsive: ['md']
    },
    {
      title: 'Active',
      dataIndex: 'status',
      filters: [
        {
          text: 'Active',
          value: true
        },
        {
          text: 'In Active',
          value: false
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.isActive === value,
      render: (isActive, record) => (
        <Switch
          checked={record?.status}
          loading={loading === record?._id}
          disabled={loading}
          onChange={(checked) => handleSwitchChange(record?._id, checked)}
        />
      )
    }
  ];
  return (
    <>
      <Table
        className="clearfix"
        columns={columns}
        dataSource={data}
        style={{ clear: 'both' }}
        // onChange={onChange}
      />
    </>
  );
}

export default VideoTable;
