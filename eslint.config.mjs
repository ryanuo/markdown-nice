import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: ['dist', '.nuxt', 'lib', 'node_modules', 'public/assets/**', '*.min.*'],
  },
  {
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off',
    },
  },
)
