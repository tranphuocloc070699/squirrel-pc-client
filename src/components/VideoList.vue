<template>
    <div>
        <div class="mt-8 mx-auto max-w-7xl w-full grid gap-8 px-4 grid-auto-fill">
            <VideoItem v-for="video in videos" :key="video.id" :video="video" />
    </div>
     
    </div>
</template>

<script setup lang="ts">
import VideoItem from './VideoItem.vue';

const videos = [
    {
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
        "url_suffix": "/watch?v=RfAB6nYMG4g&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "4HkSeZKkFwg",
        "thumbnails": [
            "https://i.ytimg.com/vi/4HkSeZKkFwg/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLBC2SLLKGO2ue20DCJyRdW9XzXHQw",
            "https://i.ytimg.com/vi/4HkSeZKkFwg/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLC-ajoxICsatmfCrW1ub_ktsfMpWA"
        ],
        "title": "Đổi Thay - Hồ Quang Hiếu (Lyrics Video)",
        "long_desc": null,
        "channel": "MOOV Việt Nam",
        "duration": "4:40",
        "views": "14.392.895 lượt xem",
        "publish_time": "6 năm trước",
        "url_suffix": "/watch?v=4HkSeZKkFwg&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "Vbhk4kwfq4k",
        "thumbnails": [
            "https://i.ytimg.com/vi/Vbhk4kwfq4k/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB8Np2Kxs_WMzJiLIGcUZ2c7HAEMQ"
        ],
        "title": "Đổi Thay - Noo Phước Thịnh「Official Lyrics Video」",
        "long_desc": null,
        "channel": "Mưa.",
        "duration": "3:48",
        "views": "1.041.359 lượt xem",
        "publish_time": "3 năm trước",
        "url_suffix": "/watch?v=Vbhk4kwfq4k&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "zmd6eYtskRY",
        "thumbnails": [
            "https://i.ytimg.com/vi/zmd6eYtskRY/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAo-bGlH99HWk8GJgjl7PFiBQSzqQ",
            "https://i.ytimg.com/vi/zmd6eYtskRY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAvQJdJ5Qg9b0pllsZ_iDN8VDBzgw"
        ],
        "title": "Trần Tâm - Đổi Thay",
        "long_desc": null,
        "channel": "Tiêu Nhiên Tuế Nguyệt",
        "duration": "4:31",
        "views": "4.746.275 lượt xem",
        "publish_time": "2 năm trước",
        "url_suffix": "/watch?v=zmd6eYtskRY&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "OECVOdy8bxk",
        "thumbnails": [
            "https://i.ytimg.com/vi/OECVOdy8bxk/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDN91Urfab5zJUmoIsniYwHwP9HFw",
            "https://i.ytimg.com/vi/OECVOdy8bxk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAag2RqIcmFHMWice4u-AA1bw1SqA"
        ],
        "title": "Đổi Thay - Như Ý (Quán Quân Solo Cùng Bolero 2018) [MV Official]",
        "long_desc": null,
        "channel": "Võ Hoàng Entertainment",
        "duration": "4:12",
        "views": "1.765.526 lượt xem",
        "publish_time": "4 năm trước",
        "url_suffix": "/watch?v=OECVOdy8bxk&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "Vygu08nYUpA",
        "thumbnails": [
            "https://i.ytimg.com/vi/Vygu08nYUpA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDis4uQpESbnx6FJE4IInm7NPrtNw",
            "https://i.ytimg.com/vi/Vygu08nYUpA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDvvSKoG2CnRD-o45oj7J90FwwJEA"
        ],
        "title": "Rượu Nào Dành Cho Người Say.. Con Tim Không Đổi Thay, Là Anh | Liên Khúc Nhạc Trẻ Buồn Mới Nhất 2023",
        "long_desc": null,
        "channel": "Ngày Buồn Nhất",
        "duration": "1:34:29",
        "views": "518.842 lượt xem",
        "publish_time": "1 tháng trước",
        "url_suffix": "/watch?v=Vygu08nYUpA&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "EW5OWQQHXE4",
        "thumbnails": [
            "https://i.ytimg.com/vi/EW5OWQQHXE4/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAC3ZPZ5naynYXbK2mxLRtda7Hppw",
            "https://i.ytimg.com/vi/EW5OWQQHXE4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAQnZt7-wFGrzpLcyZ4Q4kwFaCehA"
        ],
        "title": "Đổi Thay (H2O Remix) - Hồ Quang Hiếu | Nhạc Trẻ Remix 2023 Hay Nhất Hiện Nay",
        "long_desc": null,
        "channel": "H2O Remix",
        "duration": "4:35",
        "views": "30.045 lượt xem",
        "publish_time": "2 tháng trước",
        "url_suffix": "/watch?v=EW5OWQQHXE4&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "KDNdndcA-Fs",
        "thumbnails": [
            "https://i.ytimg.com/vi/KDNdndcA-Fs/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYLyBEKH8wDw==&rs=AOn4CLDURQJECEqcitJ9pieg4kkxNQR4ow",
            "https://i.ytimg.com/vi/KDNdndcA-Fs/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYLyBEKH8wDw==&rs=AOn4CLCuDsLe6vBrXC4foboVXekUxKC0cQ"
        ],
        "title": "Đổi Thay - Bằng Kiều ft.Tuấn Hưng ( Hãy Thắp Ánh Sáng )",
        "long_desc": null,
        "channel": "Trai hải dương",
        "duration": "5:00",
        "views": "1.795.716 lượt xem",
        "publish_time": "5 năm trước",
        "url_suffix": "/watch?v=KDNdndcA-Fs&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "a9enw4-up5w",
        "thumbnails": [
            "https://i.ytimg.com/vi/a9enw4-up5w/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCtF2W7-pyX_jkocGLV-qHfvKG-4Q",
            "https://i.ytimg.com/vi/a9enw4-up5w/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB2RGNNEJYa78WtncaKgnOk4jeggg"
        ],
        "title": "Rượu Nào Dành Cho Người Say...Con Tim Không Đổi Thay, Họ Đâu Thương Em | Nhạc Trẻ Nhẹ Nhàng Hay Nhất",
        "long_desc": null,
        "channel": "Ngày Buồn Nhất",
        "duration": "1:10:07",
        "views": "471.674 lượt xem",
        "publish_time": "3 tháng trước",
        "url_suffix": "/watch?v=a9enw4-up5w&pp=ygULxJDhu5VpIHRoYXk%3D"
    },
    {
        "id": "pSAZ5XloHnw",
        "thumbnails": [
            "https://i.ytimg.com/vi/pSAZ5XloHnw/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAcBMmqSvhPAd5O_ZIBAfq0P-JyPw",
            "https://i.ytimg.com/vi/pSAZ5XloHnw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAp65CGU6sK43WQJHV88xwv4Yfc7g"
        ],
        "title": "Đổi Thay - Phương Anh (Official 4K MV)",
        "long_desc": null,
        "channel": "Phương Anh Bolero",
        "duration": "4:39",
        "views": "977.832 lượt xem",
        "publish_time": "1 năm trước",
        "url_suffix": "/watch?v=pSAZ5XloHnw&pp=ygULxJDhu5VpIHRoYXk%3D"
    }
]
    </script>
    
<style scoped>

</style>