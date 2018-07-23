// https://stackoverflow.com/a/1205808
// https://github.com/WebKit/webkit/blob/5f86606f7e57d95e730a54b6eb9390c681a58cc9/Source/WTF/wtf/WeakRandom.h
export class GameRand32 {
  private hi: number;
  private lo: number;
  
  constructor(seed = 0) {
    this.hi = seed | 0
    this.lo = this.hi ^ 0x49616e42
  }

  public next() {
    let hi = this.hi
    let lo = this.lo

    hi = ((hi >>> 16) | (hi << 16));
    hi = (hi - lo) | 0;
    lo = (lo - hi) | 0;

    this.hi = hi
    this.lo = lo

    return hi / 0x100000000
  }
}