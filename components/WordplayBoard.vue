<script setup lang="ts">  
    import { state } from '../state';
    const boardState = state.boardState;
</script>

<template>
    <div class="absolute hv-center board">
        <div v-for="(group,i) in alphabet" class="letter-group">
        <div v-if="i==3"/>
            <Letter v-for="(letter,j) in group" :index="j+i*7">
                {{letter}}
            </Letter>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            alphabet: [['A','B','C','D','E','F','G'],['H','I','J','K','L','M','N'],['O','P','Q','R','S','T','U'],['V','W','X','Y','Z']],
        }
    },
    mounted() {
        if (localStorage.getItem("wins") == undefined || localStorage.getItem("losses") == undefined || localStorage.getItem("games") == undefined) {
            localStorage.setItem("wins", '0');
            localStorage.setItem("losses", '0');
            localStorage.setItem("games", '0');
        }
        const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        state.ID = genRanHex(24);
        axios.get(`${state.apiURL}/join?id=${state.ID}`).then(function (response) {
            state.notifications.push({
                    life: 300,
                    text: "Starting New Game",
            })
            state.gameID = response.data.id;
        });
        setInterval(() => {
            if (state.gameID == '') {
                state.notifications.push({
                    life: 300,
                    text: "Starting New Game",
                })
                localStorage.setItem("games", ""+(parseInt(localStorage.getItem("games")) + 1));
                axios.get(`${state.apiURL}/join/?id=${state.ID}`).then(function (response) {
                    state.gameID = response.data.id;
                });
            }
            if(state.gameID != '' && state.gameID != ' ')
                axios.get(`${state.apiURL}/board/?id=${state.ID}&game_id=${state.gameID}`).then(function (response) {
                state.boardState = response.data.board_state;
                if (response.status == 201) {
                    state.turn = -2;
                    state.notifications.push({
                        life: 300,
                        text: response.data.game_status,
                    })
                    if (response.data.game_status == "You Win!" || response.data.game_status == "Competition Forfeit!") {
                        state.winner = 1;
                        localStorage.setItem("wins", ""+(parseInt(localStorage.getItem("wins")) + 1));
                    } else {
                        localStorage.setItem("losses", "" + (parseInt(localStorage.getItem("losses")) + 1));
                        state.winner = 0;
                    }
                    state.gameID = ' ';
                    state.showPopup = true;
                    state.popupType = "next-game";
                } else { 
                    state.turn = response.data.turn;
                }
            });
        }, 2000)
        setInterval(() => {
            for (let notif of state.notifications) {
                notif.life--;
                if (notif.life <= 0) {
                    state.notifications.splice(state.notifications.indexOf(notif), 1);
                }
            }
        }, 10)
    }
}
</script>

<style scoped>
.light-mode .board {
    background-color: #e6e7e9; 
}
.dark-mode .board {
    background-color: #3a3e4c;
}
.night-mode .board {
    background-color: #20242e;
}

.board {
    width: min(75vw,50rem);
    height: calc(100vh - 14rem);
    padding: 0rem .5rem .5rem .5rem;
    top:45%;
}

/* @media (max-height: 840px){
    .board {
        top:275px;
    }
} */

.letter-group {
    width: 100%;
    height: calc(calc(100vh - 14rem) / 4);
    display: grid;
    grid-auto-rows: 2rem;
    column-gap: 1%;
    row-gap: 1%;
    grid-template-columns: repeat(7, 1fr);
}
</style>