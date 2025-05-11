import React, { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { getAllStats } from "services/Master/Stats";

import dotsIcon from "../../assets/new-dashboard-img/Icon.svg";
import plusIcon from "../../assets/new-dashboard-img/Icon-1.svg";
import angleDown from "../../assets/new-dashboard-img/arrow-down.svg";
import search from "../../assets/new-dashboard-img/Search.svg";
import plussign from "../../assets/new-dashboard-img/plussign.svg";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

import { getAllJobs } from "services/Master/Job";
import { getAllUsers } from "services/Master/Users";
import { deleteResult, getAllResults, getAllCandidateWithScore } from "services/Master/Results";
import { getAllTestsApi } from 'services/Master/Tests';
// import { GiSkills } from "react-icons/gi";
import { Table } from "antd";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import ScatterChart from './ScatterChart';
import './dashboard.css';
import centerImage from "../../assets/images/arrow.png";
import dots from "../../assets/images/dots.png";
import card_icon from "../../assets/images/card_icon1.png";
import briefcase from "../../assets/images/briefcase.png";
import plus from "../../assets/images/plus.png";
import skill from "../../assets/images/skill.png";
import HeaderTwo from "../../components/HeaderTwo";

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
    const js = await getAllResults();
    const reversedData = js.data.scores.reverse();
    if (js) {
      setResults(reversedData);
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
        console.log(js)
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
  // const externalData = [
  //   {
  //     title: "Total Jobs",
  //     value: 500,
  //     lastMonth: 475,
  //     icon: "img/users-profiles-01.svg",
  //     changeIcon: "img/group-26829.png"
  //   },
  //   {
  //     title: "Active Users",
  //     value: 1200,
  //     lastMonth: 1100,
  //     icon: "img/active-users.svg",
  //     changeIcon: "img/up-arrow.png"
  //   },
  //   {
  //     title: "Active Users",
  //     value: 1200,
  //     lastMonth: 1100,
  //     icon: "img/active-users.svg",
  //     changeIcon: "img/up-arrow.png"
  //   }
  // ];

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
        <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(
              Object.fromEntries(
                Object.keys(scores)
                  .map((key) => [key, scores[key]])
                  .sort((a, b) => b[1].total_percentage - a[1].total_percentage)
                  .slice(0, 4)
              )
            ).map((key, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center"
              >
                <span className="text-xs font-semibold text-[#FFFFFF] uppercase tracking-wide">
                  {key}
                </span>
              </div>
            ))}
          </div>
        </Box>
      ),
    }

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   key: "actions",
    //   render: (_, data) => (
    //     <Box display="flex" alignItems="center" justifyContent="start">
    //       <div className="flex flex-row items-center justify-center gap-[7.12px]">
    //         <a
    //           href={`https://www.thirdbracket.in/assessments/result?resultId=${data._id}`}
    //           target="_blank"
    //           className="bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center"
    //         >
    //           <svg
    //             width="19"
    //             height="18"
    //             viewBox="0 0 19 18"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794"
    //               stroke="#0057FC"
    //               strokeWidth="1.31935"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             />
    //           </svg>
    //         </a>

    //         <button className="bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center">
    //           <svg
    //             width="16"
    //             height="15"
    //             viewBox="0 0 16 15"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z"
    //               fill="#212529"
    //             />
    //           </svg>
    //         </button>
    //         <button
    //           className="bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center"
    //           onClick={async () => {
    //             await deleteResult(data._id);
    //             toast.success("Result deleted.");
    //             getResults();
    //           }}
    //         >
    //           <svg
    //             width="18"
    //             height="18"
    //             viewBox="0 0 18 18"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616"
    //               stroke="#212529"
    //               strokeWidth="1.31935"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </Box>
    //   ),
    // },
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
      <HeaderTwo />
      <section className="flex-1 flex flex-row ">
      <div className="w-[100%] lg:flex-1 bg-white pl-4 pr-4 pt-4 lg:pl-7 lg:pr-[30px] lg:pt-[14.83px]">

          <h3 className="text-lg font-bold text-black mb-3">External Data</h3>
          <div
            className="flex gap-4 flex-wrap flex-row"
            id={"ExternalData"}
          >
            {externalData.map((items, idx) => {
              return (
                <div className="total-employee" key={idx}>
                  {/* Title Section */}
                  <div className="title">
                    <div className="text-wrapper">{items?.title}</div>
                    <img className="img" src={dots} alt="More" />
                  </div>

                  {/* Content Section */}
                  <div className="content">
                    <div className="number-of-employees">
                      <div className="icon">
                        <img className="img" src={card_icon} alt="User Icon" />
                      </div>
                      <div className="text">
                        <div className="div">{items?.value}</div>
                        <p className="last-month">
                          <span className="span">Last month: 0 </span>
                          <span className="text-wrapper-2">{items?.lastMonth}</span>
                        </p>
                      </div>
                    </div>

                    {/* Change Indicator */}
                    {/* <div className="group">
                      <div className="overlap-group gauge-container">
                        <Gauge
                          value={60} // Dynamic percentage
                          min={0}
                          max={100}
                          startAngle={-90}
                          endAngle={90}
                          sx={{ width: 53, height: 53 }} // Adjust size
                        />
                        <img
                          src="../../assets/images/ellipse.png" // Replace with your actual image path
                          alt="Center Icon"
                          className="gauge-center-icon"
                        />
                      </div>
                    </div> */}
                    <div className="gauge-container">
                      {/* Green Gauge Chart */}
                      <Gauge
                        value={80}  // Dynamic percentage
                        min={0}
                        max={100}
                        sx={(theme) => ({
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 0,
                          },
                          [`& .${gaugeClasses.valueArc}`]: {
                            fill: '#ffc727',
                          }
                        })}
                      />
                      {/* Center Image */}
                      <img src={centerImage} alt="Center Icon" className="gauge-center-icon" />
                    </div>
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
              {internalData.map((items, idx) => (
                <div className="assessment-card" key={idx}>
                  <div className="assessment-content">
                    <div className="assessment-text-group">
                      <div className="assessment-title">{items?.title}</div>
                      <div className="assessment-view">
                        <Link to={items?.url}>View All</Link>
                      </div>
                    </div>
                  </div>
                  <div className="assessment-value">{items?.value}</div>
                </div>
              ))}

            </div>
          </div>
          <div className="chart-section flex flex-col lg:flex-row items-start justify-between mt-8 mb-2.5 gap-4">
            {/* Chart 1 */}
            <div className="bg-[#fafafb] rounded-md px-5 py-4 flex-1 w-full lg:w-1/2">
              <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center mb-4 gap-2">
                <h3 className="text-black text-lg font-semibold">Unique Visitors</h3>
                <div className="flex gap-2">
                  <button className="bg-transparent border-none">
                    <span className="text-gray-500 text-base font-semibold">Month</span>
                  </button>
                  <button className="bg-transparent border h-8 px-2 flex items-center justify-center border-blue-500 rounded">
                    <span className="text-blue-500 text-base font-semibold">Week</span>
                  </button>
                </div>
              </div>
              <div className="mixed-chart border border-slate-300 rounded overflow-hidden">
                <Chart
                  options={{
                    chart: {
                      id: "line-chart",
                      type: "line",
                      background: "#fff",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    },
                    stroke: {
                      curve: "smooth",
                      width: 4,
                    },
                    dataLabels: { enabled: false },
                    colors: ["#FAC684", "#84D78C"],
                  }}
                  series={[
                    {
                      name: "Page View",
                      data: [10, 30, 45, 40, 45, 70, 50],
                    },
                    {
                      name: "Sessions",
                      data: [30, 35, 25, 40, 50, 55, 40],
                    },
                  ]}
                  type="line"
                  height={400}
                  width="100%"
                />
              </div>
            </div>

            {/* Chart 2 */}
            <div className="bg-[#1E2027] w-full lg:w-2/5 py-5 rounded-md overflow-hidden relative">
              <div className="px-5 mb-3 border-b border-[#585c6c] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-white text-lg font-semibold">Candidate Profiling</h3>
              </div>

              <div className="px-5 mb-3 border-b border-[#585c6c] pb-3">
                <select
                  onChange={handleAssesmentChange}
                  className="bg-[#585c6c] h-8 w-full sm:w-auto border-none rounded-sm text-white px-2"
                >
                  {assesments.map((assessment, idx) => (
                    <option
                      className="text-white"
                      value={assessment._id}
                      key={idx}
                      selected={selectedAssesment === assessment._id}
                    >
                      {assessment.title}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-[80px]">
                  <div className="w-12 h-12 border-8 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="relative px-2">
                  <ScatterChart data={scatterChartData} />
                  {/* Black Overlay to Hide Watermark */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1px',
                      right: '5px',
                      backgroundColor: '#1E2027',
                      width: '75px',
                      height: '20px',
                      zIndex: 10,
                    }}
                  />
                </div>
              )}
            </div>
          </div>



          <div className="candidates-container pt-9 w-full">
            {/* Filters Section */}
            {/* <div className="filters-container flex flex-row items-center justify-start gap-[19.64px] mb-[31px]">
              <button className="btn btn-outline-secondary">Jobs <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary">Location <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary">Experience Level <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary">Candidate Profile <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary">Range <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary">Last 30 Days <i className="fas fa-chevron-down ms-1"></i></button>
              <button className="btn btn-outline-secondary"><i className="fas fa-download me-2"></i> Export Data</button>
            </div> */}

            {/* Search & Add Candidate */}
            <div className="search-add-container my-4 flex flex-row items-center justify-between">
              <h3 className="text-lg font-bold text-black mb-3">Candidates</h3>
              {/* <div className="flex items-center gap-4">
                <select className="h-10 border border-[#CED4DA] rounded-md px-4">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 3 Months</option>
                </select>
                <button className="h-10 border border-[#CED4DA] rounded-md px-4">
                  Export
                </button>
              </div> */}
            </div>


            {/* Candidates Table */}
            <div className="candidates-table flex-1">
              <div className="card tbl-card">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table dataSource={filteredResults} columns={columns} pagination={{ pageSize: 5 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default DashboardDefault;
