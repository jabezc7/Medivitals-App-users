<template>
    <div class="item-center py-6 px-2 w-full">
        <div class="">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto sm:flex-grow">
                    <h1 class="text-3xl text-gentian-blue font-bold">
                        Communications
                    </h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button class="btn-gradient inline-flex items-center px-4 py-2  border-transparent rounded shadow-sm text-sm font-normal text-white uppercase" @click="isModalTemplates = true">
                        Manage Templates
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 lg:gap-x-6 gap-y-4 lg:gap-y-6 px-2">
        <card>
            <template #heading>
                Send SMS
            </template>
            <template #content>
                <div v-if="template.templateList.length">
                    <h3 class="text-medium font-normal text-gentian-blue pb-2">
                        Templates
                    </h3>
                    <div class="mb-2">
                        <template v-for="(preset, i) in template.templateList" :key="i">
                            <button v-if="preset.active && preset.quick_link" class="m-1 bg-gentian-blue inline-flex items-center px-3 py-1 border-transparent rounded shadow-sm text-xs font-normal text-white" @click="selectPreset(preset)">
                                {{ preset.name }}
                            </button>
                        </template>
                    </div>
                </div>
                <div>
                    <div>
                        <textarea v-model="message"
                            name="about"
                            rows="5"
                            class=" mt-1 w-full border border border-gray-300 rounded focus:border-gray-300 focus:ring-0"
                            placeholder="Your message here..."
                        />
                        <p class="text-sm text-gray-500">
                            Character count: {{ message.length }}
                        </p>
                        <p class="pt-3">
                            <strong>To:</strong> {{ patientsArr }}
                        </p>
                    </div>
                    <div class="mt-2">
                        <button class="mr-3 bg-whtie inline-flex items-center px-4 py-2 border-gentian-blue border rounded shadow-sm text-sm font-normal text-gentian-blue uppercase" @click="isModalSelectPatient = true">
                            Select Recipients
                            <font-awesome-icon :icon="['fas', 'arrow-down']" class="text-medium ml-3 font-black text-gentian-blue" />
                        </button>
                    </div>
                    <div class="mt-5">
                        <button :disabled="sms.saving"
                            type="button"
                            class="inline-flex justify-center  rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm"
                            @click="send"
                        >
                            <span v-if="!sms.saving">SEND</span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" /> SENDING...
                            </span>
                        </button>
                    </div>
                </div>
            </template>
        </card>
        <UserSMSHistory class="mb-8" />
    </div>
    <modal-select-patients v-if="isModalSelectPatient" />
    <modal-templates v-if="isModalTemplates" />
</template>
<script setup>
    import { computed, onMounted, provide, ref } from 'vue'
    import ModalSelectPatients from '../../components/modals/ModalSelectPatients.vue'
    import ModalTemplates from '../../components/modals/ModalTemplates.vue'
    import UserSMSHistory from '../user/UserSMSHistory.vue'

    import { useTemplate } from '@/store/useTemplate'
    import { useAuth } from '@/store/useAuth'
    import { useSms } from '@/store/useSms'
    import { createToast } from 'mosha-vue-toastify'
    import Card from '../../components/cards/Card.vue'

    const template = useTemplate()
    const auth = useAuth()
    const sms = useSms()

    const message = ref('')
    const isModalSMSPresets = ref(false)
    const isModalAutomatedMessage = ref(false)
    const isModalSelectPatient = ref(false)
    const isModalTemplates = ref(false)

    const selectedPreset = ref([])
    const selectedPatients = ref([])

    const selectPreset = ((preset) => {
        selectedPreset.value = preset
        message.value = preset.content
    })

    const patientsArr =computed(() => {
        return selectedPatients.value.map((x) => x.full_name).join(', ')
    })

    const patientsArrId =computed(() => {
        return selectedPatients.value.map((x) => x.id).join(', ')
    })

    const patientsArrPhone =computed(() => {
        return selectedPatients.value.map((x) => x.mobile).join(',')
    })

    async function send() {
        if (message.value != null && message.value !== '') {
            if (patientsArrId.value != null && patientsArrId.value !== '') {
                await sms.send(auth.user.id, `Patient`, patientsArrId.value, patientsArrPhone.value, message.value)
                createToast('SMS was successfully sent.', {
                    position: 'bottom-right',
                    type: 'success',
                    timeout: 3000,
                })

                await sms.getUserSMS(sms.search)
                message.value = ''
                selectedPatients.value = []
            } else {
                createToast('Please select at least one patient.', {
                    position: 'bottom-right',
                    type: 'danger',
                    timeout: 3000,
                })
            }
        } else {
            createToast('SMS message cannot be blanked.', {
                position: 'bottom-right',
                type: 'danger',
                timeout: 3000,
            })
        }
    }

    onMounted(async() => {
        template.list()
    })

    provide('Modal', { isModalSMSPresets, isModalAutomatedMessage, isModalTemplates, isModalSelectPatient })
    provide('Patients', {  selectedPatients })
</script>
