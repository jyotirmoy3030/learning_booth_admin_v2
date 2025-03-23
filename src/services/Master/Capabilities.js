import { appAxios } from 'services/axiosConfig';

// API endpoint constants
const API_ENDPOINT = '/capability';

// Fetch all capabilities with pagination and search functionality
export const getAllCapabilites = async ({
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

// Create a new capability
export const createCapability = async (data) => {
  try {
    const response = await appAxios.post('/capability', data);
    return response;
  } catch (error) {
    console.log('Error creating capability.', error);
  }
};

// Update an existing capability
export const updateCapability = async (id, data) => {
  try {
    const response = await appAxios.put(`${API_ENDPOINT}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating capability:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to update capability. Please try again.';
    throw new Error(errorMessage);
  }
};

// Delete a capability by ID
export const deleteCapability = async (id) => {
  try {
    const response = await appAxios.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting capability:', error);
    const errorMessage =
      error.response?.data?.message || 'Failed to delete capability. Please try again.';
    throw new Error(errorMessage);
  }
};
