<script setup lang="ts">
import { state } from '../state';
</script>

<template>
    <div class="notification absolute h-center" :style="`opacity:${Math.min(state.notifications[index].life/100,1)};top: calc(calc(5rem * ${index}) + 1rem);`">
        <h3>{{state.notifications[index].text}}</h3>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        index: Number,
    }
}
</script>

<style scoped>
.notification {
    top: 1rem;
    padding: 0rem 4rem;
    border-radius: 10px;
    text-align: center;
    border: solid 1px black;
}

.light-mode .notification {
    background-color: #e6e7e9; 
}
.dark-mode .notification {
    background-color: #3a3e4c;
}
.night-mode .notification {
    background-color: #20242e;
}
</style>