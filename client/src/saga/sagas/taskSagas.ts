import { takeLatest, put, call } from 'redux-saga/effects';
import TaskActionTypes from '../taskTypes';
import {
  getTasks,
  createTask as CREATE,
  updateTask as UPDATE,
  deleteTask as DELETE,
} from '../../services/api';
import {
  setError,
  setLoading,
  setTask,
  createTask,
  updateTask,
  deleteTask,
} from '../taskSlice';

function* fetchTasksSaga(): any {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const res = yield call(getTasks);
    if (res?.success) yield put(setTask(res.tasks));
    else yield put(setError(res?.message));
    yield put(setLoading(false));
  } catch (error: any) {
    yield put(setError(error?.message));
    yield put(setLoading(false));
  }
}

function* addTask(action: any): any {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const res = yield call(CREATE, action.payload);
    if (res?.success) yield put(createTask(res?.task));
    else yield put(setError(res?.message));
  } catch (error: any) {
    yield put(setError(error?.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* updateTaskSaga(action: any): any {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const res = yield call(UPDATE, action.payload);
    if (res?.success) yield put(updateTask(res.updatedTask));
    else yield put(setError(res.message));
  } catch (error: any) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteTaskSaga(action: any): any {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const res = yield call(DELETE, action.payload);
    if (res?.success) yield put(deleteTask(res.task));
    else yield put(setError(res?.message));
  } catch (error: any) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* taskSagas() {
  yield takeLatest(TaskActionTypes.GET_TASKS, fetchTasksSaga);
  yield takeLatest(TaskActionTypes.CREATE_TASK, addTask);
  yield takeLatest(TaskActionTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(TaskActionTypes.DELETE_TASK, deleteTaskSaga);
}
