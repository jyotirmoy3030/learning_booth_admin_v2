import { appAxios } from 'services/axiosConfig';

export const getAllDemos = async () => {
  try {
    const response = await appAxios.get('demos');
    return response;
  } catch (error) {
    console.log('Error getting all demos.', error);
  }
};
