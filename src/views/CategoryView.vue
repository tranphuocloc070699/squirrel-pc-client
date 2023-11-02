<template>
  <LayoutDefault type="book">
    <BookList
      v-show="loading || data.length > 0"
      :books="data"
      :loading="loading"
      :country-select="true"
      :title="`Downloadest`"
      :icon="`/star.svg`"
    >
      <select
        v-model="selectedCountry"
        class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option v-for="item in countries" :key="item.code" :value="item.code">
          {{ item.name }}
        </option>
      </select>
    </BookList>
  </LayoutDefault>
</template>

<script setup lang="ts">

import jsonFile from '@/assets/json/book-countries.json'
import BookList from '@/components/Book/BookList.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useBookStore } from '@/stores/book.store'
import type { IBook, IParams } from '@/types'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

let countries = JSON.parse(JSON.stringify(jsonFile))
countries.push({ name: 'All', code: 'all' })

const route = useRoute()
const bookStore = useBookStore()

const data = ref<IBook[]>([])
const loading = ref(false)

const selectedCountry = ref('all')
const bookListOriginal = ref<IBook[]>([])
watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
      loading.value = true
      const payload: IParams = {
        id: Number.parseInt(routeParams.id),
        country_code: selectedCountry.value

      }
      bookStore
        .findByCategory(payload)
        .then((res) => {
          if (res) {
            data.value = res
            bookListOriginal.value = res
            console.log({book:{...bookListOriginal.value}})
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          loading.value = false
        })
    }
  },
  { immediate: true }
)

watch(
  () => selectedCountry.value,
  async () => {
    loading.value = true
    if (selectedCountry.value === 'all') {
        console.log({data:{...data.value}})
        console.log({book:{...bookListOriginal.value}})
      data.value = bookListOriginal.value
      loading.value = false
      return
    }

    if (route.params.id && typeof route.params.id === 'string') {
      const payload: IParams = {
        id: Number.parseInt(route.params.id),
        country_code: selectedCountry.value
      }

      bookStore
        .findByCategory(payload)
        .then((res) => {
          console.log({ res })
          console.log({book:{...bookListOriginal.value}})
          if (res) {
            data.value = res
          }
        })
        .catch((err) => {
          console.log(err)
        }).finally(() =>{
            loading.value = false
        })
    }
  }
)
</script>

<style scoped></style>
