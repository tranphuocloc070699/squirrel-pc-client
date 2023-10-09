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
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
   
    background: white !important;
    color:#f48a06;
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
