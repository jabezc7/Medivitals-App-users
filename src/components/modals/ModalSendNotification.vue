<template>
   <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-4xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Notifications</span>
                        <font-awesome-icon @click="isModalNotifications = false" :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                     <div class="pb-5 mx-auto  md:flex sm:items-center sm:justify-between">
                        <div class="flex flex-col md:flex-row gap-2">
                            <div>
                                <select id="location" name="location" class="w-full mt-1 text-base border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 sm:text-sm rounded-md">
                                        <option>Select patient</option>
                                        <option>Patient 1</option>
                                        <option>Patient 2</option>
                                        <option>Patient 3</option>
                                </select>
                            </div>
                            <div>
                                <select id="location" name="location" class="w-full mt-1 py-2 text-base border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 sm:text-sm rounded-md">
                                        <option>Select case person</option>
                                        <option>Alicia Johns</option>
                                        <option>Patrick March</option>
                                        <option>Amber Deep</option>
                                </select>
                            </div>
                            <div>
                                <select id="location" name="location" class="w-full mt-1 py-2 text-base border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 sm:text-sm rounded-md">
                                        <option>Select source</option>
                                        <option>SOS</option>
                                        <option>Medivitals Band</option>
                                        <option>SMS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-sm font-medium text-gray-700">Notification Method</p>
                        <div class="flex pt-4">
                            <div class="relative flex items-start pr-5">
                                <div class="flex items-center h-5">
                                    <input id="sms" name="sms" type="checkbox"  checked class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="sms" class="font-medium text-gray-700">SMS</label>
                                </div>
                            </div>
                            <div class="relative flex items-start pr-5">
                                <div class="flex items-center h-5">
                                    <input id="email" name="email" type="checkbox" class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue  h-4 w-4 border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="candidates" class="font-medium text-gray-700">Email</label>
                                </div>
                            </div>
                            <div class="relative flex items-start pr-5">
                                <div class="flex items-center h-5">
                                    <input id="phone" name="phone" type="checkbox" class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="candidates" class="font-medium text-gray-700">phone</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm">CREATE</button>
                        <button @click="isModalNotifications = false" type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm">CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({                    
    setup() {
        const { isModalNotifications } = inject('Modal')

        return {
            isModalNotifications
        }
    },
})
</script>
