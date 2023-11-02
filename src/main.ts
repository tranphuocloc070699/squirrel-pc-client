import "@fontsource/roboto/100.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import '@fontsource/noto-sans/100.css';
import '@fontsource/noto-sans/200.css';
import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/noto-sans/800.css';
import '@fontsource/noto-sans/900.css';
import '@fontsource/lobster/400.css';
import './assets/css/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Notifications)
app.use(createPinia())
app.use(router)

app.mount('#app')
