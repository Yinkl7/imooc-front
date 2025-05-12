<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'

const EMIT_SEARCH = 'search'

const EMIT_CLEAR = 'clear'

const EMIT_INPUT = 'input'

const EMIT_FOCUS = 'focus'

const EMIT_BLUR = 'blur'
</script>

<script setup>
/**
 * 1. 输入框内双向绑定
 * 2. 搜索按钮在hover时展示
 * 3. 一键清空文本
 * 4. 触发搜索 按钮和enter
 * 5. 控制下拉区域展示
 * 6. 事件处理
 */

import { ref } from 'vue'
import { useVModel, onClickOutside, useDebounce } from '@vueuse/core'

const inputFocus = ref(false)
const searchRef = ref()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

const inputValue = useVModel(props, 'modelValue', emits)
const inputFn = useDebounce((val) => {
  emits(EMIT_INPUT, val)
})
// 用户输入
watch(inputValue, inputFn)

// 清除搜索框
const handleClearValue = ($event) => {
  inputValue.value = ''
  emits(EMIT_CLEAR, $event)
}
// 搜索
const handleSearch = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
// 获取焦点
const handleInputFocus = () => {
  inputFocus.value = true
  emits(EMIT_FOCUS)
}
const handleInputBlur = () => {
  emits(EMIT_BLUR)
}
onClickOutside(searchRef, () => {
  inputFocus.value = false
})
</script>

<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="searchRef"
  >
    <div>
      <m-svg-icon
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>

      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-sm text-zinc-900 tracking-wide font-semibold border border-zinc-100 focus:border-red-300 duration-500 group-hover:bg-white group-hover:border-zinc-200"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="handleSearch"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />

      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] right-9 cursor-pointer duration-500"
        name="input-delete"
        @click="handleClearValue"
      ></m-svg-icon>

      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute top-[50%] translate-y-[-50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>

      <!-- 搜索按钮 通用组件 -->
      <m-button
        class="opacity-0 absolute top-[50%] translate-y-[-50%] right-1 rounded-full duration-500 group-hover:opacity-100"
        icon="search"
        iconColor="#fff"
        @click="handleSearch"
      ></m-button>
    </div>

    <!-- 下拉区域 -->
    <Transition name="slider">
      <div
        v-if="$slots.contentData"
        v-show="inputFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      >
        <slot name="contentData" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
