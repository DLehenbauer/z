import { XSadd128 as XSadd } from '../dist'
import { assert } from 'chai'

describe('XSadd', () => {
  describe('first 1024 bits', () => {
    it('matches expected sequence', function () {
      const xsadd = new XSadd();
      const actual = new Uint32Array(32)
        .map(() => xsadd.nextUint32())

      const expected = new Uint32Array([
        632138386,  1225805588, 2705912313, 1588753522,
        2732548795, 2735726966, 2394419574, 3515814289,
        3556633123, 1015237501, 2132029415, 576000331,
        2340321636, 1776802188, 1747978708, 3668179828,
        1079022729, 3255541886, 2961752077, 1658407870,
        4034557594, 3083985811, 4058951189, 3007946624,
        2195203177, 2518876435, 2601758088, 2845673633,
        2628829208, 2408828038, 1526488445, 4238278606 ])

      assert.deepEqual(actual, expected)
    });
  })

  describe('minValue', () => {
    const xsadd = new XSadd()
    xsadd.nextUint32 = () => 0x00000000

    it('next', () => { assert.equal(xsadd.next(), 0) })
    it('nextUint53()', () => { assert.equal(xsadd.nextUint53(), 0) })
    it('nextFloat32()', () => { assert.equal(xsadd.nextFloat32(), 0) })
    it('nextFloat64()', () => { assert.equal(xsadd.nextFloat64(), 0) })
  })

  describe('maxValue', () => {
    const xsadd = new XSadd()
    xsadd.nextUint32 = () => 0xFFFFFFFF

    const u24 = Math.pow(2, 24)
    const u32 = Math.pow(2, 32)
    const u53 = Math.pow(2, 53)

    it('next', () => { assert.equal(xsadd.next(), (u32 - 1) / u32) })
    it('nextUint53()', () => { assert.equal(xsadd.nextUint53(), u53 - 1) })
    it('nextFloat32()', () => { assert.equal(xsadd.nextFloat32(), (u24 - 1) / u24) })
    it('nextFloat64()', () => { assert.equal(xsadd.nextFloat64(), (u53 - 1) / u53) })
  })  
});