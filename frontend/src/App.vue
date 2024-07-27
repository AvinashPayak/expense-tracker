<template>
  <div>
    <router-view :isUserLoggedIn="isUserLoggedIn" />
    <Navbar v-if="isUserLoggedIn" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";

import axiosInstance from "./utils/axios";

const store = useStore();
const router = useRouter();

const isUserLoggedIn = computed(() => store.getters.GetUserLoggedInStatus);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const {
      data: { data: userData, state },
    } = await axiosInstance.get(`/user-details`);
    if (state && Object.keys(userData).length > 0) {
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
