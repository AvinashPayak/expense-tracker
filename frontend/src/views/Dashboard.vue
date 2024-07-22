<template>
    <div>
        <h1>DashBoard</h1>
        isWalkthroughCompleted {{ isWalkthroughCompleted }}
        <Walkthrough v-if="!isWalkthroughCompleted" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import Walkthrough from '../components/Walkthrough/index.vue';

const store = useStore();

const isWalkthroughCompleted = computed(() => store.getters.IsWalkthroughCompleted);
</script>