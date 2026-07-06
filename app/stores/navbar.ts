import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { templates } from '../services/templates'
import {
  CODE_NUM,
  CODE_OPTIONS,
  CODE_THEME_ID,
  IS_CONTAIN_IMG_NAME,
  IS_MAC_CODE,
  IS_SYNC_SCROLL,
  PREVIEW_TYPE,
  TEMPLATE_NUM,
} from '../utils/constants'
import { replaceStyle } from '../utils/dom'

function readBoolean(key: string, fallback: string): boolean {
  const raw = window.localStorage.getItem(key)
  return raw === null ? fallback === 'true' : raw === 'true'
}

function applyCodeTheme(codeNum: number, isMac: boolean): void {
  const option = CODE_OPTIONS[codeNum]
  if (codeNum !== 0 && option) {
    const macId = 'macId' in option ? option.macId : undefined
    replaceStyle(CODE_THEME_ID, templates.code[isMac && macId ? macId : option.id] ?? '')
  }
  else {
    // WeChat style: clear the injected CSS (the preview template handles it).
    replaceStyle(CODE_THEME_ID, '')
  }
}

export const useNavbarStore = defineStore('navbar', () => {
  const isSyncScroll = ref(true)
  const isContainImgName = ref(false)
  const templateNum = ref(0)
  const codeNum = ref(0)
  const isMacCode = ref(false)
  const previewType = ref('mobile')

  function setSyncScroll(value: boolean) {
    isSyncScroll.value = value
    window.localStorage.setItem(IS_SYNC_SCROLL, String(value))
  }

  function setContainImgName(value: boolean) {
    isContainImgName.value = value
    window.localStorage.setItem(IS_CONTAIN_IMG_NAME, String(value))
  }

  function setTemplateNum(value: number) {
    templateNum.value = value
    window.localStorage.setItem(TEMPLATE_NUM, String(value))
  }

  function setCodeNum(value: number, isMac: boolean) {
    codeNum.value = value
    window.localStorage.setItem(CODE_NUM, String(value))
    applyCodeTheme(value, isMac)
  }

  function setMacCode(value: boolean) {
    isMacCode.value = value
    window.localStorage.setItem(IS_MAC_CODE, String(value))
  }

  function setPreviewType(value: string) {
    previewType.value = value
    window.localStorage.setItem(PREVIEW_TYPE, value)
  }

  // Re-apply the code theme when either codeNum or isMacCode changes.
  watch([codeNum, isMacCode], ([code, mac]) => applyCodeTheme(code, mac))

  return {
    isSyncScroll,
    isContainImgName,
    templateNum,
    codeNum,
    isMacCode,
    previewType,
    setSyncScroll,
    setContainImgName,
    setTemplateNum,
    setCodeNum,
    setMacCode,
    setPreviewType,
  }
})
