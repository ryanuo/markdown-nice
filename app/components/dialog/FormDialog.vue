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

const rowNum = ref(2)
const columnNum = ref(1)

const editor = computed(() => contentStore.markdownEditor as any)

function close() {
  rowNum.value = 2
  columnNum.value = 1
  emit('update:open', false)
  dialogStore.setFormOpen(false)
}

function buildRow(r: number): string {
  let row = '|'
  if (r === 0) {
    for (let i = 0; i < columnNum.value; i++) row += ' --- |'
  }
  else {
    for (let i = 0; i < columnNum.value; i++) row += '     |'
  }
  return row
}

function confirm() {
  const wrapCh = /windows|win32/i.test(navigator.userAgent) ? '\r\n' : '\n'
  let text = ''
  for (let r = 0; r < rowNum.value; r++) {
    text += buildRow(r) + wrapCh
  }
  const sel = editor.value.state.selection.main
  editor.value.dispatch({ changes: { from: sel.from, to: sel.to, insert: text } })
  contentStore.setContent(editor.value.state.doc.toString())
  editor.value.dispatch({ selection: { anchor: sel.from + 2 } })
  editor.value.focus()
  close()
}
</script>

<template>
  <UModal
    :open="open"
    title="添加表格"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="space-y-2">
        <label class="block">
          <span class="text-sm op-fade">行数</span>
          <UInput v-model.number="rowNum" type="number" :min="2" :max="10" class="mt-1" />
        </label>
        <label class="block">
          <span class="text-sm op-fade">列数</span>
          <UInput v-model.number="columnNum" type="number" :min="1" :max="10" class="mt-1" />
        </label>
      </div>
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
