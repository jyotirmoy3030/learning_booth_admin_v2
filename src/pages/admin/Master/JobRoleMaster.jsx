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
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';

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
      {/* <div className="bottom-bg" style={styles.bottomBg}></div> */}

      {/* Fixed Plant Image */}
      {/* <img src={magnifying} alt="Bottom Right Image" style={styles.plant} /> */}
      <BackgroundDesign character_image={magnifying}/>

      <HeaderTwo />
      <div className="px-4 sm:px-8 md:px-0 lg:px-0 py-4 relative overflow-hidden">
        <Typography variant="h1">Existing Roles</Typography>
        <div className="overflow-x-auto">
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
      </div>
    </>
  );
};

export default JobroleMaster;
