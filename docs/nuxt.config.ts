import { createResolver } from '@nuxt/kit'
import module from '../src/module'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'antialiased font-sans text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900'
      }
    }
  },
  // extends: [
  //   process.env.NUXT_UI_PRO_PATH ? resolve(process.env.NUXT_UI_PRO_PATH, 'docs') : process.env.NUXT_GITHUB_TOKEN && ['github:nuxt/ui-pro/docs#dev', { giget: { auth: process.env.NUXT_GITHUB_TOKEN } }]
  // ],
  modules: [
    module,
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    // '@nuxtjs/plausible',
    '@vueuse/nuxt',
    // 'modules/content-examples-code'
    'nuxt-component-meta',
    'nuxt-og-image'
  ],
  future: {
    compatibilityVersion: 4
  },
  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },
  // ui: {
  //   global: true
  // },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: resolve('./app/assets/icons')
    }]
  },
  content: {
    sources: {
      pro: process.env.NUXT_UI_PRO_PATH
        ? {
            prefix: '/pro',
            driver: 'fs',
            base: resolve(process.env.NUXT_UI_PRO_PATH, 'docs/app/content/pro')
          }
        : process.env.NUXT_GITHUB_TOKEN
          ? {
              prefix: '/pro',
              driver: 'github',
              repo: 'nuxt/ui-pro',
              branch: 'dev',
              dir: 'docs/app/content/pro',
              token: process.env.NUXT_GITHUB_TOKEN || ''
            }
          : undefined
    }
  },
  image: {
    provider: 'ipx'
  },
  nitro: {
    prerender: {
      routes: [
        '/getting-started/installation',
        '/api/releases.json',
        '/api/pulls.json'
      ],
      ignore: !process.env.NUXT_GITHUB_TOKEN ? ['/pro'] : []
    }
  },
  routeRules: {
    '/': { redirect: '/getting-started/installation', prerender: false },
    '/components': { redirect: '/components/app', prerender: false }
  },
  componentMeta: {
    debug: 2,
    exclude: [
      '@nuxt/content',
      '@nuxt/icon',
      '@nuxt/image',
      // '@nuxt/ui-templates',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      'nuxt-og-image',
      // 'nuxt-site-config',
      resolve('./app/components')
      // process.env.NUXT_UI_PRO_PATH ? resolve(process.env.NUXT_UI_PRO_PATH, 'docs', 'components') : '.c12'
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: true,
      exposed: false
    }
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // 'components:extend': (components) => {
    //   components.forEach((component) => {
    //     if (component.shortPath.includes('@nuxt/ui-pro')) {
    //       component.global = true
    //     } else if (component.global) {
    //       component.global = 'sync'
    //     }
    //   })
    // }
  },
  // vite: {
  //   optimizeDeps: {
  //     include: ['date-fns']
  //   }
  // },
  typescript: {
    strict: false
  }
})
