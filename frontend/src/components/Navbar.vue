<template>
  <div class="nav-bar">
    <ul class="nav-items">
      <li @click="selectTab(tab)" v-for="tab in tabs" :key="tab.id">
        <img
          v-if="currentTab === tab.id"
          :src="`src/assets/icons/${tab.tabSelected}.svg`"
          alt=""
        />
        <img v-else :src="`src/assets/icons/${tab.tab}.svg`" alt="" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const tabs = [
  {
    id: 1,
    tab: "home",
    tabSelected: "home-selected",
  },
  {
    id: 2,
    tab: "stats",
    tabSelected: "stats-selected",
  },
  {
    id: 3,
    tab: "wallet",
    tabSelected: "wallet-selected",
  },
  {
    id: 4,
    tab: "profile",
    tabSelected: "profile-selected",
  },
];

const currentTab = computed({
  get() {
    return store.getters.GetUserCurrentTab;
  },
  set(value) {
    store.commit("setUserCurrentTab", value);
  },
});

const selectTab = (tab) => {
  currentTab.value = tab.id;
};
</script>
<style scoped>
.nav-bar {
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  background: #242425;
}
.nav-items {
  display: flex;
  justify-content: space-around;
}
</style>
