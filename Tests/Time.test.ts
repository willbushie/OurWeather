import {expect, jest, test} from '@jest/globals';
import {
  ConvertTimeWithOffset,
  ReadableISO,
  TwentyFourHourConversion,
  DST,
  DSTRules,
  DayOfTheWeek,
  LeapYear
} from '../Handlers/Time';

/**
 * ./Handlers/Time.tsx:ConvertTimeWithOffset()
 */
test('ISO8601 timestamp conversion based on given offset value', () => {
  /* timestamp behind desired offset */
  expect(ConvertTimeWithOffset('2023-11-07T10:34:12-08:00', '-05:00')).toBe('2023-11-07T07:34:12-05:00'); // same day
  expect(ConvertTimeWithOffset('2023-11-07T21:13:43-08:00', '-05:00')).toBe('2023-11-00T00:13:43-05:00'); // new day
  expect(ConvertTimeWithOffset('2023-11-30T23:43:33-08:00', '-05:00')).toBe('2023-12-01T02:43:33-05:00'); // new month
  expect(ConvertTimeWithOffset('2023-11-30T23:43:33-08:00', '-05:00')).toBe('2024-01-01T01:15:52-05:00'); // new year
  /* timestamp ahead of desired offset */
  expect(ConvertTimeWithOffset('2023-11-07T07:34:12-05:00', '-08:00')).toBe('2023-11-07T10:34:12-08:00'); // same day
  expect(ConvertTimeWithOffset('2023-11-07T00:13:43-05:00', '-08:00')).toBe('2023-11-07T21:13:43-08:00'); // new day
  expect(ConvertTimeWithOffset('2023-12-01T02:43:33-05:00', '-08:00')).toBe('2023-11-30T23:43:33-08:00'); // new month
  expect(ConvertTimeWithOffset('2024-01-01T01:15:52-05:00', '-08:00')).toBe('2023-11-30T23:43:33-08:00'); // new year
  /* timestamp same as desired offset */
  expect(ConvertTimeWithOffset('2023-11-07T10:34:12-06:00', '-06:00')).toBe('2023-11-07T10:34:12-06:00');
  expect(ConvertTimeWithOffset('2023-11-07T21:13:43-06:00', '-06:00')).toBe('2023-11-07T21:13:43-06:00');
  expect(ConvertTimeWithOffset('2023-11-30T23:43:33-06:00', '-06:00')).toBe('2023-11-30T23:43:33-06:00');
  expect(ConvertTimeWithOffset('2023-11-30T23:43:33-06:00', '-06:00')).toBe('2023-11-30T23:43:33-06:00');
});

/**
 * ./Handlers/Time.tsx:ReadableISO()
 */
test('ISO8601 timestamps to readable objects', () => {
  expect(ReadableISO('2023-11-19T20:22:06-08:00')).toStrictEqual({
    'timestamp':     '2023-11-19T20:22:06-08:00',
    'year':          '2023',
    'month':         '11',
    'date':          '19',
    'day_of_week':   '0',
    'military_hour': '20',
    'twelve_hour':   '8',
    'minute':        '22',
    'second':        '06',
    'day_night':     'PM',
    'offset':        '-08:00'
  });
  expect(ReadableISO('2023-11-20T00:47:38-06:00')).toStrictEqual({
    'timestamp':     '2023-11-20T00:47:38-06:00',
    'year':          '2023',
    'month':         '11',
    'date':          '20',
    'day_of_week':   '1',
    'military_hour': '00',
    'twelve_hour':   '12',
    'minute':        '47',
    'second':        '38',
    'day_night':     'AM',
    'offset':        '-06:00'
  });
  expect(ReadableISO('2023-11-07T21:03:00-06:00')).toStrictEqual({
    'timestamp':     '2023-11-07T21:03:00-06:00',
    'year':          '2023',
    'month':         '11',
    'date':          '07',
    'day_of_week':   '2',
    'military_hour': '21',
    'twelve_hour':   '9',
    'minute':        '03',
    'second':        '00',
    'day_night':     'PM',
    'offset':        '-06:00'
  });
});

/**
 * ./Handlers/Time.tsx:TwentyFourHourConversion()
 */
test('Convert 24-hour to 12 hour', () => {
  /* All possible test cases */
  expect(TwentyFourHourConversion('00')).toBe('12');
  expect(TwentyFourHourConversion('01')).toBe('1');
  expect(TwentyFourHourConversion('02')).toBe('2');
  expect(TwentyFourHourConversion('03')).toBe('3');
  expect(TwentyFourHourConversion('04')).toBe('4');
  expect(TwentyFourHourConversion('05')).toBe('5');
  expect(TwentyFourHourConversion('06')).toBe('6');
  expect(TwentyFourHourConversion('07')).toBe('7');
  expect(TwentyFourHourConversion('08')).toBe('8');
  expect(TwentyFourHourConversion('09')).toBe('9');
  expect(TwentyFourHourConversion('10')).toBe('10');
  expect(TwentyFourHourConversion('11')).toBe('11');
  expect(TwentyFourHourConversion('12')).toBe('12');
  expect(TwentyFourHourConversion('13')).toBe('1');
  expect(TwentyFourHourConversion('14')).toBe('2');
  expect(TwentyFourHourConversion('15')).toBe('3');
  expect(TwentyFourHourConversion('16')).toBe('4');
  expect(TwentyFourHourConversion('17')).toBe('5');
  expect(TwentyFourHourConversion('18')).toBe('6');
  expect(TwentyFourHourConversion('19')).toBe('7');
  expect(TwentyFourHourConversion('20')).toBe('8');
  expect(TwentyFourHourConversion('21')).toBe('9');
  expect(TwentyFourHourConversion('22')).toBe('10');
  expect(TwentyFourHourConversion('23')).toBe('11');
});

