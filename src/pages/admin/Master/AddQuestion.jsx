import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
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
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import '../../dashboard/dashboard.css';
import {
  addQuestionToTest,
  changeTestDuration,
  changeTestThumbnail,
  deleteQuestion,
  getAllTestQuestions,
  getTestById,
} from 'services/Master/Tests';
import { toast } from 'react-toastify';
import { TimePicker } from 'antd';
import { appAxios } from 'services/axiosConfig';
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/deskplant.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
import skill from "../../../assets/images/skill.png";
import { ConstructionOutlined } from '../../../../node_modules/@mui/icons-material/index';

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
const AddQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [compentency, setCompentency] = useState({});
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open
  const [showAll, setShowAll] = useState(false);

  // Show only 9 questions initially
  const visibleQuestions = showAll ? questions : questions.slice(0, 9);
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle dropdown
  };
  const [test, setTest] = useState({});
  const { id } = useParams();
  const getAllQuestions = async () => {
    const js = await getAllTestQuestions(id);
    if (js) {
      setQuestions(js.data);
    }
  };
  const getTest = async () => {
    const js = await getTestById(id);
    if (js) {
      setTest(js.data);
    }
  };

  React.useEffect(() => {
    getAllQuestions();
    getTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const changeThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    await changeTestThumbnail(test?._id, formData).then(() => {
      getTest();
      toast.success('Thumbnail updated!');
    });
  };

  const changeDuration = async (duration) => {
    await changeTestDuration(test?._id, { duration }).then(() => {
      getTest();
      toast.success('Duration updated!');
    });
  };

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    try {
      const response = await appAxios.post(`/assessment/${id}`, formData);
      toast.success('Excel file uploaded and processed successfully.');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error('Error uploading and processing Excel file.');
    }
  };
  console.log(compentency)
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
        <Typography variant="h1">
          Manage Assessment - {test.title?.slice(0, 12)}...
        </Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          All Questions
        </Typography>

        <div>
          <label
            htmlFor="thumbnail"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src={test?.thumbnail}
              alt="test_thumb"
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
            <span>Click to upload new thumbnail.</span>
          </label>
        </div>
        <input
          type="file"
          name=""
          id="thumbnail"
          style={{ display: 'none' }}
          onChange={(e) => changeThumbnail(e.target.files[0])}
        />
        <Grid item xs={6} sx={{ my: 4 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="duration">Change Assessment Duration</InputLabel>
            <TimePicker
              onChange={(e) => {
                changeDuration(`${e.$H}:${e.$m}:${e.$s}`);
              }}
              id="duration"
              name="duration"
            />
          </Stack>
        </Grid>

        <Grid container spacing={3}>
          {visibleQuestions.map((question, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <div className="question-card">
                {/* Dots Menu */}
                <div className="dots-menu" onClick={(e) => { e.stopPropagation(); toggleMenu(index); }}>
                  <FaEllipsisV />
                </div>

                {/* Small Popup Dropdown for Edit/Delete */}
                {openMenu === index && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link
                      to={`/dashboard/tests/${id}/questions/${question._id}/edit`}
                      className="dropdown-item flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
                    >
                      <FaEdit className="text-gray-500" /> Edit
                    </Link>

                    <button className="dropdown-item">
                      <FaTrash className="icon" /> Delete
                    </button>
                  </div>
                )}

                {/* Question Title */}
                <h3 className="question-title">{question.title}</h3>

                {/* Question Details */}
                <p className="question-description">Skill: {question.skill}</p>

                {/* Answers Section */}
                <div className="answer-box">
                  <strong>Answers:</strong>
                  <ul>
                    {question.answers.map((ans, i) => (
                      <li key={i}>{ans.title}--<strong>{ans.weight}</strong> (Weightage)</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {/* "See More" Button */}
        {!showAll && questions.length > 9 && (
          <div className="flex justify-center mt-6">
            <button className="card-nav2" onClick={() => setShowAll(true)}>
              See More
            </button>
          </div>
        )}

        {showAll && questions.length > 9 && (
          <div className="flex justify-center mt-6">
            <button className="card-nav2" onClick={() => setShowAll(false)}>
              See Less
            </button>
          </div>
        )}

        <Typography variant="h4" sx={{ my: 2 }}>
          Upload Excel File
        </Typography>
        <div className="relative w-full">
          {/* Icon */}
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
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

          {/* Dropzone */}
          <Dropzone onDrop={handleFileUpload} accept=".xlsx,.xls">
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="w-full border border-gray-400 p-10 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none cursor-pointer text-center flex flex-col justify-center items-center"
              >
                <input {...getInputProps()} />
                <p className="text-gray-700">Drag & drop an Excel file here, or click to select one</p>
              </div>
            )}
          </Dropzone>
        </div>

        <Typography variant="h4" sx={{ my: 2 }}>
          Create Question
        </Typography>
        <Formik
          initialValues={{
            title: '',
            skill: '',
            answers: [
              {
                title: '',
                weight: 0,
              },
              {
                title: '',
                weight: 0,
              },
              {
                title: '',
                weight: 0,
              },
              {
                title: '',
                weight: 0,
              },
            ],
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(10, 'Title should be minimum 10 character.')
              .max(500)
              .required('Title is required'),
            answers: Yup.array().min(2, 'Must provide two answers.'),
            compentencyType: Yup.string().required('Type is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log(id, { ...values, compentency })
              await addQuestionToTest(id, { ...values, compentency });
              getAllQuestions();
              setStatus({ success: true });
              toast.success('Question added.');
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              toast.error('ERROR: Cannot add question.');
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
            <form noValidate onSubmit={handleSubmit} className="mb-[14rem]">
              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
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

                {/* Dynamic Input Field */}
                <input
                  type="text"
                  id="title" // Matches reference ID
                  name="title" // Matches reference Name
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title} // Dynamically controlled by Formik
                  className="w-full border border-gray-400 p-3 pl-12 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Enter title."
                />

                {/* Error Message */}
                {touched.title && errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                {/* Icon */}
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
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
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </span>

                {/* Select Dropdown Field */}
                <select
                  id="compentencyType"
                  name="compentencyType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.compentencyType}
                  className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                >
                  <option value="" label="Select Type" />
                  <option value="functional" label="Functional" />
                  <option value="behavioral" label="Behavioral" />
                  <option value="cultural" label="Cultural" />
                </select>

                {/* Error Message */}
                {touched.compentencyType && errors.compentencyType && (
                  <p className="text-red-500 text-xs mt-1">{errors.compentencyType}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
              

                {/* Icon - Hide when value is selected */}
                {!compentency && (
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 z-10">
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
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </span>
                )}

                {/* Select Field */}
                <InputLabel htmlFor="grouped-native-select">Competency</InputLabel>
                <Select
                  labelId="compentency"
                  id="compentency"
                  value={compentency}
                  onChange={(e) => setCompentency(e.target.value)}
                  name="compentency"
                  displayEmpty
                  label="Competency"
                  className="w-full border border-gray-400 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                >
                  <MenuItem value="" disabled>
                    Select Competency
                  </MenuItem>
                  {test?.jobRole?.compentencies?.map((s, idx) => (
                    <MenuItem value={s} key={idx}>
                      {s.title}
                    </MenuItem>
                  ))}
                </Select>

                {/* Error Message */}
                {touched.compentency && errors.compentency && (
                  <p className="text-red-500 text-xs mt-1">{errors.compentency}</p>
                )}
              </div>

              {compentency?.capabilities && (
                <div className="relative w-full mb-5">
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

                  {/* Select Dropdown Field */}
                  <select
                    id="skill"
                    name="skill"
                    onChange={handleChange}
                    value={values.skill}
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  >
                    <option value="" label="Select Capability" />
                    {compentency?.capabilities?.map((s, idx) => (
                      <option key={idx} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  {/* Error Message */}
                  {touched.skill && errors.skill && (
                    <p className="text-red-500 text-xs mt-1">{errors.skill}</p>
                  )}
                </div>
              )}
              {values.answers.map((_, idx) => (
                <div key={idx} className="relative w-full mb-5 border border-gray-300 p-4 rounded-md shadow-md bg-white">
                  {/* Flex Container for Answer Title & Weight */}
                  <div className="flex gap-4">
                    {/* Answer Title Field (80%) */}
                    <div className="relative w-4/5">
                      <label className="text-gray-700 text-sm font-semibold">Answer Title {idx + 1}</label>
                      <input
                        type="text"
                        value={values.answers[idx].title}
                        onChange={(e) => {
                          const answersCopy = [...values.answers];
                          answersCopy[idx].title = e.target.value;
                          setFieldValue('answers', answersCopy);
                        }}
                        placeholder="Enter answer text"
                        className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Weight Field (20%) */}
                    <div className="relative w-1/5">
                      <label className="text-gray-700 text-sm font-semibold">Weight</label>
                      <input
                        type="number"
                        value={values.answers[idx].weight}
                        onChange={(e) => {
                          const answersCopy = [...values.answers];
                          answersCopy[idx].weight = e.target.value;
                          setFieldValue('answers', answersCopy);
                        }}
                        placeholder="Enter weight"
                        className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-span-2 flex justify-center">
                <button type="submit" className="bg-[#263238] text-white px-6 py-3 rounded-lg" onClick={handleSubmit}>
                  Save
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
      </div>
    </>
  );
};

export default AddQuestion;
