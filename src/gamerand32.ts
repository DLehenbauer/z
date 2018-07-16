// https://stackoverflow.com/a/1205808

export class GameRand32 {
  private hi: number;
  private lo: number;
  
  constructor(seed: number) {
    seed |= 0
    this.hi = seed
    this.lo = seed ^ 0x49616e42
  }

  public next() {
    this.hi = ((this.hi >>> 16) + (this.hi << 16)) | 0;
    this.hi = (this.hi - this.lo) | 0;
    this.lo = (this.lo - this.hi) | 0;
        
    return ((~this.hi) >>> 0) / 0xFFFFFFFF
  }
}