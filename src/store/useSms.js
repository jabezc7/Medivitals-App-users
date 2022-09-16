import { ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '@/helpers/Http'

export const useSms = defineStore('sms', () => {

  const saving = ref(false)
  const loading = ref(false)
  const histories = ref([])
  const search = ref('')

  async function send(userId, model, toId, toPhone, message) { 
    saving.value = true
    try {
        const params = {
            id: userId,
            model: model,
            to_phone: toPhone,
            to_id: toId, 
            message: message
        }

        console.log(params)
        await Http.post(`/sms/send`, params)
    } catch(err) {
        console.log(err)
    }

    saving.value = false
  }

  async function getUserSMS(search) {
    loading.value = true
    try {
      const response = await Http.post(`/sms/get-sms-by-user`, { search: search })
      const { data, status } = response
      histories.value = data
    } catch(err) {
      console.log(err)
    }
    loading.value = false
  }

  return {
      send,
      saving,
      loading,
      histories,
      getUserSMS,
      search
  }
})