<template>
  <input
    class="bg-transparent border border-solid border-[#383838] rounded-md p-3 shadow-none"
    :type="props.type"
  />
</template>
<script setup>
const props = defineProps({
  type: {
    default: Text,
    type: String,
  },
});
</script>
