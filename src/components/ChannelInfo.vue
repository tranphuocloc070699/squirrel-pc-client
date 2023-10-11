<template>
    <div class="mt-8 mx-auto max-w-7xl w-full ">
        <h3 class="mx-auto max-w-7xl w-full flex items-center px-4">
      <img :src="`/src/assets/images/star.svg`" />
      <span class="ml-2 mt-1 font-semibold text-xl">CHANNEL</span>
    </h3>
        <div v-if="!loading && props.channel.channelId.length>0"
            class="mt-8 mx-4 shadow rounded-lg p-4 inline-block"
            >
            <div class="flex  items-start ">
                <img :src="props.channel.thumbnails[0].url" :width="props.channel.thumbnails[0].width" :height="props.channel.thumbnails[0].height" class=" object-cover rounded-full" />
            <div class="ml-6 flex flex-col justify-between">
                <div>
                    <h4 class="font-semibold text-xl">{{ props.channel.title }} <span class="ml-1 inline-block h-[24px] text-xs border border-blue_557 px-2 py-1 text-blue_739 rounded-3xl">{{ props.channel.subscribers }}</span></h4>
                <h5 class="mt-3 text-sm text-slate-600">{{ props.channel.description }}</h5>
                </div>
                <a :href="props.channel.url" target="_blank" class="mt-3 font-bold max-w-[120px] text-base text-primary">YOUTUBE LINK</a>
            </div>
            </div>
        </div>
    
        <ChannelSkeleten  v-show="loading"/>

    </div>
</template>

<script setup lang="ts">
import type { IChannelInfo } from '@/types';
import ChannelSkeleten from '@/components/Loading/ChannelSkeleten.vue';
const props = defineProps({
  channel: {
    type: Object as () => IChannelInfo,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>