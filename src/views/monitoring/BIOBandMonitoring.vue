<template>
    <div v-if="!(patient.details.length === 0)">
        <div class="item-center py-6 px-2 w-full">
            <div class="">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto sm:flex-grow">
                        <h1 class="text-3xl text-gentian-blue font-bold flex flex-row items-center">
                            <span class="mr-6">{{ patient.details.full_name }}</span>
                            <button class="mr-3 bg-whtie inline-flex items-center px-4 py-2 border-gentian-blue border rounded shadow-sm text-sm font-normal text-gentiable-blue uppercase" @click="isModalSelectPatient = true">
                                Select Patient
                                <font-awesome-icon :icon="['fas', 'arrow-down']" class="text-medium ml-3 font-black text-gentian-blue" />
                            </button>
                        </h1>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 flex flex-row space-x-2">
                        <button class="btn-gradient inline-flex items-center px-4 py-2 border-transparent rounded shadow-sm text-sm font-normal text-white uppercase" @click="isModalRequestReading = true">
                            Manual Reading
                        </button>
                        <button type="button" class="btn-gradient inline-flex items-center px-4 py-2 border-transparent rounded shadow-sm text-sm font-normal text-white uppercase" @click="isModalEditFrequency = true">
                            Edit Frequency
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-4 lg:gap-x-6 gap-y-4 lg:gap-y-6 px-2">
            <div class="col-span-3 grid grid-cols-1 gap-y-4 mb-8">
                <blood-pressure :vitals="patient.details.stats[0]"
                    :chart="vitals[0]"
                    :is-shown="isShown"
                    :filters="chartFilters"
                />
                <heart-rate :vitals="patient.details.stats[1]"
                    :chart="vitals[1]"
                    :is-shown="isShown"
                    :filters="chartFilters"
                />
                <temperature :vitals="patient.details.stats[2]"
                    :chart="vitals[2]"
                    :is-shown="isShown"
                    :filters="chartFilters"
                />
                <saturation-rate :vitals="patient.details.stats[3]"
                    :chart="vitals[3]"
                    :is-shown="isShown"
                    :filters="chartFilters"
                />
                <respiratory-rate :vitals="patient.details.stats[4]"
                    :chart="vitals[4]"
                    :is-shown="isShown"
                    :filters="chartFilters"
                />
            </div>
            <div class="col-span-1 flex flex-col flex-wrap space-y-4">
                <card>
                    <template #heading>
                        Location
                    </template>
                    <template #content>
                        <patient-locations />
                    </template>
                </card>
                <notes :show-title="true" />
            </div>
        </div>
        <modal-request-reading-prompt v-if="isModalRequestReading" />
        <modal-location v-if="isModalLocation" />
        <modal-change-vitals v-if="isModalChangeVital" />
        <modal-edit-frequency v-if="isModalEditFrequency" :devices="patient.details.devices" />
        <modal-select-patients v-if="isModalSelectPatient" :source="`bio-band`" />
    </div>
</template>

<script setup>
    import _ from "lodash"
    import { defineProps, provide, watch, onMounted, ref } from 'vue'
    import ModalRequestReadingPrompt from '../../components/modals/ModalRequestReadingPrompt.vue'
    import ModalLocation from '../../components/modals/ModalLocation.vue'
    import ModalChangeVitals from '../../components/modals/ModalChangeVitals.vue'
    import ModalEditFrequency from '../../components/modals/ModalEditFrequency.vue'
    import PatientLocations from  '../../views/patient/PatientLocations.vue'
    import Notes from '../../components/Notes.vue'
    import BloodPressure from './vitals/BloodPressure.vue'
    import HeartRate from './vitals/HeartRate.vue'
    import Temperature from './vitals/Temperature.vue'
    import RespiratoryRate from './vitals/RespiratoryRate.vue'
    import SaturationRate from './vitals/SaturationRate.vue'
    import ModalSelectPatients from '../../components/modals/ModalSelectPatients.vue'
    import { usePatient } from '../../store/usePatient'
    import useVitalStats from '../../store/useVitalStats.js'
    import { useNote } from '../../store/useNote'
    import Card from '../../components/cards/Card.vue'

    const props = defineProps({
        id: {
            default: '',
            type: String
        }
    })

    const { isShown, vitals, getChartData, chartFilters} = useVitalStats()

    const isModalRequestReading = ref(false)
    const isModalLocation = ref(false)
    const isModalChangeVital = ref(false)
    const isModalEditFrequency = ref(false)
    const isModalSelectPatient = ref(false)
    const selectedPatients = ref([])
    const patient = usePatient()
    const note = useNote()

    const selectedFilter = ref({ title: 'Last 4 Hours', range: 4 })
    const selectedIndex = ref(1)

    const sections = ref(['Blood Pressure', 'Heart Rate', 'Temperature', 'O2 Saturation', 'Respiratory Rate'])

    async function getPatient() {
        let id = props.id

        await patient.get(id)
        note.setNote(patient.details.notes)
        getChartData(props.id, selectedFilter.value.range, sections.value, selectedIndex.value)

        if (!(patient.details.length === 0))
            patient.hasPatients = true

        if(patient.isLoaded)
            isModalSelectPatient.value = false

    }

    watch(() => _.cloneDeep(props.id), () => {
        getPatient()
    })

    onMounted(() => {
        getPatient()
    })

    provide('Modal', { isModalEditFrequency, isModalRequestReading, isModalLocation, isModalSelectPatient, isModalChangeVital })
    provide('Patients', { selectedPatients, selectedFilter, selectedIndex, sections, getPatient, getChartData })
</script>
