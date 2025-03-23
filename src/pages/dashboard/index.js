import React, { useState } from "react";

import { getAllStats } from "services/Master/Stats";

import dotsIcon from "../../assets/new-dashboard-img/Icon.svg";
import plusIcon from "../../assets/new-dashboard-img/Icon-1.svg";
import angleDown from "../../assets/new-dashboard-img/arrow-down.svg";
import search from "../../assets/new-dashboard-img/Search.svg";
import plussign from "../../assets/new-dashboard-img/plussign.svg";
import filter from "../../assets/new-dashboard-img/Filter.svg";
import sort from "../../assets/new-dashboard-img/Sort.svg";
import Sidebar from "components/SideNav/Sidebar";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { getAllJobs } from "services/Master/Job";
import { getAllUsers } from "services/Master/Users";
import { deleteResult, getAllResults, getAllCandidateWithScore } from "services/Master/Results";
import { getAllTestsApi } from 'services/Master/Tests';
import { Table, Tag } from "antd";
import { Typography, Box } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import staticImageGraph from "../../assets/new-dashboard-img/Screenshot from 2024-06-07 19-46-56.png";
import ScatterChart from './ScatterChart';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ResultType, setselectedResultType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedJob, setselectedJob] = useState("");
  const [assesments, setAssesments] = useState([]);
  const [selectedAssesment, setselectedAssesment] = useState('');
  const [scatterChartData, setScatterChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    jobs: 0,
    courses: 0,
    users: 0,
    skills: 0,
    assessments: 0,
  });

  React.useEffect(() => {
    (async () => {
      await getAllStats().then((stats) => setStats(stats.data));
    })();
  }, []);

  const getJobs = async () => {
    const js = await getAllJobs();
    if (js) {
      setJobs(js.data);
    }
  };

  React.useEffect(() => {
    getJobs();
  }, []);

  const getUsers = async () => {
    const js = await getAllUsers();
    const reversedData = js.data.reverse();
    if (js) {
      setUsers(reversedData);
    }
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  const getResults = async () => {
    try {
      const js = await getAllResults();

      // Ensure js, js.data, and js.data.scores exist and that js.data.scores is an array
      if (js && js.data && Array.isArray(js.data.scores)) {
        const reversedData = [...js.data.scores].reverse(); // Avoid mutating the original array
        setResults(reversedData);
      } else {
        console.error("Invalid data format: js.data.scores is not an array", js);
        setResults([]); // Set an empty array if data is not valid
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]); // Handle errors gracefully
    }
  };


  React.useEffect(() => {
    getResults();
  }, []);


  React.useEffect(() => {
    getAllassignmentDetails();
  }, []);

  const getCandidateWithScore = async (assessmentId) => {
    setLoading(true); // Set loading to true before the API call
    try {
      if (assessmentId) { // Check if assessmentId exists before making the API call
        const js = await getAllCandidateWithScore(assessmentId);
        if (js && js.data) {
          updateScatterChartData(js.data);
        }
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
    } finally {
      setLoading(false); // Set loading to false after the API call, regardless of success or failure
    }
  };

  React.useEffect(() => {
    if (selectedAssesment) {
      getCandidateWithScore(selectedAssesment);
    }
  }, [selectedAssesment]);

  const getAllassignmentDetails = async () => {
    const js = await getAllTestsApi();
    if (js && js.data) {
      const reversedData = js.data.reverse();
      if (typeof reversedData !== 'undefined' && reversedData.length > 0) {
        setselectedAssesment(reversedData[0]._id);
      }
      setAssesments(reversedData);
    }
  };

  const externalData = [
    {
      id: 1,
      title: "Total Jobs",
      value: stats && stats.jobs ? stats.jobs : 0,
      time: null,
    },
    {
      id: 2,
      title: "Total Courses",
      value: stats && stats.courses ? stats.courses : 0,
      time: null,
    },
    {
      id: 3,
      title: "Total Users",
      value: stats && stats.users ? stats.users : 0,
      time: null,
    },
    {
      id: 4,
      title: "Total Assessments",
      value: stats && stats.assessments ? stats.assessments : 0,
      time: null,
    },
    {
      id: 5,
      title: "Total Skills",
      value: stats && stats.skills ? stats.skills : 0,
      time: "Days",
    },
  ];

  const internalData = [
    {
      title: "Total Assessment",
      value: stats && stats.assessments ? stats.assessments : 0,
      url: "/dashboard/assessments",
    },
    {
      title: "Total Employees",
      value: 1265,
      url: "/dashboard",
    },
    {
      title: "Total Skilled Employees",
      value: 254,
      url: "/dashboard",
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  const handleProfileChange = (e) => {
    setSelectedProfile(e.target.value);
  };
  const handleJobChange = (e) => {
    setselectedJob(e.target.value);
  };

  const handleAssesmentChange = (e) => {
    const selectedId = e.target.value;
    setselectedAssesment(selectedId);
    // Call API to fetch data based on selectedId
    getCandidateWithScore(selectedId);
  };

  const handleResultTypeChange = (e) => {
    setselectedResultType(e.target.value);
  };
  const filteredResults = results.filter((result) => {
    const matchesSearchTerm = result?.user?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation
      ? result?.userLocation === selectedLocation
      : true;
    const matchesProfile = selectedProfile
      ? result?.userId === selectedProfile
      : true;
    const matchesJob = selectedJob
      ? result?.assessments?.job?._id === selectedJob
      : true;
    const rangeValue = ResultType;
    let rangeMatch = true;
    switch (rangeValue) {
      case "30":
        rangeMatch = result.totalPercentage <= 50;
        break;
      case "65":
        rangeMatch =
          result.totalPercentage > 50 && result.totalPercentage <= 65;
        break;
      case "85":
        rangeMatch =
          result.totalPercentage > 65 && result.totalPercentage <= 85;
        break;
      case "100":
        rangeMatch =
          result.totalPercentage > 85 && result.totalPercentage <= 100;
        break;
      default:
        rangeMatch = true;
        break;
    }
    return (
      matchesSearchTerm &&
      matchesLocation &&
      matchesProfile &&
      matchesJob &&
      rangeMatch
    );
  });
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          {data?.user?.name}
        </Box>
      ),
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    },
    {
      title: "Courses",
      dataIndex: "totalCourses",
      key: "totalCourses",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          1
        </Box>
      ),
      sorter: (a, b) => a.totalPercentage - b.totalPercentage,
    },
    {
      title: "Score/ 100 %",
      dataIndex: "totalPercentage",
      key: "totalPercentage",
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <div className="flex flex-row items-center justify-start gap-2">
            <span className="text-[#343A40] text-xs font-normal ">
              {data?.totalPercentage?.toFixed(2)} %
            </span>
            <div className="w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ">
              <span className={`text-[8px] 
                ${data?.totalPercentage?.toFixed(2) > 80
                  ? 'text-[#29CC39]'
                  : data?.totalPercentage?.toFixed(2) > 70
                    ? 'text-[#29CC39]'
                    : data?.totalPercentage?.toFixed(2) > 60
                      ? 'text-[#29CC39]'
                      : data?.totalPercentage?.toFixed(2) > 50
                        ? 'text-[#29CC39]'
                        : data?.totalPercentage?.toFixed(2) > 40
                          ? 'text-[#29CC39]'
                          : data?.totalPercentage?.toFixed(2) > 30
                            ? 'text-[#cc294a]'
                            : 'text-[#cc294a]'
                }
                font-black text-center`}>
                {" "}
                {data?.totalPercentage?.toFixed(2) > 80
                  ? "Excellent"
                  : data?.totalPercentage?.toFixed(2) > 70
                    ? "Best"
                    : data?.totalPercentage?.toFixed(2) > 60
                      ? "Better"
                      : data?.totalPercentage?.toFixed(2) > 50
                        ? "Good"
                        : data?.totalPercentage?.toFixed(2) > 40
                          ? "Average"
                          : data?.totalPercentage?.toFixed(2) > 30
                            ? "Below Average"
                            : "Below Average"}
              </span>
            </div>
          </div>
        </Box>
      ),
      sorter: (a, b) => a.totalPercentage - b.totalPercentage,
    },
    {
      title: "Top Skill (High To Low)",
      dataIndex: "recommendedJobs",
      key: "recommendedJobs",
      render: (_, { scores }) => (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            flexDirection="column"
          >
            <div className="flex flex-row items-center justify-start gap-2">
              {Object.keys(
                Object.fromEntries(
                  Object.keys(scores)
                    .map((key) => [key, scores[key]])
                    .sort(
                      (a, b) => b[1].total_percentage - a[1].total_percentage
                    )
                    .slice(0, 4)
                )
              ).map((key) => {
                return (
                  <div className="w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ">
                    <span className="text-[8px] text-[#6A7B8B] font-black text-medium">
                      {" "}
                      {key}
                    </span>
                  </div>
                );
              })}
            </div>
          </Box>
        </>
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
              className="bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center"
            >
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

            <button className="bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center">
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z"
                  fill="#212529"
                />
              </svg>
            </button>
            <button
              className="bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center"
              onClick={async () => {
                await deleteResult(data._id);
                toast.success("Result deleted.");
                getResults();
              }}
            >
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

  const updateScatterChartData = (data) => {
    const updatedData = data.map((result) => {
      return {
        x: result?.scoresCopentencyType?.cultural?.total_percentage,
        y: result?.scoresCopentencyType?.functional?.total_percentage,
        tooltip: {
          image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1720161068~exp=1720164668~hmac=fad320a8bedbb3ba7941a8ae5dddfffd47ead0fb38bf54dafd46a01b2d80585b&w=900",
          name: (result.user) ? result.user.name : "No data found",
          role: "Front End Dev",
          roleAlignment: result?.scoresCopentencyType?.functional?.total_percentage,
          culturalFitment: result?.scoresCopentencyType?.cultural?.total_percentage
        }
      };
    });
    setScatterChartData(updatedData);
  };


  return (
    <>
      <section className="flex-1 flex flex-row ">
        <div className="flex-1 bg-white pl-7 pr-[30px] pt-[14.83px]">
          <h3 className="text-lg font-bold text-black mb-3">External Data</h3>
          <div
            className="flex gap-4 flex-wrap flex-row items-center justify-center"
            id={"ExternalData"}
          >
            {externalData.map((items, idx) => {
              return (
                <div
                  className={
                    "flex-1 flex-col flex justify-center items-center p-[18.52px] box-border rounded-[10px] overflow-hidden externalBox"
                  }
                  key={idx}
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <h3 className="line-clamp-1 flex-1 text-xs text-white font-bold">
                      {items?.title}
                    </h3>
                    <button className="w-7 h-7 bg-transparent border-none flex flex-row items-center justify-center">
                      <img src={dotsIcon} className="w-full h-full" alt="" />
                    </button>
                  </div>
                  <div className="my-3.5 flex justify-center flex-col items-center">
                    <h3 className="text-white text-xl text-center font-bold">
                      {items?.value}
                    </h3>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-[7.48px] ">
                    <button className="w-[27.78px] h-[27.48px] rounded-full  border-none bg-[#ffffff26] flex flex-row items-center justify-center">
                      <div className="w-3.5 h-3.5">
                        <img
                          src={plusIcon}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      </div>
                    </button>
                    <button className="w-[62.78px] h-[27.48px] rounded-[13.89px]  border-none bg-[#ffffff26] flex flex-row items-center justify-center">
                      <h3 className="text-white  font-black text-[9.26px]/[18.52px] text-center">
                        View All
                      </h3>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-black mb-3">Internal Data</h3>

            <div
              className="flex gap-3 flex-wrap flex-row items-center justify-start"
              id={"ExternalData"}
            >
              {internalData.map((items, idx) => {
                return (
                  <div className="bg-white rounded-md border-[#e9e9e9] border-[0.83px] w-1/4 overflow-hidden min-h-[149px] min-w-[228px]max-w-[230px] " key={idx}>
                    <div className="internalDataCard my-1 ml-[21.56px]">
                      <div className="ml-0.5 mt-5">
                        <h3 className="font-bold text-[#3d4668] text-[11.11px] line-clamp-1">
                          {items?.title}
                        </h3>
                        <div className="mt-8">
                          <h3 className="font-bold text-2xl text-[#414d55] mb-0.5">
                            {items?.value}
                          </h3>
                          <button className="bg-transparent border-none flex flex-row mb-[17.8px]  items-center justify-center">
                            <span className="text-[#4c89ff] text-sm font-normal">
                              <Link to={items?.url}>View All</Link>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='chart-section flex flex-row items-center justify-between flex-wrap lg:flex-nowrap  mt-8 mb-2.5 gap-4'>
            <div className='bg-[#fafafb] rounded-md px-10 py-5 lg:w-3/5 w-full'>
              <div className='flex-row flex justify-between w-full items-center'>
                <h3 className='text-black text-lg font-semibold mb-4'>Unique Visiter</h3>
                <div className='flex-row flex justify-end items-center gap-2'>
                  <button className='bg-transparent border-none'>
                    <span className='text-gray-500 text-base font-semibold'>Month</span>
                  </button>
                  <button className='bg-transparent border h-8  px-2 flex flex-row items-center justify-center border-blue-500 rounded'>
                    <span className='text-blue-500 text-base font-semibold'>Week</span>
                  </button>
                </div>
              </div>
              <div className="mixed-chart border border-slate-300 rounded overflow-hidden">
                <Chart
                  options={{
                    chart: {
                      id: "basic-bar",
                      background: "#fff",
                      height: 400,
                      width: "100%",
                      redrawOnParentResize: true,
                      redrawOnWindowResize: true,
                      stackOnlyBar: true,
                    },
                    xaxis: {
                      categories: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                      ],
                    },
                    stroke: {
                      show: true,
                      curve: "smooth",
                      // lineCap: 'butt',
                      colors: ["#6E91E9", "#8A9BD5"],
                      width: 2,
                      dashArray: 0,
                    },
                    dataLabels: {
                      enabled: false,
                    },
                  }}
                  series={[
                    {
                      name: "Page View",
                      data: [10, 30, 45, 40, 45, 70, 50],
                      color: "#A1B2DF",
                    },
                    {
                      name: "Sessions",
                      data: [30, 35, 25, 40, 50, 55, 40],
                      color: "#D4E1FE",
                    },
                  ]}
                  type="area"
                // width="500"
                />
              </div>
            </div>
            <div className='bg-[#1E2027] lg:w-2/5  py-5 rounded-md overflow-hidden w-full'>
              <div className='flex-row flex justify-between w-full items-center pb-3 border-b border-[#585c6c] px-5 mb-3'>
                <h3 className='text-white text-lg font-semibold'>Candidate Profiling</h3>
              </div>
              <div className='flex-row flex justify-between w-full items-center pb-3 border-b border-[#585c6c] px-5 mb-3'>
                <select
                  onChange={handleAssesmentChange}
                  name="" id="" className='bg-[#585c6c] h-7 border-none rounded-sm text-white px-1'
                >
                  {
                    assesments.map((assessment, idx) => (
                      <option
                        className='text-white'
                        value={assessment._id}
                        key={idx}
                        selected={selectedAssesment === assessment._id ? true : false}
                      >
                        {assessment.title}
                      </option>
                    ))
                  }
                </select>
                {/* <select name="" id="" className='bg-[#585c6c] h-7 border-none rounded-sm text-white px-1'>
                        <option value="Overall" className='text-white'>Overall</option>
                    </select> */}
              </div>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px' }}>
                  <div style={{
                    border: '8px solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '8px solid #3498db',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 2s linear infinite'
                  }}></div>
                </div>
              ) : (
                <ScatterChart data={scatterChartData} />
              )}
              <style>
                {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
              </style>
            </div>
          </div>
          <div className="pt-9 w-full">
            <div className="flex flex-row items-center justify-start gap-[19.64px] mb-[31px]">
              <select
                onChange={handleJobChange}
                className="bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-[200px] py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px] focus-within:outline-none focus-visible:outline-none "
              >
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value=""
                >
                  Select Jobs
                </option>
                {jobs.map((job, idx) => {
                  return (
                    <option
                      className="text-[#1F222E] font-medium text-base"
                      value={job._id} key={idx}
                    >
                      {job.title}
                    </option>
                  );
                })}
              </select>

              <select
                onChange={handleLocationChange}
                className="bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-[200px] py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px] focus-within:outline-none focus-visible:outline-none "
              >
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value=""
                >
                  Location
                </option>
                {results.map((result, idx) => {
                  return (
                    <option
                      className="text-[#1F222E] font-medium text-base"
                      value={result.userLocation} key={idx}
                    >
                      {result.userLocation}
                    </option>
                  );
                })}
              </select>

              <select className="bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-[200px] py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px] focus-within:outline-none focus-visible:outline-none ">
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="someOption"
                >
                  {" "}
                  Experience Level
                </option>
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="otherOption"
                >
                  Other option
                </option>
              </select>

              <select
                onChange={handleProfileChange}
                className="bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-[200px] py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px] focus-within:outline-none focus-visible:outline-none "
              >
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value=""
                >
                  Candidate Profile
                </option>
                {users.map((user, idx) => {
                  return (
                    <option
                      className="text-[#1F222E] font-medium text-base"
                      value={user._id} key={idx}
                    >
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={handleResultTypeChange}
                className="bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-[200px] py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px] focus-within:outline-none focus-visible:outline-none "
              >
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value=""
                >
                  Range
                </option>
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="30"
                >
                  Below Average (30 - 50)
                </option>
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="65"
                >
                  Average (50 - 65)
                </option>
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="85"
                >
                  Good (65 - 85)
                </option>
                <option
                  className="text-[#1F222E] font-medium text-base"
                  value="100"
                >
                  Excellent (85 - 100)
                </option>
              </select>
              <button className="bg-white border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]">
                <div className="w-5 h-5 bg-[#DCEAFF] flex flex-row items-center justify-center rounded">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5844 0.994141H0.759766L3.85061 4.85772C4.04284 5.09798 4.14756 5.39651 4.14756 5.70426V10.1412C4.14756 10.5154 4.4509 10.8187 4.82512 10.8187H6.51902C6.89323 10.8187 7.19657 10.5154 7.19657 10.1412V5.70426C7.19657 5.39651 7.30132 5.09798 7.49355 4.85772L10.5844 0.994141Z"
                      stroke="#6C757D"
                      strokeWidth="1.01634"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[#1F222E] font-medium text-base">
                  All Filter
                </span>
                <div className="w-3 h-2 -rotate-90">
                  <img src={angleDown} alt="" className="w-full h-full" />
                </div>
              </button>
            </div>
            <div className="my-4">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <button className="border-[#0057FC] border bg-white p-2.5 rounded-md h-10 flex justify-center items-center flex-row gap-2">
                    <span className="">
                      <img src={plussign} alt="" />
                    </span>
                    <span className="font-semibold text-[#0057FC]  text-sm text-center">
                      New candidate
                    </span>
                  </button>
                </div>
                <div className="w-[325px] h-10 relative">
                  <div className="absolute w-4 h-4 left-3 top-3">
                    <img src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    className="h-10 border border-[#CED4DA] rounded-md py-3 pl-10 w-full"
                    id=""
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Table dataSource={filteredResults} columns={columns} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardDefault;
