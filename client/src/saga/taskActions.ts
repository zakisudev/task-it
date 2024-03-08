import TaskActionTypes from './taskTypes';

export interface UpdateTaskProps {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export const fetchTasks = (): { type: string } => {
  return {
    type: 'GET_TASKS',
  };
};

export const setTasks = (tasks: []) => {
  return {
    type: TaskActionTypes.SET_TASKS,
    payload: tasks,
  };
};

export const addTask = (task: any) => {
  return {
    type: TaskActionTypes.CREATE_TASK,
    payload: task,
  };
};

export const updateTask = (task: UpdateTaskProps) => {
  return {
    type: TaskActionTypes.UPDATE_TASK,
    payload: task,
  };
};

export const deleteTask = (id: string) => {
  return {
    type: TaskActionTypes.DELETE_TASK,
    payload: id,
  };
};
