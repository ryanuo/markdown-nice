import { describe, expect, it } from 'vitest'
import { markdownParser } from '../app/services/parser/index'

const sampleMd = [
  '# Hello World',
  '',
  'This paragraph has **bold**, *italic*, and `inline code`.',
  '',
  '## Code',
  '',
  '```js',
  'const add = (a, b) => a + b',
  'console.log(add(1, 2))',
  '```',
  '',
  '## Math',
  '',
  'Inline math $E=mc^2$ and block:',
  '',
  '$$',
  '\\int_0^1 x^2 dx = \\frac{1}{3}',
  '$$',
  '',
  '## List',
  '',
  '- item one',
  '- item two',
  '  - nested',
  '',
  '## Link & Footnote',
  '',
  'A ref[^1](https://example.com/footnote)',
  '',
  '## Image',
  '',
  '![example](https://example.com/a.png)',
  '',
].join('\n')

describe('markdownParser (default) parity', () => {
  const html = markdownParser.render(sampleMd)

  it('renders heading span wrappers from spanPlugin', () => {
    expect(html).toContain(
      '<span class="prefix"></span><span class="content">Hello World</span><span class="suffix"></span>',
    )
  })

  it('renders code blocks with custom hljs hook (highlight path)', () => {
    expect(html).toContain('<pre class="custom"><code class="hljs">')
    expect(html).toContain('console.log')
  })

  it('preserves inline math as $..$', () => {
    expect(html).toContain('$E=mc^2$')
  })

  it('preserves block math wrapped in $$ fences', () => {
    expect(html).toContain('$$')
    expect(html).toContain('\\int_0^1 x^2 dx = \\frac{1}{3}')
  })

  it('wraps li children in <section> via liPlugin', () => {
    expect(html).toContain('<li><section>')
  })

  it('renders link-footnote refs as superscript', () => {
    expect(html).toContain('<sup class="footnote-ref">')
  })

  it('renders images untouched', () => {
    expect(html).toContain('<img src="https://example.com/a.png" alt="example">')
  })

  it('produces a stable full-shape snapshot', () => {
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
    expect(html).toMatchSnapshot('default-parser-output')
  })
})
