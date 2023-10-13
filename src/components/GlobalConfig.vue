<template>
    <div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { logError } from '@/utils/logError';
import axios from 'axios';
import { onMounted } from 'vue';
onMounted(async () =>{
    // const country = await getCurrentCountryCode();
    
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
}   )


// const getLocation = async () => {
//   try {
//     const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
//     const { latitude, longitude } = position.coords
//     const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
//     const data = await response.json()
//     return data.countryName
//   } catch (error) {
//     logError(error,'[Browser] GlobalConfig/getLocation')
//     return null
//   }
// }

const getCurrentCountryCode = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/')
    return response.data.country_code
  } catch (error) {
    console.error(error)
    return null
  }
}
</script>

<style scoped>

</style>