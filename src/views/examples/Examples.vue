<template>
  <div class="py-10 px-5">
    <div class="flex flex-col">
      <h2 class="mb-10 text-xl font-bold">Table Module with scoped slots and list refs:</h2>

      <button class="underline w-fit my-5" @click="changeDynamicTableSlot">
        Change dynamic slot
      </button>

      <TableModule :items="sortedItems" :columns="tableColumns">
        <template #salary-header>
          Salary
          <button class="w-2" @click="sortBySalary ? sortBySalary = 0 : sortBySalary = 1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"/>
            </svg>
          </button>
        </template>

        <template #avatar="{ item }">
          <img :src="item.image" alt="person image" class="w-7 h-7 rounded-full" />
        </template>

        <template #salary="{ item }">
          <span class="text-green-600">
            {{ divideNumberWithComa(item.salary) }}$
          </span>
        </template>

        <template #[dynamicTableSlot]>
          <div class="w-7 h-7 bg-green-500 rounded-full" />
        </template>
      </TableModule>
    </div>


    <div class="flex flex-col mt-10">
      <h2 class="mb-10 text-xl font-bold">Single Transitions:</h2>

      <div class="flex items-center h-[150px]">
        <button class="mr-10 rounded-md underline" @click="showScaleBlock = !showScaleBlock">Toggle block</button>

        <Transition name="scale-transition">
          <div v-if="showScaleBlock" class="w-[100px] h-[100px] bg-red-800 rounded-xl" />
        </Transition>
      </div>

      <div class="flex items-center h-[150px]">
        <button class="mr-10 rounded-md underline" @click="showFadeBlock = !showFadeBlock">Toggle block</button>

        <Transition name="fade-transition">
          <div v-if="showFadeBlock" class="w-[100px] h-[100px] bg-green-800 rounded-xl" />
        </Transition>
      </div>

      <div class="flex items-center h-[150px]">
        <button class="mr-10 underline" @click="showSlideBlock = !showSlideBlock">Toggle block</button>

        <Transition name="slide-transition">
          <div v-if="showSlideBlock" class="w-[100px] h-[100px] bg-blue-800 rounded-xl" />
        </Transition>
      </div>
    </div>

    <div class="flex flex-col mt-10">
      <h2 class="mb-10 text-xl font-bold">Transition Groups:</h2>

      <div class="flex items-center h-[270px]">
        <button 
          class="mr-10 underline" 
          @click="transitionList.splice(Math.floor(Math.random() * transitionList.length), 1)"
        >
          Remove List Item
        </button>

        <button 
          class="mr-10 underline" 
          @click="transitionList.sort((a, b) => Math.random() * a - Math.random() * b)"
        >
          Shuffle List
        </button>

        <ul ref="list">
          <TransitionGroup name="list-transition">
            <li 
              v-for="n of transitionList" 
              :key="n" 
              ref="listItem" 
              class="text-lightBlue-600 font-bold transition-all duration-300"
            >
              List Item {{ n }}
            </li>
          </TransitionGroup>
        </ul>
      </div>
    </div>

    <div class="flex flex-col mt-10 h-[200px]">
      <h2 class="mb-10 text-xl font-bold">Keep Alive:</h2>

      <div class="flex items-center">
        <div class="flex flex-col flex-1 h-[130px]">
          <h3 class="font-semibold text-lg">
            Without Keep Alive
          </h3>

          <button class="underline w-fit mt-3" @click="showCounter = !showCounter">
            Toggle Visibility
          </button>

          <Counter v-if="showCounter" class="mt-5" />
        </div>
        
        <div class="flex flex-col flex-1 h-[130px]">
          <h3 class="font-semibold text-lg">
            With Keep Alive
          </h3>

          <button class="underline w-fit mt-3" @click="showCounterWithKA = !showCounterWithKA">
            Toggle Visibility
          </button>

          <KeepAlive>
            <Counter v-if="showCounterWithKA" class="mt-5" />
          </KeepAlive>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-10" v-if="false">
      <h2 class="mb-10 text-xl font-bold">Render Functions:</h2>

      <div class="space-y-3">
        <DynamicHeading>
          Heading level 1
        </DynamicHeading>
        <DynamicHeading level="3">
          Heading level 2
        </DynamicHeading>
        <DynamicHeading level="3">
          Heading level 3
        </DynamicHeading>
        <DynamicHeading level="4">
          Heading level 4
        </DynamicHeading>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

