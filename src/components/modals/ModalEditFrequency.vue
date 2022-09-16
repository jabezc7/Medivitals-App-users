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
                        <span class="w-full">Edit Frequency</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" @click="isModalEditFrequency = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4">
                    <div v-for="(item, i) in items" :key="i" class="border-b mb-3 p-3">
                        <label class="text-base font-medium text-gray-900">{{ item.name }}</label>
                        <fieldset class="mt-4">
                            <div class="flex flex-row">
                                <div v-for="(time, x) in item.times" :key="x" class="flex items-center flex-grow">
                                    <input :id="`frequency${i}${x}`"
                                        v-model="item.value"
                                        :name="`type${i}`"
                                        type="radio"
                                        :checked="time.value"
                                        :value="time.value"
                                        class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 cursor-pointer"
                                    >
                                    <label :for="`frequency${i}${x}`" class="ml-3 block text-sm font-normal text-gray-500 cursor-pointer"> {{ time.name }} </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white sm:text-sm" @click="submit()">
                            Update
                        </button>
                        <button :disabled="device.saving" @click="isModalEditFrequency = false" type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700 sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, inject, defineProps } from 'vue'
    import axios from 'axios'

    const patient = usePatient()
    const device = useDevice()

    const { isModalEditFrequency } = inject('Modal')

    const props = defineProps({
        devices: {
            required: true,
            type: Array
        }
    })

    const submit = () => {
        const thisItems = items.value.map(item => {
            return {
                slug: item.slug,
                value: item.value
            }
        })

        axios.post(`${import.meta.env.VITE_API_URL}/portal/update-frequencies`, {
            devices: props.devices,
            data: thisItems
        })
    }

    const times = [
        {
            name: '3m',
            value:  3,
            status: false
        },
        {
            name: '5m',
            value:  5,
            status: true
        },
        {
            name: '10m',
            value:  10,
            status: false
        },
        {
            name: '15m',
            value:  15,
            status: false
        },
        {
            name: '30m',
            value:  30,
            status: false
        },
        {
            name: '1h',
            value:  60,
            status: false
        },
        {
            name: '4h',
            value:  240,
            status: false
        }
    ]

    const items = ref([
        {
            name: 'Heart Rate',
            slug: 'heart-rate',
            times: [...times],
            value: null
        },
        {
            name: 'Temperature',
            slug: 'temperature',
            times: [...times],
            value: null
        }
    ])

    const selectedItems = ref([])

    onMounted(() => {
        selectedItems.value = patient.details.devices[0].frequencies
    })

    const updateFrequency = async () => {
        await device.updateFrequency(patient.details.devices[0].id, JSON.stringify(selectedItems.value))

        createToast('Device frequency was successfully updated.', {
            position: 'bottom-right',
            type: 'success',
            timeout: 3000,
        })
    }

    const isChecked = (slug, value) => {
        if (patient.details.devices[0].frequencies != null) {
            let index = patient.details.devices[0].frequencies.findIndex(obj => obj.slug === slug && obj.value == value);

            if (index >= 0)
                return true
        }
        return false
    }

    const selectFrequency = (name, slug, value) => {
        const index = selectedItems.value.map(object => object.slug).indexOf(slug)

        if (index === -1) {
            selectedItems.value.push({
                name: name,
                slug: slug,
                value: value
            })
        } else {
            selectedItems.value[index].value =  value
        }
    }
</script>
