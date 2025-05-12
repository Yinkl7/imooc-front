<script>
const ITEM_CLICK = 'click'

const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}

const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'small-icon': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>
<script setup>
import { computed } from 'vue'

/**
 * 1. 构建type和size可选项
 * 2. 通过props让控制按钮
 * 3. 区分icon button和text button
 * 4. 依据当前数据，实现视图
 * 5. 处理点击事件
 */
const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  loading: { type: Boolean, default: false },
  isActiveAnimate: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`type 必须是以下类型${keys.join('、')}`)
      }
      return res
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter(
        (item) => !item.includes('icon')
      )
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`size 必须是以下类型${keys.join('、')}`)
      }
      return res
    }
  }
})

const emits = defineEmits([ITEM_CLICK])

const realSize = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size
})

const handleClick = ($event) => {
  emits(ITEM_CLICK, $event)
}
</script>

<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[realSize].button,
      { 'active:scale-105': isActiveAnimate }
    ]"
    @click.stop="handleClick"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      class="w-2 h-2 animate-spin mr-1"
      name="loading"
    ></m-svg-icon>
    <!-- icon -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      :class="sizeEnum[realSize].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字 -->
    <slot v-else />
  </button>
</template>

<style scoped></style>
