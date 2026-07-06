<script setup lang="ts">
import { computed, ref } from 'vue'
import { templates } from '~/services/templates'
import { useContentStore } from '~/stores/content'
import { useNavbarStore } from '~/stores/navbar'
import { useViewStore } from '~/stores/view'
import { CODE_OPTIONS, TEMPLATE_OPTIONS } from '~/utils/constants'

const contentStore = useContentStore()
const navbarStore = useNavbarStore()
const viewStore = useViewStore()

type TabKey = 'wechat' | 'zhihu' | 'juejin'
const tabs: { key: TabKey, label: string }[] = [
  { key: 'wechat', label: '微信' },
  { key: 'zhihu', label: '知乎' },
  { key: 'juejin', label: '掘金' },
]

const activeTab = ref<TabKey>('wechat')

const markdownThemes = computed(() => TEMPLATE_OPTIONS.filter(t => t.id !== 'custom'))
const codeThemes = computed(() => CODE_OPTIONS)

function selectTheme(id: string) {
  const templateNum = TEMPLATE_OPTIONS.findIndex(t => t.id === id)
  if (templateNum >= 0) {
    navbarStore.setTemplateNum(templateNum)
    contentStore.setStyle(templates.style[id] ?? '')
  }
}

function selectCode(num: number) {
  navbarStore.setCodeNum(num, navbarStore.isMacCode)
}

function handleFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file)
    return
  const reader = new FileReader()
  reader.onload = () => contentStore.setContent(String(reader.result ?? ''))
  reader.readAsText(file)
  input.value = ''
}
</script>

<template>
  <aside class="sidebar-pane shrink-0 overflow-y-auto bg-secondary border-l border-base">
    <div class="px-4 py-3 border-b border-base">
      <h2 class="text-sm font-medium color-base">
        平台预览
      </h2>
      <div class="mt-2 flex gap-2">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="btn-action-sm"
          :class="{ 'bg-active': activeTab === t.key }"
          @click="activeTab = t.key"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <div class="px-4 py-3 border-b border-base">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium color-base">
          Markdown 主题
        </h2>
        <label class="btn-action-sm cursor-pointer">
          导入<input type="file" class="hidden" accept=".txt,.md" @change="handleFile">
        </label>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-2">
        <button
          v-for="t in markdownThemes"
          :key="t.id"
          class="rounded border border-base p-2 text-left hover:bg-active transition"
          :class="{ 'bg-active': navbarStore.templateNum === TEMPLATE_OPTIONS.findIndex(x => x.id === t.id) }"
          @click="selectTheme(t.id)"
        >
          <div class="text-xs font-medium truncate">
            {{ t.name }}
          </div>
          <div class="text-mini op-fade truncate">
            {{ t.author }}
          </div>
        </button>
      </div>
    </div>

    <div class="px-4 py-3">
      <h2 class="text-sm font-medium color-base">
        代码主题
      </h2>
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          v-for="(c, i) in codeThemes"
          :key="c.id"
          class="btn-action-sm"
          :class="{ 'bg-active': navbarStore.codeNum === i }"
          @click="selectCode(i)"
        >
          {{ c.name }}
        </button>
      </div>
    </div>
  </aside>
</template>
