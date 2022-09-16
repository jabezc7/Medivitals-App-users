<template>
   <div class="fixed z-10 inset-0 overflow-y-auto bg-transparent" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3 bg-transparent">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5 bg-transparent text-left overflow-hidden transform transition-all sm:align-middle max-w-4xl w-full">
                <div class="pb-2  px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-white  pb-3">
                        <span class="w-full text-transparent">Location</span>
                        <font-awesome-icon @click="isModalLocation = false" :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 text-white cursor-pointer" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                        src="https://maps.google.com/maps?q=Perth%2C%20Western%20Australia&#038;t=m&#038;z=15&#038;output=embed&#038;iwloc=near"
                        title="Perth, Western Australia"
                        aria-label="Perth, Western Australia"
                        class="w-full h-96">
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({                    
    setup() {
        const { isModalLocation } = inject('Modal')

        return {
            isModalLocation
        }
    },
})
</script>
