import { ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '../helpers/Http'

export const usePatient = defineStore('patient', () => {

    const searchResults = ref([])
    const details = ref([])
    const searchLoading = ref(false)
    const list = ref([])
    const showDropdown = ref(false)
    const loading = ref(false)
    const searchList = ref([])
    const hasPatients = ref(false)
    const isLoaded = ref(false)

    async function search(params) {
        try {
            searchLoading.value = true
            const response = await Http.get(`/patients`,  {
                params: params
            })
            const { data } = response
            searchResults.value = data
            showDropdown.value = true

        } catch(err) {
            console.log(err)
        }
        searchLoading.value = false
    }

    async function searchPatients(params) {
        try {
            loading.value = true
            const response = await Http.get(`/patients`,  {
                params: params
            })
            const { data } = response
            searchList.value = data

        } catch(err) {
            console.log(err)
        }

        setTimeout(() => {
            loading.value = false
        }, 500)
    }

    async function get(id) {
        isLoaded.value = false
        loading.value = true
        try {
            const response = await Http.get(`/patients/${id}`)
            const { data } = response
            details.value = data
        } catch(err) {
            console.log(err)
        }
        isLoaded.value = true
        loading.value = false
    }
    
    async function storeView(id) {
        try {
            await Http.post(`/patients/${id}/viewed`)
        } catch(err) {
            console.log(err)
        }
    }

    async function getList(params) {
        try {
            loading.value = true
            const response = await Http.get(`/patients/`, { params: params })
            const { data } = response

            list.value = data
  
        } catch(err) {
            console.log(err)
        }
        loading.value = false
    }

    return {
        search,
        get,
        details,
        list,
        loading,
        searchLoading,
        searchResults,
        showDropdown,
        getList,
        searchPatients,
        searchList,
        hasPatients,
        isLoaded,
        storeView
    }
},
{
    persist: true,
}
)

