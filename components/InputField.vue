<template>
    <div class="absolute hv-center input">
        <input id="textInput" v-model="text" type="text" placeholder="Enter Word..." v-on:keyup.enter="submitWord" v-on:keyup="forceInputUppercase" :disabled="turn == 0" :title="(turn == 0)?'Wait For Other Player...':'Enter Word'"/>
        <button @click="submitWord()">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
    import { state } from '../state';
    import axios from 'axios';
    const boardState = state.boardState;
    
    export default {
        data() {
            return {
                text: '',
                turn: 1,
            }
        },
        methods: {
            submitWord() {
                axios.get(`${state.apiURL}/submit/?id=${state.ID}&game_id=${state.gameID}&word=${this.text}`).then(function (response) {
                    if (response.status == 201) {
                        state.notifications.push({
                            life: 300,
                            text: response.data.game_status,
                        })
                    }
                });
                this.text = '';
            },
            forceInputUppercase(e)
            {
                var start = e.target.selectionStart;
                var end = e.target.selectionEnd;
                e.target.value = e.target.value.toUpperCase().replaceAll(/[^A-Z]/g, '');
                e.target.setSelectionRange(start, end);
            }
    },
    mounted() {
            setInterval(() => {
                this.turn = state.turn;
            },100)
        }
    }
</script>

<style scoped>
.input {
    top:auto;
    bottom:2rem;
    width: max(25%,15rem);
    margin-right:75px;
}

input[type="text"] {
    width:100%;
    padding: 12px 20px;
    height: 50px;
    padding-right: 75px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding-right:50px;
}

button {
    margin-left: -75px;
    width: 75px;
    height:50px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 0;
    background-color:rgb(186, 185, 192);
    transition: all 250ms;
    transform: translateY(10px);
}

button:hover {
    background-color:rgb(157, 157, 161);
}
</style>