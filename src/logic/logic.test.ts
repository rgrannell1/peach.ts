import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import * as Peach from "../mod.ts";

const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

Deno.test({
  name: "Peach.Logic.oneOf | Fails for empty collections",
  fn() {
    try {
      Peach.Logic.oneOf(Peach.Number.uniform, [])();
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cannot retrieve value from empty collection")) {
        return;
      } else {
        throw err;
      }
    }

    throw new Error("failed to fail!");
  },
});

Deno.test({
  name: "Peach.Logic.allOf | Returns empty list for empty collections",
  fn() {
    const result = Peach.Logic.allOf([])();

    assertEquals(result, []);
  },
});

Deno.test({
  name: "Peach.Logic.allOf | returns as many elements as expected",
  fn() {
    const parts = Peach.Array.from(
      hangulChars,
      Peach.Number.uniform(0, 10),
    );

    for (let idx = 0; idx < 1_00; idx++) {
      const elems = parts();
      const result = Peach.Logic.allOf(elems)();

      assertEquals(result.length, elems.length);
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOf | Returns element from non-empty collection",
  fn() {
    const elements = ["a", "b", "c"];

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Logic.oneOf(Peach.Number.uniform, elements)();

      if (!elements.includes(result)) {
        throw new Error(`Result ${result} not in original elements`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOf | Works with wrapped values",
  fn() {
    const elements = [() => "thunk1", () => "thunk2", () => "thunk3"];

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Logic.oneOf(Peach.Number.uniform, elements)();

      if (!['thunk1', 'thunk2', 'thunk3'].includes(result)) {
        throw new Error(`Unexpected result: ${result}`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfKey | Returns key from object",
  fn() {
    const testObj = { a: 1, b: 2, c: 3 };
    const expectedKeys = ['a', 'b', 'c'];

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Logic.oneOfKey(Peach.Number.uniform, testObj)() as string;

      if (!expectedKeys.includes(result)) {
        throw new Error(`Key ${result} not in expected keys`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfKey | Fails for empty object",
  fn() {
    const emptyObj = {};

    try {
      Peach.Logic.oneOfKey(Peach.Number.uniform, emptyObj)();
      throw new Error("Should have thrown an error");
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cannot retrieve value from empty dictionary")) {
        return;
      } else {
        throw err;
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfValue | Returns value from object",
  fn() {
    const testObj = { a: 10, b: 20, c: 30 };
    const expectedValues = [10, 20, 30];

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Logic.oneOfValue(Peach.Number.uniform, testObj)() as number;

      if (!expectedValues.includes(result)) {
        throw new Error(`Value ${result} not in expected values`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfValue | Fails for empty object",
  fn() {
    const emptyObj = {};

    try {
      Peach.Logic.oneOfValue(Peach.Number.uniform, emptyObj)();
      throw new Error("Should have thrown an error");
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cannot retrieve value from empty dictionary")) {
        return;
      } else {
        throw err;
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfEntry | Returns entry from object",
  fn() {
    const testObj = { x: 100, y: 200, z: 300 };
    const expectedEntries = [["x", 100], ["y", 200], ["z", 300]];

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Logic.oneOfEntry(Peach.Number.uniform, testObj)() as [string, number];

      // Check if result is one of the expected entries
      const isValidEntry = expectedEntries.some(([key, value]) =>
        result[0] === key && result[1] === value
      );

      if (!isValidEntry) {
        throw new Error(`Entry [${result[0]}, ${result[1]}] not in expected entries`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.oneOfEntry | Fails for empty object",
  fn() {
    const emptyObj = {};

    try {
      Peach.Logic.oneOfEntry(Peach.Number.uniform, emptyObj)();
      throw new Error("Should have thrown an error");
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cannot retrieve value from empty dictionary")) {
        return;
      } else {
        throw err;
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.mapped | Identical for identity function",
  fn() {
    for (let idx = 0; idx < 1_000; idx++) {
      const chars = hangulChars();

      const transformed = Peach.Logic.mapped((x: string) => x, chars)();

      assertEquals(transformed, chars);
    }
  },
});

Deno.test({
  name: "Peach.Logic.mapped | Transforms values correctly",
  fn() {
    const numberGen = Peach.Number.uniform(1, 100);

    for (let idx = 0; idx < 100; idx++) {
      const original = numberGen();
      const doubled = Peach.Logic.mapped((x: number) => x * 2, original)();

      if (doubled !== original * 2) {
        throw new Error(`Expected ${original * 2}, got ${doubled}`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.mapped | Works with string transformation",
  fn() {
    const stringGen = () => "hello";

    for (let idx = 0; idx < 10; idx++) {
      const result = Peach.Logic.mapped((s: string) => s.toUpperCase(), stringGen)();

      if (result !== "HELLO") {
        throw new Error(`Expected "HELLO", got "${result}"`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.filtered | Returns values matching predicate",
  fn() {
    const numberGen = Peach.Number.uniform(1, 100);
    const evenNumbers = Peach.Logic.filtered((n: number) => n % 2 === 0, numberGen);

    for (let idx = 0; idx < 50; idx++) {
      const result = evenNumbers();

      if (result % 2 !== 0) {
        throw new Error(`Expected even number, got ${result}`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.filtered | Works with string predicate",
  fn() {
    const letterGen = Peach.String.letters(Peach.Number.uniform);
    const uppercaseLetters = Peach.Logic.filtered(
      (s: string) => s === s.toUpperCase(),
      letterGen
    );

    for (let idx = 0; idx < 50; idx++) {
      const result = uppercaseLetters();

      if (result !== result.toUpperCase()) {
        throw new Error(`Expected uppercase letter, got "${result}"`);
      }
    }
  },
});

Deno.test({
  name: "Peach.Logic.filtered | Works with wrapped values",
  fn() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const valueGen = () => Peach.Logic.oneOf(Peach.Number.uniform, values)();
    const evenGen = Peach.Logic.filtered((n: number) => n % 2 === 0, valueGen);

    for (let idx = 0; idx < 20; idx++) {
      const result = evenGen();

      if (result % 2 !== 0) {
        throw new Error(`Expected even number, got ${result}`);
      }

      if (!values.includes(result)) {
        throw new Error(`Result ${result} not in original values`);
      }
    }
  },
});
