import React from 'react';

/**
 * Convert ISO8601 readable time data.
 *
 * @param string timestamp
 *  example input: '2023-11-07T21:00:00-06:00'
 *
 * @return object
 *  {
 *    'API': {
 *      'timezone':      'CST',
 *      'year':          '2023',
 *      'month':         'November',
 *      'date':          '8',
 *      'day_of_week':   'Wednesday',
 *      'military_hour': '03',
 *      'twelve_hour':   '3',
 *      'minute':        '00',
 *      'second':        '00',
 *      'day_night':     'AM'
 *    },
 *    'DEVICE': {
 *      'timezone':      'CST',
 *      'year':          '2023',
 *      'month':         'November',
 *      'date':          '7',
 *      'day_of_week':   'Wednesday',
 *      'military_hour': '21',
 *      'twelve_hour':   '9',
 *      'minute':        '00',
 *      'second':        '00',
 *      'day_night':     'PM'
 *    },
 *    {
 *    'UTC': {
 *      'timezone':      'UTC',
 *      'year':          '2023',
 *      'month':         'November',
 *      'date':          '7',
 *      'day_of_week':   'Wednesday',
 *      'military_hour': '21',
 *      'twelve_hour':   '9',
 *      'minute':        '00',
 *      'second':        '00',
 *      'day_night':     'PM'
 *    }
 *  }
 */
export function ConvertISOTime(timestamp: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const week_days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const api_year = timestamp.substring(0,4);
  const api_month = timestamp.substring(5,7);
  const api_date = timestamp.substring(8,10);

  const api_military = timestamp.substring(11,13);
  const api_minute = timestamp.substring(14, 16);
  const api_second = timestamp.substring(17,19);
  const api_day_night = (Number(api_military) >= 12)? 'PM' : 'AM';

  const utc_offset = timestamp.substring(19,25);

  console.log(
      {
          'API': {
              'year': api_year,
              'month': months[Number(api_month) - 1],
              'date': api_date,
              'military': api_military,
              'minute': api_minute,
              'second': api_second,
              'day_nigh': api_day_night,
              'offset': utc_offset
          }
      }
  );

  return '0AM';
}