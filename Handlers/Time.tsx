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
 * @param year string
 *  Year of the date being evaluated (Input: '2023')
 * @param month string
 *  Month number of the date being evaluated (Input: '12')
 * @param date string
 *  Day of the month of the date being evaluated (Input: '01')
 * @param military string
 *  Military hour of the date being evaluated (Input: '18')
 *
 * @return boolean
 *  If daylight savings time is active or not
 */
function DST(year: string, month: string, date: string, military: string) {
  const dst_rules = DSTRules(year);
  const dst_start = Number(dst_rules.dst_start);
  const dst_end = Number(dst_rules.dst_end);

  const month_int = Number(month);
  const date_int = Number(date);
  const military_int = Number(military);

  if (month_int > 3 && month_int < 11) {
    return true;
  }
  else if (month_int === 3 && date_int >= dst_start) {
    if (date_int === dst_start && military_int >= 3) {
        return true;
    }
  }
  else if (month_int === 11 && date_int <= dst_end) {
    /* 1AM - 2AM 'exists' twice, this does not consider that */
    if (date_int === dst_end && military_int > 1) {
        return true;
    }
  }
  return false;
}
/* export function for testing - Time.test.ts */
exports.DST = DST;

/**
 * Given a year, determine when DST starts and when DST ends for that year.
 *
 * @param year string
 *  Year to determine when DST starts (Input: '2023')
 *
 * @return object
 *  Output: {
 *    'dst_start': '12', // Date in March when DST starts
 *    'dst_end': '5'     // Date in November when DST ends
 *  }
 */
function DSTRules(year: string) {
  /* Based on when the first day of the month is, when the second Sunday will fall. */
  const march_second_sunday_table = ['8','14','13','12','11','10','9'];
  const march_day_one = DayOfTheWeek(year,'03','01');
  const dst_start_date = march_second_sunday_table[march_day_one];

  /* Based on when the first day of the month is, when the first Sunday will fall. */
  const november_first_sunday_table = ['1','7','6','5','4','3','2'];
  const november_day_one = DayOfTheWeek(year,'11','01');
  const dst_end_date = november_first_sunday_table[november_day_one];

  return {'dst_start':dst_start_date, 'dst_end':dst_end_date};
}
/* export function for testing - Time.test.ts */
exports.DSTRules = DSTRules;

/**
 * Returns the day of the week from a year, month, date.
 * This function uses [Gauss's Algorithm](https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss's_algorithm).
 *
 * @param year string
 *  Year of the date in question (input: '2023')
 * @param month string
 *  Month number of the date in question (input: '12')
 * @param date string
 *  Day of the month of the date in question (input: '01')
 *
 * @return int
 *  Day of the week (Sunday: 0, Saturday: 6)
 */
function DayOfTheWeek(year: string, month: string, date: string) {
  const month_offset_table = [0,3,3,6,1,4,6,2,5,0,3,5];
  const month_offset_leap_table = [0,3,4,0,2,5,0,3,6,1,4,6];
  const year_int = Number(year);
  const month_int = Number(month);
  const date_int = Number(date);

  const month_offset = (LeapYear(year))? month_offset_leap_table[month_int - 1] : month_offset_table[month_int - 1];
  const day = (date_int + month_offset + 5*((year_int - 1)%4) + 4*((year_int - 1)%100) + 6*((year_int - 1)%400))%7;

  return day;
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
