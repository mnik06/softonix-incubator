<template>
  <table class="w-full">
    <thead>
      <tr class="border-b-[1px] border-b-gray-200">
        <th v-for="col of columns" :key="col.value" class="text-start">
          <slot :name="`${col.value}-header`" :col="col">
            {{ col.label }}
          </slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, idx) of items" :key="idx" class="border-b-[1px] border-b-gray-200">
        <td v-for="col of columns" :key="col.value" class="py-2">
          <slot :name="col.value" :item="item">
            {{ item[col.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { ITableColumn } from '@/types';

interface IProps {
  columns: ITableColumn[]
  items: { [key: string]: any }[]
}

defineProps<IProps>()
</script>
