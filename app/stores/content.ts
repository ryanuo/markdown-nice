import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CONTENT, MARKDOWN_THEME_ID, STYLE } from '../utils/constants'
import { replaceStyle } from '../utils/dom'

export const useContentStore = defineStore('content', () => {
  const content = ref('')
  const style = ref('')
  const markdownEditor = ref<unknown>(null)

  function setMarkdownEditor(value: unknown) {
    markdownEditor.value = value
  }

  function setContent(value: string) {
    content.value = value
    window.localStorage.setItem(CONTENT, value)
  }

  function setStyle(value: string) {
    style.value = value
    replaceStyle(MARKDOWN_THEME_ID, value)
  }

  function setCustomStyle(value = '') {
    if (value) {
      window.localStorage.setItem(STYLE, value)
    }
    style.value = window.localStorage.getItem(STYLE) ?? ''
    replaceStyle(MARKDOWN_THEME_ID, style.value)
  }

  return {
    content,
    style,
    markdownEditor,
    setMarkdownEditor,
    setContent,
    setStyle,
    setCustomStyle,
  }
})
