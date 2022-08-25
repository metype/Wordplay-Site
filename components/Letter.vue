<script setup lang="ts">  
    import { state } from '../state';
</script>

<template>
        <div :class="`relative h-center letter ${val}`" id="letter">
            <h3 class="text">
                <slot />
            </h3>
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
    top:25%;
    height:calc(calc(100vh - 15rem) / 4);
    transition: background-color 1000ms;
}

text {
    top:0px;
    transform: translateY(-100%);
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

.letter {
    /* font-size:xx-large; */
    font-size: calc(calc(100vh - 15rem) / 15);
    text-align:center;
}

div.for-player.letter {
    background-color:red;
}

div.for-competition.letter {
    background-color:blue;
}
</style>