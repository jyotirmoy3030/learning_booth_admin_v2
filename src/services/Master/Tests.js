import { appAxios } from 'services/axiosConfig';

export const createTest = async (data) => {
  try {
    const response = await appAxios.post(`/assessment`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const getAllTestsApi = async (data) => {
  try {
    const response = await appAxios.get(`/assessment`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const addQuestionToTest = async (id, data) => {
  try {
    const response = await appAxios.post(`/assessment/${id}/question`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const getQuestionById = async (id) => {
  try {
    const response = await appAxios.get(`/assessment/question/${id}`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const getAllTestQuestions = async (id) => {
  try {
    const response = await appAxios.get(`/assessment/${id}/questions`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const updateQuestion = async (id, data) => {
  try {
    const response = await appAxios.patch(`/assessment/question/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const deleteTest = async (id) => {
  try {
    const response = await appAxios.delete(`/assessment/${id}`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const deleteQuestion = async (id) => {
  try {
    const response = await appAxios.delete(`/assessment/question/${id}`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const deleteAnswer = async (id) => {
  try {
    const response = await appAxios.delete(`/assessment/answer/${id}`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const getTestById = async (id) => {
  try {
    const response = await appAxios.get(`/assessment/${id}`);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const changeTestThumbnail = async (id, data) => {
  try {
    const response = await appAxios.patch(`/assessment/${id}/thumbnail`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const changeTestDuration = async (id, data) => {
  try {
    const response = await appAxios.patch(`/assessment/${id}/duration`, data);
    return response;
  } catch (error) {
    console.log('Error creating test.', error);
  }
};
export const uploadExcelFile = async(id,data) => {
  try{
    // console.log('received id is',id)
    // console.log(data);
    const response = await appAxios.post(`/assessment/${id}`,data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },});
    console.log(response);
    return response;
  } catch (error) {
    console.log('Error adding file', error);
    throw error;
  }
}
