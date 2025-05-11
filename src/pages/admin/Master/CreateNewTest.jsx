import React, { useState, useEffect } from 'react';
import { Button, FormHelperText, Grid, OutlinedInput, Stack, InputLabel, Typography, Box, TextField, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, FileDoneOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import { createTest, deleteTest, getAllTestsApi } from 'services/Master/Tests';
import { secondsToHms } from 'utils/time';
import { getAllJobroles } from 'services/Master/JobRoles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import '../styles/admin.css';
import '../../dashboard/dashboard.css';
// import './createtest.css';
import dots from "../../../assets/images/dots.png";
import card_icon from "../../../assets/images/card_icon1.png";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/deskplant.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';
import HeaderTwo from '../../../components/HeaderTwo';

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
    width: "70rem",  // Adjust as needed
    height: "auto",
    maxWidth: "100%", // Prevents overflow issues
    zIndex: "-2", // Ensure it's behind content but above background
    pointerEvents: "none", // Prevents interference with clicks
  }

};
// Custom Hook: Fetch Job Roles
const useJobRoles = () => {
  const [jobRoles, setJobRoles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const roles = await getAllJobroles();
        console.log(roles)
        setJobRoles(roles?.data || []);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch job roles.');
      }
    })();
  }, []);
  return jobRoles;
};

// Custom Hook: Fetch Tests with Pagination, Search, and Sorting
const useTests = () => {
  const [tests, setTests] = useState([]);
  const [total, setTotal] = useState(0); // Total items
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [sortField, setSortField] = useState(''); // Sort field
  const [sortOrder, setSortOrder] = useState(''); // Sort order
  const [search, setSearch] = useState(''); // Search state

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await getAllTestsApi({
          page,         // Current page
          pageSize,     // Number of items per page
          sortField,    // Sort field
          sortOrder,    // Sort order
          search,       // Search query
        });
        console.log(response)
        if (response?.data) {
          setTests(response.data); // Set data
          // setTotal(response.pagination.total); // Total number of items
        }
      } catch (error) {
        toast.error(error.message || 'Failed to fetch assesment.');
      } finally {
        setLoading(false)
      }
    };
    fetchTests();
  }, [page, pageSize, sortField, sortOrder, search]);

  return {
    tests,
    setTests,
    total,
    loading,
    setPage,
    setPageSize,
    setSortField,
    setSortOrder,
    page,
    pageSize,
    sortField,
    sortOrder,
    setSearch, // Include this setter function
  };
};

