<template>
  <div>
    <Modal :isOpen="isModalOpen" @close="closeModal">
      <template #header>
        <h3>Add Expense Details</h3>
      </template>
      <template #body>
        <div class="flex flex-col gap-5 overflow-y-auto h-full pb-4">
          <div class="flex flex-col gap-2">
            <label for="category">CATEGORY</label>
            <Input name="category" :type="'text'" />
          </div>
          <div>
            <div class="flex flex-col gap-2">
              <label for="date">DATE</label>
              <Datepicker
                class="bg-transparent border border-[#383838] rounded-md border-solid p-4"
                v-model="selectedDate"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="title">TITLE</label>
            <Input name="title" :type="'text'" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="description">DESCRIPTION</label>
            <textarea
              name="description"
              class="bg-transparent border border-[#383838] rounded-md p-4"
              rows="2"
              cols="50"
            ></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <label for="amount">AMOUNT</label>
            <Input name="amount" :type="'text'" />
          </div>
        </div>
      </template>
      <template #footer>
        <button>Add Expense</button>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Modal from "../UI/Modal.vue";
import Datepicker from "vue3-datepicker";
import Input from "../Base/Input.vue";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
});

const selectedDate = ref(new Date());
const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};
</script>
