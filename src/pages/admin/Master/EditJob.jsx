import React, { useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import AnimateButton from 'components/@extended/AnimateButton';
import { Input } from 'antd';
import { getAllJobroles } from 'services/Master/JobRoles';
import { UploadOutlined, FileDoneOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { getJobById, updateJobById } from 'services/Master/Job';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/Plant.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import { Link } from 'react-router-dom';


const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
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
    width: "6rem",  // Adjust as needed
    height: "auto",
    maxWidth: "100%", // Prevents overflow issues
    zIndex: "-2", // Ensure it's behind content but above background
    pointerEvents: "none", // Prevents interference with clicks
  }

};
const { TextArea } = Input;
const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [jobRoles, setJobRoles] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [newMarkedSkills, setNewMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobroles();
    if (roles) {
      setJobRoles(roles.data);
    }
  };
  React.useEffect(() => {
    (async () => {
      const j = await getJobById(id);
      setJob(j.data);
    })();
  }, [id]);
  React.useEffect(() => {
    getJobRoles();
  }, []);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (job?.criteria) {
      if (Object.keys(job?.criteria).length > 0) {
        setMarkedSkills(
          job?.criteria?.map((skill) => ({
            title: skill?.title,
            leastCutoffPercentage: skill?.leastCutoffPercentage,
          }))
        );
      }
    }
  }, [job?.criteria, jobRole]);
  const handleCutOffChange = (value, idx) => {
    const _ms = [...markedSkills];
    _ms[idx].leastCutoffPercentage = value;
    setMarkedSkills(_ms);
  };
  const handleCutOffChangeNewSkills = (value, idx) => {
    const _ms = [...newMarkedSkills];
    _ms[idx].leastCutoffPercentage = value;
    setNewMarkedSkills(_ms);
  };
  // React.useEffect(() => {
  //   setJobRole(job?.jobRole);
  // }, [job?.jobRole]);
  React.useEffect(() => {
    if (Object.keys(jobRole).length > 0) {
      setNewMarkedSkills(
        jobRole?.compentencies?.map((skill) => ({
          title: skill,
          leastCutoffPercentage: 0,
        }))
      );
    }
  }, [jobRole]);
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
        </div>
      </div>
      <div>
        <Typography variant="h1" style={{ marginBottom: '25px' }}>Edit Job - {job.title}</Typography>
        <Formik
          initialValues={{
            title: job.title,
            jobDetails: job.jobDetails,
            requiredQualification: job.requiredQualification,
            annualCtc: job.annualCtc,
            requiredYearsOfExperience: job.requiredYearsOfExperience,
            jobType: job.jobType,
            otherInformation: job.otherInformation,
            companyName: job.companyName,
            companyLogo: job.companyLogo,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Title is required'),
            jobDetails: Yup.string()
              .min(10, 'Job details should be minimum 50 character.')
              .max(500)
              .required('Job detail is required'),
            requiredQualification: Yup.string().required(
              'Qualitification are required'
            ),
            annualCtc: Yup.string().required('Annual CTC are required'),
            requiredYearsOfExperience: Yup.number(
              'Experience is required!'
            ).required('Experience is required!'),
            jobType: Yup.string().required('Job type is required!'),
            otherInformation: Yup.string(),
            companyName: Yup.string().required('Company Name is required!'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                if (values[key] instanceof File) {
                  formData.append(key, values[key]);
                } else if (Array.isArray(values[key])) {
                  formData.append(key, JSON.stringify(values[key]));
                } else {
                  formData.append(key, values[key]);
                }
              });
              formData.append(
                'criteria',
                JSON.stringify(
                  Object.keys(newMarkedSkills).length > 0
                    ? newMarkedSkills
                    : markedSkills
                )
              );
              formData.append(
                'jobRole',
                JSON.stringify(
                  Object.keys(jobRole).length > 0 ? jobRole : job?.jobRole
                )
              );
              const response = await updateJobById(id, formData);
              if ([200, 201].includes(response.status)) {
                navigate('/dashboard/jobs');
              }
              toast.success('Job edited.');
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              toast.error('ERROR: Couldnt edit Job.');
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            setFieldValue,
          }) => (
            <form noValidate onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-[14rem]">
              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                  id="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Job Title"
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.title && errors.title ? "border-red-500" : ""
                    }`}
                />

                {/* Error Message */}
                {touched.title && errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Input Field */}
                <input
                  type="text"
                  id="requiredQualification"
                  name="requiredQualification"
                  value={values.requiredQualification}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter required qualifications"
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.requiredQualification && errors.requiredQualification ? "border-red-500" : ""
                    }`}
                />

                {/* Error Message */}
                {touched.requiredQualification && errors.requiredQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.requiredQualification}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Input Field */}
                <input
                  type="text"
                  id="annualCtc"
                  name="annualCtc"
                  value={values.annualCtc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Annual CTC"
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.annualCtc && errors.annualCtc ? "border-red-500" : ""
                    }`}
                />

                {/* Error Message */}
                {touched.annualCtc && errors.annualCtc && (
                  <p className="text-red-500 text-xs mt-1">{errors.annualCtc}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Input Field */}
                <input
                  type="number"
                  id="requiredYearsOfExperience"
                  name="requiredYearsOfExperience"
                  value={values.requiredYearsOfExperience}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Required Years of Experience"
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.requiredYearsOfExperience && errors.requiredYearsOfExperience ? "border-red-500" : ""
                    }`}
                />

                {/* Error Message */}
                {touched.requiredYearsOfExperience && errors.requiredYearsOfExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.requiredYearsOfExperience}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Select Dropdown */}
                <select
                  id="jobType"
                  name="jobType"
                  value={values.jobType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.jobType && errors.jobType ? "border-red-500" : ""
                    }`}
                >
                  <option value="">Select Job Type</option>
                  {jobTypes?.map((type, idx) => (
                    <option value={type} key={idx}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Error Message */}
                {touched.jobType && errors.jobType && (
                  <p className="text-red-500 text-xs mt-1">{errors.jobType}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Input Field */}
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={values.companyName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300 ${touched.companyName && errors.companyName ? "border-red-500" : ""
                    }`}
                />

                {/* Error Message */}
                {touched.companyName && errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                <label
                  htmlFor="companyLogo"
                  className="border border-gray-400 p-3 rounded bg-[#e9e9e9] cursor-pointer flex items-center gap-2"
                >
                  {values.companyLogo ? (
                    <span className="text-green-600">✔ File Uploaded</span>
                  ) : (
                    <span className="text-gray-600">📂 Upload Company Logo</span>
                  )}
                </label>

                <input
                  type="file"
                  id="companyLogo"
                  name="companyLogo"
                  onChange={(event) => {
                    setFieldValue("companyLogo", event.currentTarget.files[0]);
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </div>


              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </span>

                {/* Select Dropdown */}
                <select
                  id="jobRole"
                  name="jobRole"
                  value={jobRoles.find((role) => role === jobRole) || ""}
                  onChange={(e) => {
                    const selectedRole = jobRoles.find((role) => role === e.target.value);
                    setJobRole(selectedRole);
                  }}
                  className={`w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option value="">Select Job Role</option>
                  {jobRoles?.map((role, idx) => (
                    <option value={role} key={idx}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>


              {jobRole && !Object.keys(jobRole).length > 0 && (
                <>
                  {markedSkills &&
                    markedSkills.map((skill, idx) => (
                      <div key={idx} className="w-full mb-5">
                        {/* Skill Field */}
                        <div className="relative flex items-center mb-2">
                          {/* Icon */}
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                          {/* Skill Input */}
                          <input
                            type="text"
                            value={skill.title}
                            disabled
                            placeholder="Skill"
                            className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none"
                          />
                        </div>

                        {/* LCP Field */}
                        <div className="relative flex items-center">
                          {/* Icon */}
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                          {/* LCP Input */}
                          <input
                            type="number"
                            value={markedSkills[idx]?.leastCutoffPercentage}
                            onChange={(e) =>
                              handleCutOffChange(parseInt(e.target.value), idx)
                            }
                            placeholder="LCP"
                            className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                </>
              )}

              {jobRole &&
                jobRole.skills?.map((skill, idx) => (
                  <div key={idx} className="w-full mb-5">
                    {/* Skill Field */}
                    <div className="relative flex items-center mb-2">
                      {/* Icon */}
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                      {/* Skill Input */}
                      <input
                        type="text"
                        value={skill}
                        disabled
                        placeholder="Skill"
                        className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none"
                      />
                    </div>

                    {/* LCP Field */}
                    <div className="relative flex items-center">
                      {/* Icon */}
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                      {/* LCP Input */}
                      <input
                        type="number"
                        value={newMarkedSkills[idx]?.leastCutoffPercentage}
                        onChange={(e) =>
                          handleCutOffChangeNewSkills(parseInt(e.target.value), idx)
                        }
                        placeholder="LCP"
                        className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}

              {/* Job Details */}
              <div className="w-full mb-5">


                <textarea
                  id="jobDetails"
                  name="jobDetails"
                  rows={4}
                  maxLength={500}
                  placeholder="Enter job details"
                  value={values.jobDetails}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:outline-none resize-none"
                ></textarea>

                {touched.jobDetails && errors.jobDetails && (
                  <p className="text-red-500 text-xs mt-1">{errors.jobDetails}</p>
                )}
              </div>

              {/* Other Information */}
              <div className="w-full mb-5">


                <textarea
                  id="otherInformation"
                  name="otherInformation"
                  rows={4}
                  maxLength={500}
                  placeholder="Enter other information."
                  value={values.otherInformation}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:outline-none resize-none"
                ></textarea>

                {touched.otherInformation && errors.otherInformation && (
                  <p className="text-red-500 text-xs mt-1">{errors.otherInformation}</p>
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

export default EditJob;
