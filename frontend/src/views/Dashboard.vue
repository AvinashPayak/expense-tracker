<template>
    <div class="dashboard">
        <h1>DashBoard</h1>
        <Walkthrough class="walkthrough" v-if="!isWalkthroughCompleted" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import Walkthrough from '../components/Walkthrough/index.vue';

const store = useStore();

const isWalkthroughCompleted = computed(() => store.getters.IsWalkthroughCompleted);
</script>
<style scoped>
.walkthrough {
    z-index: 100000;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #242424;
    position: fixed;
    display: flex;
    justify-content: center;
}
</style>