export type Thunk<T> = () => T;
export type Wrapped<T> = T | Thunk<T>;

export function unwrap<T>(val: Wrapped<T>): T {
  return typeof val === "function" ? (val as Thunk<T>)() : val;
}

export type Density = (
  from: Wrapped<number>,
  to: Wrapped<number>,
) => Wrapped<number>;
