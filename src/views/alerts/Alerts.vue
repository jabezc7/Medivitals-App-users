<template>
    <div class="item-center py-6 px-2 w-full">
        <div>
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto sm:flex-grow">
                    <h1 class="text-3xl text-gentian-blue font-bold">
                        Alerts
                    </h1>
                </div>
                <div class="flex rounded-md w-64 shadow-sm">
                    <div class="relative flex items-stretch flex-grow focus-within:z-10">
                        <select id="location"
                            v-model="priority"
                            name="location"
                            class="block w-64 rounded pl-5 bg-gray-100 sm:text-sm border focus:outline-none border-gray-300 focus:border-gray-300 focus:ring-0 bg-white"
                            @change="getAlerts()"
                        >
                            <option value="null">
                                All Priorities
                            </option>
                            <option value="High">
                                High
                            </option>
                            <option value="Medium">
                                Medium
                            </option>
                            <option value="Normal">
                                Normal
                            </option>
                        </select>
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
                                        Date/Time
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Priority
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Patient
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Alert
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                                        Trigger(s)
                                    </th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="(item, i) in items" :key="i">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 align-top">
                                        {{ dayjs(item.meta.created_at).format('DD/MM/YYYY HH:mm') }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                        {{ item.priority }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                        {{ item.patient.first }} {{ item.patient.last }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                        {{ item.message }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                        <div>
                                            <div v-for="(trigger, triggerIndex) in item.triggers" :key="triggerIndex">
                                                {{ vitalName(trigger.vital) }} {{ trigger.operator }} {{ trigger.value }} for {{ trigger.comparison.value }} reading(s)
                                            </div>
                                        </div>
                                    </td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-gentian-blue align-top">
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
    <modal-automated-instances v-if="isModalInstances" />
    <modal-send-notification v-if="isModalNotifications" />
</template>

<script setup>
    import { ref, provide, onMounted } from 'vue'
    import ModalAutomatedInstances from '../../components/modals/ModalAutomatedInstances.vue'
    import ModalSendNotification from '../../components/modals/ModalSendNotification.vue'
    import Pagination from '../../components/Pagination.vue'
    import router from '../../router'
    import Http from '../../helpers/Http'
    import dayjs from 'dayjs'

    const items = ref([])
    const isModalInstances = ref(false)
    const isModalNotifications = ref(false)

    const total = ref(0)
    const page = ref(1)
    const lastPage = ref(1)
    const loading = ref(true)
    const priority = ref(null)

    provide('Modal', { isModalInstances, isModalNotifications })

    async function paginate(payload) {
        page.value = payload
        await getAlerts()
    }

    onMounted(async() => {
        await getAlerts()
    })

    async function getAlerts() {
        try {
            loading.value = true
            const response = await Http.get(`/notifications`, { params: {
                sortColumn: 'created_at',
                sortDir: 'DESC',
                page: page.value,
                limit: 10,
                response: 'datatable',
                filters: {
                    alert: {
                        value: true
                    },
                    priority: {
                        value: priority.value
                    }
                },
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

    const vitalName = (slug) => {
        if (slug === 'vital-types-heart-rate'){
            return 'Heart Rate'
        }

        if (slug === 'vital-types-blood-pressure-systolic'){
            return 'Blood Pressure (Systolic)'
        }

        if (slug === 'vital-types-blood-pressure-diastolic'){
            return 'Blood Pressure (Diastolic)'
        }

        if (slug === 'vital-types-temperature'){
            return 'Temperature'
        }

        if (slug === 'vital-types-oxygen-saturation'){
            return 'Oxygen Saturation'
        }

        return slug
    }
</script>
