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

        <section className="flex-1 flex flex-row ">
          <div className="flex-1 bg-white pl-7 pr-[30px] pt-[14.83px] pb-[6rem] mb-[14rem]">
            <Typography variant="h2" className="mb-6">Existing Assessments</Typography>

            <div className="flex gap-4 flex-wrap flex-row" id="ExternalData">
              {visibleTests.map((items, idx) => (
                <div className="total-employee" key={idx}>
                  {/* Title Section */}
                  <div className="title">
                    <div className="text-card">{items?.title}</div>
                    <img
                      className="img cursor-pointer"
                      src={dots}
                      alt="More"
                      onClick={() => toggleMenu(idx)}
                    />
                    {openMenu === idx && (
                      <div className="absolute right-0 top-6 bg-white shadow-md rounded-md p-2 w-24">
                        {/* Edit Button with Link */}
                        <Link to={`/dashboard/tests/${items._id}/questions`}>
                          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 w-full p-2">
                            <EditOutlined /> Edit
                          </button>
                        </Link>

                        {/* Delete Button */}
                        <button
                          className="flex items-center gap-2 text-gray-700 hover:text-red-500 w-full p-2"
                          onClick={() => handleDelete(items._id)}
                        >
                          <DeleteOutlined /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="content">
                    <div className="number-of-employees">
                      <div className="icon">
                        <img className="img-thumbnail" src={items?.thumbnail} alt="User Icon" />
                      </div>
                      <div className="text">
                        <div className="text-card2">{Math.ceil((items?.duration) / 60)} mins</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* "See More" Button */}
            {/* {!showAll && tests.length > 12 && (
              <div className="flex justify-center mt-6">
                <button
                  className="card-nav2"
                  onClick={() => setShowAll(true)}
                >
                  See More
                </button>
              </div>
            )} */}
            {/* "See More" / "See Less" Button */}
            {tests.length > 12 && (
              <div className="flex justify-center mt-6">
                {!showAll ? (
                  <button className="card-nav2" onClick={() => setShowAll(true)}>
                    See More
                  </button>
                ) : (
                  <button className="card-nav2" onClick={() => setShowAll(false)}>
                    See Less
                  </button>
                )}
              </div>
            )}

          </div>
        </section>
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

export default CreateTest;
