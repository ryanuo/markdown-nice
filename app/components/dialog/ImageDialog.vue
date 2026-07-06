<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContentStore } from '~/stores/content'
import { useDialogStore } from '~/stores/dialog'
import { useImageHostingStore } from '~/stores/imageHosting'
import { useNavbarStore } from '~/stores/navbar'
import { SM_MS_PROXY } from '~/utils/constants'
import AliOSS from './AliOSS.vue'
import QiniuOSS from './QiniuOSS.vue'

defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()

const dialogStore = useDialogStore()
const contentStore = useContentStore()
const navbarStore = useNavbarStore()
const imageHostingStore = useImageHostingStore()

const images = ref<{ filename: string, url: string }[]>([])
const dragOver = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const editor = computed(() => contentStore.markdownEditor as any)

function close() {
  emit('update:open', false)
  dialogStore.setImageOpen(false)
}

function confirmUpload() {
  let text = ''
  if (navbarStore.isContainImgName) {
    images.value.forEach((v) => {
      text += `![${v.filename}](${v.url})\n`
    })
  }
  else {
    images.value.forEach((v) => {
      text += `![](${v.url})\n`
    })
  }
  images.value = []
  const sel = editor.value.state.selection.main
  editor.value.dispatch({ changes: { from: sel.from, to: sel.to, insert: text } })
  contentStore.setContent(editor.value.state.doc.toString())
  editor.value.dispatch({ selection: { anchor: sel.from + 2 } })
  editor.value.focus()
  close()
}

async function handleFileUpload(file: File) {
  if (!file)
    return
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(SM_MS_PROXY, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data && data.data && data.data.url) {
      images.value.push({ filename: file.name, url: data.data.url })
    }
  }
  catch (e) {
    console.error('上传失败', e)
  }
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file)
    handleFileUpload(file)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file)
    handleFileUpload(file)
  input.value = ''
}

const imageHostingOptions = computed(() => {
  const list: { label: string, value: string }[] = [
    { label: '默认', value: 'default' },
    { label: 'SM.MS', value: 'smms' },
  ]
  return list
})

function onTypeChange(value: string) {
  imageHostingStore.setType(value)
  window.localStorage.setItem('image_hosting_type', value)
}
</script>

<template>
  <UModal
    :open="open"
    title="本地上传"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-sm op-fade">图床:</span>
          <USelect
            :model-value="imageHostingStore.type || 'default'"
            :items="imageHostingOptions"
            class="w-32"
            @update:model-value="onTypeChange"
          />
        </div>
        <div
          class="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-base p-6 text-center transition hover:bg-active"
          :class="{ 'bg-active': dragOver }"
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="onDrop"
          @click="fileInput?.click()"
        >
          <span class="i-lucide-inbox mb-2 h-8 w-8 op-fade" />
          <p class="text-sm">
            点击或拖拽一张或多张照片上传
          </p>
          <p class="text-xs op-fade">
            正在使用默认图床
          </p>
          <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="onFileChange">
        </div>
        <div v-if="images.length" class="text-xs op-fade">
          已添加 {{ images.length }} 张图片
        </div>
        <div class="space-y-2">
          <div class="rounded border border-base p-3">
            <h3 class="mb-2 text-sm font-medium">
              阿里云配置
            </h3>
            <AliOSS />
          </div>
          <div class="rounded border border-base p-3">
            <h3 class="mb-2 text-sm font-medium">
              七牛云配置
            </h3>
            <QiniuOSS />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton color="neutral" variant="ghost" @click="close">
        取消
      </UButton>
      <UButton @click="confirmUpload">
        确认
      </UButton>
    </template>
  </UModal>
</template>
