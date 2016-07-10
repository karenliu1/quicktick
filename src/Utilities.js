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
  const hours = duration.hours();
  const minutes = duration.minutes();
  const days = duration.days();

  let total = '';
  if (days > 0) { total = `${days}d`; }
  if (hours > 0) { total = `${total} ${hours}hr`; }
  total = `${total} ${minutes}m`;
  return total.trim();
}

export function formatRange(startTime, endTime) {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}
