import juice from 'juice'
import { BASIC_THEME_ID, BOX_ID, CODE_THEME_ID, FONT_THEME_ID, LAYOUT_ID, MARKDOWN_THEME_ID, MJX_DATA_FORMULA } from '~/utils/constants'

export function solveWeChatMath() {
  const layout = document.getElementById(LAYOUT_ID)
  if (!layout)
    return
  const mjxs = layout.getElementsByTagName('mjx-container')
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i]
    if (!mjx.hasAttribute('jax'))
      break
    mjx.removeAttribute('jax')
    mjx.removeAttribute('display')
    mjx.removeAttribute('tabindex')
    mjx.removeAttribute('ctxtmenu_counter')
    const svg = mjx.firstChild as SVGElement | null
    if (svg) {
      const width = svg.getAttribute('width')
      const height = svg.getAttribute('height')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      if (width)
        svg.style.width = width
      if (height)
        svg.style.height = height
    }
  }
}

export function solveZhihuMath() {
  const layout = document.getElementById(LAYOUT_ID)
  if (!layout)
    return
  const mjxs = layout.getElementsByTagName('mjx-container')
  while (mjxs.length > 0) {
    const mjx = mjxs[0]
    let data = mjx.getAttribute(MJX_DATA_FORMULA)
    if (!data)
      continue
    if (mjx.hasAttribute('display') && !data.includes('\\tag')) {
      data += '\\\\'
    }
    mjx.outerHTML = `<img class="Formula-image" data-eeimg="true" src="" alt="${data}">`
  }
}

export function solveJuejinMath() {
  const layout = document.getElementById(LAYOUT_ID)
  if (!layout)
    return
  const mjxs = layout.getElementsByTagName('mjx-container')
  while (mjxs.length > 0) {
    const mjx = mjxs[0]
    const data = mjx.getAttribute(MJX_DATA_FORMULA)
    if (!data)
      continue
    if (mjx.hasAttribute('display')) {
      mjx.outerHTML = `<figure><img class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></figure>`
    }
    else {
      mjx.outerHTML = `<span><img style="display:inline;" class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></span>`
    }
  }
}

export function juejinSuffix() {
  const suffix = document.createElement('p')
  suffix.id = 'nice-suffix-juejin-container'
  suffix.className = 'nice-suffix-juejin-container'
  suffix.innerHTML = `本文使用 <a href="https://mdnice.com">mdnice</a> 排版`
  const element = document.getElementById(LAYOUT_ID)
  if (element)
    element.appendChild(suffix)
}

export function solveHtml() {
  const element = document.getElementById(BOX_ID)
  if (!element)
    return ''
  const inner = (element.children[0] as HTMLElement | undefined)?.children
  if (inner) {
    for (const item of Array.from(inner) as HTMLElement[]) {
      item.setAttribute('data-tool', 'mdnice编辑器')
    }
  }
  let html = element.innerHTML
  html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, '<span $1</span>')
  html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline')
  html = html.replace(/svg><\/span>\s/g, 'svg></span>&nbsp;')
  html = html.replace(/mjx-container/g, 'section')
  html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"')
  html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, '')
  const basicStyle = (document.getElementById(BASIC_THEME_ID) as HTMLStyleElement | null)?.innerText ?? ''
  const markdownStyle = (document.getElementById(MARKDOWN_THEME_ID) as HTMLStyleElement | null)?.innerText ?? ''
  const codeStyle = (document.getElementById(CODE_THEME_ID) as HTMLStyleElement | null)?.innerText ?? ''
  const fontStyle = (document.getElementById(FONT_THEME_ID) as HTMLStyleElement | null)?.innerText ?? ''
  let res = ''
  try {
    res = juice.inlineContent(html, basicStyle + markdownStyle + codeStyle + fontStyle, {
      inlinePseudoElements: true,
      preserveImportant: true,
    })
  }
  catch (e) {
    console.error('CSS 文件可能编写不正确', e)
  }
  return res
}

export function copySafari(text: string) {
  let input = document.getElementById('copy-input') as HTMLInputElement | null
  if (!input) {
    input = document.createElement('input')
    input.id = 'copy-input'
    input.style.position = 'absolute'
    input.style.left = '-1000px'
    input.style.zIndex = '-1000'
    document.body.appendChild(input)
  }
  input.value = 'NOTHING'
  input.setSelectionRange(0, 1)
  input.focus()
  document.addEventListener(
    'copy',
    function copyCall(e: ClipboardEvent) {
      e.preventDefault()
      e.clipboardData?.setData('text/html', text)
      e.clipboardData?.setData('text/plain', text)
      document.removeEventListener('copy', copyCall)
    },
  )
  document.execCommand('copy')
}
