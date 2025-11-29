import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { fmap, type Thunk } from "./types.ts";

Deno.test({
  name: "fmap | Works with direct values",
  fn() {
    const double = (x: number): number => x * 2;
    const mappedDouble = fmap(double);

    assertEquals(mappedDouble(5), 10);
    assertEquals(mappedDouble(0), 0);
  },
});

Deno.test({
  name: "fmap | Works with thunk values",
  fn() {
    const double = (x: number): number => x * 2;
    const mappedDouble = fmap(double);

    const numberThunk: Thunk<number> = () => 5;
    assertEquals(mappedDouble(numberThunk), 10);
  },
});

Deno.test({
  name: "fmap | Transforms types correctly",
  fn() {
    const toString = (n: number): string => n.toString();
    const mappedToString = fmap(toString);

    assertEquals(mappedToString(42), "42");
    assertEquals(mappedToString(() => 42), "42");
  },
});