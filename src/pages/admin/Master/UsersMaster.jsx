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
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import '../styles/admin.css';
import { createUser, deleteUserById, getAllUsers } from 'services/Master/Users';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersMaster = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [activeUser, setActiveUser] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveUser({});
  };
  const getUsers = async () => {
    const js = await getAllUsers();
    const reversedData=js.data.reverse();
    // console.log(reversedData);
    if (js) {
      setUsers(reversedData);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <Link
            to={`/dashboard/users/${data._id}/edit`}
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
              await deleteUserById(data._id);
              toast.success('User deleted.');
              getUsers();
            }}
          >
            <DeleteOutlined />
          </span>
          <span
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              margin: '0px 10px',
            }}
            onClick={() => {
              handleClickOpen();
              setActiveUser(data);
            }}
          >
            <EyeOutlined />
          </span>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseOutlined />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {activeUser?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <img
              src={activeUser.profilePicture}
              alt=""
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                marginRight: '4px',
              }}
            />
            <h1> {activeUser?.name}</h1>
            <p>Created at: {activeUser?.createdAt}</p>
            <p>{activeUser?.email}</p>
          </div>
          <div style={{ width: '600px', display: 'flex', flexWrap: 'wrap' }}>
            {activeUser?.skills?.map((skill, idx) => (
              <Tag color={'geekblue'} key={idx} style={{ margin: '5px' }}>
                {skill}
              </Tag>
            ))}
          </div>
        </div>
      </Dialog>
      <Typography variant="h1">Users</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        Manage
      </Typography>

      <Table dataSource={users} columns={columns} />

      <Typography variant="h4" sx={{ my: 2 }}>
        Create
      </Typography>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('name is required'),
          email: Yup.string()
            .email('Email shoudl be valid')
            .required('email are required'),
          phoneNumber: Yup.string().required('phoneNumber are required'),
          password: Yup.string().required('password are required'),
        })}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
          try {
            await createUser(values);
            resetForm();
            getUsers();
            setStatus({ success: true });
            toast.success('User added.');
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            toast.error('ERROR: Cannot add user.');
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
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type="text"
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

export default UsersMaster;
