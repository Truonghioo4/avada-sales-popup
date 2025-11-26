import moment from 'moment';

/**
 *
 * @param notificationsData
 * @returns {*&{timestamp: string}}
 */
export function presentDataTimeAgo(notificationsData) {
  return {
    ...notificationsData,
    timestamp: moment(notificationsData.timestamp, 'YYYYMMDD').fromNow()
  };
}
