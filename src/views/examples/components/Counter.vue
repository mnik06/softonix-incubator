<template>
  <div>
    <button
      class="text-sm border-[1px] border-white rounded-md bg-blue-400 text-white px-5 py-2 font-semibold mr-5"
      @click="counter++"
    >
      Increase
    </button>

    Current count is<strong class="ml-1">{{ counter }}</strong>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  ref
} from 'vue'

const counter = ref<number>(0)

// TODO: uncomment to see component lifecycle hooks
// onMounted(() => console.log('%c COUNTER MOUNTED', 'color: green; font-size: 17px'))
// onUnmounted(() => console.log('%c COUNTER UNMOUNTED', 'color: red; font-size: 17px'))
// onActivated(() => console.log('%c COUNTER ACTIVATED', 'color: green; font-size: 17px'))
// onDeactivated(() => console.log('%c COUNTER DEACTIVATED', 'color: orange; font-size: 17px'))
</script>
