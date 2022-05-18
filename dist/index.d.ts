declare module '@scripthungry/better-switch/src/index' {
  import type { BetterSwitch } from '@scripthungry/better-switch/src/types';
  /**
   * A simple switch statement replacement that matches a string key and returns a value
   *
   * @param match - A string which should match a key in caseObject.
   * @param caseObject - An object with a string key with a value containing a function that
   *                     returns something.
   *                     A key of 'default' can be used to return a value if the parameter
   *                     match does not match a key in caseObject.
   *                     In typescript the returned values must all be of the same type
   * @returns The value from the matching or default key from caseObject
   */
  export const betterSwitch: BetterSwitch;
  export default betterSwitch;

}
declare module '@scripthungry/better-switch/src/runtime-checks' {
  import type { BetterSwitchTest, CaseObject } from '@scripthungry/better-switch/src/types';
  export const bothAreUndefinedOrNull: BetterSwitchTest;
  export const matchKeyIsNotFunction: BetterSwitchTest;
  export const defaultIsNotFunction: BetterSwitchTest;
  /** Tests if caseObject[match] does not exist and if caseObject.default does not exist */
  export const noKeyToReturn: BetterSwitchTest;
  /** Test if match is not a string */
  export const isNotString: (match: string) => boolean;
  export const isObjectLiteral: (object: CaseObject<unknown>) => boolean;

}
declare module '@scripthungry/better-switch/src/types' {
  export type BetterSwitch = <T>(match: string, caseObject: CaseObject<T>) => T;
  export type CaseObject<T> = Record<string, CaseObjectFunction<T>>;
  export type CaseObjectFunction<T> = () => T;
  export type BetterSwitchTest = (...args: Parameters<BetterSwitch>) => boolean;
  export type BetterSwitchError = (error: unknown, ...args: Parameters<BetterSwitch>) => string;

}
declare module '@scripthungry/better-switch/tests/better-switch-errors.test' {
  export {};

}
declare module '@scripthungry/better-switch/tests/better-switch.test' {
  export {};

}
declare module '@scripthungry/better-switch' {
  import main = require('@scripthungry/better-switch/src/index');
  export = main;
}