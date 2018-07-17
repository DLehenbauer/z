export class Last4 {
  private readonly items = [0, 0, 0, 0]
  private head = 0;
  private tail = 0;
  
  public push(value: number) {
    this.items[this.head] = value;
    this.head = (++this.head) & 3;
    this.tail = (++this.tail) & 3;
  }

  public areSame(other: ArrayLike<number>) {
    let j = this.tail
    
    return other[0] === this.items[j++]
      && other[1] === this.items[(j++) & 3]
      && other[2] === this.items[(j++) & 3]
      && other[3] === this.items[j & 3]
  }
};