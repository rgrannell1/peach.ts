
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
