<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'

defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()

const dialogStore = useDialogStore()

function close() {
  emit('update:open', false)
  dialogStore.setAboutOpen(false)
}
</script>

<template>
  <UModal
    :open="open"
    title="关于"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <h3 class="mb-1 flex items-center gap-2 font-bold">
        Markdown Nice
        <a href="https://github.com/mdnice/markdown-nice" target="_blank" rel="noopener noreferrer">
          <img alt="stars" src="https://badgen.net/github/stars/mdnice/markdown-nice">
        </a>
      </h3>
      <p class="text-sm op-fade">
        本项目 fork 自
        <a href="https://github.com/mdnice/markdown-nice" target="_blank" rel="noopener noreferrer">Markdown Nice</a>
        基于 [master 分支的 8f5205c] 进行的二次修改。
      </p>
      <p class="mt-2 text-sm">
        支持自定义样式的 Markdown 编辑器
      </p>
      <p class="text-sm">
        支持微信公众号、知乎和稀土掘金
      </p>
      <p class="mt-2 text-sm">
        <a class="color-active" href="https://github.com/whaoa/markdown-nice" target="_blank" rel="noopener noreferrer">本项目 GitHub 仓库</a>
      </p>
    </template>

    <template #footer>
      <UButton @click="close">
        确认
      </UButton>
    </template>
  </UModal>
</template>
