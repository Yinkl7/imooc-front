<script setup>
defineEmits(['clickCategoryItem'])
</script>

<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.categoryList"
        :key="item.id"
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
        @click="$emit('clickCategoryItem', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
