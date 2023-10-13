<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalConfig from './components/GlobalConfig.vue';
</script>

<template>
  <div>
    <GlobalConfig>
    <RouterView />
    <notifications position="top center" />
  </GlobalConfig>
  </div>
</template>

<style lang="scss" >
.vue-notification {

  margin: 60px 5px 5px;
  padding: 6px;
  font-size: 16px !important;
  color: #ffffff;


  background: #44a4fc;
  border-left: 5px solid #187fe7;


  &.success {
    color:#087285;
    background: white !important;
    border :2px solid #087285 !important;
    border-left:5px solid #087285 !important;
    border-top:5px solid #087285 !important;
  }

  &.warn {
   
    color:#f48a06;
    background: white !important;
    border :2px solid #ffb648 !important;
    border-left:5px solid #f48a06 !important;
    border-top:5px solid #f48a06 !important;
  }

  &.error {
    color:#b82e24;
    background: white !important;
    border :2px solid #e54d42 !important;
    border-left:5px solid #b82e24 !important;
    border-top:5px solid #b82e24 !important;
  }
}
</style>
