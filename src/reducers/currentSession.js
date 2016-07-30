const INITIAL_STATE = {
  startTime: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CLOCK_IN':
      return {
        ...state,
        startTime: action.now,
      };
    case 'CLOCK_OUT':
      return {
        ...state,
        startTime: null,
      };
    default:
      return state;
  }
}