import type { ITableColumn } from '@/types'
import { divideNumberWithComa } from '@/core/helpers'

import TableModule from '@/components/TableModule.vue'
import Counter from '@/views/examples/Counter.vue'
import DynamicHeading from '@/views/examples/DynamicHeading.vue'

interface IPerson {
  name: string
  age: number
  occupation: string
  salary: number
  image: string
}

const tableItems: IPerson[] = [
  { name: 'Bob', age: 30, occupation: 'Developer', salary: 3000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg' },
  { name: 'John', age: 25, occupation: 'Manager', salary: 2000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg' },
  { name: 'Linda', age: 20, occupation: 'Recruiter', salary: 4000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg' },
  { name: 'Mary', age: 45, occupation: 'Devops', salary: 1500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg' }
]
const tableColumns: ITableColumn[] = [
  {
    value: 'avatar'
  },
  {
    value: 'name',
    label: 'Name'
  },
  {
    value: 'age',
    label: 'Age'
  },
  {
    value: 'occupation',
    label: 'Occupation'
  },
  {
    value: 'salary',
    label: 'Salary'
  }
]
const transitionList = ref<number[]>([1, 2, 3, 4, 5, 6 ,7, 8, 9, 10])

const sortBySalary = ref<number | null>(null)
const dynamicTableSlot = ref<string>('')
const list = ref<HTMLElement | null>(null)
const listItem = ref<HTMLElement[] | null>(null)

const showScaleBlock = ref<boolean>(true)
const showSlideBlock = ref<boolean>(true)
const showFadeBlock = ref<boolean>(true)
const showCounter = ref<boolean>(true)
const showCounterWithKA = ref<boolean>(true)

const changeDynamicTableSlot = () => {
  const nextIdx = tableColumns.indexOf(
    tableColumns.find(({ value }) => value === dynamicTableSlot.value) as ITableColumn
  ) + 1

  dynamicTableSlot.value = tableColumns[nextIdx]?.value || tableColumns[0].value
}

const sortedItems = computed<IPerson[]>(() => {
  if (sortBySalary.value === null) return tableItems

  return [...tableItems].sort(({ salary }, { salary: salary2 }) => {
    return sortBySalary.value ? salary - salary2 : salary2 - salary
  })
})

// TODO: uncomment to see refs
// onMounted(() => {
//   console.log('list: ', list.value)
//   console.log('list item: ', listItem.value)
// })
</script>

<style lang="scss" scoped>
// scale transition
.scale-transition-enter-from,
.scale-transition-leave-to {
  opacity: 0;
  transform: scale(0.3);
  transition: all .3s;
}

.scale-transition-enter-to,
.scale-transition-leave-from {
  opacity: 1;
  transform: none;
  transition: all .3s;
}

// slide transition
.slide-transition-enter-from,
.slide-transition-leave-to {
  opacity: 0;
  transform: translateX(100px);
  transition: all .3s;
}

.slide-transition-enter-to,
.slide-transition-leave-from {
  opacity: 1;
  transform: none;
  transition: all .3s;
}

// fade transition
.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0;
  transition: all .3s;
}

.fade-transition-enter-to,
.fade-transition-leave-from {
  opacity: 1;
  transition: all .3s;
}

// list transition
.list-transition-enter-from,
.list-transition-leave-to {
  opacity: 0;
  transform: translateX(150px);
  transition: all .5s;
}

.list-transition-enter-to,
.list-transition-leave-from {
  opacity: 1;
  transform: none;
  transition: all .5s;
}

.list-transition-leave-active {
  position: absolute;
}
</style>