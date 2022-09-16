<template>
    <div class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-4xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Add Note</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" @click="isModalAddNote = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                    <div>
                        <div class="mt-1">
                            <textarea v-model="message"
                                name="message"
                                rows="3"
                                class=" mt-1 w-full border border border-gray-300 rounded focus:border-gray-300 focus:ring-0"
                                placeholder="Your notes here"
                            />
                        </div>
                    </div>
                    <div class="mt-4 w-full hidden">
                        <label class=" text-sm font-medium text-gray-700">Add reminder</label>
                        <div class="mt-1">
                            <input type="date" class="border-gray-300  rounded rounded focus:border-gray-300 focus:ring-0">
                        </div>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button :disabled="note.saving"
                            type="button"
                            class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm"
                            @click="save"
                        >
                            <span v-if="!note.saving">SAVE</span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" />SAVING...
                            </span>
                        </button>
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm" @click="isModalAddNote = false">
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineEmits, ref, inject } from 'vue'
    import { useNote } from '@/store/useNote'
    import { usePatient } from '@/store/usePatient'
    import { createToast } from 'mosha-vue-toastify'

    const emit = defineEmits(['saved'])

    const note = useNote()
    const patient = usePatient()

    const message = ref('')
    const { isModalAddNote } = inject('Modal')

    async function save() {
        await note.create('Patient', patient.details.id, message.value)
        emit('saved')
        isModalAddNote.value = false

        createToast('Note was successfully added.', {
            position: 'bottom-right',
            type: 'success',
            timeout: 3000,
        })
    }
</script>
