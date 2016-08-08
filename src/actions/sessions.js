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

export function createSession(startTime, endTime, tags) {
  return async (dispatch) => {
    try {
      const session = await Storage.createSession(startTime, endTime, tags);
      dispatch({ type: 'SESSION_CREATE', session });
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

export function deleteSession(sessionId) {
  return async (dispatch) => {
    try {
      await Storage.deleteSession(sessionId);
      dispatch({ type: 'SESSION_DELETE', sessionId });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
}
