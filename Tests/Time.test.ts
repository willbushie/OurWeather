import {expect, jest, test} from '@jest/globals';
import {
  DST,
  DSTRules
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
  expect(DST('2023', '11', '04', '23')).toBe(true);
  expect(DST('2023', '11', '05', '00')).toBe(true);
  /* !!! SPECIAL CASE, 01:00 is assumed to be outside of DST */
  expect(DST('2023', '11', '05', '01')).toBe(false);
  expect(DST('2023', '11', '05', '03')).toBe(false);
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
