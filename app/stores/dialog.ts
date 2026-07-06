import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const isImageOpen = ref(false)
  const isLinkOpen = ref(false)
  const isAboutOpen = ref(false)
  const isVersionOpen = ref(false)
  const isFormOpen = ref(false)
  const isHistoryOpen = ref(false)
  const isSearchOpen = ref(false)
  const isSitDownOpen = ref(false)

  function setImageOpen(value: boolean) {
    isImageOpen.value = value
  }

  function setLinkOpen(value: boolean) {
    isLinkOpen.value = value
  }

  function setAboutOpen(value: boolean) {
    isAboutOpen.value = value
  }

  function setVersionOpen(value: boolean) {
    isVersionOpen.value = value
  }

  function setFormOpen(value: boolean) {
    isFormOpen.value = value
  }

  function setHistoryOpen(value: boolean) {
    isHistoryOpen.value = value
  }

  function setSearchOpen(value: boolean) {
    isSearchOpen.value = value
  }

  function setSitDownOpen(value: boolean) {
    isSitDownOpen.value = value
  }

  return {
    isImageOpen,
    isLinkOpen,
    isAboutOpen,
    isVersionOpen,
    isFormOpen,
    isHistoryOpen,
    isSearchOpen,
    isSitDownOpen,
    setImageOpen,
    setLinkOpen,
    setAboutOpen,
    setVersionOpen,
    setFormOpen,
    setHistoryOpen,
    setSearchOpen,
    setSitDownOpen,
  }
})
