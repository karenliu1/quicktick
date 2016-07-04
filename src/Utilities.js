import moment from 'moment';

export function formatTime(time) {
  return moment(time).format('h:mm a');
}

export function getElapsedDisplay(earlyTime, lateTime) {
  const elapsedMs = moment(lateTime).diff(moment(earlyTime));
  const duration = moment.duration(elapsedMs);
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${hours}hr ${minutes}m`
}
