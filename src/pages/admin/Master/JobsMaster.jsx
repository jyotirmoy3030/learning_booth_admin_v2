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
import { getAllJobroles } from 'services/Master/JobRoles';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import '../styles/admin.css';
import { createJob, deleteJob, getAllJobs } from 'services/Master/Job';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/Plant.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';

const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
const styles = {
  bottomBg: {
    position: "fixed",
    top: "10%",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "auto",
    backgroundSize: "cover", // Better for full coverage on smaller screens
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundImage: `url(${dr15_2})`,
    zIndex: -4,
  },
  plant: {
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "6rem",
    height: "auto",
    maxWidth: "100%",
    zIndex: -2,
    pointerEvents: "none",
  },
};


const { TextArea } = Input;
const JobsMaster = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobroles();
    console.log(roles)
    if (roles) {
      setJobRoles(roles.data);
    }
  };
  const getJobs = async () => {
    const js = await getAllJobs();
    if (js) {
      setJobs(js.data);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          {data?.title ? data?.title : ""}
        </Box>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Job Role",
      dataIndex: "recommendedJobs",
      key: "recommendedJobs",
      render: (_, { jobRole }) => (
        <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center"
            >
              <span className="text-xs font-semibold text-[#FFFFFF] uppercase tracking-wide">
                {jobRole?.title}
              </span>
            </div>
          </div>
        </Box>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <div className="flex flex-row items-center gap-2">
            <img
              src={data.companyLogo}
              alt="Company Logo"
              className="w-[30px] h-[30px] rounded-full"
            />
            <span className="text-[#343A40] text-sm font-semibold">{data.companyName}</span>
          </div>
        </Box>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <div className="flex flex-row items-center gap-2">
            <Link
              to={`/dashboard/jobs/${data._id}/edit`}
              className="text-green-600 text-lg cursor-pointer"
            >
              <EditOutlined />
            </Link>
            <span
              className="text-red-600 text-lg cursor-pointer"
              onClick={async () => {
                await deleteJob(data._id);
                toast.success("Job Deleted.");
                getJobs();
              }}
            >
              <DeleteOutlined />
            </span>
          </div>
        </Box>
      ),
    },
  ];


  React.useEffect(() => {
    getJobRoles();
  }, []);

  React.useEffect(() => {
    getJobs();
  }, []);

  React.useEffect(() => {
    if (Object.keys(jobRole).length > 0) {
      setMarkedSkills(
        jobRole?.compentencies?.map((skill) => ({
          title: skill.title,
          leastCutoffPercentage: 0,
        }))
      );
    }
  }, [jobRole]);
  const handleCutOffChange = (value, idx) => {
    const _ms = [...markedSkills];
    _ms[idx].leastCutoffPercentage = value;
    setMarkedSkills(_ms);
  };

  return (
    <>
      <HeaderTwo />

      <div className="px-4 sm:px-8 md:px-0 lg:px-0 py-4 relative overflow-hidden">
        <Typography variant="h1" className="text-xl sm:text-2xl md:text-3xl">Open Roles</Typography>
        <Typography variant="h4" className="text-base sm:text-lg my-2">Manage</Typography>

        <div className="overflow-x-auto">
          <Table dataSource={jobs} columns={columns} style={{ marginBottom: '6rem', width: '100%' }} />
        </div>

        {/* <img
          src={plant}
          alt="Bottom Right Image"
          className="fixed bottom-0 right-0 w-20 sm:w-24 md:w-28 z-[-2] pointer-events-none"
        />

        <div className="bottom-bg" style={styles.bottomBg}></div> */}
        <BackgroundDesign character_image={plant}/>
      </div>

    </>
  );
};

export default JobsMaster;
