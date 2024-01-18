import React, { useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import '../styles/admin.css';
import {
  getQuestionById,
  getTestById,
  updateQuestion,
} from 'services/Master/Tests';
import { toast } from 'react-toastify';

const EditQuestion = () => {
  const [question, setQuestion] = useState([]);
  const [test, setTest] = useState({});
  const { testId, questionId } = useParams();
  const getQuestion = async () => {
    const js = await getQuestionById(questionId);
    if (js) {
      setQuestion(js.data);
    }
  };
  const getTest = async () => {
    const js = await getTestById(testId);
    if (js) {
      setTest(js.data);
    }
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    getQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);
  React.useEffect(() => {
    getTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  console.log(question);
  return (
    <div>
      <Typography variant="h1">Edit Question - {question.title}</Typography>

      <Formik
        initialValues={{
          title: question.title,
          skill: question.skill,
          answers: question.answers,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .min(10, 'Title should be minimum 10 character.')
            .max(255)
            .required('Title is required'),
          answers: Yup.array().min(2, 'Must provide two answers.'),
          skill: Yup.string().required('Skill is required.'),
        })}
        enableReinitialize
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await updateQuestion(questionId, values);
            navigate(-1);
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Question edited!');
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            toast.error('ERROR: Couldnt edit question.');
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
              {values.skill && (
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
                      {test?.jobRole?.capabilities?.map((s, idx) => {
                        return (
                          <MenuItem value={s.name} key={idx}>
                            {s.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {touched.skill && errors.skill && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.skill}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              )}
              {values?.answers?.map((_, idx) => (
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
                            console.log(answersCopy);
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
                            answersCopy[idx].weight = parseInt(e.target.value);
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

export default EditQuestion;
