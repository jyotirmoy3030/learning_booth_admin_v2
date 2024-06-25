import React, { useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Box,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag, Input } from 'antd';
import { getAllJobsRoles } from 'services/Master/JobRoles';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import '../styles/admin.css';
import { getAllJobsApplication } from 'services/Master/Job';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
const { TextArea } = Input;
const JobsApplication = () => {
  
  const [appliedJobsApplication, setappliedJobsApplication] = useState([]);
  
  console.log(appliedJobsApplication);
  const getJobsApplication = async () => {
    const js = await getAllJobsApplication();
    if (js) {
        setappliedJobsApplication(js.data);
    }
  };
  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'data',
      key: 'data',
      render: (_, { user }) => (
        <Box display="flex" alignItems="center" justifyContent="start">
            {user?.phoneNumber}
        </Box>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'data',
      key: 'data',
      render: (_, { user }) => (
        <Box display="flex" alignItems="center" justifyContent="start">
            {user?.email}
        </Box>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'data',
      key: 'data',
      render: (_, { user }) => (
        <Box display="flex" alignItems="center" justifyContent="start">
            {user?.name}
        </Box>
      ),
    },
    {
      title: 'Job Name',
      dataIndex: 'data',
      key: 'data',
      render: (_, { job }) => (
        <Box display="flex" alignItems="center" justifyContent="start">
            {job?.title}
        </Box>
      ),
    },
  ];


  React.useEffect(() => {
    getJobsApplication();
  }, []);


  return (
    <div>
      <Typography variant="h1">Job Apllication</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={appliedJobsApplication} columns={columns} />

    </div>
  );
};

export default JobsApplication;
