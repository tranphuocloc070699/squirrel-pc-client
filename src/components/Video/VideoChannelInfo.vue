<template>
    <div class="mt-8 mx-auto max-w-7xl w-full ">
        <div class="mx-auto max-w-xl w-full flex items-center px-4">
      <img :src="`/src/assets/images/star.svg`" />
      <span class="ml-2 mt-1 font-noto text-xl">CHANNEL</span>
   
    </div>
        <div v-if="!loading && channel.channelId.length>0 && errorMessage.length===0"
            class="mt-8 mx-4 max-w-xl shadow rounded-lg p-4 inline-block"
            >
            <div class="flex  items-start ">
                <img v-if="channel.thumbnails.length>0" :src="channel.thumbnails[0].url" :width="channel.thumbnails[0].width" :height="channel.thumbnails[0].height" class=" object-cover rounded-full" />
            <div class="ml-6 flex flex-col justify-between">
                <div>
                    <h4 class="font-medium text-xl">{{ channel.title }} <span class="ml-2 inline-block h-[24px] text-xs border border-blue_557 px-2 py-1 text-blue_739 rounded-3xl">{{ channel.subscribers }}</span></h4>
                <h5 class="mt-3 text-sm text-slate-600">{{ channel.description }}</h5>
                </div>
               <div class="flex justify-end">
                <a :href="props.channel.url" target="_blank" class="mt-4 font-medium max-w-[120px] text-base text-primary hover:underline">YOUTUBE LINK</a>
               </div>
            </div>
            </div>
        </div>
        <div v-show="!loading && errorMessage.length>0">
            <div  class="mt-8 mx-4 shadow rounded-lg p-4 inline-block">
                <h4 class="font-medium text-base text-slate-500">{{ errorMessage }}</h4>
            </div>
        </div>
    
        <ChannelSkeleton  v-show="loading"/>

    </div>
</template>

<script setup lang="ts">
import type { IChannelInfo } from '@/types';
import ChannelSkeleton from '@/components/Loading/ChannelSkeleton.vue';
import { computed } from 'vue';
const props = defineProps({
  channel: {
    type: Object as () => IChannelInfo,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  errorMessage:{
    type: String,
    default:''
  }
})

const channel = computed(() =>{
    const defaultState : IChannelInfo = {
      channelId: '',
  title: '',
  thumbnails: [],
  description: '',
  subscribers: '',
  url: ''
    }
    if(props.channel.channelId) defaultState.channelId = props.channel.channelId
    if(props.channel.title) defaultState.title = props.channel.title
    if(props.channel.thumbnails && props.channel.thumbnails.length>0) defaultState.thumbnails = props.channel.thumbnails
    if(props.channel.description) defaultState.description = props.channel.description
    if(props.channel.subscribers) defaultState.subscribers = props.channel.subscribers
    if(props.channel.url) defaultState.url = props.channel.url
    return defaultState;
})


</script>

<style scoped>

</style>