<template>
<div v-if="!(patient.details.length === 0)">
    <div class="item-center py-6 px-2 w-full">
        <div class="mb-4">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto sm:flex-grow">
                    <h1 class="text-3xl text-gentian-blue font-bold">
                        {{ patient.details.full_name }}
                    </h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none" v-if="patient.details.devices"> 
                    <router-link v-if="!(patient.details.devices.length === 0)"
                        :to="`/monitoring/${patient.details.id}`"
                        type="button"
                        class="btn-gradient inline-flex items-center px-4 py-2 border-transparent rounded shadow-sm text-sm font-medium text-white uppercase"
                    >
                        Bio-Band
                    </router-link>
                    <button @click="exportData" class="btn-gradient ml-3 inline-flex items-center px-4 py-2 border-transparent rounded shadow-sm text-sm font-normal text-white uppercase">
                       Export
                    </button>
                    <button type="button"
                        class="btn-gradient ml-3 inline-flex items-center px-4 py-2 border-transparent rounded shadow-sm text-sm font-medium text-white uppercase"
                        @click="isModalSendMessage = true"
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-6 gap-y-4 lg:gap-y-6">
            <card>
                <template #heading>
                    Contact Details
                </template>
                <template #content>
                    <table class="w-full text-gray-500 text-sm">
                        <tr>
                            <td class="font-bold pb-1">
                                Mobile:
                            </td>
                            <td class="pb-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.mobile) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Phone:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.phone) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Email:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.email) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1 align-top">
                                Address:
                            </td>
                            <td v-if="patient.details.address_1" class="py-1 text-right lg:text-left">
                                <span>
                                    <p class="text-gray-500 text-sm">{{ patient.details.address_1 }} </p>
                                    <p class="text-gray-500 text-sm">{{ patient.details.suburb }}, {{ patient.details.state }} {{ patient.details.country }} </p>
                                </span>
                            </td>
                            <td v-else class="py-1 text-right lg:text-left">
                                -
                            </td>
                        </tr>
                    </table>
                </template>
            </card>
            <card>
                <template #heading>
                    Assignee Details
                </template>
                <template #content>
                    <table class="w-full text-gray-500 text-sm">
                        <tr>
                            <td class="font-bold pb-1">
                                Name:
                            </td>
                            <td class="pb-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(`${patient.details.assignee.first} ${patient.details.assignee.last}`) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Mobile:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.assignee.mobile) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Phone:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.assignee.phone) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Email:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ notAvailbaleFallbackString(patient.details.assignee.email) }}
                            </td>
                        </tr>
                    </table>
                </template>
            </card>
            <card>
                <template #heading>
                    Medical Details
                </template>
                <template #content>
                    <table class="w-full text-gray-500 text-sm">
                        <tr>
                            <td class="font-bold pb-1">
                                Medicare Number:
                            </td>
                            <td class="pb-1 text-right lg:text-left">
                                {{ patient.details.medicare_number }} ({{ patient.details.medicare_position }})
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Medicare Expiry:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ dayjs(patient.details.medicare_expiry).format('MM/YYYY') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Private Cover:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ patient.details.private_health_fund }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1 align-top">
                                Member Number:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ patient.details.private_health_membership_no }}
                            </td>
                        </tr>
                    </table>
                </template>
            </card>
            <card>
                <template #heading>
                    Associated Contact
                </template>
                <template #content>
                    <table class="w-full text-gray-500 text-sm">
                        <tr>
                            <td class="font-bold pb-1">
                                Name:
                            </td>
                            <td class="pb-1 text-right lg:text-left">
                                {{ patient.details.gp_name }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Medical Centre:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ patient.details.gp_medical_centre }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1">
                                Phone:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ patient.details.gp_phone }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold py-1 align-top">
                                Email:
                            </td>
                            <td class="py-1 text-right lg:text-left">
                                {{ patient.details.gp_email }}
                            </td>
                        </tr>
                    </table>
                </template>
            </card>
            <card>
                <template #heading>
                    Notifications
                </template>
                <template #content>
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="(notification, index) in patient.details.notifications" :key="index">
                            <div class="flex items-center py-2">
                                <div class="min-w-0 flex-1 flex items-center">
                                    <div class="min-w-0 flex-1 md:grid md:grid-cols-1 md:gap-x-4 md:gap-y-1">
                                        <div>
                                            <p class="text-sm font-normal text-grey-500 truncate">
                                                {{ notification.message }}
                                            </p>
                                        </div>
                                        <div class="sm:flex sm:justify-between">
                                            <div class="sm:flex">
                                                <p class="flex items-center text-xs text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {{ notification.meta.created_at_human }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </card>
            <notes :notes="patient.details.notes" @saved="getPatient" />
            <card class="col-span-2">
                <template #heading>
                    Latest Vitals
                </template>
                <template #content>
                    <patient-vitals :stats="patient.details.stats" />
                </template>
            </card>
        </div>
    </div>
    <modal-send-message v-if="isModalSendMessage" :number="patient.details.mobile" />
    </div>
</template>

<script setup>
    import { defineProps, watch, ref, provide, onMounted } from 'vue'
    import ModalSendMessage from '../../components/modals/ModalSendMessage.vue'
    import PatientVitals from './PatientVitals.vue'
    import { usePatient } from '@/store/usePatient'
    import { useData } from '@/store/useData'
    import _ from "lodash"
    import Card from '../../components/cards/Card.vue'
    import dayjs from 'dayjs'
    import Notes from '../../components/Notes.vue'

    const props = defineProps({
        id: {
            default: '',
            type: String
        }
    })

    const patient = usePatient()
    const data = useData()
    const isModalSendMessage = ref(false)

    provide('Modal', { isModalSendMessage })

    onMounted(() => {
        getPatient()
        storeView()
    })

    watch(() => _.cloneDeep(props.id), () => {
        getPatient()
    })


    async function getPatient() {
        await patient.get(props.id)
    }

    const storeView = async () => {
        await patient.storeView(props.id)
    }

    const exportData = async () => {
        await data.exportData()
        let filter = {
            search: {
                value: patient.details.id
            }
        }
        window.location = `${data.details.data.url}&filters=${JSON.stringify(filter)}`
    }

    const notAvailbaleFallbackString = (value) => {
        return value ? value : '-'
    }
</script>
