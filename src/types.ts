export interface Options<Auto extends boolean> {
  verbose?: boolean
  auto: Auto
  replace: isTrue<Auto> extends true ? string | RegExp | ((source: string) => string) : never
}

type isTrue<T> = T extends true ? true : false

export type UserOptions = Options<true> | Options<false>

export type GeneralOptions = Partial<Options<true>> | Partial<Options<false>>
