import { appAxios } from 'services/axiosConfig';

export const getAllResults = async () => {
  try {
    const response = await appAxios.get('/assessment/all-scores');
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
