import moment from 'moment';

export function formatTime(time) {
  return moment(time).format('h:mm a');
}

export function formatDate(time) {
  return moment(time).format('MMM D');
}

export function formatTotal(startTime, endTime) {
  const elapsedMs = moment(endTime).diff(moment(startTime));
  const duration = moment.duration(elapsedMs);
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${hours}hr ${minutes}m`;
}

export function formatRange(startTime, endTime) {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}
