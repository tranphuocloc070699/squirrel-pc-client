<template>
    <div>
        <LayoutDefault>
            <div class="mt-8 mx-auto max-w-7xl w-full px-4">
                <div class="mt-4 text-end">
                    <span class="text-green_379 cursor-pointer hover:underline text-base font-semibold">Create Feedback</span>
                </div>
                <div class="max-w-2xl mx-auto" v-for="item in 6" :key="item">
                <FeedbackItem   />
                </div>
            </div>
        </LayoutDefault>
    </div>
</template>

<script setup lang="ts">
import FeedbackItem from '@/components/FeedbackItem.vue';
import  LayoutDefault from '@/layouts/LayoutDefault.vue';


</script>

<style scoped>

</style>