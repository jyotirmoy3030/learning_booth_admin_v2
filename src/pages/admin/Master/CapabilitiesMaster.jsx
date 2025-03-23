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
  Input,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import {
  createCapability,
  deleteCapability,
  getAllCapabilites,
  updateCapability,
} from 'services/Master/Capabilities';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import tab from "../../../assets/images/tab.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";

const CapabilitiesMaster = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState({ field: 'name', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCapability, setCurrentCapability] = useState(null);
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
  const get = async () => {
    setLoading(true);
    try {
      const response = await getAllCapabilites({
        // page: pagination.current,
        // limit: pagination.pageSize,
        searchTerm,
        // sortField: sorter.field,
        // sortOrder: sorter.order,
      });
      // console.log(response)
      setCapabilities(response.data);
      // setPagination({
      //   current: response.pagination.page,
      //   pageSize: response.pagination.limit,
      //   total: response.pagination.total,
      // });
    } catch (error) {
      toast.error(error.message || 'Failed to load capabilities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, [pagination.current, pagination.pageSize, searchTerm, sorter]);

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
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter capabilities based on name or description
    const filteredData = capabilities.filter((cap) =>
      cap.name.toLowerCase().includes(searchValue) ||
      cap.description.toLowerCase().includes(searchValue)
    );

    setCapabilities(filteredData); // Update displayed list
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCapability(id);
      toast.success('Capability deleted.');
      get();
    } catch (error) {
      toast.error(error.message || 'Failed to delete capability.');
    }
  };

  const handleEdit = (capability) => {
    setCurrentCapability(capability);
    setEditMode(true);
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    try {
      if (editMode) {
        await updateCapability(currentCapability._id, values);
        toast.success('Capability updated!');
      } else {
        await createCapability(values);
        toast.success('Capability added!');
      }
      get(); // Refresh capabilities list
      setStatus({ success: true });
      resetForm(); // Reset form after successful submission
      setEditMode(false);
      setCurrentCapability(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set form errors based on server response
      } else {
        setStatus({ success: false });
        toast.error(err.message || 'ERROR: Cannot process capability.');
        setErrors({ submit: err.message }); // Set global error message
      }
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => <>{desc?.slice(0, 15)}...</>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center">
          {/* <span
            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
            onClick={() => handleEdit(data)}
          >
            <EditOutlined />
          </span> */}
          <span
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(data._id)}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  return (
    <>
      <div className="bottom-bg" style={styles.bottomBg}></div>

      {/* Fixed Plant Image */}
      <img src={tab} alt="Bottom Right Image" style={styles.plant} />
      <div className="w-full flex justify-between items-center mt-4 px-6 pb-6 mb-10">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[24px] text-[#141414]">Hello, Admin! 👋</span>
          <span className="font-medium text-[12px] text-[#989ca0]">
            Welcome back, track your team progress here!
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-solid border-[#dcdddf] cursor-pointer">
            <div className="justify-center items-center w-5 h-5">
              <img src={briefcase} alt="briefcase" />
            </div>
            <span className="font-bold text-[14px] text-[#141414]"><Link to="/dashboard/jobs">Post New Job</Link></span>
          </div>

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
        <Typography variant="h1">Capabilities</Typography>
        {/* <Typography variant="h4" sx={{ my: 2 }}>Manage</Typography> */}

        {/* <Input
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearch}
        onKeyPress={handleSearchSubmit}
        style={{ marginBottom: '20px', width: '300px' }}
      /> */}

        <Table
          dataSource={capabilities}
          columns={columns}
          loading={loading}
        // pagination={{
        //   current: pagination.current,
        //   pageSize: pagination.pageSize,
        //   total: pagination.total,
        //   showSizeChanger: true,
        //   pageSizeOptions: ['5', '10', '20', '50', '100'],
        //   onShowSizeChange: (current, size) => {
        //     setPagination({ ...pagination, pageSize: size, current: 1 }); // Reset to first page
        //   },
        //   onChange: (page) => {
        //     setPagination({ ...pagination, current: page });
        //   },
        // }}
        // onChange={handleTableChange}
        />

        <Typography variant="h4" sx={{ my: 2 }}>
          {editMode ? 'Edit Capability' : 'Create Capability'}
        </Typography>

        <Formik
          initialValues={{
            name: editMode ? currentCapability.name : '',
            description: editMode ? currentCapability.description : '',
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-[8rem]">
              <div className="relative w-full mb-5">
                {/* Label */}
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                  Capability Name
                </label>

                {/* Input Wrapper */}
                <div className="relative">
                  {/* Icon */}
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </span>

                  {/* Input Field */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none text-gray-800 font-semibold"
                    placeholder="Enter capability name"
                  />
                </div>

                {/* Error Message */}
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Label */}
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                  Capability Description
                </label>

                {/* Input Wrapper */}
                <div className="relative">
                  {/* Icon */}
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </span>

                  {/* Input Field */}
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none text-gray-800 font-semibold"
                    placeholder="Enter capability description"
                  />
                </div>

                {/* Error Message */}
                {touched.description && errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div className="w-full mb-5">
                {/* Label for <50% */}
                <label className="text-black font-bold text-sm block mb-1">Areas of Improvement(&lt;50%)</label>
                <textarea
                  id="areasOfImprovementLow"
                  name="areasOfImprovementLow"
                  value={values.areasOfImprovementLow}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              <div className="w-full mb-5">
                {/* Label for 50% - 75% */}
                <label className="text-black font-bold text-sm block mb-1">Areas of Improvement(50% - 75%)</label>
                <textarea
                  id="areasOfImprovementMedium"
                  name="areasOfImprovementMedium"
                  value={values.areasOfImprovementMedium}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              {/* Areas of Improvement (More than 75%) */}
              <div className="w-full mb-5">
                <label className="text-black font-bold text-sm block mb-1">Areas of Improvement(More than 75%)</label>
                <textarea
                  id="areasOfImprovementHigh"
                  name="areasOfImprovementHigh"
                  value={values.areasOfImprovementHigh}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              {/* Recommendations (Less than 50%) */}
              <div className="w-full mb-5">
                <label className="text-black font-bold text-sm block mb-1">Recommendations(&lt;50%)</label>
                <textarea
                  id="recommendationsLow"
                  name="recommendationsLow"
                  value={values.recommendationsLow}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              {/* Recommendations (51% - 75%) */}
              <div className="w-full mb-5">
                <label className="text-black font-bold text-sm block mb-1">Recommendations(51% - 75%)</label>
                <textarea
                  id="recommendationsMid"
                  name="recommendationsMid"
                  value={values.recommendationsMid}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              {/* Recommendations (More than 75%) */}
              <div className="w-full mb-5">
                <label className="text-black font-bold text-sm block mb-1">Recommendations(More than 75%)</label>
                <textarea
                  id="recommendationsHigh"
                  name="recommendationsHigh"
                  value={values.recommendationsHigh}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md bg-[#e9e9e9] focus:border-gray-400 focus:outline-none resize-none min-h-[80px]"
                ></textarea>
              </div>

              {/* Capability Description (Single Box) */}

              <div className="relative w-full mb-5">
                {/* Label */}
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>

                {/* Input Wrapper */}
                <div className="relative">
                  {/* Icon */}
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </span>

                  {/* Input Field */}
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none text-gray-800 font-semibold"
                    placeholder="Enter description"
                  />
                </div>

                {/* Error Message */}
                {touched.description && errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>



              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#263238] text-white px-6 py-3 rounded-lg font-semibold text-lg 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 transition duration-300'}`}
                >
                  {editMode ? 'Update Capability' : 'Create'}
                </button>
              </div>

            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CapabilitiesMaster;
