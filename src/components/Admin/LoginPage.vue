<template>
    <div >
        <section class="bg-gray-200 mt-8">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="font-lobster flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Squirrel    
      </a>
      <div  class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div v-show="!adminStore.loading" class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <div class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" v-model="auth.email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" v-model="auth.password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required>
                  </div>
                  <button @click="handleLogin" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
               
                </div>
          </div>
          <div v-show="adminStore.loading" class="fixed inset-0 flex items-center justify-center bg-slate-500 text-white text-xl">Loading...</div>
      </div>
  </div>
</section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdminStore } from '@/stores/admin.store';

const adminStore =  useAdminStore();
const auth = ref({
    email:'',
    password:''
})

const handleLogin = () =>{
    const payload = {...auth.value};
    const response = adminStore.login(payload);
    console.log({response})
}
</script>

<style scoped>

</style>