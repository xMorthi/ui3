<script setup lang="ts">
import theme from '#build/ui/checkbox'

const sizes = Object.keys(theme.variants.size)

const checked = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex flex-col gap-4">
      <UCheckbox v-model="checked" label="Model" />
      <UCheckbox label="Default value" :default-value="true" />
      <UCheckbox label="Indeterminate" indeterminate />
      <UCheckbox label="Required" required />
      <UCheckbox label="Disabled" disabled />
      <UCheckbox label="Black" color="black" :default-value="true" />
      <UCheckbox label="Icon" color="red" icon="i-heroicons-heart-solid" :model-value="true" />
    </div>
    <div class="flex items-center gap-4 mr-[-11px]">
      <UCheckbox v-for="size in sizes" :key="size" label="Check me" :size="(size as any)" />
    </div>
    <div class="flex items-center gap-4 mr-[-96px]">
      <UCheckbox v-for="size in sizes" :key="size" label="Check me" description="This is a description" :size="(size as any)" />
    </div>
  </div>
</template>
