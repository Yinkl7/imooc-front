<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  className: {
    type: String
  }
})

const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="className" :fill="color" />
  </svg>
</template>

<style scoped></style>
