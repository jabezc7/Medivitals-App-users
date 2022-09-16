import { ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '@/helpers/Http'

export const useAuth = defineStore('auth', () => {

  const submitted = ref(false)
  const thisErrorMessage = ref('')
  const user = ref([])
  const permissions = ref([])
  const sections = ref([])
  const isLoggedIn = ref(false)
  const forgotMessage = ref('')

  async function login(params) { 
     submitted.value = true
     thisErrorMessage.value = ''
     localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)

    try {
      const response = await Http.post(`/authenticate`, params)
      const { data, status } = response

      setAuthState(data.token, data.user)
    } catch(err) {
      thisErrorMessage.value = 'Unable to login, please try again'
    }

    submitted.value = false
  }

  async function forgotPassword(params) { 
    submitted.value = true
    forgotMessage.value = ''
    localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)

   try {
     const response = await Http.post(`/forgot-password`, params)
     const { data, status } = response

     forgotMessage.value = 'If your email exists you will receive an email shortly'
   } catch(err) {
     thisErrorMessage.value = 'An error occurred. Please contact system administrator'
   }

   submitted.value = false
 }

  async function me() {
    try {

      Http.defaults.headers.common['Authorization'] = 'Bearer '+ JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).token
      const response = await Http.get(`/me`)
      const { data } = response

      setAuthState(JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).token, data)
    } catch(err) {
      localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)
    }
  }

  function setAuthState(token, u) {
    user.value = u
    user.value.token = token
    
    permissions.value = u.permissions.map(permission => {
        return permission.route
    })

    sections.value = u.sections.map(section => {
        return section.route
    })

    localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_KEY, JSON.stringify(user.value))
  }

  function checkIsLoggedIn() {
    isLoggedIn.value = false

    if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY))
       isLoggedIn.value = true
  }

  function loggedOut() {
    localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)
    localStorage.removeItem('patient')

    delete Http.defaults.headers.common['Authorization']
    user.value = []
    permissions.value = []
    sections.value = []
  }

  return {
      me,
      login,
      user,
      permissions,
      sections,
      thisErrorMessage,
      submitted,
      checkIsLoggedIn,
      isLoggedIn,
      forgotPassword,
      forgotMessage,
      loggedOut
  }
})