function slugify(s: string, md: any) {
  const spaceRegex = new RegExp(md.utils.lib.ucmicro.Z.source, 'g')
  return encodeURIComponent(s.replace(spaceRegex, ''))
}

export default (md: any, opts: any = {}) => {
  const options = md.utils.assign({ anchorClass: 'markdown-it-headingspan', addHeadingSpan: true, slugify }, opts)
  md.core.ruler.push('heading_span', (state: any) => {
    for (let i = 0; i < state.tokens.length - 1; i++) {
      if (state.tokens[i].type !== 'heading_open' || state.tokens[i + 1].type !== 'inline')
        continue
      const headingInlineToken = state.tokens[i + 1]
      if (!headingInlineToken.content)
        continue
      if (options.addHeadingSpan) {
        const pre = new state.Token('html_inline', '', 0)
        pre.content = '<span class="prefix"></span><span class="content">'
        headingInlineToken.children.unshift(pre)
        const post = new state.Token('html_inline', '', 0)
        post.content = '</span><span class="suffix"></span>'
        headingInlineToken.children.push(post)
      }
      i += 2
    }
  })
}
