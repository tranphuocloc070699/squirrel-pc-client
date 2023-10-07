<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <AppHeader />
    </header>
    <main class="flex-grow">
        <slot></slot>

    </main>
    <footer class="bg-primary h-[200px] w-full">
        <AppFooter/>
    </footer>
  </div>
  </template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

</script>

<style scoped>

</style>