<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView />
    <notifications />
  </div>
</template>

<style lang="scss" >
.vue-notification {

  margin: 0 5px 5px;
  padding: 10px;
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
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
