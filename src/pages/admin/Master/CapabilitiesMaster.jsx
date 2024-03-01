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
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
// EditOutlined,
import { DeleteOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import { toast } from 'react-toastify';
import {
  createCapability,
  deleteCapability,
  getAllCapabilites,
} from 'services/Master/Capabilities';

const CapabilitiesMaster = () => {
  const [capabilities, setCapabilities] = useState([]);
  const get = async () => {
    const roles = await getAllCapabilites();
    if (roles) {
      setCapabilities(roles.data);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => <>{desc?.slice(0, 15)}...</>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <span
            style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
            onClick={async () => {
              await deleteCapability(data._id);
              toast.success('Capability deleted.');
              get();
            }}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    get();
  }, []);
  return (
    <div>
      <Typography variant="h1">Capabilities</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={capabilities} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          description: Yup.string().required('Description is required'),
        })}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
          try {
            await createCapability(values);
            get();
            toast.success('Capability Added!');
            setStatus({ success: true });
            setSubmitting(false);
            resetForm();
          } catch (err) {
            setStatus({ success: false });
            toast.error('ERROR: Cannot add Capability.');
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Capability Name</InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter name."
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">
                    Capability Description
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

export default CapabilitiesMaster;
