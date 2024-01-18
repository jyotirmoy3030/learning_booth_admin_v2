import { appAxios } from 'services/axiosConfig';

export const getAllJobsRoles = async () => {
  try {
    const response = await appAxios.get('/job/job-role');
    return response;
  } catch (error) {
    console.log('Error getting all job roles.', error);
  }
};

export const createJobRole = async (data) => {
  try {
    const response = await appAxios.post('/job/job-role', data);
    return response;
  } catch (error) {
    console.log('Error creating job role.', error);
  }
};

export const deleteJobRole = async (id) => {
  try {
    const response = await appAxios.delete(`/job/job-role/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting job role.', error);
  }
};
