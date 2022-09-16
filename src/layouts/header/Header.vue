<template>
    <header role="banner" class="px-0 mx-0 container-fluid object-center mx-auto pt-3 pb-3 flex flex-col bg-gray-100 justify-center">
        <div class="flex flex-wrap lg:px-4 object-center ">
            <div class="my-1 pr-2 w-5/12 lg:w-3/12 overflow-hidden">
                <div class="ml-4 lg:ml-0">
                    <a href="/">
                        <img class="md:pl-6 h-20" src="@/assets/logo-v1.png" alt="Logo">
                    </a>
                </div>
            </div>
            <div class="w-full lg:w-8/12 flex-grow mt-4 lg:mt-0 text-center sm:text-center lg:text-right">
                <div class="px-6 lg:px-0 lg:pt-10">
                    <p class="">
                        <span class="font-medium text-gentian-blue">Logged in {{ auth.user.full_name }} (<a href="Javascript:void(0)" class="underline" @click="logout">log out</a>)</span>
                        <font-awesome-icon :icon="['fas', 'plus']" class="mr-4 ml-5 text-2xl font-black text-gentian-blue" />
                        <font-awesome-icon :icon="['fas', 'user-cog']" class="mr-2 ml-3 text-2xl font-black text-gentian-blue" />
                    </p>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../store/useAuth'


export default defineComponent({
    setup() {
        const router = useRouter()
        const auth = useAuth()

        function logout() {
            auth.loggedOut()
            router.push('/login')
        }

        return {
            auth,
            logout
        }
    },
})
</script>
