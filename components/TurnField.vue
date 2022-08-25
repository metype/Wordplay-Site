<template>
    <div :class="`relative turn-field h-center ${bubbleColour}`"  :style="`cursor:${clickable?'pointer':'default'}`" @click="if (clickable) { state.showPopup = true; state.popupType = 'next-game' };">
        <h3 class="h-center absolute text">{{currentTurn}}</h3>
    </div>
</template>

<script lang="ts">
import { state } from '../state';
export default {
    data() {
        return {
            state: state,
        }
    },
    computed : {
        currentTurn() {
            if (state.turn == 1) {
                return 'Your Turn!';
            } else if (state.turn == 0) {
                return 'Opponents Turn!';
            } else if (state.turn == -1) {
                return 'Waiting For Opponent!';
            } else {
                return 'Start New Game!';
            }
        },
        bubbleColour() {
            if (state.turn == 1) {
                return 'red';
            } else if (state.turn == 0) {
                return 'blue';
            } else {
                return 'grey';
            }
        },
        clickable() {
            return state.turn == -2;
        },
        clickBehaviour() {
            if (this.clickable()) {
                state.showPopup = true;
                state.popupType = 'next-game'
            }
        }
    }
}
</script>

<style scoped>
div.turn-field {
    border: 1px solid #555;

    transition: all 1000ms;
    height:3rem;
    width:15rem;
    border-radius: 15px;
}

div.turnfield div {
    height: 100%;
    width: 100%;
}

.text {
    white-space: nowrap;
    text-align: justify;
    top: -0.5rem;
}

.light-mode .turn-field.grey {
    background-color: rgb(202, 202, 202);
    color:black;
}

.dark-mode .turn-field.grey {
    background-color: rgb(111, 111, 111);
    color : white
}

.night-mode .turn-field.grey {
    background-color: rgb(69, 69, 69);
    color: white;
}

div.red {
    background-color:red;
}

div.blue {
    background-color:blue;
}

h3.text {
    color:white;
}

.light-mode h3.text {
    color:black;
}
</style>