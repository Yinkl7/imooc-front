<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

const isLoading = ref(false)
const isFinished = ref(false)

let query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])

const getPexelsData = async () => {
  if (isFinished.value) {
    return
  }

  if (pexelsList.value.length) {
    query.page += 1
  }

  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }

  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }

  isLoading.value = false
}
</script>

<template>
  <div>
    <m-infinite
      v-model="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
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
    </m-infinite>
  </div>
</template>

<style scoped></style>
