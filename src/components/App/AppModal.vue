<template>
    <div class="fixed">
      <transition name="fade" appear>
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40" 
         v-if="showModal" 
         @click="closeModal"></div>
  </transition>
  <transition name="pop" appear>
    <div class="fixed top-0 left-0 right-0 bottom-0  m-auto w-fit h-fit min-w-[320px] p-4 rounded-sm bg-white z-50 transform-none" 
         role="dialog" 
         v-if="showModal"
         >
      <div class="flex justify-between items-center w-full">
    
        <h3 class="text-lg font-semibold text-slate-700">{{ title }}</h3>
        <button class="text-gray-500 hover:text-gray-600"  @click="closeModal">
          <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path
              d="M6.7 5.3a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 0 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"
            />
          </svg>
        </button>
      </div>
      <slot></slot>
    </div>
  </transition>
  </div>
  </template>
  
  <script setup lang="ts">

  
  const emit = defineEmits(['close'])

   defineProps({
    title: {
      type: String,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    }
  });
  
  const closeModal = () => {
    emit('close', false);
  };
  </script>
  
  <style scoped>


/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-100%);
}
  </style>