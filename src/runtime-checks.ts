import type {BetterSwitchTest, CaseObject} from './types'

// Both of the parameters are undefined or null
export const bothAreUndefinedOrNull: BetterSwitchTest = (match, caseObject) => (match === undefined || match === null) && (caseObject === undefined || caseObject === null)

// Test if caseObject[match] exists and if caseObject[match] is not returning a function
export const matchKeyIsNotFunction: BetterSwitchTest = (match, caseObject) => match in caseObject && typeof caseObject[match] !== 'function'

// Test if caseObject.defaul exists and if caseObject.defaul is not returning a function
export const defaultIsNotFunction: BetterSwitchTest = (match, caseObject) => 'default' in caseObject && typeof caseObject.default !== 'function'

/** Tests if caseObject[match] does not exist and if caseObject.default does not exist */
export const noKeyToReturn: BetterSwitchTest = (match, caseObject) => !(match in caseObject) && !('default' in caseObject)

/** Test if match is not a string */
export const isNotString = (match: string) => typeof match !== 'string'

// Test if parameter is an object literal
export const isObjectLiteral = (object: CaseObject<unknown>) => object !== null && object !== undefined && Object.is(object.constructor, Object)

