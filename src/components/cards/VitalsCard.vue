<template>
    <div :class="`${height} py-10 bg-white border-2 border-gray-200 rounded-lg overflow-hidden text-center`">
        <div class="rounded-full border-8 border-gentian-blue h-40 w-40 grid gap-4 place-content-center mx-auto">
            <p v-if="vitals" class="text-gray-500 font-bold">
                <span class="text-xl">{{ vitals.value }}</span>{{ vitals.unit }}
            </p>
            <p v-else class="text-gray-500 font-bold">
                <span class="text-xl">0</span>
            </p>
        </div>
        <div v-if="vitals" class="px-2">
            <p class="text-sm pt-5 pb-4 font-medium text-gray-500 truncate">
                Last Reading: {{ dayjs(vitals.last_reading).format('hh:mm A') }}
            </p>
            <p v-for="(row, x) in vitals.items" :key="x" class="text-sm pt-2 font-medium text-gray-500">
                {{ row.name }} <span class="text-2xl">{{ row.value }}</span> {{ row.unit }}
            </p>
        </div>
        <div v-else class="px-2">
            <p class="text-sm pt-5 pb-4 font-medium text-gray-500 truncate">
                Last Reading:
            </p>
        </div>
    </div>
</template>
<script setup>
    import { defineProps} from 'vue'
    import dayjs from 'dayjs'

    defineProps({
        vitals: {
            default: () => {},
            type: Object
        },
        height: {
            type: String,
            default: 'divmin-height'
        }
    })
</script>
