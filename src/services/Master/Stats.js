import { appAxios } from 'services/axiosConfig';

export const getAllStats = async () => {
  try {
    const response = await appAxios.get('/stats');
    return response;
  } catch (error) {
    console.log('Error getting all results.', error);
  }
};
