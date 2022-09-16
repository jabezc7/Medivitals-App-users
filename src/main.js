import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faCheck, faPlus, faUserCog, faEdit, faClose, faSearch, faStar, faEye, faChevronDown, faChevronUp, faArrowDown, faCircleNotch, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"

library.add(faCheck, faPlus, faUserCog, faEdit, faClose, faSearch, faStar, faEye, faChevronDown, faChevronUp, faArrowDown, faCircleNotch, faPencil, faTrash)
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import 'mosha-vue-toastify/dist/style.css'
import '@/assets/index.css'
import '@/assets/core.css'

// Third-Party
import axios from 'axios'

// Axios
if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).token
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
