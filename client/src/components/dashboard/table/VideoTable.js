import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

function VideoTable({ data }) {
  const { changeVideoStatus } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set your default page size

  const [loading, setLoading] = useState('');
  const handleSwitchChange = async (videoId, checked) => {
    setLoading(videoId);
    try {
      await changeVideoStatus(videoId, checked);
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
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
      dataIndex: 'id',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
      responsive: ['lg']
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => (
        <a href={`/dashboard/video/${record._id}`}>{text}</a>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },

    {
      title: 'Author',
      dataIndex: 'author',
      render: (author) => author?.username || 'Admin'
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
      onFilter: (value, record) => record.status === value,
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
        pagination={{ pageSize }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default VideoTable;
