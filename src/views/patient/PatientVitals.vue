<template>
    <dl :class="`grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`">
        <template v-for="(item, i) in vitals" :key="i">
            <div class="mb-2">
                <h3 class="font-medium text-gentian-blue">
                    {{ item.title }}
                </h3>
                <vitals-card :vitals="stats[i]" />
            </div>
        </template>
    </dl>
</template>

<script setup>
    import { defineProps, ref } from 'vue'
    import VitalsCard from '../../components/cards/VitalsCard.vue'
    import constant from '../../utils/constant.js'

    defineProps({
        gridCols: {
            type: String,
            default: 'grid-cols-3'
        },
        stats: {
            type: Object,
            required: true
        }
    })

    const vitals = ref(constant.testData.vitals)
</script>
