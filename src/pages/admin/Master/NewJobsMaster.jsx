import React, { useState } from 'react';
import {
    Button,
    FormHelperText,
    Grid,
    OutlinedInput,
    Stack,
    InputLabel,
    Typography,
    Box,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag, Input } from 'antd';
import { getAllJobroles } from 'services/Master/JobRoles';
import {
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import '../styles/admin.css';
import { createJob, deleteJob, getAllJobs } from 'services/Master/Job';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/Plant.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import ai from "../../../assets/images/ai.png";
import skill from "../../../assets/images/skill.png";
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';

const jobTypes = [
    'ON_SITE_PART_TIME',
    'ON_SITE_FULL_TIME',
    'REMOTE_PART_TIME',
    'REMOTE_FULL_TIME',
    'ON_CONTRACT',
    'FTE(FULL_TIME_EMPLOYEMENT)',
    'INTERNSHIP'
];
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

const { TextArea } = Input;
const JobsMaster = () => {
    const navigator = useNavigate();
    const [jobRoles, setJobRoles] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [markedSkills, setMarkedSkills] = useState([]);
    const [jobRole, setJobRole] = useState({});
    const getJobRoles = async () => {
        const roles = await getAllJobroles();
        if (roles) {
            setJobRoles(roles.data);
        }
    };
    const getJobs = async () => {
        const js = await getAllJobs();
        if (js) {
            setJobs(js.data);
        }
    };
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (_, data) => (
                <Box display="flex" alignItems="center" justifyContent="start">
                    {data?.title}
                </Box>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Job Role",
            dataIndex: "recommendedJobs",
            key: "recommendedJobs",
            render: (_, { jobRole }) => (
                <Box display="flex" alignItems="start" justifyContent="start" flexDirection="column">
                    <div className="flex flex-wrap items-center gap-2">
                        <div
                            className="px-3 py-1 rounded-full border border-[#ffc727] bg-[#ffc727] shadow-sm flex items-center justify-center"
                        >
                            <span className="text-xs font-semibold text-[#FFFFFF] uppercase tracking-wide">
                                {jobRole.title}
                            </span>
                        </div>
                    </div>
                </Box>
            ),
        },
        {
            title: "Company",
            dataIndex: "companyName",
            key: "companyName",
            render: (_, data) => (
                <Box display="flex" alignItems="center" justifyContent="start">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={data.companyLogo}
                            alt="Company Logo"
                            className="w-[30px] h-[30px] rounded-full"
                        />
                        <span className="text-[#343A40] text-sm font-semibold">{data.companyName}</span>
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
                    <div className="flex flex-row items-center gap-2">
                        <Link
                            to={`/dashboard/jobs/${data._id}/edit`}
                            className="text-green-600 text-lg cursor-pointer"
                        >
                            <EditOutlined />
                        </Link>
                        <span
                            className="text-red-600 text-lg cursor-pointer"
                            onClick={async () => {
                                await deleteJob(data._id);
                                toast.success("Job Deleted.");
                                getJobs();
                            }}
                        >
                            <DeleteOutlined />
                        </span>
                    </div>
                </Box>
            ),
        },
    ];


    React.useEffect(() => {
        getJobRoles();
    }, []);

    React.useEffect(() => {
        getJobs();
    }, []);

    React.useEffect(() => {
        if (Object.keys(jobRole).length > 0) {
            // console.log(jobRole)
            setMarkedSkills(
                jobRole?.compentencies?.map((skill) => ({
                    title: skill.title,
                    leastCutoffPercentage: 0,
                }))
            );
        }
    }, [jobRole]);
    const handleCutOffChange = (value, idx) => {
        const _ms = [...markedSkills];
        _ms[idx].leastCutoffPercentage = value;
        setMarkedSkills(_ms);
    };
    return (
        <>
            <HeaderTwo />

            <div>
                <Typography variant="h1">New Role</Typography>
                {/* <Table dataSource={jobs} columns={columns} /> */}

                <Typography variant="h4" sx={{ my: 2 }}>
                    Create
                </Typography>
                <Formik
                    initialValues={{
                        title: "",
                        jobDetails: "",
                        requiredQualification: "",
                        annualCtc: "",
                        requiredYearsOfExperience: 0,
                        jobType: "",
                        otherInformation: "",
                        companyName: "",
                        companyLogo: null,
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Title is required"),
                        jobDetails: Yup.string().min(10, "Minimum 10 characters").required("Job detail is required"),
                        requiredQualification: Yup.string().required("Qualification is required"),
                        annualCtc: Yup.string().required("Annual CTC is required"),
                        requiredYearsOfExperience: Yup.number().required("Experience is required"),
                        jobType: Yup.string().required("Job type is required"),
                        companyName: Yup.string().required("Company Name is required"),
                    })}
                    onSubmit={async (values, { setErrors, setSubmitting, resetForm }) => {
                        try {
                            const formData = new FormData();
                            Object.keys(values).forEach((key) => {
                                formData.append(key, values[key]);
                            });
                            formData.append("criteria", JSON.stringify(markedSkills));
                            formData.append("jobRole", JSON.stringify(jobRole));

                            let createjob = await createJob(formData);
                            if (createjob) {
                                navigator('/dashboard/jobs')
                            }
                            toast.success("Job Added.");
                            // getJobs();
                            // resetForm();
                            // setJobRole(null);
                            // setSubmitting(false);
                        } catch (err) {
                            setErrors({ submit: err.message });
                            toast.error("ERROR: Cannot add job.");
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[14rem]">
                            {/* Job Title */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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

                                {/* Input & Error (stacked vertically) */}
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.title}
                                        className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9]"
                                        placeholder="Job Role"
                                    />
                                    {touched.title && errors.title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                                    )}
                                </div>
                            </div>





                            {/* Annual CTC */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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

                                {/* Input & Error (stacked vertically) */}
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="annualCtc"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.annualCtc}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9]"
                                        placeholder="Annual CTC"
                                    />
                                    {touched.annualCtc && errors.annualCtc && (
                                        <p className="text-red-500 text-xs mt-1">{errors.annualCtc}</p>
                                    )}
                                </div>
                            </div>



                            {/* Required Qualifications */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M12 14l-9-5 9-5 9 5-9 5zm0 7v-7"
                                        />
                                    </svg>
                                </span>

                                {/* Input Field with Extra Left Padding */}
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="requiredQualification"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.requiredQualification}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9]"
                                        placeholder="Required Qualifications"
                                    />
                                    {touched.requiredQualification && errors.requiredQualification && (
                                        <p className="text-red-500 text-xs">{errors.requiredQualification}</p>
                                    )}
                                </div>
                            </div>
                            {/* Error Message */}


                            {/* Required Experience */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M8 7V3M16 7V3M4 11h16M4 19h16M4 15h16"
                                        />
                                    </svg>
                                </span>

                                {/* Input Field with Extra Left Padding */}
                                <div className="flex flex-col w-full">

                                    <input
                                        type="number"
                                        name="requiredYearsOfExperience"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.requiredYearsOfExperience}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9]"
                                        placeholder="Years of Experience"
                                    />
                                    {touched.requiredYearsOfExperience && errors.requiredYearsOfExperience && (
                                        <p className="text-red-500 text-xs">{errors.requiredYearsOfExperience}</p>
                                    )}
                                </div>
                            </div>
                            {/* Error Message */}


                            {/* Job Type */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M3 7h6l2-2h8a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
                                        />
                                    </svg>
                                </span>

                                {/* Select Dropdown with Extra Left Padding */}
                                <div className="flex flex-col w-full">

                                    <select
                                        name="jobType"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.jobType}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] appearance-none"
                                    >
                                        <option value="">Job Type</option>
                                        {jobTypes?.map((type, idx) => (
                                            <option value={type} key={idx}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {touched.jobType && errors.jobType && <p className="text-red-500 text-xs">{errors.jobType}</p>}
                                </div>
                            </div>
                            {/* Error Message */}




                            {/* Company Name */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M4 3h16M4 9h16M4 15h16M4 21h16M10 3v18M14 3v18"
                                        />
                                    </svg>
                                </span>

                                {/* Input Field with Extra Left Padding */}
                                <div className="flex flex-col w-full">

                                    <input
                                        type="text"
                                        name="companyName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyName}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9]"
                                        placeholder="Company Name"
                                    />
                                    {touched.companyName && errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
                                </div>
                            </div>
                            {/* Error Message */}


                            {/* Company Logo Upload */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M4 12v6h16v-6M12 16V4m-4 4l4-4 4 4"
                                        />
                                    </svg>
                                </span>

                                {/* File Input with Custom Styling */}
                                <div className="flex flex-col w-full">

                                    <input
                                        type="file"
                                        name="companyLogo"
                                        onBlur={handleBlur}
                                        onChange={(event) => setFieldValue("companyLogo", event.currentTarget.files[0])}
                                        className="w-full border border-gray-400 p-2 pl-10 rounded bg-[#e9e9e9] file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-gray-300 file:text-gray-700"
                                    />
                                    {touched.companyLogo && errors.companyLogo && <p className="text-red-500 text-xs">{errors.companyLogo}</p>}
                                </div>
                            </div>
                            {/* Job Details */}
                            <div className="relative w-full mb-2 col-span-2 sm:col-span-1 flex items-center sm:mb-5">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M9 2H15V6H19V22H5V2H9M9 2V6H15V2"
                                        />
                                    </svg>
                                </span>

                                {/* Input Field */}
                                <div className="flex flex-col w-full">

                                    <input
                                        type="text"
                                        name="jobDetails"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.jobDetails}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] h-[42px]"
                                        placeholder="Job Details"
                                    />

                                    {/* Error Message (Separate div for proper placement) */}
                                    {touched.jobDetails && errors.jobDetails && (
                                        <div className="mt-1">
                                            <p className="text-red-500 text-xs">{errors.jobDetails}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Job Role */}
                            {/* <div className="w-full"> */}
                            {/* Full-Width Job Role Dropdown */}
                            <div className="relative w-full mb-5 col-span-2 flex items-center">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
                                        />
                                    </svg>
                                </span>

                                {/* Dropdown Field */}
                                <div className="flex flex-col w-full">

                                    <select
                                        id="jobRole"
                                        name="jobRole"
                                        value={jobRole?._id || ""}
                                        onChange={(e) => {
                                            const selectedRole = jobRoles.find((role) => role._id === e.target.value);
                                            setJobRole(selectedRole || null);
                                            setMarkedSkills(
                                                selectedRole?.compentencies?.map((skill) => ({
                                                    title: skill.title,
                                                    leastCutoffPercentage: 0,
                                                })) || []
                                            );
                                        }}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] h-[42px] focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select Job Role</option>
                                        {jobRoles.map((role) => (
                                            <option key={role._id} value={role._id}>
                                                {role.title}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Error Message */}
                                    {touched.jobRole && errors.jobRole && (
                                        <p className="text-red-500 text-xs">{errors.jobRole}</p>
                                    )}
                                </div>
                            </div>


                            {/* Competency Section (Now Positioned Correctly) */}
                            {jobRole?.compentencies && jobRole.compentencies.length > 0 && (
                                <div className="w-full bg-gray-100 p-4 rounded-lg mt-3 col-span-2">
                                    {/* Section Title */}
                                    <h3 className="text-gray-700 font-semibold mb-2">Required Competencies</h3>

                                    {/* Grid Layout for Full Width */}
                                    <div className="grid grid-cols-12 gap-4">
                                        {jobRole.compentencies.map((skill, idx) => (
                                            <div key={idx} className="col-span-12 flex flex-wrap md:flex-nowrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-300">

                                                {/* Competency Input */}
                                                <div className="w-full md:w-10/12 relative">
                                                    <label className="block text-gray-700 font-medium mb-1">Competency</label>
                                                    <input
                                                        type="text"
                                                        value={skill.title}
                                                        disabled
                                                        placeholder="Competency"
                                                        className="w-full border border-gray-400 p-3 rounded bg-gray-200 text-gray-700 h-[42px] focus:outline-none"
                                                    />
                                                </div>

                                                {/* LCP Input Field */}
                                                <div className="w-full md:w-2/12 relative">
                                                    <label className="block text-gray-700 font-medium mb-1">LCP</label>
                                                    <input
                                                        type="number"
                                                        value={markedSkills[idx]?.leastCutoffPercentage || ""}
                                                        onChange={(e) => handleCutOffChange(parseInt(e.target.value), idx)}
                                                        placeholder="LCP"
                                                        className="w-full border border-gray-400 p-3 rounded bg-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>

                                                {/* Error Message */}
                                                {touched.compentencies?.[idx]?.leastCutoffPercentage &&
                                                    errors.compentencies?.[idx]?.leastCutoffPercentage && (
                                                        <div className="w-full">
                                                            <p className="text-red-500 text-xs mt-1">
                                                                {errors.compentencies[idx].leastCutoffPercentage}
                                                            </p>
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}









                            {/* Error Message */}



                            {/* Other Information */}
                            <div className="relative w-full mb-5 col-span-2 flex items-center">
                                {/* Icon */}
                                <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-500">
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
                                            d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
                                        />
                                    </svg>
                                </span>

                                {/* Input Field with Extra Left Padding */}
                                <div className="flex flex-col w-full">

                                    <input
                                        type="text"
                                        name="otherInformation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.otherInformation}
                                        className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] h-[42px] flex items-center"
                                        placeholder="Other Information"
                                    />
                                    {touched.otherInformation && errors.otherInformation && (
                                        <p className="text-red-500 text-xs">{errors.otherInformation}</p>
                                    )}
                                </div>
                            </div>
                            {/* Error Message */}

                            {/* Submit Button */}
                            <div className="col-span-2 flex justify-center">
                                <button type="submit" className="bg-[#263238] text-white px-6 py-3 rounded-lg font-semibold text-lg ">
                                    Create
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
                {/* <img
                    src={plant}
                    alt="Bottom Right Image"
                    style={styles.plant}
                />
                <div className="bottom-bg" style={styles.bottomBg}></div> */}
                <BackgroundDesign character_image={plant}/>
            </div>
        </>
    );
};

export default JobsMaster;
