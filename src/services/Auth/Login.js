import { appAxios } from 'services/axiosConfig';

export const adminLogin = async (data) => {
  try {
    const response = appAxios.post('/auth/admin', data);
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
  }
};
