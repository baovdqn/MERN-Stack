import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

import './assets/base-scss/main.scss'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router);

//use Ant design

// app.use(Antd);

app.mount('#app')
