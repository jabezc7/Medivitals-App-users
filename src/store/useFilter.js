import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilter = defineStore('filters', () => {

  const params = reactive(
      {
          sortColumn: 'first',
          sortDir: 'ASC',
          page: 1,
          limit: 100,
          response: 'datatable',
          filters: { },
          query: null
      }
  )
  
  function setSearchFilter(search, response) {
    params.response = response
    params.filters = {
        search: { value: search }
    }
  }
  
  function setPage(page) {
    params.page = page
  }

  function setLimit(limit) {
    params.limit = limit
  }

  return {
    params,
    setPage,
    setLimit,
    setSearchFilter
  }
})
