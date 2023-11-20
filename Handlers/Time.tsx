import React from 'react';

/**
 * Convert ISO8601 timestamp into easily readable object.
 *
 * @param string timestamp
 *  ISO8601 timestamp (input: '2023-11-07T21:00:00-06:00')
 *
 * @return object
 *  {
 *    'timestamp':     '2023-11-07T21:00:00-06:00',
 *    'year':          '2023',
 *    'month':         'November',
 *    'date':          '8',
 *    'day_of_week':   'Wednesday',
 *    'military_hour': '03',
 *    'twelve_hour':   '3',
 *    'minute':        '00',
 *    'second':        '00',
 *    'day_night':     'AM',
 *    'offset':        '-06:00'
 *  }
 */
function ReadableISO(timestamp: string) {
  const year = timestamp.substring(0,4);
  const month = timestamp.substring(5,7);
  const date = timestamp.substring(8,10);
  const military_hour = timestamp.substring(11,13);

  return {
    'timestamp': timestamp,
    'year': year,
    'month': month,
    'date': date,
    'day_of_week': String(DayOfTheWeek(year, month, date)),
    'military_hour': military_hour,
    'twelve_hour': TwentyFourHourConversion(military_hour),
    'minute': timestamp.substring(14, 16),
    'second': timestamp.substring(17,19),
    'day_night': (Number(military_hour) >= 12)? 'PM' : 'AM',
    'offset': timestamp.substring(19,25)
  };
}
/* export function for testing - Time.test.ts */
exports.ReadableISO = ReadableISO;

/**
 * Convert 24-hour to 12-hour.
 *
 * @param string hour
 *  24-hour hour (input: '01', input: '18')
 *
 * @return string
 *  12 hour equivalent (output: '01', output: '06')
 */
function TwentyFourHourConversion(hour: string) {
  if (hour === '00' || hour === '12') {
    return '12';
  }
  else {
    return String(Number(hour) % 12);
  }
}
/* export function for testing - Time.test.ts */
exports.TwentyFourHourConversion = TwentyFourHourConversion;

/**
 * Obtain device time in a readable key val object
 *
 * @return object
 *  Output: {
 *    'device_timestamp': '2023-11-19T23:45:53-06:00',
 *    'device': {
 *      'year':   '2023',
 *      'month':  '11',
 *      'date':   '19',
 *      'hour':   '23',
 *      'minute': '45',
 *      'second': '53',
 *      'offset': '-06:00'
 *    },
 *    'UTC': {
 *      'year':   '2023',
 *      'month':  '11',
 *      'date':   '20',
 *      'hour':   '05',
 *      'minute': '45',
 *      'second': '53'
 *    }
 *  }
 */
function GetCurrentDeviceTime() {
  /* Get device time items */
  const device_year_int = new Date().getFullYear();
  const device_year_str = device_year_int;
  const device_month_int = new Date().getMonth() + 1;
  const device_month_str = (device_month_int < 10)? '0' + String(device_month_int): String(device_month_int);
  const device_date_int = new Date().getDate();
  const device_date_str = (device_date_int < 10)? '0' + String(device_date_int): String(device_date_int);
  const device_hour_int = new Date().getHours();
  const device_hour_str = (device_hour_int < 10)? '0' + String(device_hour_int): String(device_hour_int);
  const device_minutes_int = new Date().getMinutes();
  const device_minutes_str = (device_minutes_int < 10)? '0' + String(device_minutes_int): String(device_minutes_int);
  const device_seconds_int = new Date().getSeconds();
  const device_seconds_str = (device_seconds_int < 10)? '0' + String(device_seconds_int): String(device_seconds_int);

  /* Get UTC time data */
  const utc_year_int = new Date().getUTCFullYear();
  const utc_year_str = String(utc_year_int);
  const utc_month_int = new Date().getUTCMonth() + 1;
  const utc_month_str = (utc_month_int < 10)? '0' + String(utc_month_int): String(utc_month_int);
  const utc_date_int = new Date().getUTCDate();
  const utc_date_str = (utc_date_int < 10)? '0' + String(utc_date_int): String(utc_date_int);
  const utc_hour_int = new Date().getUTCHours();
  const utc_hour_str = (utc_hour_int < 10)? '0' + String(utc_hour_int): String(utc_hour_int);
  const utc_minutes_int = new Date().getUTCMinutes();
  const utc_minutes_str = (utc_minutes_int < 10)? '0' + String(utc_minutes_int): String(utc_minutes_int);
  const utc_seconds_int = new Date().getUTCSeconds();
  const utc_seconds_str = (utc_seconds_int < 10)? '0' + String(utc_seconds_int): String(utc_seconds_int);

  /* Change offset from minutes to +-00:00 */
  const device_offset = new Date(device_year_int + device_month_int + device_date_int).getTimezoneOffset();
  let offset = '';
  if (device_offset < 0) {
    const minutes = device_offset * -1;
    const hour = minutes / 60;
    const min = minutes % 60;
    offset += '+';
    offset += (hour < 10)? '0' + String(hour) + ':': String(hour) + ':';
    offset += (min < 10)? '0' + String(min): String(min);
  }
  else {
    const hour = device_offset / 60;
    const min = device_offset % 60;
    offset += '-';
    offset += (hour < 10)? '0' + String(hour) + ':': String(hour) + ':';
    offset += (min < 10)? '0' + String(min): String(min);
  }

  /* Build the device timestamp: 2023-11-20T22:00:00-06:00 */
  let device_timestamp = device_year_str + '-' + device_month_str + '-' + device_date_str + 'T';
  device_timestamp += device_hour_str + ':' + device_minutes_str + ':' + device_seconds_str;
  device_timestamp += offset;

  return {
    'device_timestamp': device_timestamp,
    'device': {
      'year':   device_year_str,
      'month':  device_month_str,
      'date':   device_date_str,
      'hour':   device_hour_str,
      'minute': device_minutes_str,
      'second': device_seconds_str,
      'offset': offset
    },
    'UTC': {
      'year':   utc_year_str,
      'month':  utc_month_str,
      'date':   utc_date_str,
      'hour':   utc_hour_str,
      'minute': utc_minutes_str,
      'second': utc_seconds_str
    }
  };
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
    if (date_int < dst_end) {
      return true;
    }
    /* 1AM - 2AM 'exists' twice, this does not consider that */
    else if (date_int === dst_end && military_int < 1) {
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
/* export function for testing - Time.test.ts */
exports.DayOfTheWeek = DayOfTheWeek;

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
/* export function for testing - Time.test.ts */
exports.LeapYear = LeapYear;
