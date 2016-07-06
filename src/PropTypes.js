import { PropTypes } from 'react';

export const SessionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  notes: PropTypes.string,
});
