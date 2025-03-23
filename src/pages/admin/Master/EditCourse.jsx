import React, { useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
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
import { useParams } from 'react-router-dom';
import { getCourseById, updateCourseById } from 'services/Master/Course';
import { toast } from 'react-toastify';

const { TextArea } = Input;
const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
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
      const j = await getCourseById(id);
      setCourse(j.data);
    })();
  }, [id]);
  React.useEffect(() => {
    getJobRoles();
  }, []);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (course?.criteria) {
      if (Object.keys(course?.criteria).length > 0) {
        setMarkedSkills(
          course?.criteria?.map((skill) => ({
            title: skill?.title,
            leastCutoffPercentage: skill?.leastCutoffPercentage,
          }))
        );
      }
    }
  }, [course?.criteria, jobRole]);
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
  //   setJobRole(course?.jobRole);
  // }, [course?.jobRole]);
  React.useEffect(() => {
    if (Object.keys(jobRole).length > 0) {
      setNewMarkedSkills(
        jobRole?.compentencies?.map((skill) => ({
          title: skill.title,
          leastCutoffPercentage: 0,
        }))
      );
    }
  }, [jobRole]);
  return (
    <div>
      <Typography variant="h1">Edit Course - {course.title}</Typography>
      <Formik
        initialValues={{
          title: course.title,
          description: course.description,
          duration: course.duration,
          thumbnail: course.thumbnail,
          courseLink: course?.courseLink,
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Title is required'),
          description: Yup.string()
            .min(10, 'Job details should be minimum 50 character.')
            .max(500)
            .required('Job detail is required'),
          duration: Yup.string().required('Qualitification are required'),
          courseLink: Yup.string().required('Course link are required'),
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
                Object.keys(jobRole).length > 0 ? jobRole : course?.jobRole
              )
            );
            const response = await updateCourseById(id, formData);
            if ([200, 201].includes(response.status)) {
              navigate('/dashboard/courses');
            }
            toast.success('Course edited!');
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.error('ERROR: Couldnt edit course.');
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
                  <InputLabel htmlFor="jobRole">
                    Job Role ({course?.jobRole?.title})
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
                      <TextField
                        {...params}
                        error={touched.jobRole && Boolean(errors.jobRole)}
                        helperText={touched.jobRole && errors.jobRole}
                      />
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
                    value={values.description}
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

export default EditCourse;
