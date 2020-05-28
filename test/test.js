var assert = require('assert')
const datesFromNow = require('../public/js/datesFromNow')

describe('Test', function () {
  describe('datesFromNow("1,2")', function () {
    it('Should return Mon May 04 2020,Mon May 11 2020.', function () {
      assert.equal(datesFromNow('1 2'), 'Mon May 04 2020,Mon May 11 2020')
    })
  })
})
