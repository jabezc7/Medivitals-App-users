<template>
    <div v-if="showTitle" class="flex items-center space-x-3  mb-4">
        <h3 class="text-xl font-medium text-gentian-blue">
            {{ title }}
        </h3>
    </div>
    <ul role="list">
        <template v-for="(item, i) in notifications" :key="i">
            <li class="py-4">
                <div class="flex space-x-3">
                    <div class="flex-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium">
                                {{ item.date }}
                            </h3>
                        </div>
                        <p class="text-sm text-gray-500">
                            {{ item.message }} <span class="font-semibold" :class="item.color">{{ item.tag }} </span>
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </li>
        </template>
    </ul>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        title: {
            default: 'Notifications',
            type: String
        },
        showTitle: {
            default: true,
            type: Boolean
        }
    },
    setup() {
        const notifications = ref([
            {
                date: '12/1/2022 12:56pm',
                name: 'Patrick Marsh',
                message: 'Patient replied to status check',
                tag: '',
                color:  ''
            },
            {
                date: '12/1/2022 12:56pm',
                name: 'Patrick Marsh',
                message: 'Heart rate a little',
                tag: 'high',
                color:  'text-red-500'
            },
            {
                date: '12/1/2022 12:56pm',
                name: 'Patrick Marsh',
                message: 'Changed Frequency from 30m to 15m',
                tag: '',
                color:  ''
            },
        ])

        return {
            notifications
        }
    },
})
</script>
