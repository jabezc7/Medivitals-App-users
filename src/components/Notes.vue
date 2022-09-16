<template>
    <card>
        <template #heading>
            <div class="flex flex-row">
                <span class="flex-grow">Notes</span>
                <button v-if="showAddButton"
                    type="button"
                    class="bg-gentian-blue items-center px-5 py-1 text-center border-transparent rounded text-xs font-medium text-white uppercase"
                    @click="isModalAddNote = true"
                >
                    Add Note
                </button>
            </div>
        </template>
        <template #content>
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(item, index) in notes" :key="index">
                    <div class="flex items-center py-2">
                        <div class="min-w-0 flex-1 flex items-center">
                            <div class="min-w-0 flex-1 md:grid md:grid-cols-1 md:gap-x-4 md:gap-y-1">
                                <div>
                                    <p class="text-sm font-normal text-grey-500">
                                        {{ item.note }}
                                    </p>
                                </div>
                                <div class="sm:flex sm:justify-between">
                                    <div class="sm:flex">
                                        <p class="flex items-center text-xs text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {{ item.meta.created_at_human }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
    </card>
    <modal-add-note v-if="isModalAddNote" @saved="noteAdded" />
</template>
<script setup>
    import { defineEmits, defineProps, ref, provide } from 'vue'
    import ModalAddNote from '../components/modals/ModalAddNote.vue'
    import Card from './cards/Card.vue'

    const emit = defineEmits(['saved'])

    defineProps({
        title: {
            default: 'Notes',
            type: String
        },
        showTitle: {
            default: true,
            type: Boolean
        },
        showAddButton: {
            default: true,
            type: Boolean
        },
        notes: {
            default: () => [],
            type: Array
        }
    })

    const isModalAddNote = ref(false)

    const noteAdded = () => {
        emit('saved')
    }

    provide('Modal', { isModalAddNote })
</script>

<style>
    .note-cont {
        max-height: 500px;
        overflow: auto
    }
</style>
