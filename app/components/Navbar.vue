<script setup lang="ts">
import { computed, ref } from 'vue'
import { bold, code, del, formatDoc, inlineCode, italic, parseLinkToFoot } from '~/composables/editorActions'
import { templates } from '~/services/templates'
import { useContentStore } from '~/stores/content'
import { useDialogStore } from '~/stores/dialog'
import { useImageHostingStore } from '~/stores/imageHosting'
import { useNavbarStore } from '~/stores/navbar'
import { useTitleStore } from '~/stores/title'
import { useViewStore } from '~/stores/view'
import { CODE_OPTIONS, EXPORT_FILENAME_SUFFIX, FONT_THEME_ID, RIGHT_SYMBOL, TEMPLATE_OPTIONS } from '~/utils/constants'
import { dateFormat, download } from '~/utils/date'
import { replaceStyle } from '~/utils/dom'

const contentStore = useContentStore()
const navbarStore = useNavbarStore()
const viewStore = useViewStore()
const dialogStore = useDialogStore()
const titleStore = useTitleStore()
const imageHostingStore = useImageHostingStore()

const editor = computed(() => contentStore.markdownEditor as any)

function applyEditorAction(fn: (view: any) => void) {
  if (!editor.value)
    return
  fn(editor.value)
  contentStore.setContent(editor.value.state.doc.toString())
  editor.value.focus()
}

// File menu actions
function exportMarkdown() {
  const content = editor.value?.state.doc.toString() ?? contentStore.content
  download(content, dateFormat(new Date(), 'yyyy-MM-dd') + EXPORT_FILENAME_SUFFIX)
}

function exportPdf() {
  setTimeout(() => window.print(), 500)
}

function onImportFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file)
    return
  const reader = new FileReader()
  reader.onload = () => contentStore.setContent(String(reader.result ?? ''))
  reader.readAsText(file)
  input.value = ''
}

// Pattern menu actions
function formatDocument() {
  contentStore.setContent(formatDoc(contentStore.content))
}

function linkToFoot() {
  contentStore.setContent(parseLinkToFoot(contentStore.content))
}

const isSerif = ref(false)
function toggleFont() {
  const serif = `#nice { font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; }`
  const sansSerif = `#nice { font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', sans-serif; }`
  replaceStyle(FONT_THEME_ID, isSerif.value ? serif : sansSerif)
  isSerif.value = !isSerif.value
}

// Function menu actions
function resetAll() {
  contentStore.setContent(templates.content)
  contentStore.setStyle(templates.style.normal ?? '')
  contentStore.setCustomStyle(templates.style.custom ?? '')
  navbarStore.setTemplateNum(0)
}

// Theme menu actions
function selectTemplateByIndex(index: number) {
  const { id } = TEMPLATE_OPTIONS[index]!
  navbarStore.setTemplateNum(index)
  if (id === 'custom') {
    contentStore.setCustomStyle()
    viewStore.setStyleEditorOpen(true)
  }
  else {
    contentStore.setStyle(templates.style[id] ?? '')
  }
}

function toggleStyleEditor() {
  viewStore.setStyleEditorOpen(!viewStore.isStyleEditorOpen)
}

// Code theme actions
function selectCodeByIndex(index: number) {
  navbarStore.setCodeNum(index, navbarStore.isMacCode)
}

function toggleMacCode() {
  if (navbarStore.isMacCode) {
    navbarStore.setMacCode(false)
    navbarStore.setCodeNum(navbarStore.codeNum, false)
  }
  else {
    navbarStore.setMacCode(true)
    navbarStore.setCodeNum(navbarStore.codeNum, true)
  }
}

// Setting menu actions
function toggleSyncScroll() {
  navbarStore.setSyncScroll(!navbarStore.isSyncScroll)
}

function toggleContainImgName() {
  navbarStore.setContainImgName(!navbarStore.isContainImgName)
}

// View menu actions
function toggleEditArea() {
  viewStore.setEditAreaOpen(!viewStore.isEditAreaOpen)
}

function togglePreviewArea() {
  viewStore.setPreviewAreaOpen(!viewStore.isPreviewAreaOpen)
}

function toggleFullScreen() {
  const doc = window.document
  const docEl = doc.documentElement as any
  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  }
  else {
    cancelFullScreen.call(doc)
  }
}

function toggleImmersive() {
  viewStore.setImmersiveEditing(!viewStore.isImmersiveEditing)
}

const isImmersive = computed(() => viewStore.isImmersiveEditing)

const fileMenuItems = computed(() => [
  { label: '导出 Markdown', key: 'export-md', click: exportMarkdown },
  { label: '导出 PDF', key: 'export-pdf', click: exportPdf },
  { type: 'separator' as const, key: 'sep1' },
  { label: '导入', key: 'import', slot: 'import-file' },
])

const patternMenuItems = computed(() => [
  { label: '删除线', key: 'del', shortcut: 'Ctrl+U', click: () => applyEditorAction(del) },
  { label: '加粗', key: 'bold', shortcut: 'Ctrl+B', click: () => applyEditorAction(bold) },
  { label: '倾斜', key: 'italic', shortcut: 'Ctrl+I', click: () => applyEditorAction(italic) },
  { label: '代码', key: 'code', shortcut: 'Ctrl+Alt+C', click: () => applyEditorAction(code) },
  { label: '行内代码', key: 'inline-code', shortcut: 'Ctrl+Alt+V', click: () => applyEditorAction(inlineCode) },
  { type: 'separator' as const, key: 'sep1' },
  { label: '链接', key: 'link', shortcut: 'Ctrl+K', click: () => dialogStore.setLinkOpen(true) },
  { label: '表格', key: 'form', shortcut: 'Ctrl+Alt+T', click: () => dialogStore.setFormOpen(true) },
  { label: '图片', key: 'image', shortcut: 'Ctrl+Alt+I', click: () => dialogStore.setImageOpen(true) },
  { type: 'separator' as const, key: 'sep2' },
  { label: '衬线字体', key: 'font', click: toggleFont },
  { label: '微信外链转脚注', key: 'link-to-foot', shortcut: 'Ctrl+Alt+L', click: linkToFoot },
  { label: '格式化文档', key: 'format-doc', shortcut: 'Ctrl+Alt+F', click: formatDocument },
])

