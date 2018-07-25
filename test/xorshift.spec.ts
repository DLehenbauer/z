// import { XorShift32 } from '../dist'
// import { Last4 } from './last4'
// import { assert } from 'chai'

// const rng = new XorShift32(0)
// const last4 = new Last4()

// describe(`xorshift32`, () => {
//   it(`period`, () => {
//     let period = 0
//     let initial4 = new Array(4).fill(0).map(() => rng.next())
//     for (const initial of initial4) {
//         last4.push(initial)
//     }
    
//     assert(last4.areSame(initial4))

//     do {
//       const value = rng.next()
//       if (!(0 <= value && value < 1)) {
//           assert.fail(`Produced out of range value: '${value}'`);
//       }
//       last4.push(value)
//       period++

//       if ((period & 0x0FFFFFFF) === 0) {
//           console.log(`${period}`)
//       }
//     } while (!last4.areSame(initial4))

//     assert.equal(period, Math.pow(2, 32) - 1)
//   }).timeout(600000);
//})