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

import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag } from 'antd';
import { createJobRole, getAllJobsRoles } from 'services/Master/JobRoles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/admin.css';
import { toast } from 'react-toastify';
import { getAllCapabilites } from 'services/Master/Capabilities';

const JobRoleMaster = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [bestPractices, setBestPractices] = useState('');

  const get = async () => {
    const roles = await getAllJobsRoles();
    if (roles) {
      setJobRoles(roles.data);
    }
  };
  const getCapabilities = async () => {
    const cbs = await getAllCapabilites();
    if (cbs) {
      setCapabilities(cbs.data);
    }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Compentencies',
      dataIndex: 'compentencies',
      key: 'compentencies',
      render: (_, { compentencies }) => (
        <>
          {compentencies.map((capability) => {
            return (
              <Tag color={'geekblue'} key={capability}>
                {capability.title.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, data) => (
    //     <Box display="flex" alignItems="center" justifyContent="start">
    //       <span
    //         style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
    //         onClick={async () => {
    //           await deleteJobRole(data._id);
    //           toast.success('Job role deleted.');
    //           get();
    //         }}
    //       >
    //         <DeleteOutlined />
    //       </span>
    //     </Box>
    //   ),
    // },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, data) => (
    //     <Box display="flex" alignItems="center" justifyContent="start">
    //       <span
    //         style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
    //         onClick={async () => {
    //           await deleteJobRole(data._id);
    //           toast.success('Job role deleted.');
    //           get();
    //         }}
    //       >
    //         <DeleteOutlined />
    //       </span>
    //     </Box>
    //   ),
    // },
  ];

  React.useEffect(() => {
    get();
    getCapabilities();
  }, []);

  console.log(bestPractices);
  return (
    <div>
      <Typography variant="h1">Job Roles</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={jobRoles} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          title: '',
          compentency: '',
          capabilities: [],
          description: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Title is required'),
          compentency: Yup.string().required('Skills are required'),
          description: Yup.string().required('Description is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await createJobRole({ ...values, bestPractices });
            get();
            toast.success('Job Role Added!');
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            toast.error('ERROR: Cannot add Job Role.');
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
                  <InputLabel htmlFor="title">Job Role Title</InputLabel>
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="compentency">Compentency</InputLabel>
                  <OutlinedInput
                    id="compentency"
                    type="text"
                    value={values.compentency}
                    name="compentency"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter compentency."
                    fullWidth
                    error={Boolean(touched.compentency && errors.compentency)}
                  />
                  {touched.compentency && errors.compentency && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-compentency"
                    >
                      {errors.compentency}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">
                    Compentency Description
                  </InputLabel>
                  <OutlinedInput
                    id="description"
                    type="text"
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter description."
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
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
                <Stack spacing={1}>
                  <InputLabel htmlFor="bestPractices">
                    Best Practices
                  </InputLabel>
                  <ReactQuill
                    theme={'snow'}
                    value={bestPractices}
                    onChange={setBestPractices}
                    style={{ height: '200px' }}
                    id="bestPractices"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 6 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="capabilities">
                    Select Capabilities
                  </InputLabel>
                  <Autocomplete
                    multiple
                    id="capabilities"
                    options={capabilities}
                    getOptionLabel={(option) => option.name}
                    value={values.jobRole}
                    onChange={(event, newValue) => {
                      setFieldValue('capabilities', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          touched.capabilities && Boolean(errors.capabilities)
                        }
                        helperText={touched.capabilities && errors.capabilities}
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

export default JobRoleMaster;
