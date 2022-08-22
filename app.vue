<script setup lang="ts">
  import { state } from './state';
</script>

<template>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <title>Wordplay</title>
  <h1 class="absolute h-center title">WordPlay</h1>
  <ControlButtons class="control-buttons"/>
  <TurnField/>
  <WordplayBoard/>
  <InputField/>
  <Popup/>
  <Notification v-for="(notification, i) in state.notifications" :index="i"/>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Outfit&display=swap');

  .title {
    top:-1rem;
    font-size:xx-large;
  }

  * {
    font-family: 'Lato', sans-serif;
    font-family: 'Outfit', sans-serif;
  }

  body {
    overflow: hidden;
  }

  .dark-mode body {
    background-color: #293035;
    color: #ebf4f1;
  }
  .night-mode body {
    background-color: #070a0d;
    color: #f9fcfb;
  }

  .control-buttons {
    position:absolute;
    top:0;
    left:1vw;
    right:1vw;
  }

  .color-theme-buttons {
    position:absolute;
    top:0;
    right:.1rem;
  }

  .absolute {
    position:absolute;
  }

  .h-center {
    left:50%;
    transform: translateX(-50%);
  }

  .v-center {
    top:50%;
    transform: translateY(-50%);
  }

  .hv-center {
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }

  button.color-theme-button {
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 6px;
    background-color: #888888;
    color: black;
    border: 2px solid #555555;
  }

  button.statistics-button {
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 6px;
    background-color: #888888;
    color: black;
    border: 2px solid #555555;
    left:.1rem;
    top:0;
  }

  button.color-theme-button.light:hover {
    background-color: white;
    color: black;
  }

  button.color-theme-button.dark:hover {
    background-color: #293035;
    color: #ebf4f1;
  }

  button.color-theme-button.night:hover {
    background-color: #070a0d;
    color: #f9fcfb;
  }

  .full-cover {
    width:100vw;
    height:100vh;
  }
</style>
