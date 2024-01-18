import { appAxios } from 'services/axiosConfig';

export const getAllCapabilites = async () => {
  try {
    const response = await appAxios.get('/capability');
    return response;
  } catch (error) {
    console.log('Error getting all capability', error);
  }
};

export const createCapability = async (data) => {
  try {
    const response = await appAxios.post('/capability', data);
    return response;
  } catch (error) {
    console.log('Error creating capability.', error);
  }
};

export const deleteCapability = async (id) => {
  try {
    const response = await appAxios.delete(`/capability/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting capability.', error);
  }
};
