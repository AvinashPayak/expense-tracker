<template>
  <div>
    <Header />
    <router-view />
    <Navbar />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";

import axiosInstance from "./utils/axios";

const store = useStore();
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const {
      data: { data: userData, state },
    } = await axiosInstance.post(`/login`);
    if (state) {
      store.commit("setUserLoggedIn", true);
      store.commit("setUserDetails", userData);
      router.push({ name: "home" });
    }
  } else {
    router.push({ name: "login" });
  }
});
</script>

<style scoped></style>
