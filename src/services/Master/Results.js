import { appAxios } from 'services/axiosConfig';

export const getAllResults = async (page = 1, limit = 10, jobRole = '') => {
  try {
    const response = await appAxios.get('/assessment/all-scores', {
      params: {
        page,
        limit,
        jobRole, // Pass the jobRole parameter
      },
    });
    return response;
  } catch (error) {
    console.log('Error getting all results.', error);
  }
};

export const getAllCandidateWithScore = async (assesmentId) => {
  try {
    const response = await appAxios.get('/assessment/all-candidate-with-score',{
      params: {
        assesmentId: assesmentId
      }
    });
    return response;
  } catch (error) {
    console.log('Error getting all results.', error);
  }
};

export const deleteResult = async (id) => {
  try {
    const response = await appAxios.delete(`/assessment/scores/${id}`);
    return response;
  } catch (error) {
    console.log('Error del result.', error);
  }
};


export const getAllScreenshots = async (resultId) => {
  try {
    const response = await appAxios.get(`/assessment/${resultId}/get-all-screenshot`);
    return response;
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw error;
  }
};