// @env browser
export function isPC() {
  const ua = navigator.userAgent
  return !['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'].some(v => ua.includes(v))
}

export function isPlatformWindows() {
  return /windows|win32/i.test(navigator.userAgent)
}
