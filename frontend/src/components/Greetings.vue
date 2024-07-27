<template>
  <div>
    <p>Hello!</p>
    <h2></h2>
  </div>
</template>
<script setup>
const props = defineProps({
  username: {
    default: "",
    required: true,
  },
});
</script>
