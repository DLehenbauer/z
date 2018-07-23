class Clock {
  private startTime = NaN
  
  public reset() {
    this.startTime = Date.now()
  }

  public get elapsed() {
    return Date.now() - this.startTime
  }
}

export class Suite {
  private readonly clock = new Clock()
  private readonly tests: Test[] = []

  public add(name: string, fn: () => any) {
    this.tests.push(new Test(this.clock, name, fn))
    return this
  }

  public run() {
    for (const test of this.tests) {
      test.calibrate()
    }

    for (const test of this.tests) {
      test.run()
    }
  }

  public toString() {
    let s = ''
    for (const test of this.tests) {
      s += test.toString() + '\n'
    }
    return s
  }
}

class Test {
  private iterationsPerSample = 0.5
  private samples = new Float64Array(10)

  constructor(private readonly clock: Clock, private readonly name: string,  private readonly fn: () => any) {
  }

  public sample() {
    this.clock.reset()
    for (let i = 0; i < this.iterationsPerSample; i++) {
      this.fn()
    }
    const elapsed = this.clock.elapsed
    return elapsed
  }

  public calibrate() {
    this.iterationsPerSample = 0.5
    do {
      this.iterationsPerSample *= 2
    } while (this.sample() < 100)
  }

  public run() {
    const samples = this.samples
    const maxSamples = samples.length

    for (let i = 0; i < maxSamples; i++) {
      samples[i] = this.sample()
    }
  }

  public toString() {
    let ops = this.iterationsPerSample * this.samples.length
    let ms = Array.prototype.reduce.apply(
      this.samples,
      [(previous: number, current: number) => {
        return previous + current
      }, 0])

    const opsPerSec = (ops / ms) * 1000

    return `${this.name}: ops: ${ops.toLocaleString()}, ms: ${ms.toLocaleString()}, ops/sec: ${opsPerSec.toLocaleString()}`    
  }
}