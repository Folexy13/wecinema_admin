import React, { useContext, useEffect, useState } from 'react';

import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userState/userContext';

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

function AdminTable({ data }) {
  const { changeUserStatus } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set your default page size
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
      dataIndex: 'id',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
      responsive: ['lg']
    },

    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Account Created',
      dataIndex: 'date',
      responsive: ['lg']
    },

    {
      title: 'Active',
      dataIndex: 'isActive',
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
      render: (_, record) => (
        <Switch
          checked={record?.isActive}
          loading={loading === record._id}
          disabled={loading}
          onChange={(checked) => handleSwitchChange(record._id, checked)}
        />
      )
    }
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

export default AdminTable;
