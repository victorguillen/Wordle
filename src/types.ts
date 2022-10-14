export interface Word {
  key: string,
  color: string
}

export interface Keys {
  [key: string]: {
    color: string,
    index: number
  },
}
