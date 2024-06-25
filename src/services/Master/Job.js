import { appAxios } from 'services/axiosConfig';

export const getAllJobs = async () => {
  try {
    const response = await appAxios.get('/job');
    return response;
  } catch (error) {
    console.log('Error getting all jobs.', error);
  }
};

export const getAllJobsApplication = async () => {
  try {
    const response = await appAxios.get('/job/apply-job');
    return response;
  } catch (error) {
    console.log('Error getting all jobs.', error);
  }
};

export const createJob = async (data) => {
  try {
    const response = await appAxios.post('/job', data);
    return response;
  } catch (error) {
    console.log('Error creating job.', error);
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await appAxios.delete(`/job/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting job.', error);
  }
};

export const getJobById = async (id) => {
  try {
    const response = await appAxios.get(`/job/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting job by id.', error);
  }
};

export const updateJobById = async (id, data) => {
  try {
    const response = await appAxios.put(`/job/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error updating job by id.', error);
  }
};
