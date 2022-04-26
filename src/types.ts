export interface Options {
  verbose?: boolean
  auto: boolean
  replace: string | RegExp | ((source: string) => string)
}

export type GeneralOptions = Partial<Options>
