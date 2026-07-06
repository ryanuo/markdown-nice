<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContentStore } from '~/stores/content'
import { useDialogStore } from '~/stores/dialog'

defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()

const dialogStore = useDialogStore()
const contentStore = useContentStore()

const link = ref('')

const editor = computed(() => contentStore.markdownEditor as any)

function close() {
  link.value = ''
  emit('update:open', false)
  dialogStore.setLinkOpen(false)
}

function confirm() {
  const sel = editor.value.state.selection.main
  const text = editor.value.state.sliceDoc(sel.from, sel.to)
  const insert = `[${text}](${link.value})`
  editor.value.dispatch({ changes: { from: sel.from, to: sel.to, insert } })
  contentStore.setContent(editor.value.state.doc.toString())
  editor.value.dispatch({ selection: { anchor: sel.from + 1 } })
  editor.value.focus()
  close()
}
</script>

<template>
  <UModal
    :open="open"
    title="添加链接"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <label class="block">
        <span class="text-sm op-fade">链接地址</span>
        <UInput v-model="link" placeholder="请输入链接地址" class="mt-1" />
      </label>
    </template>

    <template #footer>
      <UButton color="neutral" variant="ghost" @click="close">
        取消
      </UButton>
      <UButton @click="confirm">
        确认
      </UButton>
    </template>
  </UModal>
</template>
