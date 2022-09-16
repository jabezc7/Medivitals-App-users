import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import Http from '@/helpers/Http'

export const useTemplate = defineStore('template', () => {

    const saving = ref(false)
    const loading = ref(false)
    const templateList = ref([])

    async function list() {
      try {
          loading.value = true
          const response = await Http.post(`/templates/sms`)
          const { data, status } = response
          templateList.value = data

      } catch(err) {
          console.log(err)
      }
      loading.value = false
    }

    async function update(template, content) {
        try {
            saving.value = true

            const params = {
                active: template.active,
                quick_link: template.quick_link,
                content: content,
                name: template.name,
                type_id: template.type.id
            }
            const response = await Http.put(`/templates/${template.id}`, params)
  
        } catch(err) {
            console.log(err)
        }
        saving.value = false
      }

    async function deleteTemplate(templateId) {
        try {
            saving.value = true
            const response = await Http.delete(`/templates/${templateId}`)
  
        } catch(err) {
            console.log(err)
        }
        saving.value = false
      }

    return {
        saving,
        loading,
        list,
        templateList,
        deleteTemplate,
        update
    }
})
