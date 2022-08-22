<template>
    <div class="absolute hv-center full-cover" v-if="state.showPopup" @click="state.showPopup = false;"/>
    <div :class="`absolute hv-center ${(state.popupType=='stats')?`board`:`board-short`} ${(state.showPopup)?`slide-up`:`slide-down`}`">
        <div v-if="state.popupType == 'help'">
            <h1 class="absolute h-center">Instructions</h1>
            <div class="hl h-center absolute" style="top:5rem;"></div>
            <h3 class="absolute justified" style="top:6rem;">Take Turns Against A Random Player Using Words To Toggle Letters On The Board. Whichever Player First Gets 40% Of The Board In Their Favour Wins!</h3>
        </div>
        <div v-else-if="state.popupType == 'stats'">
            <h1 class="absolute h-center">Statistics</h1>
            <h2 class="absolute" style="top:7rem;left:2rem;">Games</h2>
            <h2 class="absolute" style="top:7rem;right:2rem">{{games}}</h2>
            <h2 class="absolute" style="top:17rem;left:2rem;">Wins</h2>
            <h2 class="absolute " style="top:17rem;right:2rem">{{wins}}</h2>
            <h2 class="absolute" style="top:27rem;left:2rem;">Losses</h2>
            <h2 class="absolute" style="top:27rem;right:2rem">{{losses}}</h2>
            <div class="vl h-center absolute"></div>
            <div class="hl h-center absolute"></div>
        </div>
        <div v-else-if="state.popupType == 'next-game'">
            <h1 class="absolute h-center">{{wonPrompt}}</h1>
            <div class="hl h-center absolute" style="top:5rem;"></div>
            <button class="play-again-button h-center absolute" style="bottom:3rem" title="Play Game" @click="state.showPopup=false;state.gameID=''">
                {{(playPrompt)}}
            </button>
        </div>
        <button class="exit absolute" @click="state.showPopup = false;">x</button>
    </div>
</template>

<script lang="ts">
import { state } from '../state';

export default {
    data() {
        return {
            games: 0,
            wins: 0,
            losses: 0,
            state: {
                showPopup: true,
                popupType: "help",
            },
        }
    },
    mounted() {
        this.state = state;
        setInterval(() => {
            if (!process.server) {
                this.games = localStorage.getItem("games");
                this.wins = localStorage.getItem("wins");
                this.losses = localStorage.getItem("losses");
            }
        }, 10000)
    },
    computed: {
        wonPrompt() {
            if (state.winner == -1) return "Start Game?";
            return "You " + ((state.winner==1) ? 'Won!' : 'Lost!');
        },
        playPrompt() {
            if (state.winner == -1) return "Play Game";
            return "Play Another Game";
        },
    }
}
</script>

<style scoped>

.justified {
    text-align: center;
}

.vl {
    border-left: 2px solid black;
    height: 83%;
    top:17%;
}

.exit {
    top:1rem;
    right:1rem;
    background: none;
    border:none;
    font-size:x-large;
    cursor: pointer;
}

.light-mode .exit {
    color: black; 
}
.dark-mode .exit {
    color: white;
}
.night-mode .exit {
    color: white
}

.hl {
    border-top: 2px solid black;
    width:100%;
    top:17%;
}
.board {
    height: min(35rem,80vh);
    width: min(25rem,80vw);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.45);
}
.board-short {
    height: min(15rem,40vh);
    width: min(25rem,80vw);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.45);
}

div.slide-up {
  overflow: hidden;
  animation: ease-out 500ms slide-up;
}

@keyframes slide-up {
    from {
        top:150vh;
    }
    to {
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
}

div.slide-down {
  overflow: hidden;
  animation: ease-in 500ms slide-down;
  top:150vh;
}

@keyframes slide-down {
    from {
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    to {
        top:150vh;
    }
}

.light-mode .board, .light-mode .board-short {
    background-color: #e6e7e9; 
}
.dark-mode .board, .dark-mode  .board-short {
    background-color: #3a3e4c;
}
.night-mode .board, .night-mode .board-short {
    background-color: #20242e;
}

button.play-again-button {
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    padding: 16px 32px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 6px;
    background-color: #3fa63a;
    color: rgb(216, 216, 216);
    border: 2px solid #555555;
    font-size:large;
  }

  button.play-again-button:hover {
    background-color: #35c328;
    color: #000000;
  }
</style>