import { ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '../helpers/Http'

export const useNote = defineStore('note', () => {

    const saving = ref(false)
    const loading = ref(false)
    const noteList = ref([])

    async function create(model, model_id, note) {
        try {
            saving.value = true
            const params = {
                model: model,
                model_id: model_id,
                note: note,
                parent_id: null
            }
            const response = await Http.post(`/notes`, params)
            const { data, status } = response
        } catch(err) {
            console.log(err)
        }
        saving.value = false
    }

    async function list(patientId) {
        try {
            loading.value = true
            const response = await Http.get(`/notes/get-notes-patient-id/${patientId}`)
            const { data } = response
            noteList.value = data

        } catch(err) {
            console.log(err)
        }
        loading.value = false
    }

    function setNote(note) {
        noteList.value = note
    }

    return {
        saving,
        create,
        list,
        noteList,
        setNote
    }
})
