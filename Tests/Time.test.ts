import {expect, jest, test} from '@jest/globals';
import {
  DST,
  DSTRules,
  DayOfTheWeek,
  LeapYear
} from '../Handlers/Time';

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
