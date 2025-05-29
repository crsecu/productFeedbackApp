/* 
This function is useful for narrowing types in cases where a value may be "undefined" such as the return type of an array method like ".find()", or results from third-party code.
It uses an assertion signature to help TS refine the type of the "valueToCheck" parameter. 
If "valueToCheck" is falsy, it logs an error to the console and stops execution. 
*/

export default function assert(
  valueToCheck: unknown,
  msg?: string
): asserts valueToCheck {
  if (!valueToCheck) {
    console.error(msg);
  }
}

export function isKeyOf<T extends object>(
  obj: T,
  key: string
): key is Extract<keyof T, string> {
  return key in obj;
}
