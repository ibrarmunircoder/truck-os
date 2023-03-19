/* eslint-disable @roq/filename-suffix-mismatch */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
