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
  TextField,
  Autocomplete,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import '../styles/admin.css';
import { TimePicker } from 'antd';
import { createTest, deleteTest, getAllTestsApi } from 'services/Master/Tests';
import { secondsToHms } from 'utils/time';
import { getAllJobsRoles } from 'services/Master/JobRoles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const CreateTest = () => {
  const [tests, setTests] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [overview, setOverview] = useState('');
  const getJobRoles = async () => {
    const roles = await getAllJobsRoles();
    if (roles) {
      setJobRoles(roles.data);
    }
  };
  const getAllTests = async () => {
    const js = await getAllTestsApi();
    if (js) {
      setTests(js.data);
    }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, data) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={data.thumbnail}
            alt=""
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '4px',
            }}
          />
          <span> {data.title}</span>
        </div>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, { duration }) => <>{secondsToHms(duration)}</>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <Link
            to={`/dashboard/tests/${data._id}/questions`}
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
              await deleteTest(data._id);
              toast.success('Assessment deleted.');
              getAllTests();
            }}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    getAllTests();
    getJobRoles();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h1">Assessments</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={tests} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          title: '',
          duration: '',
          thumbnail: null,
          jobRole: null,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Title is required'),
          duration: Yup.string().required('Duration are required'),
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
              }
            });
            formData.append('jobRole', JSON.stringify(values.jobRole));
            formData.append('duration', values.duration);
            formData.append('title', values.title);
            formData.append('overview', overview);
            const response = await createTest(formData);
            getAllTests();
            navigate(`/dashboard/tests/${response.data._id}/questions`);
            resetForm();
            toast.success('Assessment created.');
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.error('ERROR: Assessment cannot be created.');
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
                  <InputLabel htmlFor="title"> Assessment Title</InputLabel>
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
                  <InputLabel htmlFor="duration">Assessment Duraion</InputLabel>
                  <TimePicker
                    onChange={(e) => {
                      console.log(e);
                      setFieldValue('duration', `${e.$H}:${e.$m}:${e.$s}`);
                    }}
                    id="duration"
                    name="duration"
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
                  <InputLabel htmlFor="overview">Overview</InputLabel>
                  <ReactQuill
                    theme={'snow'}
                    value={overview}
                    onChange={setOverview}
                    style={{ height: '200px' }}
                    id="overview"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="jobRole">Job Role</InputLabel>

                  <Autocomplete
                    id="jobRole"
                    options={jobRoles}
                    getOptionLabel={(option) => option.title}
                    value={values.jobRole}
                    onChange={(event, newValue) => {
                      setFieldValue('jobRole', newValue);
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

export default CreateTest;
