import U32Generator from './u32generator'

/**
 * Copyright (c) 2014
 * Mutsuo Saito, Makoto Matsumoto, Hiroshima University
 * and Manieth Corp.
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// [1] Vigna, Sebastiano. "Further scramblings of Marsaglia’s xorshift generators." vigna.di.unimi.it. July 24, 2018 <http://vigna.di.unimi.it/ftp/papers/xorshiftplus.pdf>.

export class XSadd128 extends U32Generator {
  private x: number
  private y: number
  private z: number
  private w: number

  constructor(seed = Math.random() * 0x100000000) {
    super()

    const state = new Uint32Array([seed, 0, 0, 0])

    for (let i = 1; i < 8; i++) {
     const s = state[(i - 1) & 3];
     state[i & 3] ^= i + Math.imul(1812433253, (s ^ (s >>> 30)));
    }

    if (state[0] === 0 && state[1] === 0 && state[2] === 0 && state[3] === 0) {
      state[0] = 88   // 'X'
      state[1] = 83   // 'S'
      state[2] = 65   // 'A'
      state[3] = 68   // 'D'
    }

    this.x = state[0]
    this.y = state[1]
    this.z = state[2]
    this.w = state[3]

    // Discard the first 8 results to ensure inital bits have been sufficient mixed.
    for (let i = 0; i < 8; i++) {
      this.advance()
    }
  }
  
  private advance() {
    const x = this.x
    const w = this.w
    const y = this.y
    const z = this.z

    let t = x;
    t ^= t << 15;
    t ^= t >>> 18;
    t ^= w << 11;
    
    this.x = y
    this.y = z
    this.z = w
    this.w = t
  }

  /**
   * @summary Returns a psuedo-randomly chosen non-negative 32b integer.
   * 
   * @desc 
   * 
   * Note that the XSadd algorithm is known to produce weak lower bits.  For better statistical results,
   * discard lower bits with right shift (>>) or division when less than 32 bits are needed.
   * 
   * @return An unsigned 32-bit integer 'r' in the range 0 <= r < 2^32 (0 to 4294967295 inclusive).
   */
  public nextUint32() {
    this.advance()
    return (this.w + this.z) >>> 0
  }
}