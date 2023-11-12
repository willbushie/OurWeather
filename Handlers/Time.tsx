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
      'timezone': GetTimezone(utc_offset, DST()),
      'year': api_year,
      'month': months[Number(api_month) - 1],
      'date': api_date,
      'military': api_military,
      'minute': api_minute,
      'second': api_second,
      'day_night': api_day_night,
      'offset': utc_offset
    }
  });

  return '0AM';
}

/**
 * Obtain Timezone compared to UTC
 *
 * @param utc_offset string
 *  The offset compared to UTC (input: '-06:00')
 * @param dst boolean
 *  If the daylight savings is current
 *
 * @return timezone string
 *  The timezone of the offset (output: 'CST')
 */
function GetTimezone(utc_offset: string, dst: boolean) {
  return '';
}

/**
 * Giving a month and date, return if Daylight Savings Time is active or not.
 *
 * @param month string
 *  Month number of the date in question (input: '12')
 * @param date string
 *  Day of the month of the date in question (input: '1')
 * @param military string
 *  Military hour of the date in question (input: '18')
 *
 * @return boolean
 *  If daylight savings time is active or not
 */
function DST(month: string, date: string, military: string) {
  return false;
}

/**
 * Given a year, return if it is a leap year or not.
 *
 * @param string year
 *  The year to test if it is a leap year or not
 *
 * @return boolean
 */
function LeapYear(year: string) {
  const year_int = Number(year);
  if (year_int % 4 === 0) {
    if (year_int % 100 === 0 && year_int % 400 != 0) {
      return false
    }
    else if (year_int % 100 === 0 && year_int % 400 === 0) {
      return true
    }
    return true;
  }
  return false;
}