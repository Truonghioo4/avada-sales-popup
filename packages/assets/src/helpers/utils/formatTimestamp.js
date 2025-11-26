import moment from 'moment';
export function formatToTimeAgo(timestamp) {
  return moment(timestamp, 'YYYYMMDD').fromNow();
}

export function formatToDate(timestamp) {
  return moment(timestamp).format('MMM Do YY');
}
