import * as Peach from "../mod.ts";

Deno.test({
  name: "Generator.from | Generates expected number of elements",
  fn() {
    const gen = Peach.Generator.from("test", 5);

    const results = Array.from(gen);
    if (results.length !== 5) {
      throw new Error(`Expected 5 elements, got ${results.length}`);
    }
  },
});

Deno.test({
  name: "Generator.from | Generates correct values",
  fn() {
    const gen = Peach.Generator.from("hello", 3);

    const results = Array.from(gen);
    for (const result of results) {
      if (result !== "hello") {
        throw new Error(`Expected "hello", got "${result}"`);
      }
    }
  },
});

Deno.test({
  name: "Generator.from | Zero size generates empty",
  fn() {
    const gen = Peach.Generator.from("test", 0);

    const results = Array.from(gen);
    if (results.length !== 0) {
      throw new Error(`Expected empty generator, got ${results.length} elements`);
    }
  },
});