<template>
    <div class="px-4 py-4 flex items-center flex-col justify-between sm:px-6">
        <nav class="relative z-0 inline-flex shadow-sm bg-white">
            <button type="button"
                :disabled="isInFirstPage"
                class="relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                :class="{'opacity-50 cursor-not-allowed': isInFirstPage}"
                aria-label="Previous"
                @click="onClickPreviousPage"
            >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
            <button v-for="(page, index) in pagination.pages"
                :key="index"
                type="button"
                :disabled="page === currentPage"
                class="-ml-px relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium hover:bg-gentian-blue hover:text-white focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150"
                :class="{'bg-gentian-blue text-white cursor-default': currentPage === page}"
                @click="onClickPage(page)"
            >
                {{ page }}
            </button>
            <button type="button"
                :disabled="isInLastPage"
                class="-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                :class="{'opacity-50 cursor-not-allowed': isInLastPage}"
                aria-label="Next"
                @click="onClickNextPage"
            >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </nav>
        <div>
            <p class="text-sm leading-5 text-gray-700 my-2">
                Showing
                <span class="font-medium">{{ from }}</span>
                to
                <span class="font-medium">{{ to }}</span>
                of
                <span class="font-medium">{{ total }}</span>
                results
            </p>
        </div>
    </div>
</template>
<script>
    import { computed } from 'vue'

    export default {
        props: {
            maxVisibleButtons: {
                type: Number,
                required: false,
                default: 3
            },
            perPage: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        emits: ['paginate'],
        setup (props, { emit }) {
            function onClickPreviousPage() {
                emit('paginate', props.currentPage - 1)
            }

            function onClickPage(page) {
                emit('paginate', page)
            }

            function onClickNextPage() {
                emit('paginate', props.currentPage + 1)
            }

            const isInFirstPage = computed(() => {
                return props.currentPage === 1
            })

            const isInLastPage = computed(() => {
                return props.currentPage === totalPages.value
            })

            const startPage = computed(() => {
                // When on the first page
                if (props.currentPage === 1) {
                    return 1
                }
                // When on the last page
                if (props.currentPage === totalPages.value) {
                    return totalPages.value - props.maxVisibleButtons + 1
                }
                // When in between
                let value = Math.floor((props.maxVisibleButtons - 1) / 2) - props.maxVisibleButtons

                if (value < 1){
                    return 1
                } else {
                    return value
                }
            })

            const totalPages = computed(() => {
                return Math.ceil((props.total / props.perPage))
            })

            const pagination = computed(() => {
                const totalItems = props.total
                let currentPage = props.currentPage
                const pageSize = props.perPage
                const maxPages = props.maxVisibleButtons

                // calculate total pages
                let totalPages = Math.ceil(totalItems / pageSize)

                // ensure current page isn't out of range
                if (currentPage < 1) {
                    currentPage = 1
                } else if (currentPage > totalPages) {
                    currentPage = totalPages
                }

                let startPage, endPage

                if (totalPages <= maxPages) {
                    // total pages less than max so show all pages
                    startPage = 1
                    endPage = totalPages
                } else {
                    // total pages more than max so calculate start and end pages
                    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
                    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
                    if (currentPage <= maxPagesBeforeCurrentPage) {
                        // current page near the start
                        startPage = 1
                        endPage = maxPages
                    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                        // current page near the end
                        startPage = totalPages - maxPages + 1
                        endPage = totalPages
                    } else {
                        // current page somewhere in the middle
                        startPage = currentPage - maxPagesBeforeCurrentPage
                        endPage = currentPage + maxPagesAfterCurrentPage
                    }
                }

                // calculate start and end item indexes
                let startIndex = (currentPage - 1) * pageSize
                let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

                // create an array of pages to ng-repeat in the pager control
                let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)

                // return object with all pager properties required by the view
                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                }
            })

            const from = computed(() => {
                if (props.currentPage === 1) {
                    return 1
                }

                return ((props.perPage * props.currentPage) - props.perPage) + 1
            })

            const to = computed(() => {
                if (props.total < (props.perPage * props.currentPage)){
                    return props.total
                } else {
                    return (props.perPage * props.currentPage)
                }
            })

            return {
                onClickPreviousPage,
                isInFirstPage,
                onClickPage,
                pagination,
                onClickNextPage,
                isInLastPage,
                from,
                to
            }
        }
    }
</script>
