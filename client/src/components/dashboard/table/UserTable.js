import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

function UserTable({ data }) {
  const { changeUserStatus } = useContext(UserContext);
  const [loading, setLoading] = useState('');

  const handleSwitchChange = async (userId, checked) => {
    setLoading(userId);
    try {
      await changeUserStatus(userId, checked);
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
      title: 'Date Of Birth',
      dataIndex: 'dob',
      responsive: ['lg']
    },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (text, record) => (
        <Link to={`/dashboard/user/${record._id}`}>{text}</Link>
      ),
      sorter: (a, b) => a.username?.length - b.username?.length,
      sortDirections: ['descend']
    },

    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
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
          loading={loading === record._id}
          disabled={loading}
          onChange={(checked) => handleSwitchChange(record._id, checked)}
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

export default UserTable;
