<template>
  <div>
    <div class="login">
      <h1>Login Page</h1>
      <div class="auth-btns">
        <button :disabled="isGAuthAuthorized" @click="handleSignIn">Sign In</button>
        <button :disabled="!isGAuthAuthorized" @click="handleSignOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, inject } from 'vue';

const vue3GoogleAuth = inject('Vue3GoogleOauth');
const { proxy } = getCurrentInstance();
import axiosInstance from './utils/axios'

const isGAuthAuthorized = computed(() => vue3GoogleAuth.isAuthorized);

const handleSignIn = async () => {
  try {
    const googleUser = await proxy.$gAuth.signIn();
    console.log("googluser", googleUser);
    if (!googleUser) {
      return null;
    }
    console.log(googleUser);
    const userToken = googleUser.getAuthResponse().id_token;
    localStorage.setItem('token', userToken);
    console.log("user", userToken);

    const {data: {data:userData, state}} = await axiosInstance.post(`/login`);
    if(state) {
      console.log("userData", userData?.uuid);
      
    }    

  } catch (error) {
    console.log("error: ", error)
  }
}

const handleSignOut = async () => {
  try {
    await proxy.$gAuth.signOut();
    localStorage.removeItem('token');
  } catch (error) {
    console.log("error: ", error)
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

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
