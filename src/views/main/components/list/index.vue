<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

let query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])

const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}

getPexelsData()
</script>

<template>
  <div>
    <m-water-full
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
      class="w-full px-1"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-water-full>
  </div>
</template>

<style scoped></style>
