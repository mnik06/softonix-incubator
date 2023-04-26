<template>
  <div class="relative h-screen flex items-center justify-center">
    <router-link class="absolute top-10 left-10 font-bold underline text-xs" to="/examples">
      To Examples
    </router-link>

    <div class="flex items-center justify-center h-[500px] w-1/2 mx-auto border bg-indigo-600 text-white">
      <router-link class="font-bold text-3xl underline" to="/route1">
        To Route 1
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => console.log('Route 2 mounted'))
</script>
