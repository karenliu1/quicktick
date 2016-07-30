import { combineReducers } from 'redux';
import sessions from './sessions';
import editingSession from './editingSession';
import currentSession from './currentSession';

export default combineReducers({
  sessions,
  editingSession,
  currentSession,
})
