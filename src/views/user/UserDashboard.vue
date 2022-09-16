<template>
    <div class="item-center py-6 px-2 w-full">
        <div class="space-x-0 md:space-x-6 grid grid-cols-1 md:grid-cols-3">
            <list-card class="flex-grow">
                <template #heading>
                    Recently Viewed Patients
                </template>
                <template v-if="patients.length" #content>
                    <li v-for="(patient, index) in patients" :key="index">
                        <span class="block hover:bg-gray-50 cursor-pointer" @click="goToPatient(patient.id)">
                            <div class="flex items-center px-4 py-4 sm:px-6">
                                <div class="min-w-0 flex-1 flex items-center">
                                    <div class="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p class="text-sm font-normal text-grey-500 truncate">{{ patient.full_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <svg class="h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </span>
                    </li>
                </template>
            </list-card>
            <list-card class="flex-grow">
                <template #heading>
                    Recent Notifications
                </template>
                <template v-if="notifications.length" #content>
                    <li v-for="(notification, index) in notifications" :key="index">
                        <div class="flex items-center px-4 py-4 sm:px-6">
                            <div class="min-w-0 flex-1 flex items-center">
                                <div class="min-w-0 flex-1 md:grid md:grid-cols-1 md:gap-x-4 md:gap-y-1">
                                    <div v-if="!notification.alert">
                                        <p class="text-sm font-normal text-grey-500 truncate">
                                            {{ notification.message }}
                                        </p>
                                    </div>
                                    <div v-else class="flex flex-col">
                                        <p class="text-sm font-normal text-grey-500 truncate flex flex-row">
                                            <span class="mr-2"
                                                :class="{
                                                    'text-red-500': notification.priority === 'High',
                                                    'text-orange-500': notification.priority === 'Medium',
                                                    'text-default-500': notification.priority === 'Normal',
                                                }"
                                            >
                                                <Icon name="warning" class="w-5 h-5" />
                                            </span>
                                            <span>{{ notification.message }}</span>
                                        </p>
                                        <div class="text-xs text-gray-400 pt-1">
                                            <div v-for="(trigger, triggerIndex) in notification.triggers" :key="triggerIndex">
                                                {{ vitalName(trigger.vital) }} {{ trigger.operator }} {{ trigger.value }} for {{ trigger.comparison.value }} reading(s)
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:flex sm:justify-between">
                                        <div class="sm:flex">
                                            <p class="flex items-center text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {{ notification.meta.created_at_human }}
                                            </p>
                                            <p class="flex items-center text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-6">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <router-link :to="`/patients/${notification.patient.id}`">
                                                    {{ notification.patient.first }} {{ notification.patient.last }}
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
            </list-card>
            <list-card class="flex-grow">
                <template #heading>
                    Recent Notes
                </template>
                <template #content>
                    <li v-for="(note, index) in notes" :key="index">
                        <div class="flex items-center px-4 py-4 sm:px-6">
                            <div class="min-w-0 flex-1 flex items-center">
                                <div class="min-w-0 flex-1 md:grid md:grid-cols-1 md:gap-x-4 md:gap-y-1">
                                    <div>
                                        <p class="text-sm font-normal text-grey-500 truncate">{{ note.note }}</p>
                                    </div>
                                    <div class="sm:flex sm:justify-between">
                                        <div class="sm:flex">
                                            <p class="flex items-center text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {{ note.meta.created_at_human }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
            </list-card>
        </div>
    </div>
</template>
<script setup>
    import { ref, provide, onBeforeMount } from 'vue'
    import ListCard from '../../components/cards/ListCard.vue'
    import Http from '../../helpers/Http'
    import router from '../../router'
    import Icon from '@niftee-group/niftee-core/src/components/Icon.vue'

    const isModalSendMessage = ref(false)
    const isModalAddNote = ref(false)

    const patients = ref([])
    const notifications = ref([])
    const notes = ref([])

    provide('Modal', { isModalSendMessage, isModalAddNote })

    onBeforeMount(async () => {
        Http.get(`/portal/user-dashboard`).then((response) => {
            patients.value = response.data.patients
            notifications.value = response.data.notifications
            notes.value = response.data.notes
        })
    })

    const goToPatient = (patientId) => {
        router.push(`/patients/${patientId}`)
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
<style scoped>

</style>
