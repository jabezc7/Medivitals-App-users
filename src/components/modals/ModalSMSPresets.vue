<template>
   <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">{{ preset.title }}</span>
                        <font-awesome-icon @click="isModalSMSPresets = false" :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" />
                    </h3>
                </div>
                <div class="mt-5 px-4  mx-auto">
                    <div class="w-96 mx-auto img" :style=" {'background-image': `url(${imgUrl})`}">
                        <p class="w-60 pt-48 text-center grid grid-cols-1 mx-auto align-middle w-full text-white">
                            <span class="w-full">Hello {{ receiver.name }}</span>
                            <span class="w-full pt-3">{{ preset.message }}</span>
                            <span class="w-full pt-3 text-yellow-500">{{ preset.date }}</span>
                            <span class="w-full text-yellow-500">{{ preset.hour }}</span>
                        </p>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100" v-if="preset.button.status || preset.set_date">
                    <input v-show="preset.set_date" type="date"  v-model="date" class="border-gray-300 mr-2 rounded rounded focus:border-gray-300 focus:ring-0">
                    <input v-show="preset.set_date" type="time" v-model="hour" class="border-gray-300 rounded rounded focus:border-gray-300 focus:ring-0">

                    <div class="flex-1 w-full float-right" v-show="preset.button.status">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm">{{ preset.button.yes }}</button>
                        <button @click="isModalSMSPresets = false" type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm">{{ preset.button.no }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, inject } from 'vue'
import imgUrl from '@/assets/phonenew.png'
export default defineComponent({     
    props: {
        receiver: {
           type: Object,
           default: [] 
        },
        preset: {
            type: Object,
            default: []
        }
    },     
    setup(props) {
        const { isModalSMSPresets } = inject('Modal')
        const date = ref(props.preset.data)
        const hour = ref(props.preset.hour)

        return {
            isModalSMSPresets,
            imgUrl,
            date,
            hour
        }
    },
})
</script>
<style scoped>
   .img {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 500px;
   }
</style>
