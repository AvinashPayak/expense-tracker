<template>
    <div>
        <h1>DashBoard Page</h1>
        {{ isLoggedIn }}
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const isLoggedIn = computed(() => store.getters.GetUserLoggedInStatus)
const userDetails = computed(() => store.getters.GetUserDetails);
const username = computed(() => userDetails?.username);
</script>