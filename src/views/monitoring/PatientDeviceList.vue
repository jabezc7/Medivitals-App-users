<template>
    <div class="item-center py-6 px-2 w-full">
        <div>
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto sm:flex-grow">
                    <h1 class="text-3xl text-gentian-blue font-bold">
                        Patients
                    </h1>
                </div>
                <div class="flex rounded-md w-64 shadow-sm">
                    <div class="relative flex items-stretch flex-grow focus-within:z-10">
                        <input type="text"
                            name="search"
                            autocomplete="off"
                            class="block w-full rounded pl-5 bg-gray-100 sm:text-sm border focus:outline-none border-gray-300 focus:border-gray-300 focus:ring-0 bg-white"
                            placeholder="Search..."
                            @input="debounceSearch"
                        >
                    </div>
                </div>
            </div>
            <div class="mt-4 flex flex-col">
                <div class="inline-block min-w-full py-2 align-middle">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Device Name
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Number
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        IMEI
                                    </th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="(item, i) in items" :key="i">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                        {{ item.full_name }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ item.devices[0].nickname }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ item.devices[0].number }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ item.devices[0].imei }}
                                    </td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-gentian-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            @click="goToPatient(item.id)"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <pagination :max-visible-buttons="lastPage"
                :per-page="10"
                :total="total"
                :current-page="page"
                @paginate="paginate"
            />
        </div>
    </div>
</template>

<script setup>
    import { ref, provide, onBeforeMount } from 'vue'
    import Pagination from '../../components/Pagination.vue'
    import router from '../../router'
    import Http from '../../helpers/Http'

    const isModalInstances = ref(false)
    const isModalNotifications = ref(false)
    const debounce = ref()

    const items = ref([])

    const search = ref('')
    const total = ref(0)
    const page = ref(1)
    const lastPage = ref(1)
    const loading = ref(true)

    async function debounceSearch(event) {
        clearTimeout(debounce.value)
        debounce.value = setTimeout(async() => {
            page.value = 1
            search.value = event.target.value
            await getPatients()
        }, 600)
    }

    async function paginate(payload) {
        page.value = payload
        await getPatients()
    }

    onBeforeMount(() => {
        getPatients()
    })

    async function getPatients() {
        try {
            loading.value = true
            const response = await Http.get(`/patients`, { params: {
                sortColumn: 'first',
                sortDir: 'ASC',
                page: page.value,
                limit: 10,
                response: 'datatable',
                filters: {
                    devices: {
                        value: true
                    },
                    search: {
                        value: search.value
                    }
                },
                with: 'devices'
            }})

            const { data } = response

            items.value = data.data
            total.value = data.meta.total
            lastPage.value = data.meta.last_page
        } catch(err) {
            console.log(err)
        }

        loading.value = false
    }

    const goToPatient = (patientId) => {
        router.push(`/monitoring/${patientId}`)
    }

    provide('Modal', { isModalInstances, isModalNotifications })
</script>
