/* eslint no-undef: 'off' */
const lodash = require('../lodash/lodash');
const { expect } = require('chai');

describe('lodash', () => {
  describe('dropWhile', () => {
    it('should return an array', () => {
      expect(lodash.dropWhile([])).to.be.an('array');
    });
    it('should remove leftmost value', () => {
      const arr = [true, false, false, false];
      const func = o => o;
      expect(lodash.dropWhile(arr, func)).to.deep.equal([false, false, false]);
    });
  });
  describe('takeRightWhile', () => {
    it('should only take the values matched by callback function', () => {
      const arr = [true, false, true, true];
      const func = o => o;
      expect(lodash.takeRightWhile(arr, func)).to.deep.equal([true, true]);
    });
  });
});
