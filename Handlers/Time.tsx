import React from 'react';

/**
 * Convert an ISO 8601 timestamp to a new timestamp given the desired offset.
 *
 * **NOTE: OFFSETS MUST BE IN THE SAME HEMISPHERE (EASTERN/WESTERN) |
 *  THIS FUNCTION IS NOT AS GENERAL PURPOSE AS IT COULD BE**
 *
 * @param string timestamp
 *  ISO8601 timestamp (input: '2023-11-07T21:00:00-08:00')
 * @param string offset
 *  ISO8601 timestamp offset (input: '-06:00')
 *
 * @return string
 *  ISO8601 timestamp (output: '2023-11-07T19:00:00-06:00')
 */
export function ConvertTimeWithOffset(timestamp: string, offset: string) {
    const readable_time = ReadableISO(timestamp);

    /* if timestamp and offset match */
    if (readable_time.offset === offset) {
        return timestamp;
    }

    const month_days = {
        1: 30,
        3: 31,
        2: (LeapYear(readable_time.year))? 29 : 28,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };

    /* parse offset */
    const stamp_offset = readable_time.offset;
    const stamp_offset_plusminus = stamp_offset.substring(0,1);
    const stamp_offset_hr = stamp_offset.substring(1,3);
    const stamp_offset_hr_int = (stamp_offset_plusminus === '-')? -1 * Number(stamp_offset_hr): Number(stamp_offset_hr);
    const stamp_offset_min = stamp_offset.substring(4,6);
    const stamp_offset_min_int = Number(stamp_offset_min);

    /* parse readable_time.offset */
    const offset_plusminus = offset.substring(0,1);
    const offset_hr = offset.substring(1,3);
    const offset_hr_int = (offset_plusminus === '-')? -1 * Number(offset_hr): Number(offset_hr);
    const offset_min = offset.substring(4,6);
    const offset_min_int = Number(offset_min);

    /* timestamp is behind offset */
    if (stamp_offset_hr_int < offset_hr_int || stamp_offset_min_int < offset_min_int) {
        const min_diff = Math.abs(stamp_offset_min_int) - Math.abs(offset_min_int);
        const hr_diff = Math.abs(stamp_offset_hr_int) - Math.abs(offset_hr_int);

        let new_min = Number(readable_time.minute) + min_diff;
        let new_hour = Number(readable_time.military_hour) + hr_diff;
        let new_date = Number(readable_time.date);
        let new_month = Number(readable_time.month);
        let new_year = Number(readable_time.year);

        /* new minute >= 60 - next hour | NOT AS GENERAL AS POSSIBLE */
        /* if (new_min >= 60) {
            new_min = (new_min - 60 < 10)? '0' + String(new_min - 60): String(new_min - 60);
            new_hour =+ 1;
        }
        else {
            new_min = (new_min < 10)? '0' + String(new_min): String(new_min);
        } */
        new_min = (new_min < 10)? '0' + String(new_min): String(new_min);
        /* new hour > 23 - next day */
        if (new_hour > 23) {
            new_hour = (new_hour - 24 < 10)? '0' + String(new_hour - 24): String(new_hour - 24);
            new_date += 1;
        }
        else {
            new_hour = (new_hour < 10)? '0' + String(new_hour): String(new_hour);
        }
        /* new date > 28, 29, 30, 31 - next month */
        if (new_date > month_days[new_month]) {
            new_date = '01';
            new_month += 1;
        }
        else {
            new_date = (new_date < 10)? '0' + String(new_date): String(new_date);
        }
        /* new month > 12 - next year */
        if (new_month > 12) {
            new_month = (new_month - 12 < 10)? '0' + String(new_month - 12): String(new_month - 12);
            new_year = String(new_year + 1);
        }
        else {
            new_month = (new_month < 10)? '0' + String(new_month): String(new_month);
        }

        let return_timestamp = new_year + '-' + new_month + '-' + new_date + 'T';
        return_timestamp += new_hour + ':' + new_min + ':' + readable_time.second;
        return_timestamp += offset;

        return return_timestamp;
    }
    /* timestamp is ahead of offset */
    else if (stamp_offset_hr_int > offset_hr_int || stamp_offset_min_int > offset_min_int) {
        const min_diff = Math.abs(offset_min_int) - Math.abs(stamp_offset_min_int);
        const hr_diff = Math.abs(offset_hr_int) - Math.abs(stamp_offset_hr_int);

        let new_min = Number(readable_time.minute) - min_diff;
        let new_hour = Number(readable_time.military_hour) - hr_diff;
        let new_date = Number(readable_time.date);
        let new_month = Number(readable_time.month);
        let new_year = Number(readable_time.year);

        /* new minute < 0 - prev hour | NOT AS GENERAL AS POSSIBLE */
        /* if (new_min <= 0) {
            new_min = (60 - new_min < 10)? '0' + String(60 - new_min): String(60 - new_min);
            new_hour =- 1;
        }
        else {
            new_min = (new_min < 10)? '0' + String(new_min): String(new_min);
        } */
        new_min = (new_min < 10)? '0' + String(new_min): String(new_min);
        /* new hour < 0 - prev day */
        if (new_hour < 0) {
            new_hour = (new_hour + 24 < 10)? '0' + String(new_hour + 24): String(new_hour + 24);
            new_date -= 1;
        }
        else {
            new_hour = (new_hour < 10)? '0' + String(new_hour): String(new_hour);
        }
        /* new date < 1 - prev month */
        if (new_date < 1) {
            new_month -= 1;
            const new_month_temp = (new_month < 1)? 12: new_month;
            new_date = String(month_days[new_month_temp]);
        }
        else {
            new_date = (new_date < 10)? '0' + String(new_date): String(new_date);
        }
        /* new month < 1 - prev year */
        if (new_month < 1) {
            new_month = '12';
            new_year = String(new_year - 1);
        }
        else {
            new_month = (new_month < 10)? '0' + String(new_month): String(new_month);
        }

        let return_timestamp = new_year + '-' + new_month + '-' + new_date + 'T';
        return_timestamp += new_hour + ':' + new_min + ':' + readable_time.second;
        return_timestamp += offset;

        return return_timestamp;
    }
}
/* export function for testing - Time.test.ts */
exports.ConvertTimeWithOffset = ConvertTimeWithOffset;

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
 *    'month':         '11',
 *    'date':          '8',
 *    'day_of_week':   '2',
 *    'military_hour': '03',
 *    'twelve_hour':   '3',
 *    'minute':        '00',
 *    'second':        '00',
 *    'day_night':     'AM',
 *    'offset':        '-06:00'
 *  }
 */
export function ReadableISO(timestamp: string) {
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
export function GetCurrentDeviceTime() {
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
            return false;
        }
        else if (year_int % 100 === 0 && year_int % 400 === 0) {
            return true;
        }
        return true;
    }
    return false;
}
/* export function for testing - Time.test.ts */
exports.LeapYear = LeapYear;
