<template>
    <div v-if="showStep">
        <div>
            <p>X</p>
        </div>
        <div>
            <img :src="`src/assets/icons/${step.icon}.svg`" alt="">
            <h2>{{ step.title }}</h2>
            <p>{{ step.content }}</p> 
        </div>
        <div>
            <button @click="completeWalkthrough">skip</button>
            <button v-if="isFinalStep" @click="completeWalkthrough">Done!</button>
            <button v-else @click="nextStep">Next</button>

        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
    step: {
        required: true,
        type: Object,
    }
})
const emits = defineEmits(["nextStep", "completeWalkthrough"]);
const currentStepId = inject('currentStepId');
const finalStep =  inject('finalStep');

const showStep = computed(() => currentStepId.value === props.step.stepId)
const isFinalStep = computed(() => currentStepId.value === finalStep.value);
const nextStep = () => {
    emits('nextStep', currentStepId.value);
};
const completeWalkthrough = () => { emits('completeWalkthrough') };

</script>