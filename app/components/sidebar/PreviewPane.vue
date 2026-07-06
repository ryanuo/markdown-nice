<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markdownParser, markdownParserWechat } from '~/services/parser'
import { useContentStore } from '~/stores/content'
import { useNavbarStore } from '~/stores/navbar'
import { updateMathjax } from '~/utils/mathjax'

const contentStore = useContentStore()
const navbarStore = useNavbarStore()

const previewWrap = ref<HTMLElement | null>(null)
const previewContainer = ref<HTMLElement | null>(null)

// Single rich-text box with v-html, mirroring src/App.js.
const html = computed(() => {
  const raw = contentStore.content
  return navbarStore.codeNum === 0
    ? markdownParserWechat.render(raw)
    : markdownParser.render(raw)
})

// Rewrap MathJax whenever rendered output changes.
watch(html, () => {
  updateMathjax()
})

defineExpose({ previewWrap, previewContainer })
</script>

<template>
  <div class="preview-pane flex flex-col min-h-0 min-w-0 flex-1 bg-base">
    <div class="flex items-center justify-between px-4 py-2 border-b border-base">
      <h2 class="text-sm font-medium color-base">
        预览
      </h2>
      <span class="text-xs op-fade">{{ navbarStore.previewType === 'pc' ? '桌面端' : '移动端' }}</span>
    </div>
    <div class="flex-1 min-h-0 of-auto p-4">
      <div
        ref="previewContainer"
        class="nice-marked-text mx-auto bg-white dark:bg-#1e1e1e rounded shadow-sm p-6 min-h-full"
      >
        <section
          id="nice"
          ref="previewWrap"
          class="nice-rich-text"
          :class="{ 'nice-wx-box-pc': navbarStore.previewType === 'pc' }"
          data-tool="mdnice编辑器"
          data-website="https://www.mdnice.com"
          v-html="html"
        />
      </div>
    </div>
  </div>
</template>
