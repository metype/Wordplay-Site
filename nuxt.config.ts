// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode',],
    colorMode: {
        preference: 'night', // default value of $colorMode.preference
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storageKey: 'nuxt-color-mode',
    }
})
