# Peach.ts

[![Test](https://github.com/rgrannell1/peach.ts/actions/workflows/test.yaml/badge.svg)](https://github.com/rgrannell1/peach.ts/actions/workflows/test.yaml)

Composable fuzz-testing.

Deno Repository: <https://deno.land/x/peach_ts>

```ts
import * as Peach from "https://deno.land/x/peach_ts/src/mod.ts";
```

See <https://rgrannell.xyz/posts/composable-fuzz-testing.html> for details &
motivation.

---

Peach stacks small fuzzing-functions into larger structures.

```ts
const hangulChars = Peach.String.from(
  Peach.String.blocks.hangulSyllables(Peach.Number.uniform),
  5,
);

const sentences = Peach.Array.from(
  Peach.String.concat("here are five hangul characters: ", hangulChars),
  10,
);
```

```ts
[
  "here are five hangul characters: 쌙픪쪰낑풶",
  "here are five hangul characters: 쫌흤몪땻뻝",
  "here are five hangul characters: 뻼킏뮕휋깕",
  "here are five hangul characters: 뿱쪑멤윦꽷",
  "here are five hangul characters: 깯냷퓱됆꽖",
  "here are five hangul characters: 륋뫜촕뎆삞",
  "here are five hangul characters: 쯠솟쮈칺쿂",
  "here are five hangul characters: 춦싁뮦듕쩧",
  "here are five hangul characters: 받빔쑚끿턆",
  "here are five hangul characters: 욯뻷춖먙녊",
];
```

Peach supports the following operations:

- `Peach.Array.*`: construct arrays from other fuzzers
- `Peach.Boolean.*`: generate boolean values
- `Peach.Logic.*`: join other combinators into bigger combinators
- `Peach.Number.*`: generate numbers within a range, according to a
  probability-density function
- `Peach.Object.*`: construct objects from other fuzzers
- `Peach.Set.*`: construct sets from other fuzzers
- `Peach.String.*`: construct strings from unicode character ranges, and simple
  fuzzers like lowercase letters and spaces

Many peach fuzzers are parameterised. For example, `Peach.Object.from`
constructs an object from three subfuzzers; key, value, size. Parameters can be
fixed values

```ts
Peach.Object.from("one-key", "just-one-value", 1);
```

or fuzzers

```ts
Peach.Object.from(
  Peach.String.letters,
  Peach.Boolean.truth,
  Peach.Number.uniform(0, 10),
);
```

Fuzzing ultimately involves selecting values probabilistically. Peach controls
this selection using `density` functions as parameters.

```ts
const density = () => {
  return Math.random() > 0.9 ? 0 : 1;
};

Peach.Logic.oneOf(density, [
  "rare",
  "common",
])();
```

Peach includes two density-function constructors;
`Peach.Number.uniform(from, to)` and `Peach.Number.uniformContinuous(from, to)`
which create integers / floats uniformly over a range.

## License

The MIT License

Copyright (c) 2022 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
