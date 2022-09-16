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
                        <span class="w-full">Automated Instances</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" @click="isModalInstances = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4 overflow-y-auto h-[32rem]">
                    <div class="inline-block align-middle">
                        <table class="w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Trigger
                                    </th>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Action
                                    </th>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Change
                                    </th>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Notification
                                    </th>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Auto Watch Notification
                                    </th>
                                    <th scope="col" class="py-4 pl-4 pr-3 text-left font-sm text-sm text-gray-500 sm:pl-6 md:pl-0">
                                        Manage Threshold
                                    </th>
                                </tr>
                            </thead>
                            <tbody class=" divide-y divide-gray-300">
                                <tr v-for="(item, i) in items" :key="i" class="py-3">
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        <p class="pt-2">
                                            {{ item.trigger }}
                                        </p>
                                    </td>
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        {{ item.trigger_test }}
                                    </td>
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        {{ item.change }}
                                    </td>
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        {{ item.notifications }}
                                    </td>
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        {{ item.watch }}
                                    </td>
                                    <td class="text-xs font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                        {{ item.threshold }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, inject } from 'vue'
import constant from '../../utils/constant.js'

export default defineComponent({
    setup() {
        const { isModalInstances } = inject('Modal')

        const items = ref(constant.testData.instances)

        return {
            isModalInstances,
            items
        }
    },
})
</script>
