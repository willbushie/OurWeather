import {expect, jest, test} from '@jest/globals';
import {DST} from '../Handlers/Time';

/**
 * ./Handlers/Time.tsx:DST()
 */
test('takes year, month, day, and 24-hour, and returns if DST is currently observed or not', () => {
  expect(DST('2023', '1', '1', '00')).toBe(false);
  expect(DST('2023', '2', '1', '22')).toBe(false);
  expect(DST('2023', '4', '1', '10')).toBe(true);
  expect(DST('2023', '08', '01', '18')).toBe(true);
});
