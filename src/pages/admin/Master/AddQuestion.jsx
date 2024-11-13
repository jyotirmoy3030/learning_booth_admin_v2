import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/admin.css';
import {
  addQuestionToTest,
  changeTestDuration,
  changeTestThumbnail,
  deleteQuestion,
  getAllTestQuestions,
  getTestById,
} from 'services/Master/Tests';
import { toast } from 'react-toastify';
import { TimePicker } from 'antd';
import { appAxios } from 'services/axiosConfig';

const AddQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [compentency, setCompentency] = useState({});
  const [test, setTest] = useState({});
  const { id } = useParams();
  const getAllQuestions = async () => {
    const js = await getAllTestQuestions(id);
    if (js) {
      setQuestions(js.data);
    }
  };
  const getTest = async () => {
    const js = await getTestById(id);
    if (js) {
      setTest(js.data);
    }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Box display="flex" alignItems="center" justifyContent="start">
          <Link
            to={`/dashboard/tests/${id}/questions/${data?._id}/edit`}
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
              await deleteQuestion(data._id);
              toast.success('Question deleted.');
              getAllQuestions();
            }}
          >
            <DeleteOutlined />
          </span>
        </Box>
      ),
    },
  ];

  React.useEffect(() => {
    getAllQuestions();
    getTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const changeThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    await changeTestThumbnail(test?._id, formData).then(() => {
      getTest();
      toast.success('Thumbnail updated!');
    });
  };

  const changeDuration = async (duration) => {
    await changeTestDuration(test?._id, { duration }).then(() => {
      getTest();
      toast.success('Duration updated!');
    });
  };

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    try {
      const response = await appAxios.post(`/assessment/${id}`, formData);
      toast.success('Excel file uploaded and processed successfully.');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error('Error uploading and processing Excel file.');
    }
  };

  return (
    <div>
      <Typography variant="h1">
        Manage Assessment - {test.title?.slice(0, 12)}...
      </Typography>
      <Typography variant="h4" sx={{ my: 2 }}>
        All Questions
      </Typography>

      <div>
        <label
          htmlFor="thumbnail"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src={test?.thumbnail}
            alt="test_thumb"
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
          <span>Click to upload new thumbnail.</span>
        </label>
      </div>
      <input
        type="file"
        name=""
        id="thumbnail"
        style={{ display: 'none' }}
        onChange={(e) => changeThumbnail(e.target.files[0])}
      />
      <Grid item xs={6} sx={{ my: 4 }}>
        <Stack spacing={1}>
          <InputLabel htmlFor="duration">Change Assessment Duraion</InputLabel>
          <TimePicker
            onChange={(e) => {
              changeDuration(`${e.$H}:${e.$m}:${e.$s}`);
            }}
            id="duration"
            name="duration"
          />
        </Stack>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Table dataSource={questions} columns={columns} />
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ my: 2 }}>
        Upload Excel File
      </Typography>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => {
          // console.log('Dropzone rendering...');
          return (
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #e0e0e0',
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop an Excel file here, or click to select one</p>
            </div>
          );
        }}
      </Dropzone>

      <Typography variant="h4" sx={{ my: 2 }}>
        Create Question
      </Typography>
      <Formik
        initialValues={{
          title: '',
          skill: '',
          answers: [
            {
              title: '',
              weight: 0,
            },
            {
              title: '',
              weight: 0,
            },
            {
              title: '',
              weight: 0,
            },
            {
              title: '',
              weight: 0,
            },
          ],
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .min(10, 'Title should be minimum 10 character.')
            .max(500)
            .required('Title is required'),
          answers: Yup.array().min(2, 'Must provide two answers.'),
          compentencyType: Yup.string().required('Type is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await addQuestionToTest(id, { ...values, compentency });
            getAllQuestions();
            setStatus({ success: true });
            toast.success('Question added.');
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.error('ERROR: Cannot add question.');
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
                  <InputLabel htmlFor="title">Question Title</InputLabel>
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
                  <InputLabel htmlFor="compentencyType">Type</InputLabel>
                  <select
                    id="compentencyType"
                    name="compentencyType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.compentencyType}
                    className="MuiInputBase-input MuiOutlinedInput-input"
                  >
                    <option value="" label="Select Type" />
                    <option value="functional" label="Functional" />
                    <option value="behavioral" label="Behavioral" />
                    <option value="cultural" label="Cultural" />
                  </select>
                  {touched.compentencyType && errors.compentencyType && (
                    <FormHelperText error id="standard-weight-helper-text-compentencyType">
                      {errors.compentencyType}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="compentency">Compentency</InputLabel>
                  <Select
                    labelId="compentency"
                    id="compentency"
                    value={compentency}
                    onChange={(e) => setCompentency(e.target.value)}
                    name="compentency"
                  >
                    {test?.jobRole?.compentencies?.map((s, idx) => {
                      return (
                        <MenuItem value={s} key={idx}>
                          {s.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </Grid>
              {compentency?.capabilities && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="skill">Capability</InputLabel>
                    <Select
                      labelId="skill"
                      id="skill"
                      value={values.skill}
                      onChange={handleChange}
                      name="skill"
                    >
                      {compentency?.capabilities?.map((s, idx) => {
                        return (
                          <MenuItem value={s.name} key={idx}>
                            {s.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Stack>
                </Grid>
              )}
              {values.answers.map((_, idx) => (
                <Grid item xs={12} key={idx}>
                  <Grid container>
                    <Grid xs={10.5} sx={{ mr: 1 }}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="duration">Answer Title</InputLabel>
                        <OutlinedInput
                          type="text"
                          value={values.answers[idx].title}
                          onChange={(e) => {
                            const answersCopy = [...values.answers];
                            answersCopy[idx].title = e.target.value;
                            setFieldValue('answers', answersCopy);
                          }}
                          placeholder="Enter answer text."
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid xs={1}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="duration">Weight</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={values.answers[idx].weight}
                          onChange={(e) => {
                            const answersCopy = [...values.answers];
                            answersCopy[idx].weight = e.target.value;
                            setFieldValue('answers', answersCopy);
                          }}
                          placeholder="Weight"
                          fullWidth
                          sx={{ borderRadius: 9999 }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
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

export default AddQuestion;
