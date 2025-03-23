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

const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
const styles = {
  bottomBg: {
    position: "fixed",
    top: "10%", // Keep it fixed at the bottom of the page
    left: 0,
    bottom: 0, // Stick it to the bottom
    width: "100%",
    height: "auto", // Adjust height dynamically if needed
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundImage: `url(${dr15_2})`,
    zIndex: -4, // Keeps it behind other elements
  },
  plant: {
    position: "fixed",
    bottom: "0",
    right: "0", // Ensure it stays at the right
    width: "6rem",  // Adjust as needed
    height: "auto",
    maxWidth: "100%", // Prevents overflow issues
    zIndex: "-2", // Ensure it's behind content but above background
    pointerEvents: "none", // Prevents interference with clicks
  }

};

const { TextArea } = Input;
const JobsMaster = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobroles();
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
          {data?.title}
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
                {jobRole.title}
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
      <div className="w-full flex justify-between items-center mt-4 px-6 pb-6 mb-10">
        {/* Welcome Text */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[24px] text-[#141414]">Hello, Admin! 👋</span>
          <span className="font-medium text-[12px] text-[#989ca0]">
            Welcome back, track your team progress here!
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6">
          {/* Post New Job */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-solid border-[#dcdddf] cursor-pointer">
            <div className="justify-center items-center w-5 h-5">
              <img src={briefcase} alt="briefcase" />
            </div>
            <span className="font-bold text-[14px] text-[#141414]"><Link to="/dashboard/jobs">Post New Job</Link></span>
          </div>

          {/* Add Employee */}
          <div className="flex items-center gap-2 bg-[#263238] px-4 py-3 rounded-lg cursor-pointer">
            <div className="justify-center items-center w-5 h-5">
              <img src={plus} alt="briefcase" />
            </div>
            <span className="font-bold text-[14px] text-white"><Link to="/dashboard/users">Add Employee</Link></span>
          </div>
          <div className="flex items-center gap-2 bg-[#ffc727] px-4 py-3 rounded-lg cursor-pointer">
            <div className="justify-center items-center w-5 h-5">
              <img src={skill} alt="briefcase" />
            </div>
            <span className="font-bold text-[14px] text-white"><Link to="/dashboard/road_to_content">Skills To Hire</Link></span>

          </div>
        </div>
      </div>

      <div>
        <Typography variant="h1">Open Roles</Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          Manage
        </Typography>

        <Table dataSource={jobs} columns={columns} style={{marginBottom:'6rem'}} />
        <img
          src={plant}
          alt="Bottom Right Image"
          style={styles.plant}
        />
        <div className="bottom-bg" style={styles.bottomBg}></div>
      </div>
    </>
  );
};

export default JobsMaster;
