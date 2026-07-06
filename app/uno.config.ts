import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    fontSize: {
      micro: ['0.625rem', '0.875rem'],
      mini: ['0.6875rem', '1rem'],
      compact: ['0.8125rem', '1.125rem'],
    },
    colors: {
      primary: {
        300: '#7CBC71',
        400: '#49833E',
        600: '#396831',
        DEFAULT: '#49833E',
      },
    },
  },
  shortcuts: [
    {
      'color-base': 'color-neutral-800 dark:color-neutral-200',
      'bg-base': 'bg-white dark:bg-#111',
      'bg-secondary': 'bg-#eee dark:bg-#222',
      'border-base': 'border-#8882',
      'bg-active': 'bg-#8881',
      'color-active': 'color-primary-600 dark:color-primary-300',
      'border-active': 'border-primary-600/25 dark:border-primary-400/25',
      'btn-action': 'inline-flex items-center gap-2 rounded border border-base px2 py1 op75 hover:op100 hover:bg-active disabled:pointer-events-none disabled:op30!',
      'btn-action-sm': 'btn-action text-sm',
      'btn-action-icon': 'inline-flex h-8 w-8 items-center justify-center rounded border border-base op75 hover:op100 hover:bg-active disabled:pointer-events-none disabled:op30!',
      'btn-action-tool': 'inline-flex items-center justify-center h-8 w-8 px-2 rounded op75 hover:op100 hover:bg-active transition',
      'glass-panel': 'rounded-lg border border-base bg-glass shadow',
      'op-fade': 'op65 dark:op55',
      'op-mute': 'op30 dark:op25',
      'z-top-nav': 'z-60',
      'z-panel-content': 'z-70',
      'z-drawer-backdrop': 'z-90',
      'z-drawer-content': 'z-100',
      'h-nav': 'h-10',
      'editor-pane': 'flex flex-col min-h-0 min-w-0 flex-1 border-r border-base bg-base',
      'preview-pane': 'flex flex-col min-h-0 min-w-0 flex-1 bg-base',
      'sidebar-pane': 'shrink-0 overflow-y-auto bg-secondary border-l border-base',
    },
    [/^bg-glass(:\d+)?$/, ([, opacity = ':75']) => `bg-white${opacity} dark:bg-#111${opacity} backdrop-blur-8`],
  ],
  presets: [presetWind4(), presetIcons({ scale: 1.2 })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
