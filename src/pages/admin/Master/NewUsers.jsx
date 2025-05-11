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
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createAdmin } from 'services/Master/Admin';
import briefcase from "../../../assets/images/briefcase.png";
import ai from "../../../assets/images/ai.png";
import plus from "../../../assets/images/plus.png";
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import magnifying from "../../../assets/images/magnifying.png";
import skill from "../../../assets/images/skill.png";
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';
import HeaderTwo from '../../../components/HeaderTwo';

const styles = {
  bottomBg: {
    position: "fixed",
    left: 0,
    bottom: 0, // Sticks to the bottom of the viewport
    width: "100%",
    height: "100vh", // Covers full viewport height
    backgroundSize: "cover", // Ensure it covers entire background
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundImage: `url(${dr15_2})`,
    zIndex: "-50", // Push it far behind everything
  },
  plant: {
    position: "fixed",
    bottom: "0",
    right: "0", // Stays fixed at bottom-right
    width: "20rem",
    height: "auto",
    maxWidth: "100%",
    zIndex: "-40", // Keep it behind content but above background
    pointerEvents: "none", // Prevent accidental clicks
  },

};
// ... (import statements)

const NewUsers = () => {
  return (
    <>
      {/* <div className="bottom-bg" style={styles.bottomBg}></div> */}

      {/* Fixed Plant Image */}
      {/* <img src={magnifying} alt="Bottom Right Image" style={styles.plant} /> */}
      <BackgroundDesign character_image={magnifying} />

      <HeaderTwo />
      <div>
        <Typography variant="h4" sx={{ my: 2 }}>
          Add New Organization
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
            // userDesignation: Yup.string().required('User designation is required'),
            // name: Yup.string().required('Name is required'),
            // phoneNumber: Yup.string().required('Phone number is required'),
            // email: Yup.string().email('Email should be valid').required('Email is required'),
            // password: Yup.string().required('Password is required'),
            // // profilePicture: Yup.mixed().required('Profile picture is required'),
            // address: Yup.string(),
            // usersAllowed: Yup.string().required('Number of users allowed is required'),
            // permissions: Yup.array().required('Select at least one permission'),
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
              // await createAdmin(admin);
              // console.log('marker');
              // resetForm();
              // setStatus({ success: true });
              // toast.success('Admin added.');
              // setSubmitting(false);
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
            <form noValidate onSubmit={handleSubmit} className="mb-[8rem]">
              <div className="relative w-full mb-5">
                {/* Dropdown */}
                <select
                  id="userDesignation"
                  name="userDesignation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userDesignation}
                  className="block w-full appearance-none border border-gray-400 bg-[#e9e9e9] px-4 py-3 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select User Designation</option>
                  <option value="organization">Organization</option>
                  <option value="institution">Institution</option>
                </select>


                {/* Error Message */}
                {touched.userDesignation && errors.userDesignation && (
                  <p className="text-red-500 text-xs mt-1">{errors.userDesignation}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Input with SVG Icon */}
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name."
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* SVG Icon inside input */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.2 0-2.4.3-3.4.8-1 .5-1.8 1.2-2.6 2.1-1.5-1.4-2.8-2.4-4.3-3.2A9.5 9.5 0 011 11m15 8c1.9 0 3.7-.5 5.3-1.5m-10.7 0c-1.6 1-3.4 1.5-5.3 1.5m-3.3-6.8c-1.5-.8-2.8-1.8-4.3-3.2A9.5 9.5 0 011 11m9-9c-1.9 0-3.7.5-5.3 1.5m10.7 0C15.3 2.5 13.4 2 11.5 2"
                    />
                  </svg>
                </div>

                {/* Error Message */}
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative w-full mb-5">
                {/* Input with SVG Icon */}
                <div className="relative">
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter phone number."
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* SVG Phone Icon */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10a6 6 0 0112 0v3a6 6 0 01-12 0v-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 16.5a4.5 4.5 0 00-4.5-4.5h-3a4.5 4.5 0 00-4.5 4.5V18"
                    />
                  </svg>
                </div>

                {/* Error Message */}
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="w-full mb-5">

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* Email SVG Icon */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12l-4 4-4-4m8-4l-4-4-4 4"
                    />
                  </svg>
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="w-full mb-5">

                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter password"
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* Password SVG Icon */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m0-10v6m6 4H6m6-10h.01"
                    />
                  </svg>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="w-full mb-5">
                {/* Label */}
                <label htmlFor="profilePicture" className="block text-gray-700 font-medium mb-1">
                  Profile Picture
                </label>

                {/* File Input with SVG Icon */}
                <div className="relative border border-gray-400 p-3 rounded bg-[#e9e9e9] flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v8m0 0l-4-4m4 4l4-4M8 16h8"
                    />
                  </svg>

                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={(event) => setFieldValue('profilePicture', event.currentTarget.files[0])}
                    onBlur={handleBlur}
                    className="w-full bg-transparent text-gray-700 cursor-pointer focus:outline-none"
                  />
                </div>

                {/* Error Message */}
                {touched.profilePicture && errors.profilePicture && (
                  <p className="text-red-500 text-xs mt-1">{errors.profilePicture}</p>
                )}
              </div>

              <div className="w-full mb-5">

                <div className="relative">
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Address of the client"
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* Address SVG Icon */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2C8.134 2 5 5.134 5 9c0 3.866 7 13 7 13s7-9.134 7-13c0-3.866-3.134-7-7-7zM12 11a2 2 0 110-4 2 2 0 010 4z"
                    />
                  </svg>
                </div>
                {touched.address && errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="w-full mb-5">

                <div className="relative">
                  <input
                    id="usersAllowed"
                    type="text"
                    name="usersAllowed"
                    value={values.usersAllowed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter number of users allowed."
                    className="w-full border border-gray-400 p-3 pl-10 rounded bg-[#e9e9e9] focus:border-blue-500 focus:outline-none"
                  />
                  {/* Users Allowed SVG Icon */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A4 4 0 0112 14a4 4 0 016.879 3.804M12 12a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                </div>
                {touched.usersAllowed && errors.usersAllowed && (
                  <p className="text-red-500 text-xs mt-1">{errors.usersAllowed}</p>
                )}
              </div>

              <div className="w-full mb-5">
                {/* Label */}

                {/* Checkbox Group */}
                <div className="flex flex-wrap gap-3">
                  {['Users', 'Job Roles', 'Jobs', 'Courses', 'Assessments', 'Results'].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
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
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-200"
                      />
                      <label htmlFor={`permission-${permission}`} className="text-gray-700">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Error Message */}
                {touched.permissions && errors.permissions && (
                  <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#263238] text-white px-6 py-3 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 transition'
                    }`}
                >
                  {"Create"}
                </button>
              </div>

            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewUsers;

