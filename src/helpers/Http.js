import axios from 'axios'
import router from '../router'

const Http = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})


if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)){
    Http.defaults.headers.common['Authorization'] = 'Bearer '+ JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).token
}

Http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Http.defaults['xsrfCookieName'] = null

Http.interceptors.request.use((config) => { 
    if (router.currentRoute && router.currentRoute.meta) {
        if (!router.currentRoute.meta.public) {
            config.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).token
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

Http.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.'){
        store.dispatch('AUTH_LOGOUT', error).then(() => router.push('/login'))
    } else {
        return Promise.reject(error)
    }
})

export default Http