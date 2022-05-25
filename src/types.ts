export interface Options {
  verbose?: boolean
  auto: boolean
  replacer: string | ((line: string) => string)
}

export type GeneralOptions = Partial<Options>
