<template>
    <div class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-4xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="flex text-lg leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Send Message</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gentian-blue cursor-pointer" @click="isModalSendMessage = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">
                            To:
                            <span v-if="!isEditNumber">({{ thisNumber }})</span>
                            <input v-if="isEditNumber"
                                v-model="thisNumber"
                                type="number"
                                class="border-gray-300  rounded rounded focus:border-gray-300 focus:ring-0"
                            >
                            <font-awesome-icon v-if="!isEditNumber"
                                :icon="['fas', 'edit']"
                                class="mr-4 ml-5 text-lg font-black text-gentian-blue cursor-pointer"
                                @click="isEditNumber = !isEditNumber"
                            />
                            <font-awesome-icon v-else
                                :icon="['fas', 'close']"
                                class="mr-4 ml-5 text-lg font-black text-gentian-blue cursor-pointer"
                                @click="isEditNumber = !isEditNumber"
                            />
                        </label>
                        <div class="mt-3">
                            <textarea v-model="message"
                                name="about"
                                rows="3"
                                class=" mt-1 w-full border border border-gray-300 rounded focus:border-gray-300 focus:ring-0"
                                placeholder="Your message here..."
                            />
                            <p class="text-sm text-gray-500">
                                Character count: {{ message.length }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 mt-3 px-4 py-4 bg-gray-100">
                    <div class="flex-1">
                        <select id="location" name="location" class="mt-1  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 sm:text-sm rounded-md">
                            <option>Select sms preset to insert</option>
                            <option>Template 1</option>
                            <option>Template 2</option>
                            <option>Template 3</option>
                        </select>
                    </div>
                    <div class="float-right">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm">
                            SEND
                        </button>
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm" @click="isModalSendMessage = false">
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, ref, inject } from 'vue'

    const props = defineProps({
        number: {
            default: '',
            type: String
        }
    })

    const message = ref('')
    const { isModalSendMessage } = inject('Modal')
    const isEditNumber = ref(false)
    const thisNumber = ref(props.number)
</script>
