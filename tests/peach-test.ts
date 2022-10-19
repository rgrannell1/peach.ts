import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as NumberGen from "../src/number/number.ts";
import * as ArrayGen from "../src/array/array.ts";
import * as SetGen from "../src/set/set.ts";
import * as StringGen from "../src/string/string.ts";
import * as Logic from "../src/logic/logic.ts";

import * as Peach from '../src/mod.ts';

Deno.test({
  name: "K | Constant-function returns same value supplied",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const val = Peach.Number.uniform(0, 100);

      if (Peach.K(val)() !== val) {
        throw new Error("value not equal");
      }
    }
  },
});

Deno.test({
  name: "Uniform | Choosing 0...0 returns 0",
  fn() {
    assertEquals(Peach.Number.uniform(0, 0)(), 0, "uniform 0...0 must be zero");
  },
});

Deno.test({
  name: "Uniform | Always in range",
  fn() {
    let upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = Peach.Number.uniform(0, sizeTgt);
      let val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "UniformContinuous | Choosing 0...0 returns 0",
  fn() {
    assertEquals(
      NumberGen.uniformContinuous(0, 0)(),
      0,
      "uniform 0...0 must be zero",
    );
  },
});

Deno.test({
  name: "UniformContinous | Always in range",
  fn() {
    let upper = NumberGen.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = NumberGen.uniformContinuous(0, sizeTgt);
      let val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "Array.from | constructs expected size",
  fn() {
    let upper = NumberGen.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = ArrayGen.from(0, sizeTgt);
      let val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "OneOf | Fails for empty collections",
  fn() {
    try {
      Logic.oneOf(NumberGen.uniform, [])();
    } catch (err) {
      if (err.message.includes('Cannot retrieve value from empty collection')) {
        return
      } else {
        throw err
      }
      return;
    }

    throw new Error('failed to fail!')
  },
});

Deno.test({
  name: "Set.from | Constructs set of expected size",
  fn() {
    const gen = SetGen.from(1, NumberGen.uniform(1, 100));

    for (let idx = 0; idx < 1000; idx++) {
      const val = gen()
      if (val.size !== 1) {
        throw new Error('set too big')
      }
    }
  },
});


Deno.test({
  name: "String.from | Constructs string of expected size",
  fn() {
    let upper = NumberGen.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      let sizeTgt = upper();
      let random = StringGen.from('a', sizeTgt);
      let val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});
