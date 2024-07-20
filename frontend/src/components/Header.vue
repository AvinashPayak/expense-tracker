<template>
    <div class="header">
        <p>Hello {{ username }}</p>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const userDetails = computed(() => store.getters.GetUserDetails);
const username = computed(() => userDetails.value?.username);

</script>