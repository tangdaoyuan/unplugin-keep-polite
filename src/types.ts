export interface Options {
  verbose?: boolean
  autoReplace: boolean
  replacer: string | ((line: string) => string)
  customDict?: string[] | {
    path: string
  }
}

export type GeneralOptions = Partial<Options>
