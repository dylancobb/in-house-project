import factorial from '../app/helpers/factorial.ts'
import '@testing-library/jest-dom'
import {expect, jest, test} from '@jest/globals';

test('factorial 2 === 2', () => {
    expect(factorial(3)).toEqual(6);
  });