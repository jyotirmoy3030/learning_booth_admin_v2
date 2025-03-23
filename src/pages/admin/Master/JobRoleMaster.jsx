import React, { useState, useEffect } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createJobrole, deleteJobrole, getAllJobroles, updateJobrole } from 'services/Master/JobRoles';
import { getAllCapabilites } from 'services/Master/Capabilities';
import { getAllCompetencies } from 'services/Master/Competencies';
import Autocomplete from '@mui/material/Autocomplete';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import magnifying from "../../../assets/images/magnifying.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";

const JobroleMaster = () => {
  const [jobroles, setJobroles] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState({ field: 'name', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [capabilities, setCapabilities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentJobrole, setCurrentJobrole] = useState(null);
  const styles = {
    bottomBg: {
      position: "fixed",
      left: 0,
      bottom: 0, // Sticks to the bottom of the viewport
      width: "100%",
      height: "100vh", // Covers full viewport height
      backgroundSize: "cover", // Ensure it covers entire background
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom center",
      backgroundImage: `url(${dr15_2})`,
      zIndex: "-50", // Push it far behind everything
    },
    plant: {
      position: "fixed",
      bottom: "0",
      right: "0", // Stays fixed at bottom-right
      width: "20rem",
      height: "auto",
      maxWidth: "100%",
      zIndex: "-40", // Keep it behind content but above background
      pointerEvents: "none", // Prevent accidental clicks
    },
  };



  const fetchJobroles = async () => {
    setLoading(true);
    try {
      const response = await getAllJobroles({
        page: pagination.current,
        limit: pagination.pageSize,
        searchTerm,
        sortField: sorter.field,
        sortOrder: sorter.order,
      });
      setJobroles(response.data);
      // setPagination({
      //   current: response.pagination.page,
      //   pageSize: response.pagination.limit,
      //   total: response.pagination.total,
      // });
    } catch (error) {
      toast.error(error.message || 'Failed to load job roles.');
    } finally {
      setLoading(false);
    }
  };
  const getCapabilities = async () => {
    const cbs = await getAllCapabilites();
    if (cbs) {
      setCapabilities(cbs.data);
    }
  };

  const fetchCompetencies = async () => {
    try {
      const response = await getAllCompetencies(); // Fetch competencies
      setCompetencies(response?.data);
    } catch (error) {
      toast.error(error.message || 'Failed to load competencies.');
    }
  };

  useEffect(() => {
    fetchJobroles();
    fetchCompetencies();
    getCapabilities(); // Fetch competencies on component mount
  }, []);
  // console.log(capabilities)
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
    setSorter({
      field: sorter.field,
      order: sorter.order === 'ascend' ? 'asc' : 'desc',
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJobrole(id);
      toast.success('Job role deleted.');
      fetchJobroles();
    } catch (error) {
      toast.error(error.message || 'Failed to delete job role.');
    }
  };

  const handleEdit = (jobrole) => {
    setCurrentJobrole(jobrole);
    setEditMode(true);
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    try {
      if (editMode) {
        await updateJobrole(currentJobrole._id, values);
        toast.success('Job role updated!');
      } else {
        await createJobrole(values);
        toast.success('Job role added!');
      }
      fetchJobroles(); // Refresh job roles list
      setStatus({ success: true });
      resetForm(); // Reset form after successful submission
      setEditMode(false);
      setCurrentJobrole(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set form errors based on server response
      } else {
        setStatus({ success: false });
        toast.error(err.message || 'ERROR: Cannot process job role.');
        setErrors({ submit: err.message }); // Set global error message
      }
    } finally {
      setSubmitting(false);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300, // Fixed width (Adjust as needed)
      ellipsis: true, // Adds "..." if text is too long
    },
    {
      title: "Competencies",
      dataIndex: "competencies",
      key: "competencies",
      render: (_, { compentencies }) => (
        <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
          <div className="flex flex-wrap items-center gap-3">
            {compentencies.map((capability) => (
              <div className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center">
                <span className="text-xs font-semibold text-[#FFFFFF] uppercase tracking-wide">
                  {capability.title.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Box>
      ),
      width: 700,
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   key: "actions",
    //   render: (_, data) => (
    //     <Box display="flex" alignItems="center" justifyContent="start">
    //       <div className="flex flex-row items-center gap-2">
    //         <Link
    //           to={`/dashboard/competencies/${data._id}/edit`}
    //           className="text-green-600 text-lg cursor-pointer"
    //         >
    //           <EditOutlined />
    //         </Link>
    //         <span
    //           className="text-red-600 text-lg cursor-pointer"
    //           onClick={async () => {
    //             await handleDelete(data._id);
    //             toast.success("Competency Deleted.");
    //           }}
    //         >
    //           <DeleteOutlined />
    //         </span>
    //       </div>
    //     </Box>
    //   ),
    // },
  ];


  return (
    <>
      <div className="bottom-bg" style={styles.bottomBg}></div>

      {/* Fixed Plant Image */}
      <img src={magnifying} alt="Bottom Right Image" style={styles.plant} />
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
        <Typography variant="h1">Existing Roles</Typography>
        {/* <Typography variant="h4" sx={{ my: 2 }}>Manage</Typography>

      <TextField
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearch}
        onKeyPress={handleSearchSubmit}
        style={{ marginBottom: '20px', width: '300px' }}
      /> */}

        <Table
          dataSource={jobroles}
          columns={columns}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: 10,
            onChange: (page) => {
              setPagination({ ...pagination, current: page });
            },
          }}
          onChange={handleTableChange}
          style={{ marginBottom: '6rem' }}
        />

      </div>
    </>
  );
};

export default JobroleMaster;
