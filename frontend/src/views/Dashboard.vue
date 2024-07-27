<template>
  <div class="dashboard">
    <component class="tab" :is="currentTab"> </component>
    <Walkthrough class="walkthrough" v-if="isWalkthroughCompleted" />
  </div>
</template>
<script setup>
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useStore } from "vuex";
import Walkthrough from "../components/Walkthrough/index.vue";
const Home = defineAsyncComponent(() => import("../components/Tabs/Home.vue"));
const Profile = defineAsyncComponent(
  () => import("../components/Tabs/Profile.vue"),
);
const Stats = defineAsyncComponent(
  () => import("../components/Tabs/Stats.vue"),
);
const Wallet = defineAsyncComponent(
  () => import("../components/Tabs/Wallet.vue"),
);
const store = useStore();

const isWalkthroughCompleted = computed(
  () => store.getters.IsWalkthroughCompleted === false,
);
const userCurrentTab = computed(() => store.getters.GetUserCurrentTab);
const currentTab = computed(() => {
  switch (userCurrentTab.value) {
    case 1:
      return Home;

    case 2:
      return Stats;

    case 3:
      return Wallet;

    case 4:
      return Profile;

    default:
      return Home;
  }
});
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
.tab {
  margin: 0 1rem;
}
</style>
