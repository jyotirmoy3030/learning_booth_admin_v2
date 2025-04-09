import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Table, Tag, Select, Button, Pagination, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { deleteResult, getAllResults } from 'services/Master/Results';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import { createJobrole, deleteJobrole, getAllJobroles, updateJobrole } from 'services/Master/JobRoles';
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import character from "../../../assets/images/character2.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";

import { Link } from 'react-router-dom';

const ResultsMaster = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // Store results to be displayed in the table
  const [jobRoleFilter, setJobRoleFilter] = useState(""); // Current job role filter value
  const [jobRoleOptions, setJobRoleOptions] = useState([]); // Job role options for the dropdown
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [totalResults, setTotalResults] = useState(0); // Total results count
  const [loading, setLoading] = useState(false); // Loader state for API calls
  const [dropdownLoading, setDropdownLoading] = useState(false);
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

  const fetchJobRoles = async () => {
    try {
      // setDropdownLoading(true); // Show dropdown loader
      const response = await getAllJobroles();
      if (response && response.data) {
        setJobRoleOptions(response.data); // Assuming response contains job role titles
      }
    } catch (error) {
      toast.error("Failed to load job roles."); // Error handling
    } finally {
      // setDropdownLoading(false); // Hide dropdown loader
    }
  };

  const getResults = async (page = 1, limit = 10, jobRole = "") => {
    const js = await getAllResults(page, limit, jobRole);
    if (js && js.data) {
      const { scores, totalScores } = js.data;

      const formattedResults = scores.map((result) => {
        const formattedResult = {
          _id: result._id,
          totalPercentage: result.totalPercentage || 0,
          user: result.user || { name: "Unknown User" },
          recommendations: result.recommendations || {
            matchingJobs: [],
            matchingCourses: [],
          },
          assessmentTitle: result.assessments?.assessment?.title || "No Title",
          jobRoleTitle: result.assessments?.assessment?.jobRole?.title || "No Job Role",
          userLocation: result.userLocation,
          scores: result.scores,
        };
        
        return formattedResult;
      });
      setResults(formattedResults);
      setFilteredResults(formattedResults);
      setTotalResults(totalScores); // Set total results count for pagination
    }
  };
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          {data?.user?.name}
        </Box>
      ),
    },
    {
      title: "Total Percentage",
      dataIndex: "totalPercentage",
      key: "totalPercentage",
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          sx={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {data?.totalPercentage?.toFixed(2)}%
        </Box>
      ),
    },
    {
      title: "User Location",
      dataIndex: "userLocation",
      key: "userLocation",
      render: (value, record) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="start">
            {value || "No Location"} {/* Display value or a fallback */}
          </Box>
        );
      },
    },
    {
      title: "Recommended Jobs",
      dataIndex: "recommendedJobs",
      key: "recommendedJobs",
      render: (_, { recommendations }) => (
        <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
          <div className="flex flex-wrap items-center gap-3">
            {recommendations?.matchingJobs?.length > 0 ? (
              recommendations.matchingJobs.map((job) => (
                <div
                  key={job._id}
                  className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {job.title.toUpperCase()}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-1 rounded-full border border-red-500 bg-red-100 shadow-sm flex items-center justify-center">
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                  NO RECOMMENDED JOBS
                </span>
              </div>
            )}
          </div>
        </Box>
      ),
    },

    {
      title: "Recommended Courses",
      dataIndex: "recommendedCourses",
      key: "recommendedCourses",
      render: (_, { recommendations }) => (
        <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
          <div className="flex flex-wrap items-center gap-3">
            {recommendations?.matchingCourses?.length > 0 ? (
              recommendations.matchingCourses.map((course) => (
                <div
                  key={course._id}
                  className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {course.title.toUpperCase()}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-1 rounded-full border border-red-500 bg-red-100 shadow-sm flex items-center justify-center">
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                  NO RECOMMENDED COURSES
                </span>
              </div>
            )}
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
          <div className="flex flex-row items-center justify-center gap-[7.12px]">
            <a
              href={`https://www.thirdbracket.in/assessments/details-report?resultId=${data._id}`}
              target="_blank"
              className="bg-white border-[#0057FC] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center"
            >
              {/* View SVG */}
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 2V11M9.5 11L6 7.5M9.5 11L13 7.5"
                  stroke="#0057FC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 13.5V15H16V13.5"
                  stroke="#0057FC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </a>
            <a
              href={`https://www.thirdbracket.in/assessments/result?resultId=${data._id}`}
              target="_blank"
              className="bg-white border-[#0057FC] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center"
            >
              {/* View SVG */}
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
                  strokeWidth="1.31935"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              className="bg-white border-[#CED4DA] border rounded-lg w-[35px] h-[35px] flex flex-row items-center justify-center"
              onClick={() => handleDelete(data._id)}
            >
              {/* Delete SVG */}
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
                  strokeWidth="1.31935"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </Box>
      ),
    },
  ];

  const handleJobRoleChange = (value) => {
    setJobRoleFilter(value); // Update the filter state
    getResults(currentPage, pageSize, value); // Fetch results with the selected job role
  };

  const handlePageChange = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
    getResults(page, limit, jobRoleFilter); // Pass job role filter as well
  };
  // Function to handle result deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true); // Show loader for delete action
      await deleteResult(id); // Delete the result
      toast.success("Result deleted."); // Success message
      getResults(currentPage, pageSize); // Re-fetch results after deletion
    } catch (error) {
      toast.error("Failed to delete result."); // Error handling
    } finally {
      setLoading(false); // Hide loader
    }
  };
  const downloadExcel = () => {
    const dataForExport = filteredResults.map((result) => {
      const baseData = {
        "User Name": result.user?.name || "Unknown User",
        Assessment: result?.assessmentTitle || "N/A",
        "Total Percentage": result.totalPercentage
          ? `${result.totalPercentage.toFixed(2)}%`
          : "N/A",
        "User Location": result.user?.location || "Unknown Location",
        "Recommended Jobs":
          result.recommendations?.matchingJobs
            ?.map((job) => job.title)
            .join(", ") || "No Recommended Jobs",
        "Recommended Courses":
          result.recommendations?.matchingCourses
            ?.map((course) => course.title)
            .join(", ") || "No Recommended Courses",
      };
      
      // Add score category percentages dynamically
      const scoreData = {};
      const score = result.scores || {};
      Object.entries(score).forEach(([category, value]) => {
        scoreData[category] = value?.total_percentage ?? "N/A";
      });
      const jsonString = JSON.stringify(scoreData);
      
  
      return {
        ...baseData,
        ...jsonString,
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "Results.xlsx");
  };
  useEffect(() => {
    fetchJobRoles(); // Fetch job roles when component mounts
    getResults(currentPage, pageSize); // Fetch results when component mounts or page changes
  }, [currentPage, pageSize]);

  return (
    <>

      <div className="bottom-bg" style={styles.bottomBg}></div>

      {/* Fixed Plant Image */}
      <img src={character} alt="Bottom Right Image" style={styles.plant} />
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
        <div className="search-add-container my-4 flex items-center justify-between">
          {/* Title on the Left */}
          <Typography variant="h1" style={{ color: '#141414' }}>Results</Typography>

          {/* Right Section (Select + Button) */}
          <div className="flex items-center gap-4">
            {/* Dropdown for Last 30 Days */}
            <Select
              style={{ width: 300 }} // Ensure consistent width
              placeholder="Filter by Job Role"
              onChange={handleJobRoleChange}
              allowClear
              showSearch
              optionFilterProp="children"
              dropdownStyle={{ maxWidth: "auto", whiteSpace: "nowrap" }}
            >
              {jobRoleOptions.map((jobRole, index) => (
                <Select.Option
                  key={`${jobRole._id}-${index}`}
                  value={jobRole._id}
                  style={{ whiteSpace: "normal" }}
                >
                  {jobRole.title}
                </Select.Option>
              ))}
            </Select>

            {/* Export Button */}
            <Button type="primary" onClick={downloadExcel} className="card-nav">
              Download Excel
            </Button>
          </div>
        </div>



        <div style={{ marginBottom: "15rem" }}>
          <Table dataSource={results} columns={columns} pagination={false} />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalResults}
            showSizeChanger
            onChange={handlePageChange}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        </div>
      </div>
    </>
  );
};

export default ResultsMaster;
