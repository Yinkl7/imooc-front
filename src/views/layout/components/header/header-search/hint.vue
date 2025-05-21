<script setup>
import { ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'

const emits = defineEmits(['itemClick'])

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const hintDataList = ref()

const getHintData = async () => {
  if (!props.searchText) return
  const res = await getHint(props.searchText)
  hintDataList.value = res.result
}

watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})

const handleItemClick = (item) => {
  emits('itemClick', item)
  hintDataList.value = []
}

const highLightText = (text) => {
  const highLightText = `<span class='text-zinc-900 dark:text-zinc-200'>${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highLightText)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintDataList"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="handleItemClick(item)"
      v-html="highLightText(item)"
    ></div>
  </div>
</template>

<style scoped></style>
