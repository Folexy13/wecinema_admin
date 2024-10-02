import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

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
        <Link to={`/dashboard/video/${record._id}`}>{text}</Link>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },

    {
      title: 'Author',
      dataIndex: 'author',
      render: (author) => author?.username || 'Unknown Author'
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
          text: 'Drama',
          value: 'drama'
        },
        {
          text: 'Documentary',
          value: 'documentary'
        },
        {
          text: 'Mystery',
          value: 'mystery'
        },
        {
          text: 'Romance',
          value: 'romance'
        },
        {
          text: 'Fiction',
          value: 'fiction'
        },
        {
          text: 'Thriller',
          value: 'thriller'
        }
      ],
      // Specify the condition of filtering
      onFilter: (value, record) =>
        record.genre.some(
          (genre) => genre.toLowerCase() === value.toLowerCase()
        ),
      render: (genres) => genres.join(', ') // To display genres as a string in the table
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
