<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="showHeading" class="bg-white px-2 py-3 border-b border-gray-200 sm:px-4">
            <h3 class="text-lg font-medium text-gentian-blue">
                <slot name="heading" />
            </h3>
        </div>
        <div :class="{'p-4': padding}">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    defineProps({
        showHeading: {
            type: Boolean,
            default: true
        },
        padding: {
            type: Boolean,
            default: true
        }
    })
</script>
