<script setup lang="ts">
import { ref } from 'vue'
import CodeMirrorEditor from '~/components/editor/CodeMirrorEditor.vue'
import PreviewPane from '~/components/sidebar/PreviewPane.vue'
import SidebarView from '~/components/sidebar/SidebarView.vue'

const editorRef = ref(null)
const previewRef = ref(null)
</script>

<template>
  <main class="grid h-full min-h-0 bg-base grid-cols-[1fr_1fr_22rem]">
    <CodeMirrorEditor ref="editorRef" />
    <PreviewPane ref="previewRef" class="border-l border-base" />
    <SidebarView class="border-l border-base" />
  </main>
</template>
