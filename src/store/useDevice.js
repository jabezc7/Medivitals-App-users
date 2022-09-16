import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '@/helpers/Http'

export const useDevice = defineStore('device', () => {

    const saving = ref(false)
    const frequency = ref([
        {
            name: 'Heart Rate',
            slug: 'heart_rate',
            value: 0
        },
        {
            name: 'Temperature',
            slug: 'temperature',
            value: 0
        },
        {
            name: 'Location Tracking',
            slug: 'location',
            value: 0
        }
    ])

    async function updateFrequency(device_id, frequencies) {
      saving.value = true
      try {
        const params = {
          device_id: device_id,
          frequencies: frequencies
        }
        const response = await Http.post(`/devices/update-frequency`, params)
        const { data, status } = response

        frequency.value = data
      } catch(err) {
        console.log(err)
      }
      saving.value = false
    }
    
    return {
      saving,
      updateFrequency,
      frequency
    }
})