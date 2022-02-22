export type BetterSwitch = <T>(match: string, caseObject: CaseObject<T>) => T
export type CaseObject<T> = Record<string, CaseObjectFunction<T>>
export type CaseObjectFunction<T> = () => T
// BetterSwitchTest and BetterSwitchError both reuse the parameters from BetterSwitch
export type BetterSwitchTest = (...args: Parameters<BetterSwitch>) => boolean
export type BetterSwitchError = (error: unknown, ...args: Parameters<BetterSwitch>) => string
