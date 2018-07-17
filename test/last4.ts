export class Last4 {
  private readonly buffer = new Float64Array(4)
  private head = 0;
  private tail = 0;
  
  public push(data: number) {
    this.buffer[this.head] = data;
    this.head = (++this.head) & 3;
    this.tail = (++this.tail) & 3;
  }

  public areSame(other: ArrayLike<number>) {
    let j = this.tail
    
    for (let i = 0; i < 4; i++) {
      const left = other[i]
      const right = this.buffer[j]

      if (left !== right) {
        return false
      }
      j = (++j) & 3
    }
    return true
  }
};