const CreateTest = () => {
  const {
    tests,
    total,
    loading,
    setTests,  // Ensure setTests is destructured here
    setPage,
    setPageSize,
    setSortField,
    setSortOrder,
    page,
    pageSize,
    sortField,
    sortOrder,
    setSearch,
  } = useTests();
  const jobRoles = useJobRoles();
  const [overview, setOverview] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const visibleTests = showAll ? tests : tests.slice(0, 12);
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update the search state
    setPage(1); // Reset to the first page whenever search changes
  };
  const toggleMenu = (idx) => {
    setOpenMenu(openMenu === idx ? null : idx); // Toggle dropdown
  };
  // Handle table change event (pagination and sorting)
  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
    if (sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      try {
        await deleteTest(id); // Call the API to delete

        // ✅ Update the UI by filtering out the deleted test
        setTests((prevTests) => prevTests.filter((test) => test._id !== id));

        toast.success("Assessment deleted.");
      } catch (error) {
        toast.error(error.message || "Failed to delete assessment.");
      }
    }
  };


  return (
    <>
      <HeaderTwo />
      <div>
        <Typography variant="h2" className="mb-6">New Assessment</Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          Create
        </Typography>
        <Formik
          initialValues={{
            title: '',
            duration: '',
            thumbnail: null,
            jobRole: null, // Initially null
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Title is required'),
            duration: Yup.string().required('Duration is required'),
            thumbnail: Yup.mixed().required('Thumbnail is required'),
            jobRole: Yup.string().required('Job role is required'), // Ensure this is a string and required
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                if (values[key] instanceof File) {
                  formData.append(key, values[key]);
                }
              });
              let jobrole = jobRoles.filter((item) => item._id == values.jobRole)

              formData.append('jobRole', JSON.stringify(jobrole[0]));
              formData.append('duration', values.duration);
              formData.append('title', values.title);
              formData.append('overview', overview);
              for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
              }
              const response = await createTest(formData);
              setTests([...tests, response.data]);
              navigate(`/dashboard/tests/${response.data._id}/questions`);
              resetForm();
              toast.success('Assessment created.');
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              toast.error(err.message || 'ERROR: Assessment cannot be created.');
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[8rem]">
              <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                {/* Icon */}
                <span className="absolute inset-y-0 left-3 top-[-30%] flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 2H15V6H9zM4 6H20M4 6V20a2 2 0 002 2h12a2 2 0 002-2V6M9 10h6M9 14h6M9 18h6"
                    />
                  </svg>
                </span>

                {/* Input Field */}
                <input
                  type="text"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Assessment Title"
                />

                {/* Error Message (Properly Placed Below Input) */}
                {touched.title && errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                {/* Icon */}
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2M12 8v8M8 12h8M16 20H8"
                    />
                  </svg>
                </span>

                {/* Time Picker Input Field */}
                {/* <input
                  type="time"
                  name="duration"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("duration", e.target.value)}
                  value={values.duration}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Select Time"
                /> */}
                <TimePicker
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue('duration', `${e.$H}:${e.$m}:${e.$s}`);
                  }}
                  id="duration"
                  name="duration"
                  className="w-full rounded border border-gray-400 bg-[#e9e9e9] pl-12 p-3 focus:border-blue-500 focus:outline-none hover:bg-[#e9e9e9]"
                />


                {/* Error Message */}
                {touched.duration && errors.duration && (
                  <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                )}
              </div>

              <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                {/* Custom Upload Button */}
                <div className="flex items-center gap-3 border border-gray-300 p-3 rounded bg-[#e9e9e9] cursor-pointer">
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    className="hidden"
                    onChange={(event) => setFieldValue("thumbnail", event.currentTarget.files[0])}
                    accept="image/*"
                  />

                  {/* Upload Icon */}
                  <label htmlFor="thumbnail" className="cursor-pointer flex items-center gap-2">
                    {values.thumbnail ? (
                      <span className="text-green-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        File Selected
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        Upload Thumbnail
                      </span>
                    )}
                  </label>
                  {errors.thumbnail && (
                    <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
                  )}
                </div>

                {/* Error Message */}
                {touched.thumbnail && errors.thumbnail && (
                  <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
                )}
              </div>

              <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                {/* Dropdown */}
                <select
                  id="jobRole"
                  name="jobRole"
                  value={values.jobRole}
                  onChange={(e) => setFieldValue("jobRole", e.target.value)}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select a Job Role</option>
                  {jobRoles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.title}
                    </option>
                  ))}
                </select>

                {/* Error Message */}
                {touched.jobRole && errors.jobRole && (
                  <p className="text-red-500 text-xs mt-1">{errors.jobRole}</p>
                )}
              </div>

              <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                {/* Icon */}
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </span>

                {/* Textarea Field */}
                <textarea
                  name="overview"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("overview", e.target.value)} // Ensure Formik updates state
                  value={values.overview || ""}
                  className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] resize-none"
                  placeholder="Overview"
                  rows={4} // Adjust rows as needed
                ></textarea>

                {/* Error Message */}
                {touched.overview && errors.overview && (
                  <p className="text-red-500 text-xs mt-1">{errors.overview}</p>
                )}
              </div>




              <div className="col-span-2 flex justify-center">
                <button type="submit" className="bg-[#263238] text-white px-6 py-3 rounded-lg">
                  Save
                </button>
              </div>

            </form>
          )}
        </Formik>
        <BackgroundDesign character_image={plant} custom_size={'40rem'}/>
      </div>
    </>
  );
};

export default CreateTest;
