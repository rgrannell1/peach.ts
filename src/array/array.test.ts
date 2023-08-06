import * as Peach from "../mod.ts";

Deno.test({
  name: "Array.from | constructs expected size",
  fn() {
    const upper = Peach.Number.uniform(0, 10);

    for (let idx = 0; idx < 1_000; idx++) {
      const sizeTgt = upper();
      const random = Peach.Array.from(0, sizeTgt);
      const val = random();

      if (val.length > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});

Deno.test({
  name: "Array.choose | returns a subset of the provided collection",
  fn() {
    const integers = Peach.Array.from(
      Peach.Number.uniform(0, 100),
      Peach.Number.uniform(0, 100));

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = integers();

      const result = Peach.Array.choose(sample, Peach.BigInt.uniform);
      if (result.length > 100) {
        throw new Error(`out of range 0...100: ${result}`);
      }

      for (const elem of sample) {
        if (elem < 0 || elem > 100) {
          throw new Error(`out of range 0...100: ${elem}`);
        }
      }
    }
  }
});

Deno.test({
  name: "Array.choose | preserves elements",
  fn() {
    const integers = Peach.Array.from(
      0,
      Peach.Number.uniform(0, 100));

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = integers();

      const result = Peach.Array.choose(sample, Peach.BigInt.uniform);
      if (result.length > 100) {
        throw new Error(`out of range 0...100: ${result}`);
      }

      for (const elem of sample) {
        if (elem !== 0) {
          throw new Error(`elem was not zero: ${elem}`);
        }
      }
    }
  }
})