<script setup></script>

<template>
  <div>
    <!-- 头部标题：pc端 -->
    <div class="hidden pt-5 h-8 xl:block">
      <img
        v-lazy
        class="m-auto"
        src="https://res.lgdsunday.club/signlogo.png"
        alt=""
      />
    </div>
    <!-- 头部标题：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped></style>
