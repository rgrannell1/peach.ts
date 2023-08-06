import * as Peach from "../mod.ts";

Deno.test({
  name: "Set.from | Constructs set of expected size",
  fn() {
    const gen = Peach.Set.from(1, Peach.Number.uniform(1, 100));

    for (let idx = 0; idx < 1000; idx++) {
      const val = gen();
      if (val.size !== 1) {
        throw new Error("set too big");
      }
    }
  },
});


Deno.test({
  name: "Set.choose | returns a subset of the provided collection",
  fn() {
    const integers = Peach.Set.from(
      Peach.Number.uniform(0, 100),
      Peach.Number.uniform(0, 100));

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = integers();

      const result = Peach.Set.choose(sample, Peach.BigInt.uniform);
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
  name: "Set.choose | preserves elements",
  fn() {
    const integers = Peach.Set.from(
      0,
      Peach.Number.uniform(0, 100));

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = integers();

      const result = Peach.Set.choose(sample, Peach.BigInt.uniform);
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