function isValidDelim(state: any, pos: number) {
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1
  const nextChar = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1
  let can_open = true
  let can_close = true
  if (prevChar === 0x20 || prevChar === 0x09 || (nextChar >= 0x30 && nextChar <= 0x39))
    can_close = false
  if (nextChar === 0x20 || nextChar === 0x09)
    can_open = false
  return { can_open, can_close }
}

function math_inline(state: any, silent: boolean) {
  if (state.src[state.pos] !== '$')
    return false
  const res = isValidDelim(state, state.pos)
  if (!res.can_open) {
    if (!silent)
      state.pending += '$'; state.pos += 1; return true
  }
  const start = state.pos + 1
  let match = start
  while ((match = state.src.indexOf('$', match)) !== -1) {
    let pos = match - 1
    while (state.src[pos] === '\\') pos -= 1
    if ((match - pos) % 2 === 1)
      break
    match += 1
  }
  if (match === -1) {
    if (!silent)
      state.pending += '$'; state.pos = start; return true
  }
  if (match - start === 0) {
    if (!silent)
      state.pending += '$$'; state.pos = start + 1; return true
  }
  const res2 = isValidDelim(state, match)
  if (!res2.can_close) {
    if (!silent)
      state.pending += '$'; state.pos = start; return true
  }
  if (!silent) {
    const token = state.push('math_inline', 'math', 0)
    token.markup = '$'
    token.content = state.src.slice(start, match)
  }
  state.pos = match + 1
  return true
}

function math_block(state: any, start: number, end: number, silent: boolean) {
  let firstLine = ''
  let lastLine = ''
  let found = false
  let next = start
  const pos = state.bMarks[start] + state.tShift[start]
  const max = state.eMarks[start]
  if (pos + 2 > max || state.src.slice(pos, pos + 2) !== '$$')
    return false
  firstLine = state.src.slice(pos + 2, max)
  if (silent)
    return true
  if (firstLine.trim().slice(-2) === '$$') {
    firstLine = firstLine.trim().slice(0, -2)
    found = true
  }
  for (next = start; !found;) {
    next++
    if (next >= end)
      break
    const pos2 = state.bMarks[next] + state.tShift[next]
    const max2 = state.eMarks[next]
    if (pos2 < max2 && state.tShift[next] < state.blkIndent)
      break
    if (state.src.slice(pos2, max2).trim().slice(-2) === '$$') {
      const lastPos = state.src.slice(0, max2).lastIndexOf('$$')
      lastLine = state.src.slice(pos2, lastPos)
      found = true
    }
  }
  state.line = next + 1
  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content = `${firstLine && firstLine.trim() ? `${firstLine}\n` : ''}${state.getLines(start + 1, next, state.tShift[start], true)}${lastLine && lastLine.trim() ? lastLine : ''}`
  token.map = [start, state.line]
  token.markup = '$$'
  return true
}

export default (md: any) => {
  md.inline.ruler.after('escape', 'math_inline', math_inline)
  md.block.ruler.after('blockquote', 'math_block', math_block, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules.math_inline = (tokens: any[], idx: number) => `$${tokens[idx].content}$`
  md.renderer.rules.math_block = (tokens: any[], idx: number) => `$$${tokens[idx].content}$$\n`
}
