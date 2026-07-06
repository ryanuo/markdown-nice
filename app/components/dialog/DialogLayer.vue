<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'
import AboutDialog from './AboutDialog.vue'
import FormDialog from './FormDialog.vue'
import HistoryDialog from './HistoryDialog.vue'
import ImageDialog from './ImageDialog.vue'
import LinkDialog from './LinkDialog.vue'
import SitDownDialog from './SitDownDialog.vue'

const dialogStore = useDialogStore()
</script>

<template>
  <div>
    <ImageDialog
      :open="dialogStore.isImageOpen"
      @update:open="dialogStore.setImageOpen"
    />
    <LinkDialog
      :open="dialogStore.isLinkOpen"
      @update:open="dialogStore.setLinkOpen"
    />
    <AboutDialog
      :open="dialogStore.isAboutOpen"
      @update:open="dialogStore.setAboutOpen"
    />
    <FormDialog
      :open="dialogStore.isFormOpen"
      @update:open="dialogStore.setFormOpen"
    />
    <HistoryDialog
      :open="dialogStore.isHistoryOpen"
      @update:open="dialogStore.setHistoryOpen"
    />
    <SitDownDialog
      :open="dialogStore.isSitDownOpen"
      @update:open="dialogStore.setSitDownOpen"
    />
  </div>
</template>
