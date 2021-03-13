
export const getNowDateAt = () => {
  return new Date().toISOString()
}

export const isServer = () => {
  return typeof window === 'undefined'
}