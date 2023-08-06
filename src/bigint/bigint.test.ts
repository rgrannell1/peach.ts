import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as Peach from "../mod.ts";

Deno.test({
  name: "Peach.BigInt.Uniform | Choosing 0...0 returns 0",
  fn() {
    assertEquals(Peach.BigInt.uniform(0n, 0n)(), 0n, "uniform 0...0 must be zero");
  },
});

Deno.test({
  name: "Peach.BigInt.Uniform | Always in range",
  fn() {
    const upper = Peach.BigInt.uniform(0n, 10n);

    for (let idx = 0; idx < 1_000; idx++) {
      const sizeTgt = upper();
      const random = Peach.BigInt.uniform(0n, sizeTgt);
      const val = random();

      if (val < 0 || val > sizeTgt) {
        throw new Error(`out of range 0...${sizeTgt}: ${val}`);
      }
    }
  },
});
