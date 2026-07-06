// Global client-side initializer.
//
// WHY THIS EXISTS
// ---------------
// In a Nuxt SSR (app.vue rendered on the server, hydrated on the client):
//   - Pinia setup() runs on the server, sees `import.meta.client === false`,
//     and skips its initialization block. State stays at seed values (empty).
//   - On the client Nuxt *hydrates* the existing store from the serialized
//     state. Setup() does NOT re-run. The `if (import.meta.client)` block is
//     dead code on both ends.
//
// Symptoms:
//   - content.md seed never applied -> editor starts empty even on first run
//   - localStorage never read back -> previous session lost on reload
//   - `addStyleLabel` never runs -> `<style id="code-theme">` never created,
//     code blocks injected by markdown-it-highlightjs remain unstyled
//
// This plugin runs exactly once on the client, AFTER Pinia is installed
// (plugins load before app setup) and BEFORE any component mounts. It seeds
// localStorage defaults, patches the Pinia stores, registers the four style
// tags, and applies theme CSS.
import { defineNuxtPlugin } from '#imports'
import { templates } from '~/services/templates'
import { useContentStore } from '~/stores/content'
import { useNavbarStore } from '~/stores/navbar'
import {
  BASIC_THEME_ID,
  CODE_NUM,
  CODE_OPTIONS,
  CODE_THEME_ID,
  CONTENT,
  IS_CONTAIN_IMG_NAME,
  IS_MAC_CODE,
  IS_SYNC_SCROLL,
  MARKDOWN_THEME_ID,
  PREVIEW_TYPE,
  STYLE,
  STYLE_LABELS,
  TEMPLATE_CUSTOM_NUM,
  TEMPLATE_NUM,
  TEMPLATE_OPTIONS,
} from '~/utils/constants'
import { addStyleLabel, replaceStyle } from '~/utils/dom'

export default defineNuxtPlugin(() => {
  if (!import.meta.client)
    return

  // 1. Persist sane localStorage defaults the first time around.
  if (window.localStorage.getItem(CONTENT) === null)
    window.localStorage.setItem(CONTENT, templates.content)
  if (!window.localStorage.getItem(STYLE))
    window.localStorage.setItem(STYLE, templates.style.custom!)
  if (!window.localStorage.getItem(TEMPLATE_NUM))
    window.localStorage.setItem(TEMPLATE_NUM, '0')
  if (!window.localStorage.getItem(CODE_NUM))
    window.localStorage.setItem(CODE_NUM, '1')
  if (!window.localStorage.getItem(PREVIEW_TYPE))
    window.localStorage.setItem(PREVIEW_TYPE, 'mobile')
  if (!window.localStorage.getItem(IS_SYNC_SCROLL))
    window.localStorage.setItem(IS_SYNC_SCROLL, 'true')
  if (!window.localStorage.getItem(IS_CONTAIN_IMG_NAME))
    window.localStorage.setItem(IS_CONTAIN_IMG_NAME, 'false')
  if (!window.localStorage.getItem(IS_MAC_CODE))
    window.localStorage.setItem(IS_MAC_CODE, 'true')

  const templateNum = Number.parseInt(window.localStorage.getItem(TEMPLATE_NUM) || '0', 10)
  const codeNum = Number.parseInt(window.localStorage.getItem(CODE_NUM) || '1', 10)
  const isMac = (window.localStorage.getItem(IS_MAC_CODE) || 'true') === 'true'

  // 2. Apply theme CSS.
  const style
    = templateNum === TEMPLATE_CUSTOM_NUM
      ? (window.localStorage.getItem(STYLE) ?? '')
      : (templateNum ? templates.style[TEMPLATE_OPTIONS[templateNum]!.id]! : templates.style.normal!)

  addStyleLabel(STYLE_LABELS)
  replaceStyle(BASIC_THEME_ID, templates.basic)
  replaceStyle(MARKDOWN_THEME_ID, style)

  // Apply the chosen code theme.
  const option = CODE_OPTIONS[codeNum]
  if (option && codeNum !== 0) {
    const macId = 'macId' in option ? option.macId : undefined
    replaceStyle(CODE_THEME_ID, templates.code[isMac && macId ? macId : option.id] ?? '')
  }

  // 3. Patch Pinia stores with the persisted values, so every component that
  //    reads `content`, `templateNum`, `codeNum`... sees the real state
  //    at mount time — no flash of empty/default content.
  const navbar = useNavbarStore()
  navbar.$patch({
    templateNum,
    codeNum,
    isMacCode: isMac,
    previewType: window.localStorage.getItem(PREVIEW_TYPE) || 'mobile',
    isSyncScroll: (window.localStorage.getItem(IS_SYNC_SCROLL) || 'true') === 'true',
    isContainImgName: (window.localStorage.getItem(IS_CONTAIN_IMG_NAME) || 'false') === 'true',
  })

  const content = useContentStore()
  content.$patch({
    content: window.localStorage.getItem(CONTENT) ?? '',
    style,
  })
})
