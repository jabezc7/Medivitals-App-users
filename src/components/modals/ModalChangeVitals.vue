<template>
     <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">Change Vitals</span>
                        <font-awesome-icon @click="isModalChangeVital = false" :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                    <div class="relative flex items-start pb-3" v-for="(item, i) in items" :key="i">
                        <div class="flex items-center h-5">
                            <input :id="`vitals${i}`" name="sms" type="checkbox"  checked class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                            <label :for="`vitals${i}`" class="font-medium text-gray-500">{{ item }}</label>
                        </div>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm">UPDATE</button>
                        <button @click="isModalChangeVital = false" type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm">CANCEL</button>
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
        const { isModalChangeVital } = inject('Modal')
        const items = ref(['Blood Pressure', 'Heart Rate', 'Temperature', '02 Saturation', 'Respiratory Rate', 'Location Tracking', 'Step Counter'])
        return {
            isModalChangeVital,
            items
        }  
    },
})
</script>
