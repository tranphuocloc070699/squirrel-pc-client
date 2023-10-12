<template>
    <transition name="modal">
      <div class="modal-mask" v-if="show">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>{{ title }}</h3>
              <button class="modal-close-button" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  });
  
  const closeModal = () => {
    emit('update:show', false);
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-wrapper {
    transition: all 0.3s ease-out;
  }
  
  .modal-container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .modal-close-button {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
  
  .modal-body {
    flex: 1;
    overflow: auto;
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease-out;
  }
  
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.7);
  }
  </style>