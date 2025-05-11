import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import AnimateButton from "components/@extended/AnimateButton";
import "../styles/admin.css";
import {
  getQuestionById,
  getTestById,
  updateQuestion,
} from "services/Master/Tests";
import { toast } from "react-toastify";
import dr15_2 from "../../../assets/images/dr15_2.png";
import plant from "../../../assets/images/Rocket.png";
import briefcase from "../../../assets/images/briefcase.png";
import plus from "../../../assets/images/plus.png";
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
    width: "10rem",  // Adjust as needed
    height: "auto",
    maxWidth: "100%", // Prevents overflow issues
    zIndex: "-2", // Ensure it's behind content but above background
    pointerEvents: "none", // Prevents interference with clicks
  }

};
const EditQuestion = () => {
  const [question, setQuestion] = useState({});
  const [competencies, setCompetencies] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const { testId, questionId } = useParams();
  const navigate = useNavigate();

  // Centralized API Call Function
  const fetchData = async (apiFn, params, setter, errorMessage) => {
    try {
      const response = await apiFn(...params);
      if (response?.data) setter(response.data);
    } catch (error) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchData(
      getQuestionById,
      [questionId, testId],
      (data) => {
        setQuestion(data);
        setCapabilities(data?.competency?.capabilities || []);
      },
      "Failed to fetch question details."
    );
    fetchData(
      getTestById,
      [testId],
      (data) => {
        setCompetencies(data?.jobRole?.compentencies || []);
      },
      "Failed to fetch test details."
    );
  }, [testId, questionId]);

  const handleCompetencyChange = (selectedCompetencyId) => {
    const selectedCompetency = competencies.find(
      (comp) => comp._id === selectedCompetencyId
    );
    if (selectedCompetency) {
      setCapabilities(selectedCompetency.capabilities || []);
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
        <Typography variant="h1" className="mb-[4rem]">Edit Question - {question.title}</Typography>

        <Formik
          initialValues={{
            title: question.title || "",
            compentencyType: question.compentencyType || "", // Added 'type' initial value
            skill: question.capability || "",
            compentency: question.competency?._id || "",
            answers: question.answers || [
              { title: "", weight: 0 },
              { title: "", weight: 0 },
            ],
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(10, "Title should be minimum 10 characters.")
              .max(255)
              .required("Title is required"),
            compentencyType: Yup.string().required("Type is required."), // Validation for 'type'
            skill: Yup.string().required("Capability is required."),
            compentency: Yup.string().required("Competency is required."),
          })}
          enableReinitialize
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {

              let newcompetency = competencies.filter((item) => item._id == values.compentency)
              values.compentency = newcompetency[0];
              console.log(values)
              await updateQuestion(questionId, { ...values });
              toast.success("Question updated successfully!");
              // navigate(-1);
              setStatus({ success: true });
            } catch (error) {
              setStatus({ success: false });
              setErrors({ submit: error.message });
              toast.error("Error updating question.");
            } finally {
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
                <label htmlFor="title" className="text-gray-700 font-semibold block mb-1">Question Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  placeholder="Enter question title"
                />
                {touched.title && errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>


              {/* Type Dropdown */}
              <div className="relative w-full mb-5">
                <label htmlFor="type" className="text-gray-700 font-semibold block mb-1">Type({values.compentencyType})</label>
                <select
                  id="compentencyType"
                  name="compentencyType"
                  value={values.compentencyType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                >
                  <option value="" label="Select Type" />
                  <option value="functional">Functional</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="cultural">Cultural</option>
                  <option value="technical">Technical</option>
                  <option value="leadership">Leadership</option>
                </select>
                {touched.compentencyType && errors.compentencyType && <p className="text-red-500 text-xs mt-1">{errors.compentencyType}</p>}
              </div>

              {/* Competency Dropdown */}
              <div className="relative w-full mb-5">
                <label htmlFor="competency" className="text-gray-700 font-semibold block mb-1">Compentency({question?.compentency?.title})</label>
                <select
                  id="compentency"
                  name="compentency"
                  value={values.compentency}
                  onChange={(e) => {
                    setFieldValue("compentency", e.target.value);
                    handleCompetencyChange(e.target.value);
                  }}
                  className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                >
                  <option value="" disabled>Select Competency</option>
                  {competencies.map((comp) => (
                    <option key={comp._id} value={comp._id}>{comp.title}</option>
                  ))}
                </select>
                {errors.competency && <p className="text-red-500 text-xs mt-1">{errors.competency}</p>}
              </div>

              {/* Capability Dropdown */}
              {capabilities.length > 0 && (
                <div className="relative w-full mb-5">
                  <label htmlFor="skill" className="text-gray-700 font-semibold block mb-1">Capability</label>
                  <select
                    id="skill"
                    name="skill"
                    value={values.skill}
                    onChange={(e) => setFieldValue("skill", e.target.value)}
                    className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>Select Capability</option>
                    {capabilities.map((cap) => (
                      <option key={cap._id} value={cap._id}>{cap.name}</option>
                    ))}
                  </select>
                  {touched.skill && errors.skill && <p className="text-red-500 text-xs mt-1">{errors.skill}</p>}
                </div>
              )}
              {values.answers.map((answer, idx) => (
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
                          const updatedAnswers = [...values.answers];
                          updatedAnswers[idx].title = e.target.value;
                          setFieldValue("answers", updatedAnswers);
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
                          const updatedAnswers = [...values.answers];
                          updatedAnswers[idx].weight = parseInt(e.target.value) || 0;
                          setFieldValue("answers", updatedAnswers);
                        }}
                        placeholder="Enter weight"
                        className="w-full border border-gray-400 p-3 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              ))}

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

export default EditQuestion;
