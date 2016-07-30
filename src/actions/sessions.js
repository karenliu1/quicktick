import Storage from '../Storage';

export function loadSessions() {
  return async (dispatch) => {
    try {
      const sessions = await Storage.getSessions();
      dispatch({ type: 'SESSIONS_LOAD', sessions });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
}

// The existing session is identified by ID. All other fields subject to change.
export function editSession(session) {
  return async (dispatch) => {
    try {
      await Storage.editSession(session);
      dispatch({ type: 'SESSION_EDIT', session });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
}

export function deleteSession(session) {
  return async (dispatch) => {
    try {
      await Storage.deleteSession(session);
      dispatch({ type: 'SESSION_DELETE', session });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
}
