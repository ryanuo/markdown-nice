// Explicit Pinia install anchor.
//
// @pinia/nuxt already creates and installs a Pinia instance for the Nuxt app,
// but because `imports.autoImport` is disabled in nuxt.config.ts we cannot rely
// on Nuxt auto-imports for `defineStore` / `ref` / `storeToRefs`. Instead each
// store in app/stores imports its helpers from 'pinia' / 'vue' explicitly, and
// this plugin exists to make the "Pinia is installed here" intent visible in
// devtools and to serve as the single place to register global Pinia plugins
// (e.g. persistence) later without sprinkling imports across stores.
import { defineNuxtPlugin } from '#app'
import { getActivePinia } from 'pinia'

export default defineNuxtPlugin((_nuxtApp) => {
  // Pinia is installed by the @pinia/nuxt module, which also creates the
  // active instance for the app. This plugin is an explicit anchor that
  // registers Pinia as application state (visible in DevTools under the
  // "Pinia" panel) and serves as the single place to add global Pinia
  // plugins later (e.g. persistence) without touching individual stores.
  //
  // We deliberately avoid returning the instance: because the project has
  // `imports.autoImport: false`, Nuxt auto-imports are disabled and each
  // store imports `defineStore` / `ref` / `storeToRefs` from 'pinia' and
  // 'vue' explicitly — the plugin merely guarantees installation order.
  void getActivePinia()
})
