import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Table, Tag, Select, Button, Pagination, Spin } from "antd"; // Added Spin for loader
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/admin.css";
import { deleteResult, getAllResults } from "services/Master/Results";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import xlsx
import { getAllJobsRoles } from "services/Master/JobRoles";

const ResultsMaster = () => {
  const [results, setResults] = useState([]); // Store all results fetched from API
  const [filteredResults, setFilteredResults] = useState([]); // Store results to be displayed in the table
  const [jobRoleFilter, setJobRoleFilter] = useState(""); // Current job role filter value
  const [jobRoleOptions, setJobRoleOptions] = useState([]); // Job role options for the dropdown
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [totalResults, setTotalResults] = useState(0); // Total results count
  const [loading, setLoading] = useState(false); // Loader state for API calls
  const [dropdownLoading, setDropdownLoading] = useState(false); // Loader state for dropdown

  // Function to fetch job roles for the dropdown
  const fetchJobRoles = async () => {
    try {
      // setDropdownLoading(true); // Show dropdown loader
      const response = await getAllJobsRoles();
      if (response && response.data) {
        setJobRoleOptions(response.data); // Assuming response contains job role titles
      }
    } catch (error) {
      toast.error("Failed to load job roles."); // Error handling
    } finally {
      // setDropdownLoading(false); // Hide dropdown loader
    }
  };

  // Function to fetch results from the API
  const getResults = async (page = 1, limit = 10, jobRole = "") => {
    try {
      setLoading(true); // Show loader
      const js = await getAllResults(page, limit, jobRole); // Pass jobRole as a parameter to the API call
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
    } catch (error) {
      toast.error("Failed to load results."); // Error handling
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Function to handle filtering when dropdown value changes
  const handleJobRoleChange = (value) => {
    setJobRoleFilter(value); // Update the filter state
    getResults(currentPage, pageSize, value); // Fetch results with the selected job role
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

  // Handle page change in pagination
  const handlePageChange = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
    getResults(page, limit, jobRoleFilter); // Pass job role filter as well
  };

  // Define table columns
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
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >
          {data?.recommendations?.matchingJobs?.map((title) => (
            <Tag
              color={"geekblue"}
              key={title._id}
              style={{ margin: "2px 0px" }}
            >
              {title.title}
            </Tag>
          ))}
          {data?.recommendations?.matchingJobs?.length === 0 && (
            <Tag color={"geekblue"} style={{ margin: "2px 0px" }}>
              NO RECOMMENDED JOBS
            </Tag>
          )}
        </Box>
      ),
    },
    {
      title: "Recommended Courses",
      dataIndex: "recommendedCourses",
      key: "recommendedCourses",
      render: (_, data) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          flexDirection="column"
        >
          {data?.recommendations?.matchingCourses?.map((title) => (
            <Tag
              color={"geekblue"}
              key={title._id}
              style={{ margin: "2px 0px" }}
            >
              {title.title}
            </Tag>
          ))}
          {data?.recommendations?.matchingCourses?.length === 0 && (
            <Tag color={"geekblue"} style={{ margin: "2px 0px" }}>
              NO RECOMMENDED COURSES
            </Tag>
          )}
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

  // Download function for exporting data to Excel
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
    <div>
      <Typography variant="h1">Results</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Spin spinning={dropdownLoading}>
        <Select
          style={{ width: 300, marginBottom: 20 }} // Increase dropdown width
          placeholder="Filter by Job Role"
          onChange={handleJobRoleChange} // Call the local filter handler
          allowClear
          showSearch // Enable search functionality
          optionFilterProp="children" // Filter based on the displayed text
          dropdownStyle={{ maxWidth: "auto", whiteSpace: "nowrap" }} // Ensure items are fully visible
        >
          {jobRoleOptions.map((jobRole, index) => (
            <Select.Option
              key={`${jobRole._id}-${index}`}
              value={jobRole._id}
              style={{ whiteSpace: "normal" }} // Allow text wrapping for long titles
            >
              {jobRole.title}
            </Select.Option>
          ))}
        </Select>
      </Spin>

      <Button
        type="primary"
        onClick={downloadExcel}
        style={{ marginBottom: 20 }}
      >
        Download Excel
      </Button>

      <Spin spinning={loading}>
        <Table
          dataSource={filteredResults}
          columns={columns}
          pagination={false}
        />
      </Spin>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalResults}
        showSizeChanger
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};

export default ResultsMaster;
