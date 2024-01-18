import { appAxios } from 'services/axiosConfig';

export const createUser = async (data) => {
  try {
    const response = await appAxios.post(`/user`, data);
    return response;
  } catch (error) {
    console.log('Error creating user.', error);
  }
};
export const deleteUserById = async (id) => {
  try {
    const response = await appAxios.delete(`/user/${id}`);
    return response;
  } catch (error) {
    console.log('Error del user.', error);
  }
};
export const getUserById = async (id) => {
  try {
    const response = await appAxios.get(`/user/${id}`);
    return response;
  } catch (error) {
    console.log('Error get user.', error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await appAxios.get(`/user`);
    return response;
  } catch (error) {
    console.log('Error getting users.', error);
  }
};
export const updateUser = async (id, data) => {
  try {
    const response = await appAxios.patch(`/user/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error update users.', error);
  }
};
