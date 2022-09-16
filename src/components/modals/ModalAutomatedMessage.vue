<template>
     <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-4xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Automated Message</span>
                        <font-awesome-icon @click="isModalAutomatedMessage = false" :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" />
                    </h3>
                </div>
                <div class="mt-5 px-4 pb-5">
                    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                        <li class="col-span-1 bg-white rounded-lg">
                            <button class="w-full bg-white items-center px-4 py-2 border-gentian-blue border rounded shadow-sm text-sm font-normal text-gentian-blue">
                                PATIENTS
                            </button>
                            <div class="mt-5 px-4 h-64 pb-5 pt-5 bg-gray-100 rounded">
                                <ul>
                                    <li class="py-2"><a class="text-gray-500 text-sm"> Patient 1</a></li>
                                    <li class="py-2"><a class="text-gray-500 text-sm"> Patient 2</a></li>
                                    <li class="py-2"><a class="text-gray-500 text-sm"> Patient 3</a></li>
                                    <li class="py-2"><a class="text-gray-500 text-sm"> Patient 4</a></li>
                                    <li class="py-2"><a class="text-gray-500 text-sm"> Patient 5</a></li>
                                </ul>
                            </div>
                        </li>
                        <li class="col-span-1 bg-white rounded-lg">
                            <button class="w-full bg-white items-center px-4 py-2 border-gentian-blue border rounded shadow-sm text-sm font-normal text-gentian-blue">
                                TEMPLATE
                            </button>
                            <div class="mt-5 px-4 h-64 pb-5 pt-5 bg-gray-100 rounded">
                                <p class="text-gray-500 text-sm">Hello [Patient Name]</p>
                                <p class="text-gray-500 text-sm pt-3">This is a friendly reminder to exercise daily for optimum health. </p>
                                <p class="text-gray-500 text-sm pt-3">Contact us if you would like a sport physician to come and discuss a plan. </p>
                                <p class="text-gray-500 text-sm pt-3">HIH</p>
                            </div>
                        </li>
                        <li class="col-span-1 bg-white rounded-lg">
                            <button class="w-full bg-white  items-center px-4 py-2 border-gentian-blue border rounded shadow-sm text-sm font-normal text-gentian-blue">
                                FREQUENCY
                            </button>
                            <div class="mt-5 px-4 h-64 pb-5 pt-5 bg-gray-100 rounded">
                                <p class="text-gray-500 text-sm">Monthly</p>
                                <p class="text-gray-500 pt-3 text-sm">Start: 1/2/2022</p>
                                <p class="text-gray-500 pt-3 text-sm">End: 31/3/2022</p>
                            </div>
                        </li>
                    </ul>
                    <p class="text-gray-600 text-sm pt-5">CODES</p>
                    <p class="text-gray-500 text-sm pt-3">[FIRST NAME]  [LAST NAME]  [DATE]  [TIME]  [ADDRESS] </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({
    setup() {
        const { isModalAutomatedMessage } = inject('Modal')
        return {
            isModalAutomatedMessage
        }  
    },
})
</script>
