import { createSlice } from '@reduxjs/toolkit';

interface TasksState {
  tasks: {}[];
  loading: boolean;
  error: null | string;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.tasks = action.payload;
    },

    createTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },

    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task: any) =>
        task._id === action.payload._id ? action.payload : task
      );
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task: any) => task._id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTask,
  createTask,
  updateTask,
  deleteTask,
  setLoading,
  setError,
  clearError,
} = taskSlice.actions;

export default taskSlice.reducer;
