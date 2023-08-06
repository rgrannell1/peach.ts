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
      10
    )

    for (let idx = 0; idx < 1_000; idx++) {
      const sample = objects();

      const elements = Object.values(sample);
      elements.forEach((element) => {
        if (element !== 0) {
          throw new Error("Element was not preserved");
        }
      });
    }
  }
})