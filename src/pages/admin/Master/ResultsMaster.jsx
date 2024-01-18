import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { deleteResult, getAllResults } from 'services/Master/Results';
import { toast } from 'react-toastify';

const ResultsMaster = () => {
  const [results, setResults] = useState([]);
  const getResults = async () => {
    const js = await getAllResults();
    const reversedData = js.data.reverse();
    if (js) {
      setResults(reversedData);
    }
  };
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          {data?.user?.name}
        </Box>
      ),
    },
    {
      title: 'Total Percenatge',
      dataIndex: 'totalPercentage',
      key: 'totalPercentage',
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          sx={{ fontSize: '18px', fontWeight: 'bold' }}
        >
          {data?.totalPercentage?.toFixed(2)}%
        </Box>
      ),
    },
    {
      title: 'Category Scores',
      dataIndex: 'scores',
      key: 'scores',
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >
          {data?.scores?.map((score) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h5 style={{ textDecoration: 'underline' }}>
                {score?.category}:
              </h5>
              <p
                style={{
                  fontSize: '13px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '4px',
                }}
              >
                {score?.percentage?.toFixed(2)} %
              </p>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      title: 'Recommended Jobs',
      dataIndex: 'recommendedJobs',
      key: 'recommendedJobs',
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >
          {data?.recommendations?.matchingJobs?.map((title) => (
            <Tag
              color={'geekblue'}
              key={title._id}
              style={{ margin: '2px 0px' }}
            >
              {title.title}
            </Tag>
          ))}
          {data?.recommendations?.matchingJobs?.length === 0 && (
            <Tag color={'geekblue'} style={{ margin: '2px 0px' }}>
              NO RECOMMENDED JOBS
            </Tag>
          )}
        </Box>
      ),
    },
    {
      title: 'Recommended Courses',
      dataIndex: 'recommendedCourses',
      key: 'recommendedCourses',
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >
          {data?.recommendations?.matchingCourses?.map((title) => (
            <Tag
              color={'geekblue'}
              key={title._id}
              style={{ margin: '2px 0px' }}
            >
              {title.title}
            </Tag>
          ))}
          {data?.recommendations?.matchingCourses?.length === 0 && (
            <Tag color={'geekblue'} style={{ margin: '2px 0px' }}>
              NO RECOMMENDED COURSES
            </Tag>
          )}
        </Box>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <span
            style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
            onClick={async () => {
              await deleteResult(data._id);
              toast.success('Result deleted.');
              getResults();
            }}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <Typography variant="h1">Results</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={results} columns={columns} />
    </div>
  );
};

export default ResultsMaster;
