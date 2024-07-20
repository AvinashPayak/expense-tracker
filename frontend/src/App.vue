<template>
  <div>
    <Header />
    <router-view/>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from "./components/Header.vue";
import axiosInstance from "./utils/axios";

const store = useStore();
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('token');
  if(token) {
    console.log("on mounted")
    const {data: {data:userData, state}} = await axiosInstance.post(`/login`);
    if(state) {
      console.log("userData", userData);
      store.commit('setUserLoggedIn', true);
      store.commit("setUserDetails", userData);
      router.push({ name: 'home'})
    }  
  } else {
    router.push({ name: 'login'})
  }
})
</script>

<style scoped>

</style>
