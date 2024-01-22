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
import { getAllJobsRoles } from 'services/Master/JobRoles';
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

const jobTypes = [
  'ON_SITE_PART_TIME',
  'ON_SITE_FULL_TIME',
  'REMOTE_PART_TIME',
  'REMOTE_FULL_TIME',
];
const { TextArea } = Input;
const JobsMaster = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobsRoles();
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Job Role',
      dataIndex: 'jobRole',
      key: 'jobRole',
      render: (_, { jobRole }) => (
        <>
          <Tag color={'geekblue'} key={jobRole}>
            {jobRole.title}
          </Tag>
        </>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (_, data) => (
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          {' '}
          <img
            src={data.companyLogo}
            alt=""
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              marginRight: '4px',
            }}
          />
          <span>{data.companyName}</span>
        </Box>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <Link
            to={`/dashboard/jobs/${data._id}/edit`}
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              margin: '0px 10px',
              color: 'green',
            }}
          >
            <EditOutlined />
          </Link>
          <span
            style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
            onClick={async () => {
              await deleteJob(data._id);
              toast.success('Job Deleted.');
              getJobs();
            }}
          >
            <DeleteOutlined />
          </span>
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
    <div>
      <Typography variant="h1">Jobs</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={jobs} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          title: '',
          jobDetails: '',
          requiredQualification: '',
          annualCtc: '',
          requiredYearsOfExperience: 0,
          jobType: '',
          otherInformation: '',
          companyName: '',
          companyLogo: null,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Title is required'),
          jobDetails: Yup.string()
            .min(10, 'Job details should be minimum 50 character.')
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
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
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
            formData.append('criteria', JSON.stringify(markedSkills));
            formData.append('jobRole', JSON.stringify(jobRole));
            await createJob(formData);
            toast.success('Job Added.');
            getJobs();
            setStatus({ success: true });
            resetForm();
            setJobRole({});
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.success('ERROR: Cannot add job.');
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
                  <InputLabel htmlFor="jobRole">Job Role</InputLabel>
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
              {jobRole &&
                jobRole.compentencies?.map((skill, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Grid container>
                      <Grid xs={10.5} sx={{ mr: 1 }}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="duration">
                            Compentency
                          </InputLabel>
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
                              handleCutOffChange(parseInt(e.target.value), idx)
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
                    Create
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

export default JobsMaster;
