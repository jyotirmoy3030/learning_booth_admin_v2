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
import { Link } from 'react-router-dom';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
} from 'services/Master/Course';
import { toast } from 'react-toastify';

const { TextArea } = Input;
const CoursesMaster = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [markedSkills, setMarkedSkills] = useState([]);
  const [jobRole, setJobRole] = useState({});
  const getJobRoles = async () => {
    const roles = await getAllJobroles();
    if (roles) {
      setJobRoles(roles.data);
    }
  };
  const getCourses = async () => {
    const js = await getAllCourses();
    if (js) {
      setCourses(js.data);
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
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <Link
            to={`/dashboard/courses/${data._id}/edit`}
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
              await deleteCourse(data._id);
              toast.success('Course deleted.');
              getCourses();
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
    getCourses();
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
      <Typography variant="h1">Courses</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={courses} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          title: '',
          description: '',
          duration: '',
          thumbnail: null,
          courseLink: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Title is required'),
          courseLink: Yup.string().max(255).required('Course Link is required'),
          description: Yup.string()
            .min(10, 'Job details should be minimum 50 character.')
            .required('Job detail is required'),
          duration: Yup.string().required('Qualitification are required'),
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
            await createCourse(formData);
            getCourses();
            setStatus({ success: true });
            toast.success('Course added.');
            resetForm();
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            toast.error('ERROR: Cannot add course.');
            setErrors({ submit: err.message });
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
                  <InputLabel htmlFor="title">Course Title</InputLabel>
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
                  <InputLabel htmlFor="duration">Course Duraion</InputLabel>
                  <OutlinedInput
                    id="duration"
                    type="text"
                    value={values.duration}
                    name="duration"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter required duration."
                    fullWidth
                    error={Boolean(touched.duration && errors.duration)}
                  />
                  {touched.duration && errors.duration && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-duration"
                    >
                      {errors.duration}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="courseLink">Course Link</InputLabel>
                  <OutlinedInput
                    id="courseLink"
                    type="text"
                    value={values.courseLink}
                    name="courseLink"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter course link."
                    fullWidth
                    error={Boolean(touched.courseLink && errors.courseLink)}
                  />
                  {touched.courseLink && errors.courseLink && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-courseLink"
                    >
                      {errors.courseLink}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={6}>
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
                      <TextField
                        {...params}
                        error={touched.jobRole && Boolean(errors.jobRole)}
                        helperText={touched.jobRole && errors.jobRole}
                      />
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="thumbnail">Thumbnail</InputLabel>
                  <InputLabel
                    htmlFor="thumbnail"
                    sx={{
                      fontSize: '18px',
                      borderRadius: '2px',
                      padding: '7px 10px',
                      border: '1px solid #d9d9d9',
                    }}
                  >
                    {values.thumbnail ? (
                      <FileDoneOutlined style={{ color: 'green' }} />
                    ) : (
                      <UploadOutlined />
                    )}
                  </InputLabel>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    onChange={(event) => {
                      setFieldValue('thumbnail', event.currentTarget.files[0]);
                    }}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Job Description</InputLabel>
                  <TextArea
                    rows={4}
                    placeholder="Enter job description"
                    maxLength={500}
                    id="description"
                    name="description"
                    onChange={handleChange}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-description"
                    >
                      {errors.description}
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

export default CoursesMaster;
