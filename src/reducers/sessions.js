function sortCallback(s1, s2) {
  return s2.startTime - s1.startTime; // Sort descending time
}

export default function(state = [], action) {
  switch (action.type) {
    case 'SESSIONS_LOAD':
      return action.sessions;
    case 'SESSION_CREATE':
      return [
        ...state,
        action.session
      ].sort(sortCallback);
    case 'SESSION_EDIT': {
      const sessionIndex = state.findIndex((s) => s.id === action.session.id);
      if (sessionIndex < 0) { return state; }
      return [
        ...state.slice(0, sessionIndex),
        action.session,
        ...state.slice(sessionIndex + 1)
      ];
    }
    case 'SESSION_DELETE': {
      const sessionIndex = state.findIndex((s) => s.id === action.session.id);
      if (sessionIndex < 0) { return state; }
      return [
          ...state.slice(0, sessionIndex),
          ...state.slice(sessionIndex + 1)
      ];
    }
    default:
      return state;
  }
}
