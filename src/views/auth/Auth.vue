<template>
    <div class="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 bg-" :class="[backgroundColour]">
        <div class="mx-auto w-full max-w-md">
            <slot name="logo">
                <img class="mx-auto"
                    :class="[logoClasses]"
                    src="@/assets/logo-v1.png"
                    alt=""
                >
            </slot>
        </div>
        <div class="mt-8 mx-auto w-full max-w-lg">
            <div class="bg-white border-gray-200 border rounded-lg shadow py-4 md:py-8 px-4 md:px-10">
                <div v-show="auth.thisErrorMessage" class="bg-red-200 p-4 mb-4">
                    <div class="flex">
                        <div class="shrink-0">
                            <svg class="h-5 w-5 text-red-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="leading-5 text-red-800">
                                {{ auth.thisErrorMessage }}
                            </h3>
                        </div>
                    </div>
                </div>
                <div v-show="auth.forgotMessage" class="bg-green-200 p-4 mb-4">
                    <div class="flex justify-center">
                        <h3 class="leading-5 text-green-800 text-md">
                            {{ auth.forgotMessage }}
                        </h3>
                    </div>
                </div>
                <VeeForm v-if="!forgot"
                    v-slot="{ handleSubmit }"
                    :validation-schema="validationSchema"
                    as="div"
                >
                    <form @submit="handleSubmit($event, authenticate)">
                        <div class="relative">
                            <label class="block font-normal leading-5 text-gray-700">
                                Email
                            </label>
                            <div class="mt-1">
                                <Field v-slot="{ errorMessage, field }"
                                    v-model="email"
                                    type="email"
                                    name="email"
                                >
                                    <input v-bind="field"
                                        type="text"
                                        :class="[ errorMessage ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-300']"
                                        class="appearance-none block w-full px-3 py-2 rounded-l  placeholder-gray-400 focus:outline-none focus:shadow-none focus:drop-shadow-none focus:ring-white transition duration-150 ease-in-out leading-5"
                                    >
                                    <span class="text-red-500">{{ errorMessage }}</span>
                                </Field>
                            </div>
                        </div>
                        <div class="mt-2 md:mt-6">
                            <label class="block font-normal leading-5 text-gray-700">
                                Password
                            </label>
                            <div class="mt-1">
                                <Field v-slot="{ errorMessage, field }"
                                    v-model="password"
                                    type="password"
                                    name="password"
                                    class="relative"
                                >
                                    <input v-bind="field"
                                        type="password"
                                        :class="[ errorMessage ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-default-300']"
                                        class="appearance-none block w-full px-3 py-2 rounded-l placeholder-gray-400 focus:outline-none focus:shadow-none focus:drop-shadow-none focus:ring-white transition duration-150 ease-in-out leading-5"
                                    >
                                    <span class="text-red-500">{{ errorMessage }}</span>
                                </Field>
                            </div>
                        </div>
                        <div class="mt-2 md:mt-6 flex items-center">
                            <div class="leading-5">
                                <a href="#" @click="forgot = true" class="font-normal text-default-500 hover:text-default-600 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div class="mt-4 md:mt-6">
                            <span class="block w-full rounded-md shadow-sm">
                                <button type="submit"
                                    class="w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-default-500 hover:bg-default-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    :disabled="auth.submitted"
                                >
                                    <svg v-show="auth.submitted"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 38 38"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#fff"
                                        class="mr-2"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g transform="translate(1 1)" stroke-width="2">
                                                <circle stroke-opacity=".5"
                                                    cx="18"
                                                    cy="18"
                                                    r="18"
                                                />
                                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                                    <animateTransform attributeName="transform"
                                                        type="rotate"
                                                        from="0 18 18"
                                                        to="360 18 18"
                                                        dur="1s"
                                                        repeatCount="indefinite"
                                                    />
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                    Sign In
                                </button>
                            </span>
                        </div>
                    </form>
                </VeeForm>
                <VeeForm v-if="forgot"
                    v-slot="{ handleSubmit }"
                    :validation-schema="forgotValidationSchema"
                    as="div"
                >
                    <form @submit="handleSubmit($event, forgotPassword)">
                        <div class="relative">
                            <label class="block font-medium leading-5 text-gray-700">
                                Email
                            </label>
                            <div class="mt-1">
                                <Field v-slot="{ errorMessage, field }"
                                    v-model="forgotEmail"
                                    type="email"
                                    name="forgotEmail"
                                >
                                    <input v-bind="field"
                                        type="text"
                                        :class="[ errorMessage ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-default-300']"
                                        class="appearance-none block w-full px-3 py-2 border rounded-l placeholder-gray-400 focus:outline-none focus:shadow-none focus:drop-shadow-none focus:ring-white transition duration-150 ease-in-out leading-5"
                                    >
                                    <span class="text-red-500">{{ errorMessage }}</span>
                                </Field>
                            </div>
                        </div>
                        <div class="mt-6">
                            <span class="block w-full rounded-md shadow-sm">
                                <button type="submit"
                                    class="w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-default-500 hover:bg-default-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    :disabled="auth.submitted"
                                >
                                    <svg v-show="auth.submitted"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 38 38"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#fff"
                                        class="mr-2"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g transform="translate(1 1)" stroke-width="2">
                                                <circle stroke-opacity=".5"
                                                    cx="18"
                                                    cy="18"
                                                    r="18"
                                                />
                                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                                    <animateTransform attributeName="transform"
                                                        type="rotate"
                                                        from="0 18 18"
                                                        to="360 18 18"
                                                        dur="1s"
                                                        repeatCount="indefinite"
                                                    />
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                    Reset Password
                                </button>
                            </span>
                        </div>
                        <div class="mt-6 flex items-center justify-center">
                            <div class="leading-5">
                                <a href="#" class="font-normal text-default-500 hover:text-default-600 focus:outline-none focus:underline transition ease-in-out duration-150" @click="forgot = false; forgotEmail = ''">
                                    Remember your password? Sign In
                                </a>
                            </div>
                        </div>
                    </form>
                </VeeForm>
            </div>
        </div>
    </div>
</template>

<script>
import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuth } from '@/store/useAuth'

export default {
    name: "Login",
    components: {
        VeeForm,
        Field
    },
    props: {
        logo: {
            default: '/logo.png',
            type: String
        },
        backgroundColour: {
            default: 'bg-charcoal-800',
            type: String
        },
        logoClasses: {
            default: 'w-48 md:w-64',
            type: String
        }
    },
    setup () {
        const router = useRouter()  
        const auth = useAuth()

        const email = ref('')
        const password = ref('')
        const forgotEmail = ref('')
        const forgot = ref(false)
        const year = (new Date()).getFullYear()

        const validationSchema = yup.object({
            email: yup.string().required().email().label('Email'),
            password: yup.string().required().label('Password')
        })

        const forgotValidationSchema = yup.object({
            forgotEmail: yup.string().required().email().label('Email'),
        })

        async function authenticate (values) {
            await auth.login({ email: values.email, password: values.password });
            await auth.checkIsLoggedIn()

            if (auth.isLoggedIn) {
                router.push('/')
            }
        }

        async function forgotPassword (values, {resetForm}) {
            await auth.forgotPassword()
            forgot.value = false

            resetForm()
        }

        return {
            forgot,
            email,
            password,
            forgotEmail,
            year,
            validationSchema,
            forgotValidationSchema,
            authenticate,
            forgotPassword,
            auth
        }
    }
}
</script>
