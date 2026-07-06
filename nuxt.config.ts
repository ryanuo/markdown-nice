export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  srcDir: 'app/',
  compatibilityDate: '2025-07-01',
  future: { compatibilityVersion: 4 },
  typescript: { strict: true },
  imports: { autoImport: true },
  components: { dirs: [{ path: '~/components', pathPrefix: false }] },
  app: {
    head: {
      title: 'Markdown Nice',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A Markdown editor with the function of style edition' },
      ],
    },
  },
  experimental: { componentIslands: true },
})
