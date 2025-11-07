import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 'invalid', b: 'invalid', action: Action.Add, expected: null },
  { a: 5, b: 3, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
