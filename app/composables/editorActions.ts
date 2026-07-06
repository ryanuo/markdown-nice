import type { EditorView } from '@codemirror/view'

const EOL_RE = /windows|win32/i

function getWrapChar() {
  return typeof navigator !== 'undefined' && EOL_RE.test(navigator.userAgent) ? '\r\n' : '\n'
}

function getValue(view: EditorView) {
  return view.state.doc.toString()
}

function getSelection(view: EditorView) {
  const { from, to } = view.state.selection.main
  return view.state.sliceDoc(from, to)
}

function replaceSelection(view: EditorView, text: string) {
  const { from, to } = view.state.selection.main
  view.dispatch({ changes: { from, to, insert: text } })
}

function setCursor(view: EditorView, pos: number) {
  view.dispatch({ selection: { anchor: pos } })
}

export function bold(view: EditorView) {
  const sel = getSelection(view)
  replaceSelection(view, `**${sel}**`)
  const pos = view.state.selection.main.from - 2
  setCursor(view, pos)
}

export function del(view: EditorView) {
  const sel = getSelection(view)
  replaceSelection(view, `~~${sel}~~`)
  const pos = view.state.selection.main.from - 2
  setCursor(view, pos)
}

export function italic(view: EditorView) {
  const sel = getSelection(view)
  replaceSelection(view, `*${sel}*`)
  const pos = view.state.selection.main.from - 1
  setCursor(view, pos)
}

export function inlineCode(view: EditorView) {
  const sel = getSelection(view)
  replaceSelection(view, `\`${sel}\``)
  const pos = view.state.selection.main.from - 1
  setCursor(view, pos)
}

export function code(view: EditorView) {
  const sel = getSelection(view)
  const wrapChar = getWrapChar()
  replaceSelection(view, `${wrapChar}\`\`\`${wrapChar}${sel}${wrapChar}\`\`\`${wrapChar}`)
  const pos = view.state.selection.main.from - 2 - wrapChar.length * 2
  setCursor(view, Math.max(0, pos))
}

export function h1(view: EditorView) {
  replaceSelection(view, `# ${getSelection(view)}`)
}

export function h2(view: EditorView) {
  replaceSelection(view, `## ${getSelection(view)}`)
}

export function h3(view: EditorView) {
  replaceSelection(view, `### ${getSelection(view)}`)
}

export function formatDoc(content: string): string {
  return content
    .split('\n')
    .map(l => l.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}

export function parseLinkToFoot(content: string): string {
  const linkImgReg = /(!)*\[.*?\]\(((?!mp.weixin.qq.com).)*?\)/g
  const res = content.match(linkImgReg)
  if (res === null)
    return content
  const footReg = /.*?\(.*?"(.*?)".*?\)/
  const filterRes = res.filter((val) => {
    const comment = val.match(footReg)
    if (val[0] === '!')
      return false
    if (comment && comment[1] !== '')
      return false
    return true
  })
  if (filterRes.length > 0) {
    filterRes.forEach((val) => {
      const linkReg = /\[(.*?)\]\((.*?)\)/
      const matchValue = val.match(linkReg)
      const name = matchValue![1]
      const url = matchValue![2].trim()
      const newVal = `[${name}](${url} "${name}")`
      content = content.replace(val, newVal)
    })
  }
  content = content.replace(/([\u4E00-\u9FA5])\$/g, '$1 $')
  content = content.replace(/\$([\u4E00-\u9FA5])/g, '$ $1')
  return content
}

export function buildFormFormat(rowNum: number, columnNum: number): string {
  const wrapCh = /windows|win32/i.test(navigator.userAgent) ? '\r\n' : '\n'
  let result = ''
  for (let r = 0; r < rowNum; r++) {
    let row = '|'
    if (r === 0) {
      for (let c = 0; c < columnNum; c++) row += ' --- |'
    }
    else {
      for (let c = 0; c < columnNum; c++) row += '     |'
    }
    result += row + wrapCh
  }
  return result
}

export function insertTable(view: EditorView, rowNum: number, columnNum: number) {
  const text = buildFormFormat(rowNum, columnNum)
  replaceSelection(view, text)
  setCursor(view, view.state.selection.main.from)
}
