<script setup lang="ts">
import theme from '#build/ui/avatar'

const sizes = Object.keys(theme.variants.size)
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <div class="flex items-center gap-1.5">
      <UAvatar v-for="size in sizes" :key="size" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Benjamin Canac" :size="(size as any)" />
    </div>
    <div class="flex items-center gap-1.5">
      <UAvatar v-for="size in sizes" :key="size" icon="i-heroicons-photo" :size="(size as any)" />
    </div>
    <div class="flex items-center gap-1.5">
      <UAvatar v-for="size in sizes" :key="size" alt="Benjamin Canac" :size="(size as any)" />
    </div>
    <div class="flex items-center gap-1.5">
      <UAvatar v-for="size in sizes" :key="size" :text="size" :size="(size as any)" />
    </div>

    <div class="flex items-center gap-1.5">
      <UAvatarGroup v-for="size in sizes" :key="size" :text="size" :size="(size as any)" :max="2">
        <UChip inset text="1">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="benjamincanac" />
        </UChip>
        <UAvatar src="https://avatars.githubusercontent.com/u/904724?v=4" alt="Atinux" />
        <UAvatar src="https://avatars.githubusercontent.com/u/7547335?v=4" alt="smarroufin" />
      </UAvatarGroup>
    </div>
    <div class="flex items-center gap-1.5">
      <UAvatarGroup v-for="size in sizes" :key="size" :text="size" :size="(size as any)" :max="4">
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="benjamincanac" />
        <UAvatar src="https://avatars.githubusercontent.com/u/904724?v=4" alt="Atinux" />
        <UAvatar src="https://avatars.githubusercontent.com/u/7547335?v=4" alt="smarroufin" />
      </UAvatarGroup>
    </div>
  </div>
</template>
