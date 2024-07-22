<template>
    <div>
        <div v-for="step in props.walkthroughSteps" :key="step.stepId">
           <WalkthroughStep :step="step" @nextStep="nextStep" @completeWalkthrough="completeWalkthrough"  />
        </div>
    </div>
</template>
<script setup>
import WalkthroughStep from './WalkthroughStep.vue'

const props = defineProps({
    walkthroughSteps: {
        required: true,
        type: Object,
    }
})
const emits = defineEmits(["nextStep", "completeWalkthrough"]);

const nextStep = (currentStepId) => {
    emits('nextStep', currentStepId);
};
const completeWalkthrough = () => { emits('completeWalkthrough') };
</script>