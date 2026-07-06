export function transCode(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export function deCode(str: string) {
  return decodeURIComponent(escape(window.atob(str)))
}
