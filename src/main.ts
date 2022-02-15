import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MyButton from './components/MyButton/index'
import MyButtonX from './components/MyButtonX/index'
import MyLoading from './components/MyLoading/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(MyButton)
app.use(MyButtonX)
app.use(MyLoading)
app.mount('#app')
