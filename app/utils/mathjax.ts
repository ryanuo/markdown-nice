// @env browser
export function updateMathjax() {
  if (typeof window === 'undefined' || !(window as any).MathJax)
    return
  const mjx = (window as any).MathJax
  mjx.texReset()
  mjx.typesetClear()
  if (typeof mjx.typesetPromise === 'function') {
    mjx.typesetPromise()
  }
}
