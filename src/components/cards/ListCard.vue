<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="showHeading" class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gentian-blue">
                <slot name="heading" />
            </h3>
        </div>
        <ul role="list" class="divide-y divide-gray-200">
            <slot name="content" />
        </ul>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    defineProps({
        showHeading: {
            type: Boolean,
            default: true
        }
    })
</script>
