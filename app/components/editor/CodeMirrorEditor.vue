<script setup lang="ts">
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { markdownLanguage } from '@codemirror/lang-markdown'
import { HighlightStyle, LanguageSupport, syntaxHighlighting } from '@codemirror/language'
import { EditorState } from '@codemirror/state'
import { drawSelection, EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers, rectangularSelection } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useContentStore } from '~/stores/content'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const contentStore = useContentStore()

const editorEl = ref<HTMLElement | null>(null)
let view: EditorView | null = null

const highlightStyle = HighlightStyle.define([
  { tag: t.heading1, class: 'cm-heading cm-heading-1' },
  { tag: t.heading2, class: 'cm-heading cm-heading-2' },
  { tag: t.heading3, class: 'cm-heading cm-heading-3' },
  { tag: t.emphasis, class: 'cm-em' },
  { tag: t.strong, class: 'cm-strong' },
  { tag: t.keyword, class: 'cm-keyword' },
  { tag: t.atom, class: 'cm-atom' },
  { tag: t.bool, class: 'cm-atom' },
  { tag: t.url, class: 'cm-url' },
  { tag: t.labelName, class: 'cm-label' },
  { tag: t.inserted, class: 'cm-inserted' },
  { tag: t.deleted, class: 'cm-deleted' },
  { tag: t.literal, class: 'cm-literal' },
  { tag: t.string, class: 'cm-string' },
  { tag: t.number, class: 'cm-number' },
  { tag: [t.regexp, t.escape, t.special(t.string)], class: 'cm-string2' },
  { tag: t.variableName, class: 'cm-variable' },
  { tag: t.special(t.variableName), class: 'cm-variable-2' },
  { tag: t.definition(t.variableName), class: 'cm-def' },
  { tag: t.typeName, class: 'cm-type' },
  { tag: t.className, class: 'cm-class' },
  { tag: t.namespace, class: 'cm-namespace' },
  { tag: t.comment, class: 'cm-comment' },
  { tag: t.meta, class: 'cm-meta' },
  { tag: [t.self, t.null], class: 'cm-atom' },
])

const theme = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '14px',
  },
  '.cm-content': {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    padding: '12px 0',
    lineHeight: '1.6',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '.cm-activeLine, .cm-activeLineGutter': {
    backgroundColor: 'rgba(127,127,127,0.08)',
  },
  '.cm-scroller': {
    overflow: 'auto',
  },
})

const updateListener = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    const next = update.state.doc.toString()
    contentStore.setContent(next)
    emit('update:modelValue', next)
  }
})

onMounted(() => {
  if (!editorEl.value)
    return
  const initial = contentStore.content
  view = new EditorView({
    state: EditorState.create({
      doc: initial,
      extensions: [
        highlightActiveLine(),
        highlightActiveLineGutter(),
        drawSelection(),
        rectangularSelection(),
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        new LanguageSupport(markdownLanguage),
        syntaxHighlighting(highlightStyle),
        theme,
        updateListener,
      ],
    }),
    parent: editorEl.value,
  })
  contentStore.setMarkdownEditor(view)
})

// Keep the editor in sync when content changes from outside (theme switches etc.)
watch(() => contentStore.content, (next) => {
  if (!view)
    return
  const current = view.state.doc.toString()
  if (next !== current) {
    view.dispatch({
      changes: { from: 0, to: current.length, insert: next },
    })
  }
})

onBeforeUnmount(() => {
  view?.destroy()
  view = null
})
</script>

<template>
  <div class="editor-pane flex flex-col min-h-0 min-w-0 flex-1 bg-base color-base">
    <div class="flex items-center px-4 py-2 border-b border-base">
      <h2 class="text-sm font-medium color-base">
        Markdown
      </h2>
    </div>
    <div ref="editorEl" class="flex-1 min-h-0 codemirror-host" />
  </div>
</template>

<style scoped>
.codemirror-host :deep(.cm-editor) {
  height: 100%;
}
.codemirror-host :deep(.cm-editor.cm-focused) {
  outline: none;
}
</style>
