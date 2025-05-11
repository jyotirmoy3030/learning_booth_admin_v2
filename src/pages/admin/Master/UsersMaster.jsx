import React, { useState, useEffect, useCallback } from 'react';
import { moment } from 'moment';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { Link } from 'react-router-dom';
import { createUser, deleteUserById, getAllUsers, updateUser } from 'services/Master/Users';
import { toast } from 'react-toastify';
import { getAllTestsApi } from 'services/Master/Tests';
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import ai from "../../../assets/images/ai.png";
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import magnifying from "../../../assets/images/magnifying.png";
import { Modal } from "antd";
import skill from "../../../assets/images/skill.png";
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';

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

const UsersMaster = () => {
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllTests = async () => {
    const js = await getAllTestsApi();
    if (js) {
      setTests(js.data);
    }
  };


  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllUsers({
        // page: pagination.current,  // ✅ Only track necessary values
        // limit: pagination.pageSize,
        // searchTerm,
        // sortField,
        // sortOrder,
      });
      setUsers(response.data);
      // setPagination((prev) => ({
      //   ...prev,
      //   current: response.pagination.page,
      //   pageSize: response.pagination.limit,
      //   total: response.pagination.total,
      // }));
    } catch (error) {
      toast.error(error.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, searchTerm, sortField, sortOrder]); // ✅ Only track needed dependencies

  useEffect(() => {
    getUsers();
    getAllTests();
  }, [getUsers]); // ✅ Use memoized function

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      toast.success('User deleted.');
      getUsers();
    } catch (error) {
      toast.error(error.message || 'Failed to delete user.');
    }
  };

  const handleView = (userId) => {
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditMode(true);
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    try {
      if (editMode) {
        await updateUser(currentUser._id, values);
        toast.success('User updated!');
      } else {
        console.log(values)
        // await createUser(values);
        // toast.success('User added!');
      }
      getUsers();
      setStatus({ success: true });
      resetForm();
      setEditMode(false);
      setCurrentUser(null);
    } catch (err) {
      setStatus({ success: false });
      toast.error(err.message || 'ERROR: Cannot process user.');
      setErrors({ submit: err.message });
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
      sortOrder: sortField === "name" ? sortOrder : null,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: sortField === "email" ? sortOrder : null,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center">
          {/* <span style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} onClick={() => handleEdit(data)}>
            <EditOutlined />
          </span> */}
          <span style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }} onClick={() => handleDelete(data._id)}>
            <DeleteOutlined />
          </span>
          <span style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }} onClick={() => handleView(data._id)}>
            <EyeOutlined />
          </span>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={
          <div className="modal-title">
            User Details
          </div>
        }
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null} // No footer buttons
        centered
        className="custom-modal"
      >
        {selectedUser ? (
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={selectedUser.profilePicture || "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742560158~exp=1742563758~hmac=b740b3030414ce7ff567d3c63297f5ed0b4f4d3aa15bc5af773ca135e5932df3&w=826"}
                alt="Profile"
                className="user-avatar"
              />
              <h3 className="user-name">{selectedUser.name}</h3>
            </div>
            <div className="modal-body">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Created On:</strong> {new Date(selectedUser.createdAt).toLocaleDateString("en-GB")}</p>
              {/* <p><strong>Status:</strong> <span className={`status ${selectedUser.status}`}>{selectedUser.status}</span></p> */}
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </Modal>
      {/* <div className="bottom-bg" style={styles.bottomBg}></div> */}

      {/* Fixed Plant Image */}
      {/* <img src={magnifying} alt="Bottom Right Image" style={styles.plant} /> */}
      <BackgroundDesign character_image={magnifying}/>
      <HeaderTwo />
      <div className="px-4 sm:px-8 md:px-0 lg:px-0 py-4 relative overflow-hidden">
        <Typography variant="h1">User List</Typography>

        {/* <TextField placeholder="Search by name or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, width: '300px' }} /> */}
        <div className="overflow-x-auto">
          <Table
            dataSource={users.map((user) => ({ ...user, key: user._id }))}
            columns={columns}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              onChange: (currentPage, newPageSize) => {
                setPagination((prev) => ({
                  ...prev,
                  current: currentPage,
                  pageSize: newPageSize,
                }));
              },
            }}
            onChange={(pagination, filters, sorter) => {
              const order = sorter.order === "ascend" ? "asc" : "desc";
              setSortField(sorter.field || "");
              setSortOrder(order || "");
              setPagination((prev) => ({
                ...prev,
                current: pagination.current,
                pageSize: pagination.pageSize,
              }));
            }}
            style={{ marginBottom: '6rem' }}
          />
        </div>


        {/* <Typography variant="h4" sx={{ my: 2 }}>{editMode ? 'Edit User' : 'Create User'}</Typography> */}

        {/* <Formik
          initialValues={{
            name: editMode && currentUser ? currentUser.name : '',
            email: editMode && currentUser ? currentUser.email : '',
            phoneNumber: editMode && currentUser ? currentUser.phoneNumber : '',
            password: '',
            permissions: editMode && currentUser ? currentUser.permissions || [] : [],
            priviligedAssessments: editMode && currentUser ? currentUser.assessments?.map(a => a._id) || [] : [],
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            password: Yup.string().when('editMode', {
              is: false,
              then: Yup.string().required('Password is required'),
            }),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit} className="mb-[8rem]">

              <div className="relative w-full mb-5">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6m-4-4l4 4m4-4l-4 4M4 6h16" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Enter full name"
                />
                {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="relative w-full mb-5">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0V8m0 4v4m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Enter email address"
                />
                {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="relative w-full mb-5">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21h1m0-7a7 7 0 100-14 7 7 0 000 14zm-7 3h10a4 4 0 01-8 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Enter phone number"
                />
                {touched.phoneNumber && errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className="relative w-full mb-5">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a4 4 0 118 0v2m-4 4v8m-4 0h8m-4-4h.01" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder={editMode ? "Leave blank to keep current password" : "Enter password"}
                />
                {touched.password && errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="relative w-full mb-5 rounded bg-[#e9e9e9] border border-gray-400">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 4V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h8" />
                  </svg>
                </span>
                <Autocomplete
                  multiple
                  id="priviligedAssessments"
                  options={tests || []}
                  getOptionLabel={(option) => option?.title || ""}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  value={tests.filter((test) => values.priviligedAssessments.includes(test._id))}
                  onChange={(event, newValue) => {
                    setFieldValue("priviligedAssessments", newValue.map((val) => val._id));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Assessments"
                      className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                    />
                  )}
                />
              </div>

              <div className="relative w-full mb-5">
                <label className="text-gray-700 font-semibold block mb-1">Permissions</label>
                <div className="flex flex-wrap gap-4">
                  {["Assessments", "Courses", "Jobs"].map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission}
                        onChange={() => {
                          const updatedPermissions = values.permissions.includes(permission)
                            ? values.permissions.filter((p) => p !== permission)
                            : [...values.permissions, permission];
                          setFieldValue("permissions", updatedPermissions);
                        }}
                        checked={values.permissions.includes(permission)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button type="submit" className="bg-[#263238] text-white px-6 py-3 rounded-lg">
                  {editMode ? "Update" : "Create"}
                </button>
              </div>

            </form>

          )}
        </Formik> */}

      </div>
    </>
  );
};

export default UsersMaster;
