<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './util'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  nodeKey: {
    type: String
  },
  column: {
    type: Number,
    default: 2
  },
  columnSpacing: {
    default: 20,
    type: Number
  },
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要预加载图片 计算图片宽高
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 最长的一块瀑布流的高度 作为整个容器的高度
const containerHeight = ref(0)
// 将每一列的高度添加到对象中
const columnHeightObj = ref({})
const useColumnHeight = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

const containerTargetRef = ref(null)
const containerLeft = ref(0)
const containerWidth = ref(0)

const useContainerWidth = () => {
  const style = getComputedStyle(containerTargetRef.value, null)
  const { paddingLeft, paddingRight } = style
  containerLeft.value = parseFloat(paddingLeft)

  containerWidth.value =
    containerTargetRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 根据显示区域的宽度 减去padding 减去行间距 再除以列数 得到行宽
const columnWidth = ref(0)
// 列间距总和
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})

const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
})

// 预加载图片
let itemsHeight = []
const waitImgComplate = () => {
  itemsHeight = []
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  const allImgElement = getImgElements(itemElements)
  // 获取所有url 标签
  const allSrcs = getAllImg(allImgElement)

  onComplateImgs(allSrcs).then(() => {
    // 所有图片都完成了加载
    itemElements.forEach((ele, index) => {
      itemsHeight[index] = ele.offsetHeight
    })
    useItemLocation()
  })
}

// 不需要预加载
const useItemHeight = () => {
  itemsHeight = []
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  // 计算item 高度
  itemElements.forEach((ele, index) => {
    itemsHeight[index] = ele.offsetHeight
  })
  useItemLocation()
}

const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) return

    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    console.log(item._style)

    // 增加对应的高度
    increaseHeightColumn(index)
  })

  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

const getItemLeft = () => {
  const column = Number(getMinHeightColumn(columnHeightObj.value))
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

const increaseHeightColumn = (index) => {
  const column = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[column] += itemsHeight[index] + props.rowSpacing
}

watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 所有元素都没有 _style时
      const resetColumnHeight = props.data.every((item) => !item._style)
      if (resetColumnHeight) {
        // 第一次加载，构建 columnHeightObj对象
        useColumnHeight()
      }

      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

const reset = () => {
  useColumnWidth()
  props.data.forEach((item) => {
    item._style = null
  })
}

watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0
      setTimeout(() => {
        reset()
      }, 200)
    } else {
      reset()
    }
  }
)

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>

<template>
  <div
    class="relative"
    ref="containerTargetRef"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 根据列数计算宽度，才能得到图片的宽高信息， -->
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfull-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
