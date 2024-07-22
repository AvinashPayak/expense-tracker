<template>
    <div class="login">
        <h1>Login Page</h1>
        <div class="auth-btns">
        <button :disabled="isGAuthAuthorized" @click="handleSignIn">Sign In</button>
        <button :disabled="!isGAuthAuthorized" @click="handleSignOut">Sign Out</button>
      </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter()

const vue3GoogleAuth = inject('Vue3GoogleOauth');
const { proxy } = getCurrentInstance();
import axiosInstance from '../utils/axios'

const isGAuthAuthorized = computed(() => vue3GoogleAuth.isAuthorized);

const handleSignIn = async () => {
  try {
    const googleUser = await proxy.$gAuth.signIn();
    if (!googleUser) {
      return null;
    }
    const userToken = googleUser.getAuthResponse().id_token;
    localStorage.setItem('token', userToken);

    const {data: {data:userData, state}} = await axiosInstance.post(`/login`);
    if(state) {
      store.commit('setUserLoggedIn', true);
      store.commit("setUserDetails", userData);
      router.push({ name: 'home'})
    }    

  } catch (error) {
    console.log("error: ", error)
  }
}

const handleSignOut = async () => {
  try {
    await proxy.$gAuth.signOut();
    localStorage.removeItem('token');
    store.commit('setUserLoggedIn', false);
  } catch (error) {
    console.log("error: ", error)
  }
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-btns {
  display: flex;
  gap: 10px;
}
</style>