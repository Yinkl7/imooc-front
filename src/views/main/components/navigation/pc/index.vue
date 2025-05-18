<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const isFold = ref(false)

const handleIconClick = () => {
  isFold.value = !isFold.value
}

const store = useStore()

const handleItemClick = (item) => {
  store.commit('app/changeCurrentCategoty', item)
}
</script>

<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-hidden px-[10px] py-1 text-xs text-zinc-600 duration-300 mx-auto"
      :class="isFold ? `h-[206px]` : `h-[54px]`"
    >
      <!-- 展示箭头 -->
      <div
        class="absolute right-1 bottom-1 z-30 p-1 cursor-pointer rounded duration-200 hover:bg-zinc-200"
        @click="handleIconClick"
      >
        <m-svg-icon
          :name="isFold ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900"
        />
      </div>

      <!-- item -->
      <li
        v-for="(item, index) in $store.getters.categoryList"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 font-bold h-4 leading-4 cursor-pointer text-base hover:bg-zinc-200 rounded mr-1 mb-1"
        :class="{
          'bg-zinc-200': $store.getters.currentCategoryIndex === index
        }"
        @click="handleItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
