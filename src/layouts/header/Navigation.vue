<template>
    <nav class="bg-gentian-blue shadow border-t-4 border-t-ball-blue">
        <div class="container-fluid mx-auto px-2 sm:px-4 lg:px-4 lg:pl-0">
            <div class="flex justify-between h-14">
                <div class="flex px-2 lg:px-0">
                    <div class="hidden  lg:flex lg:space-x-0">
                        <router-link v-for="(nav, i) in navs"
                            :key="i"
                            :to="nav.to"
                            class="border-transparent text-white inline-flex  items-center px-1 pt-1 pl-7 pr-7 text-sm font-medium"
                            :class="{'bg-ball-blue' : nav.name.includes(routeName) }"
                        >
                            {{ nav.name }}
                        </router-link>
                    </div>
                </div>
                <div v-if="routeName !== 'PATIENT'" class="flex-1 flex items-center justify-center px-2 float-right lg:ml-6 lg:justify-end">
                    <div class="lg:max-w-sm">
                        <div class="relative">
                            <div class="flex rounded-md shadow-sm">
                                <div class="relative flex items-stretch flex-grow focus-within:z-10">
                                    <input type="text"
                                        name="search"
                                        autocomplete="off"
                                        class="block w-full rounded-l  pl-5 bg-gray-100 sm:text-sm border focus:outline-none focus:border-gray-300 focus:ring-0 "
                                        placeholder="Patient Search"
                                        @input="debounceSearch"
                                        @click="patient.showDropdown = false"
                                    >
                                </div>
                                <button type="button" class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2  text-sm font-medium rounded-r-sm text-gray-700 focus:outline-none bg-ball-blue">
                                    <svg v-if="!patient.searchLoading"
                                        class="h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                    <font-awesome-icon v-else :icon="['fas', 'circle-notch']" class="fa-spin mr-4 ml-5 text-small font-black text-white" />
                                </button>
                            </div>
                            <ul v-if="patient.searchResults.length > 0 && patient.showDropdown"
                                class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                tabindex="-1"
                                role="listbox"
                                aria-labelledby="listbox-label"
                                aria-activedescendant="listbox-option-3"
                                @mouseleave="patient.showDropdown = false"
                            >
                                <li v-for="(thisPatient, i) in patient.searchResults"
                                    id="listbox-option-0"
                                    :key="i"
                                    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                                    role="option"
                                >
                                    <router-link :to="`/patients/${thisPatient.id}`" @click="thisPatient.showDropdown = false">
                                        <div class="">
                                            <p class="font-normal truncate">
                                                {{ thisPatient.full_name }}
                                            </p>
                                            <p class="text-gray-500 truncate">
                                                {{ thisPatient.email }}
                                            </p>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex items-center lg:hidden">
                    <button type="button"
                        class="mr-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        @click="showNav = !showNav"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg class="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <svg class="hidden h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-show="showNav" class="lg:hidden">
            <div class="pt-2 pb-3 space-y-1 ">
                <router-link v-for="(nav, i) in navs"
                    :key="i"
                    :to="nav.to"
                    class="border-transparent text-white hover:text-gentian-blue hover:bg-white  block pl-3 pr-4 py-2 pl-8 font-medium"
                >
                    {{ nav.name }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useFilter } from '../../store/useFilter'
    import { usePatient } from '../../store/usePatient'
    import _ from "lodash"

    export default defineComponent({
        setup() {
            const filter = useFilter()
            const patient = usePatient()

            const route = useRoute()
            const router =  useRouter()
            const routeName = ref(route.name)
            const showNav = ref(false)
            const navs = ref([
                {
                    to: '/',
                    name: 'MY DASHBOARD'
                },
                {
                    to: '/patients',
                    name: 'PATIENT DASHBOARD'
                },
                {
                    to: '/alerts',
                    name: 'ALERTS'
                },
                {
                    to: '/monitoring',
                    name: 'BIO-BAND MONITORING'
                },
                {
                    to: '/communications',
                    name: 'COMMUNICATIONS'
                },
                {
                    to: '/automations',
                    name: 'AUTOMATIONS'
                }
            ])

            const show = ref(false)
            const debounce = ref()

            async function debounceSearch(event) {
                clearTimeout(debounce.value)
                debounce.value = setTimeout(async() => {
                    await filter.setSearchFilter(event.target.value, '')
                    await patient.search(filter.params)
                }, 600)
            }

            watch(() => _.cloneDeep(route), () => {
                routeName.value = route.name
            })

            return {
                routeName,
                router,
                showNav,
                navs,
                debounceSearch,
                filter,
                patient,
                show
            }
        },
    })
</script>
