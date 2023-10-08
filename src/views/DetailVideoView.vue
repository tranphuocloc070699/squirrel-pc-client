<template>
    <div>
        <h1>DetailVideoView</h1>
        <div class="mt-8 mx-auto max-w-sm w-full">
            <VideoItem :video="video" :show-download="true"></VideoItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import VideoItem from '@/components/VideoItem.vue';
import type { IVideoItem } from '@/types';

    const video : IVideoItem =  {
        "id": "RfAB6nYMG4g",
        "thumbnails": [
            "https://i.ytimg.com/vi/RfAB6nYMG4g/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCDHks9uEmoso5TvCsQSt1NiTJwXQ",
            "https://i.ytimg.com/vi/RfAB6nYMG4g/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCdKqbTlikpMX3kz_toYGr8lsoaqg"
        ],
        "title": "ĐỔI THAY - HỒ QUANG HIẾU | OFFICIAL MV (4K)",
        "long_desc": null,
        "channel": "Hồ Quang Hiếu TV",
        "duration": "7:15",
        "views": "97.449.679 lượt xem",
        "publish_time": "7 năm trước",
        "url_suffix": "/watch?v=RfAB6nYMG4g&pp=ygULxJDhu5VpIHRoYXk%3D",
        download_counter:125
    }
</script>

<style scoped>

</style>