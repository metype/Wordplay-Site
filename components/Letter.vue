<script setup lang="ts">  
    import { state } from '../state';
</script>

<template>
    <div :class="`letter ${val}`" id="letter">
        <h3 class="absolute hv-center text"><slot /></h3>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        index: Number,
    },
    data() {
        return {
            val: String,
        }
    },
    mounted() {
        const vals = ['', 'for-player', 'for-competition']
        setInterval(() => {
            this.val = vals[state.boardState[this.index]];
        }, 100)
    }
}
</script>

<style scoped>
.letter {
    position: relative;
    /* padding: 100% 0; */
    height:300%;
    top:25%;
    transition: all 1000ms;
}

h3.text {
    color:white;
}

.light-mode h3.text {
    color:black;
}

.light-mode .letter {
    background-color: rgb(190, 190, 190); 
}
.dark-mode .letter {
    background-color: #555;
}
.night-mode .letter {
    background-color: #555;
}

.text {
    top:15%;
    font-size:xx-large;
}

div.for-player.letter {
    background-color:red;
}

div.for-competition.letter {
    background-color:blue;
}
</style>