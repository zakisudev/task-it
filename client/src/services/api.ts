import axios from 'axios';
import TASKS_URL from '../constants';

export const getTasks = async () => {
  try {
    const res = await axios.get(TASKS_URL);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async (task: any) => {
  try {
    const res = await axios.post(TASKS_URL, task);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const updateTask = async (task: any) => {
  try {
    const res = await axios.put(`${TASKS_URL}/${task.id}`, task);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${TASKS_URL}/${id}`);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
