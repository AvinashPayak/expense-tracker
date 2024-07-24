<template>
  <div class="walkthrough-step" v-if="showStep">
    <div class="walkthrough-step__content">
      <img :src="`src/assets/icons/${step.icon}.svg`" alt="" />
      <div>
        <h2>{{ step.title }}</h2>
        <p>{{ step.content }}</p>
      </div>
    </div>
    <div class="walkthrough-step__buttons">
      <button v-if="isFinalStep" @click="completeWalkthrough">Done!</button>
      <button v-else @click="nextStep">Next</button>
      <button class="btn-secondary" @click="completeWalkthrough">skip</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  step: {
    required: true,
    type: Object,
  },
});
const emits = defineEmits(["nextStep", "completeWalkthrough"]);
const currentStepId = inject("currentStepId");
const finalStep = inject("finalStep");

const showStep = computed(() => currentStepId.value === props.step.stepId);
const isFinalStep = computed(() => currentStepId.value === finalStep.value);

const nextStep = () => {
  emits("nextStep", currentStepId.value);
};
const completeWalkthrough = () => {
  emits("completeWalkthrough");
};
</script>
<style scoped>
h2 {
  margin: 0;
}

.walkthrough-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  margin: 1rem;
}

.walkthrough-step__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.walkthrough-step__content > div {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.walkthrough-step__content h2 {
  font-size: 2.5rem;
  text-align: center;
  line-height: 1;
}

.walkthrough-step__content p {
  font-size: 1rem;
}

.walkthrough-step__content img {
  height: auto;
  max-width: 100%;
}

.walkthrough-step__buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.walkthrough-step__buttons button {
  border-radius: 0.75rem;
}
</style>
