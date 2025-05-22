<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import { useStore } from 'vuex'
const searchVal = ref('')

const store = useStore()
const handleItemClick = (item) => {
  searchVal.value = item
  if (item) {
    store.commit('search/addHistory', item)
    store.commit('app/changeSearchText', item)
  }
}
</script>

<template>
  <div class="w-full">
    <m-search
      v-model="searchVal"
      @search="handleItemClick"
      @clear="handleItemClick"
    >
      <template #contentData>
        <div>
          <hint-vue
            v-show="searchVal"
            :searchText="searchVal"
            @itemClick="handleItemClick"
          ></hint-vue>

          <history-vue
            v-show="!searchVal"
            @itemClick="handleItemClick"
          ></history-vue>

          <theme-vue v-show="!searchVal"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<style scoped></style>
