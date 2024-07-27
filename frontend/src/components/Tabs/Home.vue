<template>
  <div class="home">
    <div class="header">
      <h2 class="title">Expenses</h2>
      <div @click="openModal" class="add-expense">
        <p>Add</p>
      </div>
    </div>
    <div>Expense Summary</div>
    <div>Transaction History</div>
    <AddExpense :isModalOpen="isModalOpen" @close="closeModal" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import AddExpense from "../Modals/AddExpense.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.add-expense {
  margin-left: auto;
}
</style>
