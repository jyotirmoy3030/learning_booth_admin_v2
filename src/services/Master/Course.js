import { appAxios } from 'services/axiosConfig';

export const getAllCourses = async () => {
  try {
    const response = await appAxios.get('/course');
    return response;
  } catch (error) {
    console.log('Error getting all Course.', error);
  }
};

export const createCourse = async (data) => {
  try {
    const response = await appAxios.post('/course', data);
    return response;
  } catch (error) {
    console.log('Error creating course.', error);
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await appAxios.delete(`/course/${id}`);
    return response;
  } catch (error) {
    console.log('Error deleting course.', error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await appAxios.get(`/course/${id}`);
    return response;
  } catch (error) {
    console.log('Error getting course by id.', error);
  }
};

export const updateCourseById = async (id, data) => {
  try {
    const response = await appAxios.put(`/course/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error updating course by id.', error);
  }
};
