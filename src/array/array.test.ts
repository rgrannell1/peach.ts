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
      Peach.Number.uniform(0, 100),
    );

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
  },
});

Deno.test({
  name: "Array.choose | preserves elements",
  fn() {
    const integers = Peach.Array.from(
      0,
      Peach.Number.uniform(0, 100),
    );

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
  },
});

Deno.test({
  name: "Array.intersperse | intersperses separator between elements",
  fn() {
    const result = Peach.Array.intersperse(",", "a", "b", "c")();

    if (result.length !== 5) {
      throw new Error(`Expected length 5, got ${result.length}`);
    }

    if (result.join("") !== "a,b,c") {
      throw new Error(`Expected "a,b,c", got "${result.join("")}"`);
    }
  },
});

Deno.test({
  name: "Array.intersperse | works with single element",
  fn() {
    const result = Peach.Array.intersperse("-", "single")();

    if (result.length !== 1) {
      throw new Error(`Expected length 1, got ${result.length}`);
    }

    if (result[0] !== "single") {
      throw new Error(`Expected "single", got "${result[0]}"`);
    }
  },
});

Deno.test({
  name: "Array.intersperse | works with wrapped values",
  fn() {
    const sepThunk = () => "|";
    const elem1Thunk = () => "1";
    const elem2Thunk = () => "2";

    const result = Peach.Array.intersperse(sepThunk, elem1Thunk, elem2Thunk)();

    if (result.length !== 3) {
      throw new Error(`Expected length 3, got ${result.length}`);
    }

    if (result[0] !== "1" || result[1] !== "|" || result[2] !== "2") {
      throw new Error(`Expected ["1", "|", "2"], got [${result.join(", ")}]`);
    }
  },
});
