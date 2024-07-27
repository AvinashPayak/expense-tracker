<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeOnOverlay">
    <div class="modal" @click.stop>
      <header class="modal-header">
        <img
          class="back-button"
          :src="`src/assets/icons/back.svg`"
          alt=""
          @click="close"
        />
        <slot name="header"></slot>
      </header>
      <section class="modal-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};

const closeOnOverlay = () => {
  if (closeOnOverlayClick.value) {
    close();
  }
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #242424;
  border-radius: 1rem;
  width: 100%;
  height: 100vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-body {
  overflow-y: auto;
  height: 80vh;
  flex-grow: 1;
}
</style>
