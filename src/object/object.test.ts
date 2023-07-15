
import * as Peach from "../mod.ts";

const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

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
