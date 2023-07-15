
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
