<template>
    <div class="fixed z-10 inset-0 overflow-y-hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5 text-left shadow-xl transform transition-all sm:align-middle max-w-5xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Select Patients</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" @click="isModalSelectPatient = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4 z-50">
                    <VueMultiselect v-model="activePatients"
                        :options="patient.searchList"
                        :multiple="multiple"
                        :close-on-select="closeOnSelect"
                        :hide-selected="true"
                        placeholder="Search patients..."
                        label="full_name"
                        :searchable="true"
                        :loading="patient.loading"
                        track-by="id"
                        @search-change="searchPatients"
                    />
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button v-if="source === 'communications'"
                            type="button"
                            class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm"
                            @click="add"
                        >
                            ADD
                        </button>
                        <button v-else
                            :disabled="patient.loading"
                            type="button"
                            class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm"
                            @click="select"
                        >
                            <span v-if="!patient.loading">SELECT</span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" />
                            </span>
                        </button>
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm" @click="isModalSelectPatient = false">
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted, inject } from 'vue'
    import { usePatient } from '@/store/usePatient'
    import { useFilter } from '@/store/useFilter'
    import { useRouter } from 'vue-router'
    import VueMultiselect from 'vue-multiselect'

    const props = defineProps({
        source: {
            type: String,
            default: 'communications'
        }
    })

    const patient = usePatient()
    const filter = useFilter()
    const activePatients = ref([])
    const router =  useRouter()

    const { isModalSelectPatient } = inject('Modal')
    const { selectedPatients } = inject('Patients')
    const multiple = ref(true)
    const closeOnSelect = ref(false)
    const debounce = ref()

    async function add() {
        isModalSelectPatient.value = false
        selectedPatients.value = activePatients.value
    }

    function select() {
        patient.loading = true
        router.push(`/monitoring/${activePatients.value.id}`)
    }

    async function searchPatients (query) {
        await filter.setSearchFilter(query, '')
        clearTimeout(debounce.value)

        debounce.value = setTimeout(async() => {
            await patient.searchPatients(filter.params)
        }, 600)
    }

    onMounted(async() => {
        if (props.source === 'communications')
            Object.assign(activePatients.value, selectedPatients.value)
        else {
            multiple.value = false
            closeOnSelect.value = true
        }
    })
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
