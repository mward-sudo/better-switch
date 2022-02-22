import type {BetterSwitch, BetterSwitchError} from './types'
import {bothAreUndefinedOrNull, defaultIsNotFunction, isNotString, isObjectLiteral, matchKeyIsNotFunction, noKeyToReturn} from './runtime-checks'

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

const generateErrorMessage: BetterSwitchError = (error, match, caseObject) => {
  if (error instanceof TypeError) {
    return (bothAreUndefinedOrNull(match, caseObject) && 'BetterSwitch: No arguments have been passed')
        || (!isObjectLiteral(caseObject) && 'BetterSwitch: The caseObject parameter is not an object literal')
        || (isNotString(match) && 'BetterSwitch: The match parameter is not a string')
        || (matchKeyIsNotFunction(match, caseObject) && `BetterSwitch: The '${match}' key in your caseObject parameter does not return a function`)
        || (defaultIsNotFunction(match, caseObject) && `BetterSwitch: The '${match}' key in your caseObject parameter does not exist, and the 'default' key does not return a function`)
        || (noKeyToReturn(match, caseObject) && `BetterSwitch: '${match}' is not a key in your caseObject parameter, and no 'default' key is provided`)
        || `BetterSwitch: Unhandled error (${typeof error})`
  }

  // Shouldn't hit this
  return `BetterSwitch: Unhandled error (${typeof error})`
}

export default betterSwitch
