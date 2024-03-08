import { all } from 'redux-saga/effects';
import taskSagas from './sagas/taskSagas';

export default function* rootSaga() {
  yield all([taskSagas()]);
}
