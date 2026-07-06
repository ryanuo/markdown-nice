import MarkdownIt from 'markdown-it'
import imageflowPlugin from '../plugins/imageflow'
import liPlugin from '../plugins/li'
import linkfootPlugin from '../plugins/linkfoot'
import mathPlugin from '../plugins/math'
import removeprePlugin from '../plugins/removepre'
import spanPlugin from '../plugins/span'

// WeChat code-highlight parser. Mirrors src/utils/helper.js markdownParserWechat.
export const markdownParserWechat = new MarkdownIt({
  html: true,
  breaks: true,
  highlight: (str: string, lang: string) => {
    const text = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const lines = text.split('\n')
    const codeLines: string[] = []
    const numbers: string[] = []
    for (let i = 0; i < lines.length - 1; i++) {
      codeLines.push(`<code><span class="code-snippet_outer">${lines[i] || '<br>'}</span></code>`)
      numbers.push('<li></li>')
    }
    return (
      `<section class="code-snippet__fix code-snippet__js">`
      + `<ul class="code-snippet__line-index code-snippet__js">${numbers.join('')}</ul>`
      + `<pre class="code-snippet__js" data-lang="${lang}">${codeLines.join('')}</pre>`
      + `</section>`
    )
  },
})

markdownParserWechat
  .use(spanPlugin)
  .use(removeprePlugin)
  .use(mathPlugin)
  .use(linkfootPlugin)
  .use(liPlugin)
  .use(imageflowPlugin)
