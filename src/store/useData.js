import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '@/helpers/Http'

export const useData = defineStore('data', () => {

    const saving = ref(false)
    const loading = ref(false)
    const details = ref([])

    async function insert(type, value, patientId) {
      saving.value = true
      try {
        const params = {
          type: type,
          value: value,
          patient_id: patientId,
          device_id: null,
          payload_id: null
        }
        const response = await Http.post(`/data`, params)
        const { data, status } = response
      } catch(err) {
        console.log(err)
      }
      saving.value = false
    }

    async function exportData() {
        loading.value = true
        try {
          const response = await Http.post(`/data/export`)
          const { data, status } = response

          details.value = data

        } catch(err) {
          console.log(err)
        }
        loading.value = false
    }
    
    return {
      saving,
      loading,
      insert,
      exportData,
      details
    }
})