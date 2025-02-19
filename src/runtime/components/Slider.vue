<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SliderRootProps, SliderRootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/slider'

const appConfig = _appConfig as AppConfig & { ui: { slider: Partial<typeof theme> } }

const slider = tv({ extend: tv(theme), ...(appConfig.ui?.slider || {}) })

type SliderVariants = VariantProps<typeof slider>

export interface SliderProps extends Omit<SliderRootProps, 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'orientation'> {
  size?: SliderVariants['size']
  color?: SliderVariants['color']
  /**
   * The orientation of the slider.
   * @defaultValue `'horizontal'`
   */
  orientation?: SliderRootProps['orientation']
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number | number[]
  class?: any
  ui?: Partial<typeof slider.slots>
}

export interface SliderEmits extends Omit<SliderRootEmits, 'update:modelValue'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderRange, SliderTrack, SliderThumb, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { useFormField } from '#imports'

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal'
})
const emits = defineEmits<SliderEmits>()

const modelValue = defineModel<number | number[]>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits)

const { id, emitFormChange, size, color, name, disabled } = useFormField<SliderProps>(props)

const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === 'number') {
    return [props.defaultValue]
  }
  return props.defaultValue
})

const sliderValue = computed({
  get() {
    if (typeof modelValue.value === 'number') {
      return [modelValue.value]
    }
    return modelValue.value ?? defaultSliderValue.value
  },
  set(value) {
    modelValue.value = value?.length !== 1 ? value : value[0]
  }
})

const thumbsCount = computed(() => sliderValue.value?.length ?? 1)

const ui = computed(() => tv({ extend: slider, slots: props.ui })({
  disabled: disabled.value,
  size: size.value,
  color: color.value,
  orientation: props.orientation
}))
</script>

<template>
  <SliderRoot
    v-bind="rootProps"
    :id="id"
    v-model="sliderValue"
    :name="name"
    :disabled="disabled"
    :class="ui.root({ class: props.class })"
    :default-value="defaultSliderValue"
    @update:model-value="emitFormChange()"
  >
    <SliderTrack :class="ui.track()">
      <SliderRange :class="ui.range()" />
    </SliderTrack>

    <SliderThumb v-for="count in thumbsCount" :key="count" :class="ui.thumb()" />
  </SliderRoot>
</template>
