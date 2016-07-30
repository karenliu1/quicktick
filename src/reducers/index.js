import { combineReducers } from 'redux';
import sessions from './sessions';
import editingSession from './editingSession';

export default combineReducers({
  sessions,
  editingSession,
})
