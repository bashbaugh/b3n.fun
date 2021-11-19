/** Return arbitrary random number beteen min and max */
export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min

/** Return random int beteen min and max */
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)
