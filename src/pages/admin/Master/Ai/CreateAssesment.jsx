import React, { useState } from "react";
import {
  Button,
  Grid,
  Stack,
  InputLabel,
  Typography,
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  OutlinedInput,
} from "@mui/material";
import { TimePicker } from "antd";
import { UploadOutlined, FileDoneOutlined } from "@ant-design/icons";
import {
  getDetails,
  getCompetency,
  getJobSummary,
  saveAssessment,
} from "services/Master/Ai"; // Add saveAssessment API call
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import for navigation

const CreateTest = () => {
  const [step, setStep] = useState(1); // Step tracker
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const [jobRoleTitle, setJobRoleTitle] = useState("");
  const [jobRoleDescription, setJobRoleDescription] = useState("");
  const [competencies, setCompetencies] = useState([]); // Competencies from API
  const [selectedCompetencies, setSelectedCompetencies] = useState([]); // User-selected competencies
  const [assessmentOverview, setAssessmentOverview] = useState(""); // Assessment Overview (formerly Job Summary)
  const [assessmentTitle, setAssessmentTitle] = useState(""); // Assessment Title
  const [assessmentDuration, setAssessmentDuration] = useState(""); // Assessment Duration
  const [thumbnail, setThumbnail] = useState(null); // Assessment Thumbnail
  const navigate = useNavigate(); // For navigation

  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Create AI-Based Assessment
      </Typography>

      {/* Step 1: Enter Job Role Title */}
      {step === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <InputLabel htmlFor="jobRoleTitle">Job Role Title</InputLabel>
              <TextField
                id="jobRoleTitle"
                value={jobRoleTitle}
                onChange={(e) => setJobRoleTitle(e.target.value)}
                placeholder="Enter the Job Role Title"
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={async () => {
                if (!jobRoleTitle.trim()) {
                  toast.error("Job Role Title is required.");
                  return;
                }
                setLoading(true);
                try {
                  const response = await getDetails({ jobRoleTitle });
                  setJobRoleDescription(response.data.description); // Store description
                  setStep(2); // Move to Step 2
                  toast.success("Job Role Description fetched successfully.");
                } catch (err) {
                  toast.error(err.message || "Failed to fetch Job Role Description.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Fetch Job Role Description"}
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 2: Display Job Role Description */}
      {step === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <InputLabel>Job Role Description</InputLabel>
              <TextField
                multiline
                minRows={6}
                fullWidth
                value={jobRoleDescription}
                onChange={(e) => setJobRoleDescription(e.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await getCompetency({
                    jobRoleTitle,
                    jobRoleDescription,
                  });
                  setCompetencies(response.data); // Store competencies
                  setStep(3); // Move to Step 3
                  toast.success("Competencies fetched successfully.");
                } catch (err) {
                  toast.error(err.message || "Failed to fetch competencies.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Continue"}
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 3: Display Competencies and Capabilities */}
      {step === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <InputLabel htmlFor="competencies">
                Select Competencies
              </InputLabel>
              <Autocomplete
                multiple
                id="competencies"
                options={competencies}
                getOptionLabel={(option) => option.name}
                value={selectedCompetencies}
                onChange={(e, value) => setSelectedCompetencies(value)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Choose..." fullWidth />
                )}
              />
            </Stack>
          </Grid>

          {/* Display Capabilities */}
          <Grid item xs={12}>
            {selectedCompetencies.map((competency) => (
              <Box key={competency.id || competency.name} sx={{ mb: 3 }}>
                <Typography variant="h6">{competency.name}</Typography>
                {competency.capabilities?.length ? (
                  <ul>
                    {competency.capabilities.map((capability) => (
                      <li
                        key={
                          capability.id ||
                          `${competency.name}-${capability.name}`
                        }
                      >
                        {capability.name} - {capability.description || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No capabilities available.</Typography>
                )}
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await getJobSummary({
                    jobRoleTitle,
                    jobRoleDescription,
                    selectedCompetencies, // Send selected competencies
                  });
                  setAssessmentOverview(response.data.jobSummary); // Store job summary
                  setStep(4); // Move to Step 4
                  toast.success("Job Summary generated successfully.");
                } catch (err) {
                  toast.error(err.message || "Failed to generate job summary.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Job Summary"}
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 4: Final Assessment Fields */}
      {step === 4 && (
        <Grid container spacing={3}>
          {/* Assessment Title */}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="assessmentTitle">Assessment Title</InputLabel>
              <OutlinedInput
                id="assessmentTitle"
                type="text"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                placeholder="Enter Assessment Title"
                fullWidth
              />
            </Stack>
          </Grid>

          {/* Assessment Duration */}
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="assessmentDuration">Assessment Duration</InputLabel>
              <TimePicker
                id="assessmentDuration"
                onChange={(e) => {
                  const duration = `${e.$H}:${e.$m}:${e.$s}`;
                  setAssessmentDuration(duration);
                }}
                fullWidth
              />
            </Stack>
          </Grid>

          {/* Thumbnail Upload */}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="thumbnail">Thumbnail</InputLabel>
              <InputLabel
                htmlFor="thumbnail"
                sx={{
                  fontSize: "18px",
                  borderRadius: "2px",
                  padding: "7px 10px",
                  border: "1px solid #d9d9d9",
                  cursor: "pointer",
                }}
              >
                {thumbnail ? <FileDoneOutlined style={{ color: "green" }} /> : <UploadOutlined />}
              </InputLabel>
              <input
                type="file"
                id="thumbnail"
                onChange={(event) => setThumbnail(event.target.files[0])}
                style={{ display: "none" }}
                accept="image/*"
              />
            </Stack>
          </Grid>

          {/* Assessment Overview */}
          <Grid item xs={12}>
            <Box>
              <InputLabel>Assessment Overview</InputLabel>
              <TextField
                multiline
                minRows={6}
                fullWidth
                value={assessmentOverview}
                onChange={(e) => setAssessmentOverview(e.target.value)}
              />
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={async () => {
                setLoading(true);
                try {
                  const formData = new FormData(); // Use FormData to handle file uploads
                  formData.append("jobRoleTitle", jobRoleTitle);
                  formData.append("jobRoleDescription", jobRoleDescription);
                  formData.append("selectedCompetencies", JSON.stringify(selectedCompetencies));
                  formData.append("assessmentTitle", assessmentTitle);
                  formData.append("assessmentDuration", assessmentDuration);
                  formData.append("thumbnail", thumbnail); // Append the file
                  formData.append("assessmentOverview", assessmentOverview);
                  const response = await saveAssessment(formData); // Save assessment
                  toast.success("Assessment created successfully!");
                  navigate(`/dashboard/tests/${response.data._id}/questions`); // Redirect with assessment ID
                } catch (err) {
                  toast.error(err.message || "Failed to save assessment.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Questions"}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CreateTest;
