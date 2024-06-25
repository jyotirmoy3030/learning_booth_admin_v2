import React, { useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import '../styles/admin.css';
import { getUserById, updateUser } from 'services/Master/Users';
import { toast } from 'react-toastify';

const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    const getUser = async () => {
      const js = await getUserById(id);
      if (js) {
        setUser(js.data);
      }
    };
    getUser();
  }, [id]);
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h1">Edit User</Typography>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: '',
          permissions: user.permissions || [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('name is required'),
          email: Yup.string()
            .email('Email shoudl be valid')
            .required('email are required'),
          phoneNumber: Yup.string().required('phoneNumber are required'),
          password: Yup.string(),
          permissions: Yup.array().required('Select at least one permission'),
        })}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await updateUser(id, values);
            navigate('/dashboard/users');
            setStatus({ success: true });
            toast.success('User edited!');
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.error('ERROR: Cannot edit user.');
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
                  <InputLabel htmlFor="name">Name</InputLabel>
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
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email."
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                  <OutlinedInput
                    id="phoneNumber"
                    type="phoneNumber"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter phone."
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-phoneNumber"
                    >
                      {errors.phoneNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type="text"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter new password."
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Permissions</InputLabel>
                  <div>
                    {['Assessments', 'Courses', 'Jobs'].map((permission) => (
                      <div key={permission}>
                        <input
                          type="checkbox"
                          id={`permission-${permission}`}
                          name="permissions"
                          value={permission}
                          onChange={() => {
                            const updatedPermissions = values.permissions.includes(permission)
                              ? values.permissions.filter((p) => p !== permission)
                              : [...values.permissions, permission];
                            setFieldValue('permissions', updatedPermissions);
                          }}
                          checked={values.permissions.includes(permission)}
                        />
                        <label htmlFor={`permission-${permission}`}>{permission}</label>
                      </div>
                    ))}
                  </div>
                  {touched.permissions && errors.permissions && (
                    <FormHelperText error id="standard-weight-helper-text-permissions">
                      {errors.permissions}
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

export default EditUser;
