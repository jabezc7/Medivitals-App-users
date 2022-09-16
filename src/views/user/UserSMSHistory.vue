<template>
    <card :padding="false">
        <template #heading>
            History
        </template>
        <template #content>
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-6">
                            Date/Time
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                            Recipient
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">
                            Message
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(item, i) in sms.histories" :key="i">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {{ dayjs(item.created_at).format('DD/MM/YYYY') }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ item.patient }} ({{ item.to }})
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ item.message }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </card>
</template>
<script setup>
    import { onMounted } from 'vue'
    import { useSms } from '@/store/useSms'
    import dayjs from 'dayjs'
    import Card from '../../components/cards/Card.vue'

    const sms = useSms()

    onMounted(async() => {
        await sms.getUserSMS(sms.search)
    })
</script>
