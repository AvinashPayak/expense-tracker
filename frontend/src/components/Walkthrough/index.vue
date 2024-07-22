<template>
    <WalkthroughSteps :walkthroughSteps="walkthroughSteps" :currentStepId="currentStepId" @nextStep="nextStep" @completeWalkthrough="completeWalkthrough" />
</template>
<script setup>
import { computed, provide, ref } from "vue";
import WalkthroughSteps from './WalkthroughSteps.vue';
import axiosInstance from "../../utils/axios";
import { useStore } from 'vuex'

const store = useStore();

const walkthroughSteps = [
    {
        stepId: 1,
        title: 'Gain control of your money',
        content: 'Become your own money manager and make every cent count',
        icon: 'gain-control'
    },
    {
        stepId: 2,
        title: 'Know where your money goes',
        content: 'Track your transaction easily, with categories and financial report',
        icon: 'money-going'
    },
    {
        stepId: 3,
        title: 'Planning Ahead',
        content: 'Setup your budget for each category you in control',
        icon: 'plan-ahead'
    }
];

const userUuid = computed(() => store.getters.GetUserUuid);

const currentStepId = ref(walkthroughSteps[0].stepId);
const finalStep = ref(walkthroughSteps.length);

provide('currentStepId', currentStepId);
provide('finalStep', finalStep);

const nextStep = (step) => {
    const totalSteps = walkthroughSteps.length;
    if(step < totalSteps) {
        currentStepId.value++;
    }
}

const completeWalkthrough = async () => {
    const walkthroughPayload = {
        uuid: userUuid.value,
        completed: true,
    }
    const {data: {data:WalkthroughData, state}} = await axiosInstance.post(`/update-walkthrough`, walkthroughPayload);
    if(state) {
        store.commit('setWalkthroughCompleted', WalkthroughData?.walkthroughCompleted);
    }
    

}

</script>