const defaultOption = { limitless: false, limit: 10 }

export default (md: any, opt?: Partial<typeof defaultOption>) => {
  const options = opt || defaultOption
  md.renderer.rules.imageFlow = (tokens: any[], idx: number) => {
    const contents = tokens[idx].meta as string[]
    let wrappedContent = ''
    for (const content of contents) {
      const [, alt] = content.match(/\[([^[\]]*)\]/)!
      const [, src] = content.match(/[^[]*\(([^()]*)\)[^\]]*/)!
      wrappedContent += `<section class="imageflow-layer3"><img alt="${alt}" src="${src}" class="imageflow-img" /></section>`
    }
    return `<section class="imageflow-layer1"><section class="imageflow-layer2">${wrappedContent}</section></section>`
  }
  md.block.ruler.before('paragraph', 'imageFlow', (state: any, start: number) => {
    let token
    const matchReg = /^<((!\[[^[\]]*\]\([^()]+\)(,?\s*(?=>)|,\s*(?!>)))+)>/
    const srcLine = state.src.slice(state.bMarks[start], state.eMarks[start])
    if (srcLine.charCodeAt(0) !== 0x3C)
      return false
    const match = matchReg.exec(srcLine)
    if (match) {
      const images = match[1]!.match(/\[[^\]]*\]\([^)]+\)/g)
      if (!options.limitless && images!.length <= (options.limit ?? 0)) {
        token = state.push('imageFlow', '', 0)
        token.meta = images
        token.block = true
        state.line++
        return true
      }
    }
    return false
  })
}
