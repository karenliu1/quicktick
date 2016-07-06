import { PropTypes } from 'react';

export const SessionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  notes: PropTypes.string,
});
