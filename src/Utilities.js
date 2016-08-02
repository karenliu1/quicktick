import moment from 'moment';

export function formatTime(time) {
  return moment(time).format('h:mm a');
}

export function formatDate(time) {
  return moment(time).format('MMM D');
}

export function formatDateTime(time) {
  return moment(time).format('MMMM D, h:mm a');
}

export function formatTotal(startTime, endTime) {
  const elapsedMs = moment(endTime).diff(moment(startTime));
  const duration = moment.duration(elapsedMs);
  return formatTotalFromDuration(duration);
}

export function formatTotalFromDuration(duration) {
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  let total = `${minutes}m`;
  if (hours > 0) { total = `${hours}hr ${total}`; }
  return total;
}

export function formatRange(startTime, endTime) {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}
