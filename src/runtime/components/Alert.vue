<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { PrimitiveProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/alert'
import type { AvatarProps, ButtonProps } from '../types'

const appConfig = _appConfig as AppConfig & { ui: { alert: Partial<typeof theme> } }

const alert = tv({ extend: tv(theme), ...(appConfig.ui?.alert || {}) })

type AlertVariants = VariantProps<typeof alert>

export interface AlertProps extends Omit<PrimitiveProps, 'asChild'> {
  title?: string
  description?: string
  icon?: string
  avatar?: AvatarProps
  color?: AlertVariants['color']
  variant?: AlertVariants['variant']
  /**
   * Display a list of actions:
   * - under the title and description if multiline
   * - next to the close button if not multiline
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the alert.
   * @emits `close`
   * @defaultValue `false` (`{ size: 'md', color: 'gray', variant: 'link' }`)
   */
  close?: ButtonProps | boolean
  /**
   * The icon displayed in the close button.
   * @defaultValue `appConfig.ui.icons.close`
   */
  closeIcon?: string
  class?: any
  ui?: Partial<typeof alert.slots>
}

export interface AlertEmits {
  (e: 'close'): void
}

export interface AlertSlots {
  leading(props?: any): any
  title(props?: any): any
  description(props?: any): any
  actions(props?: any): any
  close(props: { class: string }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'
import { useAppConfig } from '#imports'
import { UIcon, UAvatar } from '#components'

const props = withDefaults(defineProps<AlertProps>(), { as: 'div' })
const emits = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const appConfig = useAppConfig()

const multiline = computed(() => !!props.title && !!props.description)

const ui = computed(() => tv({ extend: alert, slots: props.ui })({
  color: props.color,
  variant: props.variant
}))
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: props.class, multiline })">
    <slot name="leading">
      <UAvatar v-if="avatar" size="2xl" v-bind="avatar" :class="ui.avatar()" />
      <UIcon v-else-if="icon" :name="icon" :class="ui.icon()" />
    </slot>

    <div :class="ui.wrapper()">
      <div v-if="title || !!slots.title" :class="ui.title()">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <template v-if="description || !!slots.description">
        <div :class="ui.description()">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>

      <div v-if="multiline && actions?.length" :class="ui.actions({ multiline: true })">
        <slot name="actions">
          <UButton v-for="(action, index) in actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(!multiline && actions?.length) || close" :class="ui.actions({ multiline: false })">
      <template v-if="!multiline">
        <slot name="actions">
          <UButton v-for="(action, index) in actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </template>

      <slot name="close" :class="ui.close()">
        <UButton
          v-if="close"
          :icon="closeIcon || appConfig.ui.icons.close"
          size="md"
          color="gray"
          variant="link"
          aria-label="Close"
          v-bind="typeof close === 'object' ? close : undefined"
          :class="ui.close()"
          @click="emits('close')"
        />
      </slot>
    </div>
  </Primitive>
</template>
