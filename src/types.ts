// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributeOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never
