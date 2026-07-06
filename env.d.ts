// Ambient type shims for the app/ typecheck scope.
//
// The root tsconfig scopes compilation to app/ only (see tsconfig.json include),
// which excludes .nuxt/*.d.ts. Those generated declarations normally provide the
// Nuxt globals (defineAppConfig / defineNuxtConfig) and Vite's ?raw import
// suffix. We re-declare the minimal surfaces here so app/ typechecks without
// pulling the generated .nuxt tree into scope.
//
// This file is intentionally a script (no top-level import/export) so that the
// ambient `declare module` statements and the global `declare` bindings below
// apply across the whole program.

declare module '*?raw' {
  const content: string
  export default content
}

declare module '*.md?raw' {
  const content: string
  export default content
}

declare module 'markdown-it' {
  interface MarkdownItOptions {
    [key: string]: unknown
  }
  class MarkdownIt {
    constructor(options?: MarkdownItOptions)
    render(src: string, env?: unknown): string
    use(plugin: unknown, ...args: unknown[]): MarkdownIt
    utils: { escapeHtml(str: string): string }
  }
  export default MarkdownIt
}

declare module 'axios' {
  interface AxiosRequestConfig {
    baseURL?: string
    headers?: Record<string, string>
    [key: string]: unknown
  }
  interface AxiosResponse<T = unknown> {
    data: T
  }
  interface AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance
  }
  const axios: AxiosInstance
  export default axios
}

interface ImportMetaEnv {
  readonly DEV: boolean
  [key: string]: string | boolean | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare function defineAppConfig(config: Record<string, unknown>): Record<string, unknown>
declare function defineNuxtConfig(config: Record<string, unknown>): Record<string, unknown>
