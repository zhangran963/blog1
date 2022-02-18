class Token {
  private tokenKey: string
  constructor() {
    this.tokenKey = 'token'
  }
  get() {
    return localStorage.getItem(this.tokenKey)
  }

  set(val: string) {
    localStorage.setItem(this.tokenKey, val)
  }

  remove() {
    localStorage.removeItem(this.tokenKey)
  }
}

export const token = new Token()
