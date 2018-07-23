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

 // https://github.com/MersenneTwister-Lab/XSadd
export class XSadd128 {
  private x: number
  private y: number
  private z: number
  private w: number

  constructor(seed0?: number, seed1 = 0, seed2 = 0, seed3 = 0) {
    this.x = (seed0 as number | 0) || 0x49616E42
    this.y = (seed1 | 0)
    this.z = (seed2 | 0)
    this.w = (seed3 | 0)

    // Discard the first 8 results to ensure inital bits have been sufficient mixed.
    for (let i = 0; i < 8; i++) {
      this.advance()
    }
  }
  
  public advance() {
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

  public nextInt32() {
    return (this.w + this.z) | 0
  }

    /**
     * Returns a psuedo-random unsigned 32-bit integer 'r' in the range 0 <= r < 2^32
     * (0 to 4294967295 inclusive).
     * 
     * Note that the XSadd algorithm is known to produce weak lower bits.  For better statistical results,
     * discard lower bits with right shift (>>) or division when less than 32 bits are
     * needed.
     */
  public nextUint32() {
    return (this.w + this.z) >>> 0
  }

  public next() {
    this.advance()
    const r = this.nextUint32()
    return r / 0x100000000
  }
}