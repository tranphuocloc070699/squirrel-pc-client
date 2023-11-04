<template>
    <div>
        <LayoutDefault type="admin">
            <div v-if="adminLogged">
                <AdminTabs :type="tabSelected" @change="num  => tabSelected=num"/>
              
              <AdminBookList v-show="tabSelected==0" :list="bookStore.allBook.data" :loading="adminStore.loading"/>
              <AdminCategoryList v-show="tabSelected==1" :list="bookStore.categoryList.data" :loading="adminStore.loading"/>
              <AdminAuthorList v-show="tabSelected==2" :list="bookStore.authorList.data" :loading="adminStore.loading"/>
              <AdminUploadFileList v-show="tabSelected==3" :list="adminStore.uploadFiles" :loading="adminStore.loading"/>
            </div>
            <div v-else>
                <LoginPage/>
            </div>
        </LayoutDefault>
    </div>
</template>

<script setup lang="ts">
import  LayoutDefault from '@/layouts/LayoutDefault.vue';
import AdminUploadFileList from '@/components/Admin/AdminUploadFileList.vue';
import { useAdminStore } from '@/stores/admin.store';
import {useBookStore} from '@/stores/book.store';
import { onMounted, ref } from 'vue';
import AdminTabs from '@/components/Admin/AdminTabs.vue';
import AdminCategoryList from '@/components/Admin/AdminCategoryList.vue';
import AdminAuthorList from '@/components/Admin/AdminAuthorList.vue';
import  AdminBookList from '@/components/Admin/AdminBookList.vue';
import LoginPage from '@/components/Admin/LoginPage.vue';
const adminStore = useAdminStore()
const bookStore = useBookStore()
const tabSelected = ref(0)
const adminLogged = ref(false)
onMounted(() => {
    if(adminStore.accessToken.length>0) adminLogged.value = true

    adminStore.findAllUploadFile()
    bookStore.findAllAuthor()
    bookStore.findAllCategory()
    bookStore.findAllBook()
})

</script>

<style scoped>

</style>