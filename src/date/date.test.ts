import * as Peach from "../mod.ts";

Deno.test({
  name: "Date.uniform | Same date range returns same date",
  fn() {
    const timestamp = new Date("2023-01-01").getTime();
    const gen = Peach.Date.uniform(timestamp, timestamp);

    const result = gen();
    if (result.getTime() !== timestamp) {
      throw new Error("uniform date range should return exact timestamp");
    }
  },
});

Deno.test({
  name: "Date.uniform | Always in range",
  fn() {
    const fromDate = new Date("2020-01-01").getTime();
    const toDate = new Date("2025-01-01").getTime();

    const gen = Peach.Date.uniform(fromDate, toDate);

    for (let idx = 0; idx < 1_000; idx++) {
      const result = gen();
      const timestamp = result.getTime();

      if (timestamp < fromDate || timestamp > toDate) {
        throw new Error(`Date out of range ${fromDate}...${toDate}: ${timestamp}`);
      }
    }
  },
});

Deno.test({
  name: "Date.pastUniform | Always in past range",
  fn() {
    const fromDate = new Date("2020-01-01").getTime();
    const now = Date.now();

    const gen = Peach.Date.pastUniform(fromDate);

    for (let idx = 0; idx < 1_000; idx++) {
      const result = gen();
      const timestamp = result.getTime();

      if (timestamp < fromDate || timestamp > now + 1000) {
        throw new Error(`Date out of range ${fromDate}...${now}: ${timestamp}`);
      }
    }
  },
});
