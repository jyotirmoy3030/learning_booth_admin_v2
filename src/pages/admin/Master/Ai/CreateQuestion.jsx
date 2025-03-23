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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AnimateButton from "components/@extended/AnimateButton";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getTestById } from "services/Master/Tests";
import {
  generateQuestions,
  createQuestions,
  regenerateQuestions,
} from "services/Master/Ai";
import "../../styles/admin.css";

const AiQuestionGenerator = () => {
  const { id } = useParams();
  const assessmentId = id;

  const [competency, setCompetency] = useState(null);
  const [competencies, setCompetencies] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [step, setStep] = useState(1); // Step state to manage form stages
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [stepOneData, setStepOneData] = useState({}); // Store step one data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [questionEdit, setQuestionEdit] = useState(""); // Stores the question title being edited
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await getTestById(assessmentId);
        setCompetencies(response?.data?.Jobrole?.competencies || []);
      } catch (error) {
        toast.error("Failed to fetch competencies.");
      }
    };
    fetchCompetencies();
  }, [assessmentId]);

  const handleCompetencyChange = (selectedCompetency) => {
    setCompetency(selectedCompetency);
    setCapabilities(selectedCompetency.capabilities || []);
  };

  const handleGenerateQuestions = async (values) => {
    try {
      const response = await generateQuestions({ assessmentId, ...values });
      setGeneratedQuestions(response.data); // Store generated questions
      setStep(2); // Move to the second step
      toast.success("Questions generated successfully.");
    } catch (error) {
      toast.error("Failed to generate questions.");
    }
  };

  const handleEditQuestion = (index) => {
    setEditQuestionIndex(index);
    setQuestionEdit(generatedQuestions[index].title);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions[editQuestionIndex].title = questionEdit;
    setGeneratedQuestions(updatedQuestions);
    setEditModalOpen(false);
    toast.success("Question updated successfully.");
  };

  const handleSubmitQuestions = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        questions: generatedQuestions,
        stepOneData,
        assessmentId
      };
      await createQuestions(payload);
      toast.success("Questions submitted successfully.");
      navigate(`/dashboard/tests/${assessmentId}/questions`);
    } catch (error) {
      toast.error("Failed to submit questions.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions.splice(index, 1); // Remove the question at the specified index
    setGeneratedQuestions(updatedQuestions); // Update the state
    toast.success("Question removed successfully.");
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Question Generator
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Token Used: 12000
      </Typography>

      {/* Step One: Input Form */}
      {step === 1 && (
        <Formik
          initialValues={{
            numQuestions: "",
            difficulty: "",
            questionType: "",
            type: "",
            competency: "",
            capability: "",
          }}
          validationSchema={Yup.object({
            numQuestions: Yup.number()
              .required("Number of questions is required")
              .positive("Must be a positive number")
              .integer("Must be an integer"),
            difficulty: Yup.string().required("Problem difficulty is required"),
            questionType: Yup.string().required("Question type is required"),
            type: Yup.string().required("Type is required"),
            competency: Yup.string().required("Competency is required"),
            capability: Yup.string().required("Capability is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setStepOneData(values); // Save step one data
            await handleGenerateQuestions(values); // Generate questions
            setSubmitting(false);
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
            setFieldValue,
            touched,
            errors,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Number of Questions */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>No. of Questions</InputLabel>
                    <OutlinedInput
                      id="numQuestions"
                      name="numQuestions"
                      type="number"
                      value={values.numQuestions}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("numQuestions", e.target.value)
                      }
                      placeholder="Enter number of questions"
                      fullWidth
                      error={Boolean(
                        touched.numQuestions && errors.numQuestions
                      )}
                    />
                    {touched.numQuestions && errors.numQuestions && (
                      <FormHelperText error>
                        {errors.numQuestions}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* Problem Difficulty Dropdown */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="difficulty">
                      Problem Difficulty
                    </InputLabel>
                    <Select
                      id="difficulty"
                      name="difficulty"
                      value={values.difficulty}
                      onChange={(e) =>
                        setFieldValue("difficulty", e.target.value)
                      }
                      fullWidth
                      error={Boolean(touched.difficulty && errors.difficulty)}
                    >
                      <MenuItem value="" disabled>
                        Select Difficulty
                      </MenuItem>
                      <MenuItem value="simple">Simple</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advance">Advance</MenuItem>
                    </Select>
                    {touched.difficulty && errors.difficulty && (
                      <FormHelperText error>{errors.difficulty}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* Question Type Dropdown */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="questionType">
                      Question Type
                    </InputLabel>
                    <Select
                      id="questionType"
                      name="questionType"
                      value={values.questionType}
                      onChange={(e) =>
                        setFieldValue("questionType", e.target.value)
                      }
                      fullWidth
                      error={Boolean(
                        touched.questionType && errors.questionType
                      )}
                    >
                      <MenuItem value="" disabled>
                        Select Question Type
                      </MenuItem>
                      <MenuItem value="situation">
                        Situation-based Question
                      </MenuItem>
                      <MenuItem value="direct">Direct-based Question</MenuItem>
                      <MenuItem value="role">Role-based Question</MenuItem>
                    </Select>
                    {touched.questionType && errors.questionType && (
                      <FormHelperText error>
                        {errors.questionType}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* Type Dropdown */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                      id="type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(touched.type && errors.type)}
                    >
                      <MenuItem value="" disabled>
                        Select Type
                      </MenuItem>
                      <MenuItem value="functional">Functional</MenuItem>
                      <MenuItem value="behavioral">Behavioral</MenuItem>
                      <MenuItem value="cultural">Cultural</MenuItem>
                    </Select>
                    {touched.type && errors.type && (
                      <FormHelperText error>{errors.type}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* Competency Dropdown */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="competency">Competency</InputLabel>
                    <Select
                      id="competency"
                      value={competency?._id || ""}
                      onChange={(e) => {
                        const selectedCompetency = competencies.find(
                          (comp) => comp._id === e.target.value
                        );
                        if (selectedCompetency) {
                          setCompetency(selectedCompetency);
                          handleCompetencyChange(selectedCompetency);
                          setFieldValue("competency", selectedCompetency._id);
                        }
                      }}
                      name="competency"
                      fullWidth
                      error={Boolean(touched.competency && errors.competency)}
                    >
                      <MenuItem value="" disabled>
                        Select Competency
                      </MenuItem>
                      {competencies.map((competency) => (
                        <MenuItem key={competency._id} value={competency._id}>
                          {competency.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.competency && errors.competency && (
                      <FormHelperText error>{errors.competency}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* Capability Dropdown */}
                {capabilities.length > 0 && (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="capability">Capability</InputLabel>
                      <Select
                        id="capability"
                        value={values.capability}
                        onChange={(e) =>
                          setFieldValue("capability", e.target.value)
                        }
                        name="capability"
                        fullWidth
                        error={Boolean(touched.capability && errors.capability)}
                      >
                        <MenuItem value="" disabled>
                          Select Capability
                        </MenuItem>
                        {capabilities.map((cap) => (
                          <MenuItem key={cap._id} value={cap._id}>
                            {cap.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.capability && errors.capability && (
                        <FormHelperText error>
                          {errors.capability}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Generate Questions
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}

      {/* Step Two: Display Generated Questions */}
      {step === 2 && (
        <div>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Generated Questions
          </Typography>
          {generatedQuestions.map((question, index) => (
            <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2 }}>
              <Typography variant="h6">{`Q${index + 1}: ${
                question.title
              }`}</Typography>
              {question.answers.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    px: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ flex: 1 }}>
                    Answer
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ width: 80, textAlign: "center" }}
                  >
                    Weight
                  </Typography>
                </Box>
              )}
              {question.answers.map((answer, idx) => (
                <Stack
                  key={idx}
                  direction="row"
                  spacing={2}
                  sx={{ mt: 1, alignItems: "center" }}
                >
                  <OutlinedInput
                    value={answer.title}
                    readOnly
                    fullWidth
                    placeholder="Answer title"
                  />
                  <OutlinedInput
                    value={answer.weight}
                    onChange={(e) => {
                      const updatedQuestions = [...generatedQuestions];
                      const newWeight = parseFloat(e.target.value) || 0;

                      // Update weight in the specific answer
                      updatedQuestions[index].answers[idx].weight = Math.min(
                        Math.max(newWeight, 0), // Ensure weight is not below 0
                        1 // Ensure weight is not above 1
                      );

                      setGeneratedQuestions(updatedQuestions);
                    }}
                    sx={{ width: 80 }}
                    placeholder="Weight"
                  />
                </Stack>
              ))}

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {/* Edit Icon */}
                <IconButton onClick={() => handleEditQuestion(index)}>
                  <EditIcon />
                </IconButton>

                {/* Delete Icon */}
                <IconButton
                  onClick={() => handleDeleteQuestion(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitQuestions}
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit Questions"}
          </Button>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit and Regenerate Question</DialogTitle>
        <DialogContent>
          <OutlinedInput
            fullWidth
            value={questionEdit}
            onChange={(e) => setQuestionEdit(e.target.value)}
            placeholder="Edit Question Title"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              try {
                const payload = {
                  assessmentId,
                  questionTitle: questionEdit, // Edited title
                  difficulty: stepOneData.difficulty,
                  questionType: stepOneData.questionType,
                  type: stepOneData.type,
                  competency: stepOneData.competency,
                  capability: stepOneData.capability,
                };

                const response = await regenerateQuestions(payload);

                const updatedQuestion = response.data;
                const updatedQuestions = [...generatedQuestions];
                updatedQuestions[editQuestionIndex] = {
                  title: updatedQuestion.title,
                  answers: updatedQuestion.answers,
                };

                setGeneratedQuestions(updatedQuestions);
                toast.success("Question and answers regenerated successfully.");
                setEditModalOpen(false);
              } catch (error) {
                toast.error("Failed to regenerate question and answers.");
              }
            }}
            variant="contained"
            color="primary"
          >
            Regenerate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AiQuestionGenerator;
