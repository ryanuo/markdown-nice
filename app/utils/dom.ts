export function replaceStyle(id: string, css: string): void {
  let style = document.getElementById(id) as HTMLStyleElement | null
  // Self-healing: if the style element does not exist yet (e.g. store inits
  // before the plugin created it), create and append it. The old version
  // silently returned here, causing code-theme to stay empty on first load.
  if (!style) {
    style = document.createElement('style')
    style.id = id
    const head = document.getElementsByTagName('head')[0]
    head?.appendChild(style)
  }
  try {
    style.innerHTML = css
  }
  catch (e) {
    ;(style as any).styleSheet.cssText = css
  }
  if (style.parentNode !== document.head) {
    document.head.appendChild(style)
  }
}

export function addStyleLabel(styleLabels: string[]): void {
  const head = document.getElementsByTagName('head')[0]
  if (!head)
    return
  for (const name of styleLabels) {
    if (!document.getElementById(name)) {
      const style = document.createElement('style')
      style.id = name
      head.appendChild(style)
    }
  }
}

export function download(content: string | Blob, filename: string): void {
  const blob = content instanceof Blob ? content : new Blob([content])
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
