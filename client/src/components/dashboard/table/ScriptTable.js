import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

function ScriptTable({ data }) {
  const [loading, setLoading] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set your default page size

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
        <a href={`/dashboard/script/${record._id}`}>{text}</a>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },

    {
      title: 'Author',
      dataIndex: 'author',
      responsive: ['md']
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
    }
    // {
    //   title: 'Description',
    //   dataIndex: 'script',
    //   responsive: ['md']
    // }
  ];
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };
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

export default ScriptTable;