const functionMenuItems = computed(() => [
  { label: '重置', key: 'reset', click: resetAll },
  { label: '查找', key: 'search', shortcut: 'Ctrl+F', click: () => dialogStore.setSearchOpen(true) },
  { type: 'separator' as const, key: 'sep1' },
  { label: '本地历史', key: 'history', click: () => dialogStore.setHistoryOpen(true) },
  { label: 'SitDown', key: 'sitdown', click: () => dialogStore.setSitDownOpen(true) },
])

const viewMenuItems = computed(() => [
  { label: '全屏', key: 'fullscreen', click: toggleFullScreen },
  { type: 'separator' as const, key: 'sep1' },
  { label: '编辑区域', key: 'edit-area', click: toggleEditArea, checked: viewStore.isEditAreaOpen },
  { label: '预览区域', key: 'preview-area', click: togglePreviewArea, checked: viewStore.isPreviewAreaOpen },
  { label: '主题CSS区域', key: 'theme-area', click: () => viewStore.setStyleEditorOpen(!viewStore.isStyleEditorOpen), checked: viewStore.isStyleEditorOpen },
])

const themeMenuItems = computed(() => {
  const items = TEMPLATE_OPTIONS.map((option, index) => ({
    label: option.name,
    key: `theme-${option.id}`,
    description: option.author || undefined,
    slot: 'theme-item',
    click: () => selectTemplateByIndex(index),
  }))
  items.push({ type: 'separator' as const, key: 'sep-css' })
  items.push({ label: '查看主题 CSS', key: 'view-css', click: toggleStyleEditor })
  return items
})

const codeMenuItems = computed(() => {
  const items = CODE_OPTIONS.map((option, index) => ({
    label: option.name,
    key: `code-${option.id}`,
    slot: 'code-item',
    click: () => selectCodeByIndex(index),
  }))
  items.push({ type: 'separator' as const, key: 'sep-mac' })
  items.push({ label: 'Mac 风格', key: 'mac-code', slot: 'mac-item', click: toggleMacCode })
  return items
})

const settingMenuItems = computed(() => [
  { label: '同步滚动', key: 'sync-scroll', click: toggleSyncScroll, checked: navbarStore.isSyncScroll },
  { label: '上传图片时包含名称', key: 'contain-img', click: toggleContainImgName, checked: navbarStore.isContainImgName },
])

const helpMenuItems = computed(() => [
  { label: '关于', key: 'about', click: () => dialogStore.setAboutOpen(true) },
])
</script>

<template>
  <div
    class="flex h-10 items-center gap-1 border-b border-base bg-base px-2 shadow-sm"
    :class="{ 'opacity-0 pointer-events-none': isImmersive }"
  >
    <span v-if="titleStore.title" class="mr-2 text-sm font-bold color-base">{{ titleStore.title }}</span>

    <UDropdownMenu :items="fileMenuItems">
      <button class="btn-action-sm">
        文件
      </button>
      <template #import-file>
        <label class="flex cursor-pointer items-center gap-2 px-2 py-1 text-sm">
          导入
          <input type="file" class="hidden" accept=".txt,.md" @change="onImportFile">
        </label>
      </template>
    </UDropdownMenu>

    <UDropdownMenu :items="patternMenuItems">
      <button class="btn-action-sm">
        格式
      </button>
    </UDropdownMenu>

    <UDropdownMenu :items="functionMenuItems">
      <button class="btn-action-sm">
        功能
      </button>
    </UDropdownMenu>

    <UDropdownMenu :items="viewMenuItems">
      <button class="btn-action-sm">
        查看
      </button>
      <template #item="{ item }">
        <span v-if="item.checked" class="mr-1">{{ RIGHT_SYMBOL }}</span>
      </template>
    </UDropdownMenu>

    <UDropdownMenu :items="themeMenuItems">
      <button class="btn-action-sm">
        主题
      </button>
      <template #theme-item="{ item }">
        <span>{{ item.label }}</span>
        <span v-if="item.description" class="ml-auto text-xs op-fade">{{ item.description }}</span>
      </template>
    </UDropdownMenu>

    <UDropdownMenu :items="codeMenuItems">
      <button class="btn-action-sm">
        代码主题
      </button>
      <template #code-item="{ item }">
        <span>{{ item.label }}</span>
      </template>
      <template #mac-item>
        <span>Mac 风格</span>
      </template>
    </UDropdownMenu>

    <UDropdownMenu :items="settingMenuItems">
      <button class="btn-action-sm">
        设置
      </button>
      <template #item="{ item }">
        <span v-if="item.checked" class="mr-1">{{ RIGHT_SYMBOL }}</span>
      </template>
    </UDropdownMenu>

    <UDropdownMenu :items="helpMenuItems">
      <button class="btn-action-sm">
        帮助
      </button>
    </UDropdownMenu>

    <div class="ml-auto flex items-center gap-1">
      <button class="btn-action-icon" title="沉浸式编辑" @click="toggleImmersive">
        <span class="i-lucide-maximize-2 h-4 w-4" />
      </button>
    </div>
  </div>
</template>
