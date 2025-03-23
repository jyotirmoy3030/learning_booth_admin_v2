import { appAxios } from 'services/axiosConfig';

// Create a new test
export const getDetails = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/get-details', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const getCompetency = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/get-competency', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const getJobSummary = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/get-job-summary', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const saveAssessment = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/create', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const generateQuestions = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/generate-questions', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const regenerateQuestions = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/regenerate-questions', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};

// Create a new test
export const createQuestions = async (data) => {
  try {
    const response = await appAxios.post('/assessment/ai/create-questions', data);
    return response.data;
  } catch (error) {
    console.error('Error getting details.', error);
    throw new Error('Failed to generate details. Please try again.');
  }
};
