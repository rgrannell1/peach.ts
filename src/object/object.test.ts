import * as Peach from "../mod.ts";

Deno.test({
  name: "Object.from | Runs",
  fn() {
    const gen = Peach.Object.from(
      Peach.Number.uniform(0, 1000),
      Peach.Number.uniform(0, 1000),
      Peach.Number.uniform(0, 100),
    );

    gen();
  },
});

Deno.test({
  name: "Object.choose | preserves elements",
  fn() {
    const objects = Peach.Object.from(
      Peach.String.letters(Peach.Number.uniform),
      () => 0,
      10,
    );

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = objects();

      const elements = Object.values(sample);
      elements.forEach((element) => {
        if (element !== 0) {
          throw new Error("Element was not preserved");
        }
      });
    }
  },
});

Deno.test({
  name: "Object.choose | returns empty object for empty object",
  fn() {
    const emptyObject = {};
    const result = Peach.Object.choose(emptyObject, Peach.BigInt.uniform)();

    if (Object.keys(result).length !== 0) {
      throw new Error(`Expected empty object, got ${Object.keys(result).length} properties`);
    }
  },
});

Deno.test({
  name: "Object.choose | returns subset of original object",
  fn() {
    const originalObject = { a: 1, b: 2, c: 3, d: 4, e: 5 };

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Object.choose(originalObject, Peach.BigInt.uniform)();

      // All keys in result should be from original object
      for (const key of Object.keys(result)) {
        if (!(key in originalObject)) {
          throw new Error(`Key ${key} not in original object`);
        }
      }

      // All values in result should match original values for their keys
      for (const [key, value] of Object.entries(result)) {
        if (originalObject[key as keyof typeof originalObject] !== value) {
          throw new Error(`Value mismatch for key ${key}: expected ${originalObject[key as keyof typeof originalObject]}, got ${value}`);
        }
      }

      // Result should not be larger than original
      if (Object.keys(result).length > Object.keys(originalObject).length) {
        throw new Error(`Subset larger than original: ${Object.keys(result).length} > ${Object.keys(originalObject).length}`);
      }
    }
  },
});

Deno.test({
  name: "Object.choose | preserves key-value relationships",
  fn() {
    const testObject = { 
      name: "Alice", 
      age: 30, 
      city: "New York",
      active: true 
    };

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Object.choose(testObject, Peach.BigInt.uniform)();

      // Check that all selected properties maintain their original values
      for (const [key, value] of Object.entries(result)) {
        const expectedValue = testObject[key as keyof typeof testObject];
        if (value !== expectedValue) {
          throw new Error(`Key-value relationship broken: ${key} should be ${expectedValue}, got ${value}`);
        }
      }
    }
  },
});

Deno.test({
  name: "Object.choose | works with numeric keys",
  fn() {
    const testObject: Record<string, string> = { "0": "zero", "1": "one", "2": "two", "3": "three" };

    for (let idx = 0; idx < 50; idx++) {
      const result = Peach.Object.choose(testObject, Peach.BigInt.uniform)();

      // Verify all selected entries exist in original
      for (const [key, value] of Object.entries(result)) {
        if (testObject[key] !== value) {
          throw new Error(`Numeric key mismatch: ${key} -> ${value}`);
        }
      }
    }
  },
});

Deno.test({
  name: "Object.choose | can return full object",
  fn() {
    const testObject = { x: 10, y: 20 };
    let foundFullObject = false;

    // Try many times to increase chance of getting full object
    for (let idx = 0; idx < 1000; idx++) {
      const result = Peach.Object.choose(testObject, Peach.BigInt.uniform)();
      
      if (Object.keys(result).length === Object.keys(testObject).length) {
        // Check that it's actually the full object
        if (result.x === 10 && result.y === 20) {
          foundFullObject = true;
          break;
        }
      }
    }

    if (!foundFullObject) {
      throw new Error("Object.choose should occasionally return the full object");
    }
  },
});

Deno.test({
  name: "Object.choose | can return empty object from non-empty input",
  fn() {
    const testObject = { a: 1, b: 2, c: 3 };
    let foundEmptyObject = false;

    // Try many times to increase chance of getting empty object
    for (let idx = 0; idx < 1000; idx++) {
      const result = Peach.Object.choose(testObject, Peach.BigInt.uniform)();
      
      if (Object.keys(result).length === 0) {
        foundEmptyObject = true;
        break;
      }
    }

    if (!foundEmptyObject) {
      throw new Error("Object.choose should occasionally return an empty object");
    }
  },
});

Deno.test({
  name: "Object.choose | works with single property object",
  fn() {
    const singlePropObject = { solo: "value" };

    for (let idx = 0; idx < 100; idx++) {
      const result = Peach.Object.choose(singlePropObject, Peach.BigInt.uniform)();
      
      // Should be either empty object or the single property
      const keys = Object.keys(result);
      if (keys.length > 1) {
        throw new Error(`Too many properties in result: ${keys.length}`);
      }
      
      if (keys.length === 1) {
        if (keys[0] !== "solo" || result.solo !== "value") {
          throw new Error(`Incorrect property returned: ${JSON.stringify(result)}`);
        }
      }
    }
  },
});
