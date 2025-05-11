import { appAxios } from 'services/axiosConfig';

// API endpoint constants
const API_ENDPOINT = '/job-role'; // Adjust the endpoint as needed

// Fetch all job roles with pagination and search functionality
export const getAllJobroles = async ({
  page = 1,
  limit = 10,
  searchTerm = '',
  sortField = '',
  sortOrder = '',
} = {}) => {
  try {
    const response = await appAxios.get('/job/job-role');
    return response;
  } catch (error) {
    console.log('Error getting all job roles.', error);
  }
};

// Create a new job role
export const createJobrole = async (data) => {
  try {
    const response = await appAxios.post('/job/job-role', data);
    return response.data;
  } catch (error) {
    console.error('Error creating job role:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to create job role. Please try again.';
    throw new Error(errorMessage);
  }
};

// Update an existing job role
export const updateJobrole = async (id, data) => {
  try {
    const response = await appAxios.put(`/job/job-role/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating job role:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to update job role. Please try again.';
    throw new Error(errorMessage);
  }
};

// Delete a job role by ID
export const deleteJobrole = async (id) => {
  try {
    const response = await appAxios.delete(`/job/job-role/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job role:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to delete job role. Please try again.';
    throw new Error(errorMessage);
  }
};
