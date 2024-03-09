import axios from 'axios';
import TASKS_URL from '../constants';

// Get tasks api call
export const getTasks = async () => {
  try {
    const res = await axios.get(TASKS_URL);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Create task api call
export const createTask = async (task: any) => {
  try {
    const res = await axios.post(TASKS_URL, task);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// Update task api call
export const updateTask = async (task: any) => {
  try {
    const res = await axios.put(`${TASKS_URL}/${task.id}`, task);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// Delete task api call
export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${TASKS_URL}/${id}`);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
