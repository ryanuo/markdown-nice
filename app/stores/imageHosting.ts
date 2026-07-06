import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  ALIOSS_IMAGE_HOSTING,
  IMAGE_HOSTING_TYPE,
  QINIUOSS_IMAGE_HOSTING,
} from '../utils/constants'

interface HostingItem {
  value: string
  label: string
}

const DEFAULT_ALIOSS = JSON.stringify({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
})

const DEFAULT_QINIUOSS = JSON.stringify({
  region: '',
  accessKey: '',
  secretKey: '',
  bucket: '',
  domain: 'https://',
  namespace: '',
})

export const useImageHostingStore = defineStore('imageHosting', () => {
  const type = ref('')
  const hostingList = ref<HostingItem[]>([])
  const hostingUrl = ref('')
  const hostingName = ref('')

  function setType(value: string) {
    type.value = value
  }

  function setHostingUrl(value: string) {
    hostingUrl.value = value
  }

  function setHostingName(value: string) {
    hostingName.value = value
  }

  function addImageHosting(name: string) {
    hostingList.value.push({ value: name, label: name })
  }

  if (import.meta.client) {
    if (!window.localStorage.getItem(ALIOSS_IMAGE_HOSTING)) {
      window.localStorage.setItem(ALIOSS_IMAGE_HOSTING, DEFAULT_ALIOSS)
    }
    if (!window.localStorage.getItem(QINIUOSS_IMAGE_HOSTING)) {
      window.localStorage.setItem(QINIUOSS_IMAGE_HOSTING, DEFAULT_QINIUOSS)
    }
    type.value = window.localStorage.getItem(IMAGE_HOSTING_TYPE) || ''
  }

  return {
    type,
    hostingList,
    hostingUrl,
    hostingName,
    setType,
    setHostingUrl,
    setHostingName,
    addImageHosting,
  }
})
