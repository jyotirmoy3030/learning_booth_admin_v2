import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Table, Tag } from 'antd';
import '../styles/admin.css';
import { getAllDemos } from 'services/Master/Demo';

const DemoRequests = () => {
  const [demos, setDemos] = useState([]);
  const getDemoRequests = async () => {
    const demos = await getAllDemos();
    if (demos) {
      setDemos(demos.data);
    }
  };
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'User Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'User Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'User Company',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Time Slot',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
      render: (timeSlot) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          {new Date(timeSlot).toDateString()}{' '}
          {new Date(timeSlot).toLocaleTimeString()}
        </Box>
      ),
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, data) => (
    //     <Box display="flex" alignItems="center" justifyContent="start">
    //       <span
    //         style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
    //         onClick={async () => {
    //           await deleteResult(data._id);
    //           toast.success('Result deleted.');
    //           getDemoRequests();
    //         }}
    //       >
    //         <DeleteOutlined />
    //       </span>
    //     </Box>
    //   ),
    // },
  ];

  React.useEffect(() => {
    getDemoRequests();
  }, []);

  return (
    <div>
      <Typography variant="h1">Demo Requests</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        View
      </Typography>

      <Table dataSource={demos} columns={columns} />
    </div>
  );
};

export default DemoRequests;
