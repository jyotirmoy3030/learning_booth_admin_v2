import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createCompetency, deleteCompetency, getAllCompetencies, updateCompetency } from 'services/Master/Competencies';
import { getAllCapabilites } from 'services/Master/Capabilities';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete

const CompetencyMaster = () => {
  const [competencies, setCompetencies] = useState([]);
  const [capabilities, setCapabilities] = useState([]); // State for capabilities
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState({ field: 'name', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCompetency, setCurrentCompetency] = useState(null);

  const fetchCompetencies = async () => {
    setLoading(true);
    try {
      const response = await getAllCompetencies({
        page: pagination.current,
        limit: pagination.pageSize,
        searchTerm,
        sortField: sorter.field,
        sortOrder: sorter.order,
      });
      setCompetencies(response.competencies);
      setPagination({
        current: response.pagination.page,
        pageSize: response.pagination.limit,
        total: response.pagination.total,
      });
    } catch (error) {
      toast.error(error.message || 'Failed to load competencies.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCapabilities = async () => {
    try {
      const response = await getAllCapabilites(); // Fetch capabilities
      setCapabilities(response.capabilities);
    } catch (error) {
      toast.error(error.message || 'Failed to load capabilities.');
    }
  };

  useEffect(() => {
    fetchCompetencies();
    fetchCapabilities(); // Fetch capabilities on component mount
  }, [pagination.current, pagination.pageSize, searchTerm, sorter]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
    setSorter({
      field: sorter.field,
      order: sorter.order === 'ascend' ? 'asc' : 'desc',
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompetency(id);
      toast.success('Competency deleted.');
      fetchCompetencies();
    } catch (error) {
      toast.error(error.message || 'Failed to delete competency.');
    }
  };

  const handleEdit = (competency) => {
    setCurrentCompetency(competency);
    setEditMode(true);
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    try {
      if (editMode) {
        await updateCompetency(currentCompetency._id, values);
        toast.success('Competency updated!');
      } else {
        await createCompetency(values);
        toast.success('Competency added!');
      }
      fetchCompetencies(); // Refresh competencies list
      setStatus({ success: true });
      resetForm(); // Reset form after successful submission
      setEditMode(false);
      setCurrentCompetency(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set form errors based on server response
      } else {
        setStatus({ success: false });
        toast.error(err.message || 'ERROR: Cannot process competency.');
        setErrors({ submit: err.message }); // Set global error message
      }
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => <>{desc?.slice(0, 15)}...</>,
    },
    {
        title: 'capabilities',
        dataIndex: 'capabilities',
        key: 'capabilities',
        render: (_, { capabilities }) => (
            <>
            {capabilities.map((capability) => {
                return (
                <Tag color={'geekblue'} key={capability}>
                    {capability?.name?.toUpperCase()}
                </Tag>
                );
            })}
            </>
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center">
          <span
            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
            onClick={() => handleEdit(data)}
          >
            <EditOutlined />
          </span>
          <span
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(data._id)}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h1">Competencies</Typography>
      <Typography variant="h4" sx={{ my: 2 }}>Manage</Typography>

      <TextField
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearch}
        onKeyPress={handleSearchSubmit}
        style={{ marginBottom: '20px', width: '300px' }}
      />

      <Table
        dataSource={competencies}
        columns={columns}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onShowSizeChange: (current, size) => {
            setPagination({ ...pagination, pageSize: size, current: 1 }); // Reset to first page
          },
          onChange: (page) => {
            setPagination({ ...pagination, current: page });
          },
        }}
        onChange={handleTableChange}
      />

      <Typography variant="h4" sx={{ my: 2 }}>
        {editMode ? 'Edit Competency' : 'Create Competency'}
      </Typography>

      <Formik
        initialValues={{
          name: editMode ? currentCompetency.name : '',
          description: editMode ? currentCompetency.description : '',
          capabilities: editMode ? currentCompetency.capabilities : [], // Initialize capabilities
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          description: Yup.string().required('Description is required'),
          capabilities: Yup.array().required('At least one capability is required'), // Validation for capabilities
        })}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Competency Name</InputLabel>
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
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Competency Description</InputLabel>
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
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="capabilities">Select Capabilities</InputLabel>
                  <Autocomplete
                    multiple
                    id="capabilities"
                    options={capabilities}
                    getOptionLabel={(option) => option.name}
                    value={values.capabilities}
                    onChange={(event, newValue) => {
                      setFieldValue('capabilities', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select capabilities"
                        error={Boolean(touched.capabilities && errors.capabilities)}
                        helperText={touched.capabilities && errors.capabilities}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
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
                    {editMode ? 'Update Competency' : 'Create Competency'}
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

export default CompetencyMaster;
