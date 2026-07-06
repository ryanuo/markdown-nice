import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useViewStore = defineStore('view', () => {
  const isEditAreaOpen = ref(true)
  const isPreviewAreaOpen = ref(true)
  const isStyleEditorOpen = ref(false)
  const isImmersiveEditing = ref(false)

  function setEditAreaOpen(value: boolean) {
    isEditAreaOpen.value = value
  }

  function setPreviewAreaOpen(value: boolean) {
    isPreviewAreaOpen.value = value
  }

  function setStyleEditorOpen(value: boolean) {
    isStyleEditorOpen.value = value
  }

  function setImmersiveEditing(value: boolean) {
    isImmersiveEditing.value = value
  }

  return {
    isEditAreaOpen,
    isPreviewAreaOpen,
    isStyleEditorOpen,
    isImmersiveEditing,
    setEditAreaOpen,
    setPreviewAreaOpen,
    setStyleEditorOpen,
    setImmersiveEditing,
  }
})
