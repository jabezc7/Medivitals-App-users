<template>
    <card>
        <template #heading>
            <div class="flex flex-row items-center">
                <span class="flex-grow">Blood Pressure</span>
                <div class="flex sm:mt-0 sm:ml-4 gap-2 items-center">
                    <h1 class="leading-6 font-medium w-full text-gentian-blue text-sm">
                        Manual Entry
                    </h1>
                    <input v-model="systolic"
                        type="number"
                        placeholder="Systolic"
                        class="h-9 w-32 border-gray-300  w-full rounded rounded focus:border-gray-300 focus:ring-0"
                    >
                    <input v-model="dyastolic"
                        type="number"
                        placeholder="Dyastol"
                        class="h-9 w-32 border-gray-300 rounded rounded focus:border-gray-300 focus:ring-0"
                    >
                    <button :disabled="data.saving"
                        type="button"
                        class="bg-gentian-blue mr-3 inline-flex items-center px-4 h-9 p-0 border-transparent rounded shadow-sm text-sm text-white"
                        @click="submit"
                    >
                        <span v-if="!data.saving">Submit</span>
                        <span v-else>
                            <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" />
                        </span>
                    </button>
                    <a v-if="isBloodPressureCont" href="Javascript:void(0)" @click="isBloodPressureCont = !isBloodPressureCont"><font-awesome-icon :icon="['fas', 'chevron-up']" class="text-xl pt-2 font-black text-gentian-blue" /></a>
                    <a v-else href="Javascript:void(0)" @click="isBloodPressureCont = !isBloodPressureCont"><font-awesome-icon :icon="['fas', 'chevron-down']" class="text-xl font-black  pt-2 text-gentian-blue" /></a>
                </div>
            </div>
        </template>
        <template #content>
            <div v-if="isBloodPressureCont" class="grid grid-cols-1 lg:gap-6 sm:grid-cols-1 lg:grid-cols-3">
                <div class="col-span-1 bg-white rounded-lg">
                    <div class="mb-4 ">
                        <vitals-card :vitals="vitals" :height="`divmin-height-2x`" />
                    </div>
                </div>
                <div class="col-span-2 bg-white rounded-lg">
                    <div class="divmin-height-2x px-4 py-10 bg-white  border-2 border-gray-200 rounded-lg overflow-hidden sm:p-6 text-center">
                        <div class="w-full gap-2 mb-5 px-4 grid grid-cols-3 sm:grid-cols-6">
                            <a v-for="(filter, x) in filters"
                                :key="x"
                                href="Javascript:void(0)"
                                class="text-left"
                                :class="{ 'text-charcoal-900 text-xs': filter.range !== chart.filter, 'text-default-900 font-black text-xs': filter.range == chart.filter }"
                                @click="setFilter(filter, i)"
                            >{{ filter.title }}</a>
                        </div>
                        <spline-chart v-if="isShown"
                            :series="chart.series"
                            :categories="chart.categories"
                            :unit="chart.unit"
                            :filter="chart.filter"
                        />
                    </div>
                </div>
            </div>
        </template>
    </card>
</template>
<script setup>
    import { defineProps, inject, ref } from 'vue'
    import SplineChart from '../../../components/charts/SplineChart.vue'
    import VitalsCard from '../../../components/cards/VitalsCard.vue'
    import { usePatient } from '@/store/usePatient'
    import { useData } from '@/store/useData'
    import { createToast } from 'mosha-vue-toastify'
    import Card from '../../../components/cards/Card.vue'

    defineProps({
        vitals: {
            type: Object,
            required: true
        },
        chart: {
            type: Object,
            required: true
        },
        isShown: {
            type: Boolean,
            default: true
        },
        filters: {
            type: Object,
            required: true
        }
    })

    const { getPatient, selectedFilter, selectedIndex, getChartData, sections } = inject('Patients')

    const patient = usePatient()
    const data = useData()

    const isBloodPressureCont = ref(true)
    const systolic = ref()
    const dyastolic = ref()

    async function submit() {
        let value = `${systolic.value}/${dyastolic.value}`
        await data.insert('blood_pressure', value, patient.details.id)

        createToast('Blood pressure  successfully added.', {
            position: 'bottom-right',
            type: 'success',
            timeout: 3000,
        })

        systolic.value = ''
        dyastolic.value = ''
        getPatient()
    }

    function setFilter(filter, index) {
        selectedFilter.value = filter
        selectedIndex.value = index

        getChartData(patient.details.id, selectedFilter.value.range, sections.value, selectedIndex.value)
    }
</script>
