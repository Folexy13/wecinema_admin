import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

function ScriptTable({ data }) {
  const [loading, setLoading] = useState('');

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
    }
    // {
    //   title: 'Description',
    //   dataIndex: 'script',
    //   responsive: ['md']
    // }
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

export default ScriptTable;
