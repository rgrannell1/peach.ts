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
      Peach.Number.uniform(0, 100),
    );

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
  },
});

Deno.test({
  name: "Set.choose | returns empty array for empty set",
  fn() {
    const emptySet = new Set<number>();
    const result = Peach.Set.choose(emptySet, Peach.BigInt.uniform)();

    if (result.length !== 0) {
      throw new Error(`Expected empty array, got ${result.length} elements`);
    }
  },
});

Deno.test({
  name: "Set.choose | returns subset of original set",
  fn() {
    const originalSet = new Set([1, 2, 3, 4, 5]);

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Set.choose(originalSet, Peach.BigInt.uniform)();

      // All elements in result should be from original set
      for (const elem of result) {
        if (!originalSet.has(elem)) {
          throw new Error(`Element ${elem} not in original set`);
        }
      }

      // Result should not be larger than original
      if (result.length > originalSet.size) {
        throw new Error(`Subset larger than original: ${result.length} > ${originalSet.size}`);
      }
    }
  },
});

Deno.test({
  name: "Set.choose | preserves elements",
  fn() {
    const integers = Peach.Set.from(
      0,
      Peach.Number.uniform(0, 100),
    );

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
  },
});
