/* eslint-disable @typescript-eslint/no-explicit-any */
export const resolveValue = <T>(value: ((...a: any[]) => T) | T, ...args: any[]): T =>
  typeof value === 'function' ? (value as (...a: any[]) => T)(...args) : value
