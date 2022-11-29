<template>
  <RootComponent />
</template>

<script setup lang="ts">
import { h, useAttrs, useSlots } from 'vue'

interface IProps {
  level: string
}

const props = withDefaults(defineProps<IProps>(), { level: '1' })
const slots = useSlots()
const attrs = useAttrs()

const RootComponent = () => {
  return h(
    `h${props.level}`, 
    { class: 'dynamic-heading', ...attrs }, 
    slots.default && slots.default()
  )
}
</script>

<style lang="scss">
h1.dynamic-heading {
  @apply text-4xl font-bold;
}

h2.dynamic-heading {
  @apply text-3xl font-bold  
}

h3.dynamic-heading {
  @apply text-2xl font-semibold
}

h4.dynamic-heading {
  @apply text-xl font-semibold
}

h5.dynamic-heading {
  @apply text-lg font-medium
}

h6.dynamic-heading {
  @apply text-base font-medium
}
</style>