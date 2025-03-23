import { appAxios } from 'services/axiosConfig';

// API endpoint constants
const API_ENDPOINT = '/competency'; // Adjust the endpoint as needed

// Fetch all competencies with pagination and search functionality
export const getAllCompetencies = async ({
  page = 1,
  limit = 10,
  searchTerm = '',
  sortField = '',
  sortOrder = '',
} = {}) => {
  try {
    const response = await appAxios.get('/capability');
    return response;
  } catch (error) {
    console.log('Error getting all capability', error);
  }
};

// Create a new competency
export const createCompetency = async (data) => {
  try {
    const response = await appAxios.post(API_ENDPOINT, data);
    return response.data;
  } catch (error) {
    console.error('Error creating competency:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to create competency. Please try again.';
    throw new Error(errorMessage);
  }
};

// Update an existing competency
export const updateCompetency = async (id, data) => {
  try {
    const response = await appAxios.put(`${API_ENDPOINT}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating competency:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to update competency. Please try again.';
    throw new Error(errorMessage);
  }
};

// Delete a competency by ID
export const deleteCompetency = async (id) => {
  try {
    const response = await appAxios.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting competency:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to delete competency. Please try again.';
    throw new Error(errorMessage);
  }
};
