import { message } from 'antd'
import prettierMarkdown from 'prettier/parser-markdown'
import prettier from 'prettier/standalone'

const wrapChar = /windows|win32/i.test(navigator.userAgent) ? '\r\n' : '\n'

function handleWechatOuterLink(content) {
  const linkImgReg = /(!)*\[.*?\]\(((?!mp.weixin.qq.com).)*?\)/g
  const res = content.match(linkImgReg) // 匹配到图片、链接和脚注

  if (res === null) {
    return content
  }

  const footReg = /.*?\(.*?"(.*?)".*?\)/
  const filterRes = res.filter((val) => {
    const comment = val.match(footReg)
    if (val[0] === '!') {
      return false
    }
    if (comment && comment[1] !== '') {
      return false
    }
    return true
  }) // 过滤掉图片和脚注

  if (filterRes.length > 0) {
    filterRes.forEach((val) => {
      const linkReg = /\[(.*?)\]\((.*?)\)/ // 匹配链接中具体的值
      const matchValue = val.match(linkReg)
      const name = matchValue[1]
      const url = matchValue[2].trim()

      const newVal = `[${name}](${url} "${name}")`
      content = content.replace(val, newVal)
    })
    return content
  }
  else {
    return content
  }
}

export function parseLinkToFoot(content, store) {
  content = handleWechatOuterLink(content)
  content = content.replace(/([\u4E00-\u9FA5])\$/g, '$1 $')
  content = content.replace(/\$([\u4E00-\u9FA5])/g, '$ $1')
  store.setContent(content)
  message.success('微信外链转脚注完成！')
}

function handlePrettierDoc(content) {
  const prettierRes = prettier.format(content, {
    parser: 'markdown',
    plugins: [prettierMarkdown],
  })
  return prettierRes
}

export function formatDoc(content, store) {
  content = handlePrettierDoc(content)
  content = content.replace(/([\u4E00-\u9FA5])\$/g, '$1 $')
  content = content.replace(/\$([\u4E00-\u9FA5])/g, '$ $1')
  store.setContent(content)
  message.success('格式化文档完成！')
}

export function bold(editor, selection) {
  editor.replaceSelection(`**${selection}**`)
  const cursor = editor.getCursor()
  cursor.ch -= 2
  editor.setCursor(cursor)
}

export function del(editor, selection) {
  editor.replaceSelection(`~~${selection}~~`)
  const cursor = editor.getCursor()
  cursor.ch -= 2
  editor.setCursor(cursor)
}

export function italic(editor, selection) {
  editor.replaceSelection(`*${selection}*`)
  const cursor = editor.getCursor()
  cursor.ch -= 1
  editor.setCursor(cursor)
}

export function code(editor, selection) {
  editor.replaceSelection(`${wrapChar}\`\`\`${wrapChar}${selection}${wrapChar}\`\`\`${wrapChar}`)
  const cursor = editor.getCursor()
  cursor.line -= 2
  editor.setCursor(cursor)
}

export function inlineCode(editor, selection) {
  editor.replaceSelection(`\`${selection}\``)
  const cursor = editor.getCursor()
  cursor.ch -= 1
  editor.setCursor(cursor)
}

export function h1(editor, selection) {
  editor.replaceSelection(`# ${selection}`)
}

export function h2(editor, selection) {
  editor.replaceSelection(`## ${selection}`)
}

export function h3(editor, selection) {
  editor.replaceSelection(`### ${selection}`)
}
