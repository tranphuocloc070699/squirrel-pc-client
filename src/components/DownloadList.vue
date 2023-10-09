<template>
  <div >
    <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600 mt-8 md:mt-0">Video</h3>
    <div class="border border-df  flex flex-wrap">
      <DownloadItem v-for="item in getVideos" :key="item.k" :download="item" />
    </div>
    <div  v-if="getAudios.success" class="mt-8">
      <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600">Audio</h3>
      <div class="border border-df  flex flex-wrap">
        <DownloadItem v-if="getAudios.data" :download="getAudios.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DownloadItem from './DownloadItem.vue'
import type { IDownloadItem } from '../types/index'

interface IAudio {
    success: boolean
    data?: IDownloadItem
}

const response = {
  status: 'ok',
  mess: '',
  page: 'detail',
  vid: 'XRyd6Bi4kfE',
  extractor: 'youtube',
  title: 'Xin Hãy Quên Anh - Trịnh Thăng Bình',
  t: 267,
  a: 'Trịnh Thăng Bình Official',
  links: {
    mp4: {
      '22': {
        size: 'MB',
        f: 'mp4',
        q: '720p',
        q_text: '720p (.mp4) <span class="label label-primary"><small>m-HD</small></span>',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwx0U/tQ99lhhbf4bZAbYPBb0YeyRcIGpw=='
      },
      '135': {
        size: '5.8 MB',
        f: 'mp4',
        q: '480p',
        q_text: '480p (.mp4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwx3WftQ99lhhbf4bZAbYPBb0YeyRcIFpms='
      },
      '18': {
        size: 'MB',
        f: 'mp4',
        q: '360p',
        q_text: '360p (.mp4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwxwV/tQ99lhhbf4bZAbYPBb0YeyRcIFrQ=='
      },
      '133': {
        size: '5 MB',
        f: 'mp4',
        q: '240p',
        q_text: '240p (.mp4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwxxVftcutx7mbbze4cWeulYmZavAYpIpG2L'
      },
      '17': {
        size: '1.6 MB',
        f: '3gp',
        q: '144p',
        q_text: '144p (.3gp)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhIY91wxyVf8foZ0zhrDucZoXYP5bg932DdNEoSKJJg=='
      },
      auto: {
        size: '',
        f: 'mp4',
        q: 'auto',
        selected: 'selected',
        q_text: 'MP4 auto quality',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwwiFL9Dutx7mbbze4cWeulYmQ=='
      }
    },
    mp3: {
      '140': {
        size: '4.1 MB',
        f: 'm4a',
        q: '.m4a',
        q_text: '.m4a (128kbps)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNhuxgxyU/NQ99lhhbf4bZAbYPBb0YeyQsIFoW4='
      },
      mp3128: {
        size: '4.1 MB',
        f: 'mp3',
        q: '128kbps',
        q_text: 'MP3 - 128kbps',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqlAxyU/NQ99lhhbf4bZAbYPBb'
      }
    },
    other: {
      '249': {
        size: '1.7 MB',
        f: 'webm',
        q: 'Audio',
        q_text: 'Audio .webm (48kbps)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/VfNQ99lhhbf4bZAbYPBb0YW2GdtG6WyMKA=='
      },
      '250': {
        size: '2.3 MB',
        f: 'webm',
        q: 'Audio',
        q_text: 'Audio .webm (64kbps)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/V/9Q99lhhbf4bZAbYPBb0YW2GdtG6WyNIQ=='
      },
      '251': {
        size: '4.4 MB',
        f: 'webm',
        q: 'Audio',
        q_text: 'Audio .webm (160kbps)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/UP0cutx7mbbze4cWeulYmZatBdZR5yKKJIE='
      },
      '598': {
        size: '555.7 KB',
        f: 'webm',
        q: 'Video',
        q_text: 'Video only 144p (WEBM)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/UP8Y5p0zhrDucZoXYP5bg932DdFA/TvKbYXSaA=='
      },
      '133': {
        size: '5 MB',
        f: 'mp4',
        q: 'Video',
        q_text: 'Video only 240P (MP4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwxxVftcutx7mbbze4cWeulYmZatBdZR5yKJIoM='
      },
      '242': {
        size: '1.3 MB',
        f: 'webm',
        q: 'Video',
        q_text: 'Video only 240P  (WEBM)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/U/8ctpF+g6rycJEBd/NBmt6+Hspc8CzEI4TZ'
      },
      '134': {
        size: '5.4 MB',
        f: 'mp4',
        q: 'Video',
        q_text: 'Video only 360P (MP4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwxwV/tcutx7mbbze4cWeulYmZatBdZR5yKJIoQ='
      },
      '243': {
        size: '2.5 MB',
        f: 'webm',
        q: 'Video',
        q_text: 'Video only 360P  (WEBM)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/Uv0ctpF+g6rycJEBd/NBmt6+Hspc8CzEI4TY'
      },
      '135': {
        size: '5.8 MB',
        f: 'mp4',
        q: 'Video',
        q_text: 'Video only 480P (MP4)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhNgqkwx3WftQ99lhhbf4bZAbYPBb0YW2GdtG6W+LJA=='
      },
      '244': {
        size: '3.5 MB',
        f: 'webm',
        q: 'Video',
        q_text: 'Video only 480P  (WEBM)',
        k: 'joFADta2x8b0bpGh6qHWqcesAl7j4qtxhMI/xR0/VfMctpF+g6rycJEBd/NBmt6+Hspc8CzEI4Tf'
      }
    }
  },
  related: [
    {
      title: 'Related Videos',
      contents: [
        {
          v: '6XLPoqEmHU0',
          t: 'Hãy Quên Anh - Nguyễn Hoàng Nam HD'
        },
        {
          v: 'uHKNIf30hQo',
          t: 'Anh Chỉ Là Cơn Gió | Trịnh Thăng Bình | Official Audio'
        },
        {
          v: 'sKzJrwYHz0g',
          t: 'Không Phải Anh Đúng Không - Khắc Việt'
        },
        {
          v: 'FPva9GURdSQ',
          t: 'Em Đã Quên Anh?'
        },
        {
          v: 'jIf-1NT3F48',
          t: 'Vỡ Tan (trịnh thăng Bình) cover guitar Ben JaMin guitar'
        },
        {
          v: '2KCRGHUPbUE',
          t: 'Xin Em Đừng Đi - Trịnh Thăng Bình'
        },
        {
          v: 'J1Cs6URbH0o',
          t: 'Sẽ Có Người Cần Anh - Cao Thái Sơn x Hương Tràm | Official Music Video'
        },
        {
          v: 'oFikrzoTW0s',
          t: 'NGÂN NGÂN 2023 - TUYỂN TẬP NHỮNG BẢN COVER LÀM MƯA LÀM GIÓ BXH ÂM NHẠC - NHẠC BALLAD BUỒN TÂM TRẠNG'
        },
        {
          v: 'xfs4bH0mmWY',
          t: 'Nơi Em Mãi Mãi Là Bình Yên - Hồ Quang Hiếu | Lyrics Video'
        },
        {
          v: '9i4yt8BbfAI',
          t: 'Bình Minh Ơi Dậy Chưa, Cafe Sáng Với Tôi Được Không... Ai Chung Tình Được Mãi | Nhạc Trẻ Nhẹ Nhàng'
        },
        {
          v: 'sQVRvSXQLpE',
          t: '15 CA KHÚC LÀM NÊN TÊN TUỔI TRỊNH THĂNG BÌNH | NHẠC TRẺ BUỒN TÂM TRẠNG HAY NHẤT'
        },
        {
          v: 'AANUMQV3AJg',
          t: 'NGÀY MAI NGƯỜI TA LẤY CHỒNG (REMIX) - THÀNH ĐẠT | Nhạc Remix Hot TikTok 2023 MIXTAPE - #natDJ'
        }
      ]
    }
  ]
}

const getAudios = computed(() => {
  const audio : IAudio = {
    success: false,
  }
  if (response.links?.mp3?.mp3128) {
    audio.success = true
    audio.data = response.links?.mp3?.mp3128
  } else {
    audio.success = false
  }
  return audio
})

const getVideos = computed(() => {
  const qualities = ['1080p', '720p', '480p', '360p']
  const videos = []
  for (const key in response.links.mp4) {
    const value = response.links.mp4[key as keyof typeof response.links.mp4]
    if (value.f === 'mp4' && qualities.includes(value.q)) {
      videos.push(value)
    }
  }
  return videos
})

// const getVideos = () => {
//     const qualities = ["1080p", "720p", "480p", "360p"];
//     // qualities.forEach((quality,index) => {

//     // });
//     for(const key in response.links.mp4){
//         const value = response.links.mp4[key as keyof typeof response.links.mp4];
//         if(value.f === "mp4" && qualities.includes(value.q)){
//             console.log(value);
//         }
//     }
//     return response.links.mp4
// }

onMounted(() => {})
</script>

<style scoped></style>