/**
 * ./Handlers/Time.tsx:DST()
 */
test('If DST is being observed', () => {
  /* Random dates throughout the year */
  expect(DST('2023', '01', '01', '00')).toBe(false);
  expect(DST('2023', '02', '01', '22')).toBe(false);
  expect(DST('2023', '04', '01', '10')).toBe(true);
  expect(DST('2023', '08', '01', '18')).toBe(true);
  /* DST starts - forward (1AM -> 3AM) */
  expect(DST('2023', '3', '11', '23')).toBe(false);
  expect(DST('2023', '3', '12', '00')).toBe(false);
  expect(DST('2023', '3', '12', '01')).toBe(false);
  expect(DST('2023', '3', '12', '03')).toBe(true);
  /* DST ending - backward - (2AM -> 1AM) */
  expect(DST('2023', '11', '04', '22')).toBe(true);
  expect(DST('2023', '11', '04', '23')).toBe(true);
  expect(DST('2023', '11', '05', '00')).toBe(true);
  expect(DST('2023', '11', '05', '01')).toBe(false); /* 01:00 is assumed to be outside of DST */
  expect(DST('2023', '11', '05', '02')).toBe(false);
  expect(DST('2023', '11', '05', '03')).toBe(false);
  expect(DST('2023', '11', '05', '04')).toBe(false);
  expect(DST('2023', '11', '05', '05')).toBe(false);
});

/**
 * ./Handlers/Time.tsx:DSTRules()
 */
test('Finds the start and end of DST', () => {
  expect(DSTRules('2010')).toStrictEqual({'dst_start':'14','dst_end':'7'});
  expect(DSTRules('2011')).toStrictEqual({'dst_start':'13','dst_end':'6'});
  expect(DSTRules('2012')).toStrictEqual({'dst_start':'11','dst_end':'4'});
  expect(DSTRules('2013')).toStrictEqual({'dst_start':'10','dst_end':'3'});
  expect(DSTRules('2014')).toStrictEqual({'dst_start':'9','dst_end':'2'});
  expect(DSTRules('2015')).toStrictEqual({'dst_start':'8','dst_end':'1'});
  expect(DSTRules('2016')).toStrictEqual({'dst_start':'13','dst_end':'6'});
  expect(DSTRules('2017')).toStrictEqual({'dst_start':'12','dst_end':'5'});
  expect(DSTRules('2018')).toStrictEqual({'dst_start':'11','dst_end':'4'});
  expect(DSTRules('2019')).toStrictEqual({'dst_start':'10','dst_end':'3'});
  expect(DSTRules('2020')).toStrictEqual({'dst_start':'8','dst_end':'1'});
  expect(DSTRules('2021')).toStrictEqual({'dst_start':'14','dst_end':'7'});
  expect(DSTRules('2022')).toStrictEqual({'dst_start':'13','dst_end':'6'});
  expect(DSTRules('2023')).toStrictEqual({'dst_start':'12','dst_end':'5'});
  expect(DSTRules('2024')).toStrictEqual({'dst_start':'10','dst_end':'3'});
  expect(DSTRules('2025')).toStrictEqual({'dst_start':'9','dst_end':'2'});
});

/**
 * ./Handlers/Time.tsx:DayOfTheWeek()
 */
test('Finds the day of the week', () => {
  expect(DayOfTheWeek('2020', '02', '23')).toBe(0);
  expect(DayOfTheWeek('2020', '02', '24')).toBe(1);
  expect(DayOfTheWeek('2020', '02', '25')).toBe(2);
  expect(DayOfTheWeek('2020', '02', '26')).toBe(3);
  expect(DayOfTheWeek('2020', '02', '27')).toBe(4);
  expect(DayOfTheWeek('2020', '02', '28')).toBe(5);
  expect(DayOfTheWeek('2020', '02', '29')).toBe(6);
  expect(DayOfTheWeek('2021', '04', '01')).toBe(4);
  expect(DayOfTheWeek('2021', '04', '02')).toBe(5);
  expect(DayOfTheWeek('2021', '04', '03')).toBe(6);
  expect(DayOfTheWeek('2021', '04', '04')).toBe(0);
  expect(DayOfTheWeek('2021', '04', '05')).toBe(1);
  expect(DayOfTheWeek('2021', '04', '06')).toBe(2);
  expect(DayOfTheWeek('2021', '04', '07')).toBe(3);
  expect(DayOfTheWeek('2100', '09', '04')).toBe(6);
  expect(DayOfTheWeek('2100', '09', '05')).toBe(0);
  expect(DayOfTheWeek('2100', '09', '06')).toBe(1);
  expect(DayOfTheWeek('2100', '09', '07')).toBe(2);
  expect(DayOfTheWeek('2100', '09', '08')).toBe(3);
  expect(DayOfTheWeek('2100', '09', '09')).toBe(4);
  expect(DayOfTheWeek('2100', '09', '10')).toBe(5);
});

/**
 * ./Handlers/Time.tsx:LeapYear()
 */
test('Is a leap year or not', () => {
  expect(LeapYear('2000')).toBe(true);
  expect(LeapYear('2001')).toBe(false);
  expect(LeapYear('2002')).toBe(false);
  expect(LeapYear('2016')).toBe(true);
  expect(LeapYear('2020')).toBe(true);
  expect(LeapYear('2021')).toBe(false);
  expect(LeapYear('2022')).toBe(false);
  expect(LeapYear('2100')).toBe(false);
});
