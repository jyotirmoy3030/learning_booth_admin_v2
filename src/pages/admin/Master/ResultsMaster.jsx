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
      title: 'User Location',
      dataIndex: 'userLocation',
      key: 'userLocation',
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
          <div className="flex flex-row items-center justify-center gap-[7.12px]">
            <a href={`http://localhost:3000/assessments/result?resultId=${data._id}`} target="_blank" className="bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794"
                  stroke="#0057FC"
                  stroke-width="1.31935"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <button className="bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center" 
            onClick={async () => {
              await deleteResult(data._id);
              toast.success('Result deleted.');
              getResults();
            }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616"
                  stroke="#212529"
                  stroke-width="1.31935"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
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
