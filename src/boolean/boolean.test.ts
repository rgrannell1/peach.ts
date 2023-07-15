import {
  assertEquals,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";

import * as Peach from "../mod.ts";

Deno.test({
  name: "Boolean.truth | Returns true",
  fn() {
    assertEquals(Peach.Boolean.truth()(), true);
  },
});

Deno.test({
  name: "Boolean.falsity | Returns false",
  fn() {
    assertEquals(Peach.Boolean.falsity()(), false);
  },
});
