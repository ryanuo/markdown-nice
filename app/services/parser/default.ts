import MarkdownIt from 'markdown-it'
import hljs from '../highlight/index'
import imageflowPlugin from '../plugins/imageflow'
import liPlugin from '../plugins/li'
import linkfootPlugin from '../plugins/linkfoot'
import mathPlugin from '../plugins/math'
import spanPlugin from '../plugins/span'

// Default parser with highlight.js. Mirrors src/utils/helper.js markdownParser.
export const markdownParser = new MarkdownIt({
  html: true,
  breaks: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const formatted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;').replace(/span&nbsp;/g, 'span ')
        return `<pre class="custom"><code class="hljs">${formatted}</code></pre>`
      }
      catch (e) {
        console.error(e)
      }
    }
    return `<pre class="custom"><code class="hljs">${markdownParser.utils.escapeHtml(str).replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;').replace(/span&nbsp;/g, 'span ')}</code></pre>`
  },
})

markdownParser
  .use(spanPlugin)
  .use(mathPlugin)
  .use(linkfootPlugin)
  .use(liPlugin)
  .use(imageflowPlugin)
