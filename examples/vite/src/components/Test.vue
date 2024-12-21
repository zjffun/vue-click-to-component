

<template>
  <div class="container">
    <div class="left">
      right
    </div>

    <div class="right">
      left
    </div>

    <div class="long-locaiton" ref="el">
      long data-__source-code-location
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref();

onMounted(() => {
  el.value.setAttribute("data-__source-code-location", "/longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong/long.vue:1:1");
});
</script>

<style scoped>
.container {
  padding: 0 0 1000px 0;
  display: flex;
  flex-direction: column;
  gap: 100px;

  .left, .right, .long {
    width: 100px;
    height: 100px;
    background: aqua;
  }

  .left {
    margin-left: -50px;
  }

  .right {
    align-self: flex-end;
    margin-right: -50px;
  }

  .long-locaiton {
    position: sticky;
    top: 0;
    background-color: red;
  }
}
</style>
