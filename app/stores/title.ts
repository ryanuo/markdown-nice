import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTitleStore = defineStore('title', () => {
  const title = ref('')

  function setTitle(value: string) {
    title.value = value
  }

  return { title, setTitle }
})
