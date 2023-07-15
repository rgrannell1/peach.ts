import * as Peach from "../mod.ts";

const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

const sentence = Peach.Array.from(
  Peach.String.concat("here are five hangul characters: ", hangulChars),
  10,
);

Deno.test({
  name: "OneOf | Fails for empty collections",
  fn() {
    try {
      Peach.Logic.oneOf(Peach.Number.uniform, [])();
    } catch (err) {
      if (err.message.includes("Cannot retrieve value from empty collection")) {
        return;
      } else {
        throw err;
      }
    }

    throw new Error("failed to fail!");
  },
});
