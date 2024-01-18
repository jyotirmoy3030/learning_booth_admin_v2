import React from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createAdmin } from 'services/Master/Admin';

// ... (import statements)

const NewUsers = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add New User
      </Typography>
      <Formik
        initialValues={{
          userDesignation: '',
          name: '',
          phoneNumber: '',
          email: '',
          password: '', // Add password field
          profilePicture: null, // Handle file upload logic for profile picture
          address: '',
          usersAllowed: '',
          permissions: [],
        }}
        validationSchema={Yup.object().shape({
          userDesignation: Yup.string().required('User designation is required'),
          name: Yup.string().required('Name is required'),
          phoneNumber: Yup.string().required('Phone number is required'),
          email: Yup.string().email('Email should be valid').required('Email is required'),
          password: Yup.string().required('Password is required'),
         // profilePicture: Yup.mixed().required('Profile picture is required'),
          address: Yup.string(),
          usersAllowed: Yup.string().required('Number of users allowed is required'),
          permissions: Yup.array().required('Select at least one permission'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const admin = {
              userDesignation: values.userDesignation,
              name: values.name,
              phoneNumber: values.phoneNumber,
              email: values.email,
              password: values.password,
              //profilePicture: values.profilePicture, // Handle file upload logic for profile picture
              address: values.address,
              usersAllowed: values.usersAllowed,
              permissions: values.permissions,
            };
            console.log(admin);
            await createAdmin(admin);
            console.log('marker');
            resetForm();
            setStatus({ success: true });
            toast.success('Admin added.');
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            toast.error('ERROR: Cannot add admin.');
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
                  <InputLabel htmlFor="userDesignation">User Designation</InputLabel>
                  <select
                    id="userDesignation"
                    name="userDesignation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userDesignation}
                    className="MuiInputBase-input MuiOutlinedInput-input"
                  >
                    <option value="" label="Select User Designation" />
                    <option value="organization" label="Organization" />
                    <option value="institution" label="Institution" />
                  </select>
                  {touched.userDesignation && errors.userDesignation && (
                    <FormHelperText error id="standard-weight-helper-text-userDesignation">
                      {errors.userDesignation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
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
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-name"
                    >
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                  <OutlinedInput
                    id="phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter phone number."
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
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password."
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
                  <InputLabel htmlFor="profilePicture">Profile Picture</InputLabel>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={(event) => setFieldValue('profilePicture', event.currentTarget.files[0])}
                    onBlur={handleBlur}
                  />
                  {touched.profilePicture && errors.profilePicture && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-profilePicture"
                    >
                      {errors.profilePicture}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <OutlinedInput
                    id="address"
                    type="text"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Address of the client"
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-address"
                    >
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
                </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="usersAllowed">Number of Users Allowed</InputLabel>
                  <OutlinedInput
                    id="usersAllowed"
                    type="text"
                    value={values.usersAllowed}
                    name="usersAllowed"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter number of users allowed."
                    fullWidth
                    error={Boolean(touched.usersAllowed && errors.usersAllowed)}
                  />
                  {touched.usersAllowed && errors.usersAllowed && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-usersAllowed"
                    >
                      {errors.usersAllowed}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel>Permissions</InputLabel>
                <div>
                  {['Users', 'Job Roles', 'Jobs', 'Courses', 'Assessments','Results'].map((permission) => (
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
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewUsers;

