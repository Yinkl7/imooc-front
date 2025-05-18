<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuCpn from '@/views/main/components/menu/index.vue'

const slideTarget = ref()

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

let itemEleList = []
// 数据更新触发渲染时会执行
const getItemList = (e) => {
  if (e) {
    itemEleList.push(e)
  }
}
onBeforeUpdate(() => {
  itemEleList = []
})

const currentCategoryIndex = ref(0)

const store = useStore()

const handleItemClick = (item) => {
  store.commit('app/changeCurrentCategoty', item)
  showPopup.value = false
}

const categoryRef = ref()

const { x: ulLeft } = useScroll(categoryRef)
/**
 * 1、获取ul中元素滚动距离
 * 2、获取点击元素left距离
 * 3、减去ul的padding-left
 */
watch(currentCategoryIndex, (value) => {
  const dom = itemEleList[value]
  const { width, left } = dom.getBoundingClientRect()
  sliderStyle.value = {
    // ul中元素滚动距离 + 点击元素left距离 - ulpadding
    transform: `translateX(${ulLeft.value + left - 10}px)`,
    width: `${width}px`
  }
})

const showPopup = ref(false)
const handleIconClick = () => {
  showPopup.value = true
}
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="categoryRef"
    >
      <!-- 滑块 -->
      <li
        ref="slideTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
        @click="handleIconClick"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- items -->
      <li
        v-for="(item, index) in $store.getters.categoryList"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-2.5"
        :ref="getItemList"
        @click="handleItemClick(item)"
        :class="{ 'text-white': $store.getters.currentCategoryIndex === index }"
      >
        {{ item.name }}
      </li>
    </ul>

    <m-popup v-model="showPopup">
      <menu-cpn :categorys="data" @clickCategoryItem="handleItemClick" />
    </m-popup>
  </div>
</template>
