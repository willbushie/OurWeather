import {expect, jest, test} from '@jest/globals';
import {DST} from '../Handlers/Time';

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
