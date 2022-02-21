type BetterSwitch = <T>(match: string, caseObject: Record<string, CaseObjectFunction<T>>) => T
type CaseObjectFunction<T> = () => T

// BetterSwitchTest and BetterSwitchError both reuse the parameters from BetterSwitch
type BetterSwitchTest = (...args: Parameters<BetterSwitch>) => boolean
type BetterSwitchError = (error: unknown, ...args: Parameters<BetterSwitch>) => string

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
const betterSwitch: BetterSwitch = (match, caseObject) => {
  try {
    // If caseObject[match]() does not exist, return caseObject.default()
    return match in caseObject ? caseObject[match]() : caseObject.default()
  } catch (error: unknown) {
    // Handle errors when trying to call caseObject[match]() or caseObject.default()
    throw new Error(generateErrorMessage(error, match, caseObject))
  }
}

// Test if caseObject[match] exists and if caseObject[match] is not returning a function
const matchKeyIsNotFunction: BetterSwitchTest = (match, caseObject) => match in caseObject && typeof caseObject[match] !== 'function'
// Test if caseObject.defaul exists and if caseObject.defaul is not returning a function
const defaultIsNotFunction: BetterSwitchTest = (match, caseObject) => 'default' in caseObject && typeof caseObject.default !== 'function'
/** Tests if caseObject[match] does not exist and if caseObject.default does not exist */
const noKeyToReturn: BetterSwitchTest = (match, caseObject) => !(match in caseObject) && !('default' in caseObject)

const generateErrorMessage: BetterSwitchError = (error, match, caseObject) => {
  if (error instanceof TypeError) {
    if (matchKeyIsNotFunction(match, caseObject)) {
      return `BetterSwitch: The '${match}' key in your caseObject parameter does not return a function`
    }

    if (defaultIsNotFunction(match, caseObject)) {
      return `BetterSwitch: The '${match}' key in your caseObject parameter does not exist, and the 'default' key does not return a function`
    }

    if (noKeyToReturn(match, caseObject)) {
      return `BetterSwitch: '${match}' is not a key in your caseObject parameter, and no 'default' key is provided`
    }
  }

  // Shouldn't hit this
  return `BetterSwitch: Unhandled error (${typeof error})`
}

export default betterSwitch
