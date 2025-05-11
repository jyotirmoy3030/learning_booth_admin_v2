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
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      ), render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <div className="flex flex-row items-center justify-center gap-[7.12px]">
            {/* Details Report Button */}
            <a
              href={`https://www.thirdbracket.in/assessments/details-report?resultId=${data._id}`}
              target="_blank"
              className="bg-white border-[#0057FC] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center"
            >
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 2V11M9.5 11L6 7.5M9.5 11L13 7.5" stroke="#0057FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 13.5V15H16V13.5" stroke="#0057FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Result Button */}
            <a
              href={`https://www.thirdbracket.in/assessments/result?resultId=${data._id}`}
              target="_blank"
              className="bg-white border-[#0057FC] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center"
            >
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" strokeWidth="1.31935" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Delete Button */}
            <button
              className="bg-white border-[#CED4DA] border rounded-lg w-[35px] h-[35px] flex flex-row items-center justify-center"
              onClick={() => handleDelete(data._id)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616"
                  stroke="#212529"
                  strokeWidth="1.31935"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Download Button (New) */}
            <button
              className="bg-white border-[#28a745] border rounded-lg w-[35px] h-[35px] flex flex-row items-center justify-center"
              onClick={() => handleView(data._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#28a745"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

          </div>
        </Box>
      )
    },
  ];

  const handleJobRoleChange = (value) => {
    setJobRoleFilter(value); // Update the filter state
    getResults(currentPage, pageSize, value); // Fetch results with the selected job role
  };

  const handlePageChange = (page, limit) => {
    console.log(page)
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
  const handleView = async (id) => {
    try {
      navigate(`/dashboard/proctoring-view/${id}`); // Navigate to the proctoring view page
    } catch (error) {
      toast.error("Failed to delete result."); // Error handling
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const downloadExcel = () => {
    const dataForExport = filteredResults.map((result) => {
      return {
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

      {/* <div className="bottom-bg" style={styles.bottomBg}></div> */}

      {/* Fixed Plant Image */}
      {/* <img src={character} alt="Bottom Right Image" style={styles.plant} /> */}
      <BackgroundDesign character_image={character} />

      <HeaderTwo />

      <div>
        <div className="search-add-container my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Title on the Left */}
          <Typography variant="h1" style={{ color: '#141414' }}>
            Results
          </Typography>

          {/* Right Section (Select + Button) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-start sm:justify-end gap-4 w-full sm:w-auto">
            {/* Dropdown for Last 30 Days */}
            <Select
              className="w-full sm:w-[300px]"
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
            <Button
              type="primary"
              onClick={downloadExcel}
              className="card-nav w-full sm:w-auto"
            >
              Download Excel
            </Button>
          </div>
        </div>





        <div className="px-4 sm:px-8 md:px-0 lg:px-0 py-4 relative overflow-hidden" style={{ marginBottom: "15rem" }}>
          <div className="overflow-x-auto">
            <Table dataSource={results} columns={columns} pagination={false} />
          </div>
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
