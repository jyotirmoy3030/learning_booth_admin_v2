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
import { getAllJobsRoles } from 'services/Master/JobRoles';
import { UploadOutlined, FileDoneOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { getJobById, updateJobById } from 'services/Master/Job';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
const { TextArea } = Input;
const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [jobRoles, setJobRoles] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [newMarkedSkills, setNewMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobsRoles();
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
    <div>
      <Typography variant="h1">Edit Job - {job.title}</Typography>
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
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Job Title</InputLabel>
                  <OutlinedInput
                    id="title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter title."
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                  {touched.title && errors.title && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-title"
                    >
                      {errors.title}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="requiredQualification">
                    Required Qualifications
                  </InputLabel>
                  <OutlinedInput
                    id="requiredQualification"
                    type="text"
                    value={values.requiredQualification}
                    name="requiredQualification"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter required qualifications."
                    fullWidth
                    error={Boolean(
                      touched.requiredQualification &&
                        errors.requiredQualification
                    )}
                  />
                  {touched.requiredQualification &&
                    errors.requiredQualification && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-requiredQualification"
                      >
                        {errors.requiredQualification}
                      </FormHelperText>
                    )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="annualCtc">Annual CTC</InputLabel>
                  <OutlinedInput
                    id="annualCtc"
                    type="text"
                    value={values.annualCtc}
                    name="annualCtc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter annual CTC."
                    fullWidth
                    error={Boolean(touched.annualCtc && errors.annualCtc)}
                  />
                  {touched.annualCtc && errors.annualCtc && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-annualCtc"
                    >
                      {errors.annualCtc}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="requiredYearsOfExperience">
                    Required Years of experience
                  </InputLabel>
                  <OutlinedInput
                    id="requiredYearsOfExperience"
                    type="number"
                    value={values.requiredYearsOfExperience}
                    name="requiredYearsOfExperience"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter required years of experience."
                    fullWidth
                    error={Boolean(
                      touched.requiredYearsOfExperience &&
                        errors.requiredYearsOfExperience
                    )}
                  />
                  {touched.requiredYearsOfExperience &&
                    errors.requiredYearsOfExperience && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-requiredYearsOfExperience"
                      >
                        {errors.requiredYearsOfExperience}
                      </FormHelperText>
                    )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="jobType">Job Type</InputLabel>
                  {values.jobType && (
                    <Select
                      labelId="jobType"
                      id="jobType"
                      value={values.jobType}
                      onChange={handleChange}
                      name="jobType"
                    >
                      {jobTypes?.map((type, idx) => {
                        return (
                          <MenuItem value={type} key={idx}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                  {touched.jobType && errors.jobType && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-jobType"
                    >
                      {errors.jobType}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="companyName">Company Name</InputLabel>
                  <OutlinedInput
                    id="companyName"
                    type="text"
                    value={values.companyName}
                    name="companyName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter company name."
                    fullWidth
                    error={Boolean(touched.companyName && errors.companyName)}
                  />
                  {touched.companyName && errors.companyName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-companyName"
                    >
                      {errors.companyName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="companyLogo">Company Logo</InputLabel>
                  <InputLabel
                    htmlFor="companyLogo"
                    sx={{
                      fontSize: '18px',
                      borderRadius: '2px',
                      padding: '7px 10px',
                      border: '1px solid #d9d9d9',
                    }}
                  >
                    {values.companyLogo ? (
                      <FileDoneOutlined style={{ color: 'green' }} />
                    ) : (
                      <UploadOutlined />
                    )}
                  </InputLabel>
                  <input
                    type="file"
                    name="companyLogo"
                    id="companyLogo"
                    onChange={(event) => {
                      setFieldValue(
                        'companyLogo',
                        event.currentTarget.files[0]
                      );
                    }}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="jobRole">
                    Job Role ({job?.jobRole?.title})
                  </InputLabel>
                  <Autocomplete
                    id="jobRole"
                    options={jobRoles}
                    getOptionLabel={(option) => option.title}
                    value={jobRoles.find((role) => role === jobRole) || null}
                    onChange={(event, newValue) => {
                      setJobRole(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} name="jobRole" />
                    )}
                  />
                </Stack>
              </Grid>

              {jobRole && !Object.keys(jobRole).length > 0 && (
                <>
                  {markedSkills &&
                    markedSkills?.map((skill, idx) => (
                      <Grid item xs={12} key={idx}>
                        <Grid container>
                          <Grid xs={10.5} sx={{ mr: 1 }}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="duration">Skill</InputLabel>
                              <OutlinedInput
                                type="text"
                                value={skill.title}
                                disabled
                                placeholder="Enter answer text."
                                fullWidth
                              />
                            </Stack>
                          </Grid>
                          <Grid xs={1}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="duration">LCP</InputLabel>
                              <OutlinedInput
                                type="number"
                                value={markedSkills[idx]?.leastCutoffPercentage}
                                onChange={(e) =>
                                  handleCutOffChange(
                                    parseInt(e.target.value),
                                    idx
                                  )
                                }
                                placeholder="LCP"
                                fullWidth
                                sx={{ borderRadius: 9999 }}
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                </>
              )}
              {jobRole &&
                jobRole.skills?.map((skill, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Grid container>
                      <Grid xs={10.5} sx={{ mr: 1 }}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="duration">Skill</InputLabel>
                          <OutlinedInput
                            type="text"
                            value={skill}
                            disabled
                            placeholder="Enter answer text."
                            fullWidth
                          />
                        </Stack>
                      </Grid>
                      <Grid xs={1}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="duration">LCP</InputLabel>
                          <OutlinedInput
                            type="number"
                            value={newMarkedSkills[idx]?.leastCutoffPercentage}
                            onChange={(e) =>
                              handleCutOffChangeNewSkills(
                                parseInt(e.target.value),
                                idx
                              )
                            }
                            placeholder="LCP"
                            fullWidth
                            sx={{ borderRadius: 9999 }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="jobDetails">Job Details</InputLabel>
                  <TextArea
                    rows={4}
                    placeholder="Enter job details"
                    maxLength={500}
                    id="jobDetails"
                    name="jobDetails"
                    value={values.jobDetails}
                    onChange={handleChange}
                  />
                  {touched.jobDetails && errors.jobDetails && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-jobDetails"
                    >
                      {errors.jobDetails}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="otherInformation">
                    Other Information
                  </InputLabel>
                  <TextArea
                    rows={4}
                    placeholder="Enter other information."
                    maxLength={500}
                    id="otherInformation"
                    name="otherInformation"
                    onChange={handleChange}
                    value={values.otherInformation}
                  />
                  {touched.otherInformation && errors.otherInformation && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-otherInformation"
                    >
                      {errors.otherInformation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditJob;
