<template>
    <div class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="flex items-end justify-center lg:min-h-screen pt-4 text-center sm:block p-3">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white pt-5  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-4xl w-full">
                <div class="pb-2 border-b px-4">
                    <h3 class="text-lg flex leading-6 font-medium text-gray-900  pb-3">
                        <span class="w-full">SMS Templates</span>
                        <font-awesome-icon :icon="['fas', 'close']" class="mr-4 ml-5 text-lg font-black text-gray-500 cursor-pointer" @click="isModalTemplates = false" />
                    </h3>
                </div>
                <div class="mt-5 px-4 overflow-y-auto h-[32rem]">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="py-4 pl-4 pr-3 text-left font-medium text-gray-500 sm:pl-6 md:pl-0">
                                    Name
                                </th>
                                <th scope="col" class="py-4 pl-4 pr-3 text-left font-medium text-gray-500 sm:pl-6 md:pl-0">
                                    Quick Link
                                </th>
                                <th scope="col" class="py-4 pl-4 pr-3 text-left font-medium text-gray-500 sm:pl-6 md:pl-0">
                                    Active
                                </th>
                                <th scope="col" class="py-4 pl-4 pr-3 text-left font-medium text-gray-500 sm:pl-6 md:pl-0" />
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, i) in template.templateList"
                                :key="i"
                                class="py-3 bg-green"
                                :class="{ 'bg-gray-100': !(i % 2 == 0) }"
                            >
                                <td class="text-sm font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                    {{ item.name }}
                                </td>
                                <td class="text-sm font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                    <font-awesome-icon v-if="item.quick_link" :icon="['fas', 'check']" class="text-l ml-3 mr-3 text-green-600 cursor-pointer" />
                                </td>
                                <td class="text-sm font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                    <font-awesome-icon v-if="item.active" :icon="['fas', 'check']" class="text-l ml-3 mr-3 text-green-600 cursor-pointer" />
                                </td>
                                <td class="text-sm font-sm text-gray-500 pl-4 py-3 sm:pl-0">
                                    <a href="Javascript:void(0)" @click="deleteModal(item)"><font-awesome-icon :icon="['fas', 'trash']" class="text-l float-right ml-3 mr-3 text-gray-600 cursor-pointer" /></a>
                                    <a href="Javascript:void(0)" @click="editModal(item)"><font-awesome-icon :icon="['fas', 'edit']" class="text-l float-right ml-3 text-gray-600 cursor-pointer" /></a>
                                    <a href="Javascript:void(0)" @click="previewModal(item)"><font-awesome-icon :icon="['fas', 'eye']" class="text-l float-right ml-3 text-gray-600 cursor-pointer" /></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex mt-5 sm:mt-6 px-4 py-4 bg-gray-100">
                    <div class="flex-1 w-full float-right">
                        <button type="button" class="inline-flex justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-gray-200 mr-3 text-base font-medium text-gray-700  sm:text-sm" @click="isModalTemplates = false">
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showDeleteModal"
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
                                Delete Template
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Are you sure you want to delete this template?.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button :disabled="template.saving"
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="deleteTemplate"
                        >
                            <span v-if="!template.saving">Delete</span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" /> Deleting...
                            </span>
                        </button>
                        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" @click="showDeleteModal = false">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showPreviewModal"
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
                                Preview Template
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ selectedTemplate.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" @click="showPreviewModal = false">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showEditModal"
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
                            Edit Template
                        </h3>
                        <div class="mt-2">
                            <label class=" text-sm font-medium text-gray-700">Name</label>
                            <input v-model="selectedTemplate.name" class="mt-1 h-9  px-4 w-full border border border-gray-300 rounded focus:border-gray-300 focus:ring-0" placeholder="Name here...">
                        </div>
                        <div class="mt-4 pb-3">
                            <label class=" text-sm font-medium text-gray-700">SMS Template</label>
                            <textarea ref="contentInput"
                                v-model="smsContent"
                                rows="8"
                                class=" mt-1 w-full border border border-gray-300 rounded focus:border-gray-300 focus:ring-0"
                                placeholder="Message here..."
                            />
                            <button type="button"
                                class="bg-gray-300 rounded-sm  border-gray-300 py-1 px-4 text-xs whitespace-nowrap mr-2"
                                @click="insertCode('{{patient-first}}')"
                            >
                                Patient First
                            </button>
                            <button type="button"
                                class="bg-gray-300 rounded-sm border-gray-300 py-1 px-4 text-xs whitespace-nowrap mr-2"
                                @click="insertCode('{{patient-last}}')"
                            >
                                Patient Last
                            </button>
                        </div>
                        <div class="relative flex items-start pb-3 mt-5">
                            <div class="flex items-center h-5">
                                <input id="template-active"
                                    v-model="selectedTemplate.active"
                                    name="active"
                                    type="checkbox"
                                    class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 rounded"
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="template-active" class="font-medium text-gray-500">Active</label>
                            </div>
                        </div>

                        <div class="relative flex items-start pb-3 mt-3">
                            <div class="flex items-center h-5">
                                <input id="template-active"
                                    v-model="selectedTemplate.quick_link"
                                    name="quick_link"
                                    type="checkbox"
                                    class="accent-gentian-blue focus:ring-gentian-blue text-gentian-blue h-4 w-4 border-gray-300 rounded"
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="template-active" class="font-medium text-gray-500">Quick Link</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button :disabled="template.saving"
                            type="button"
                            class="inline-flex ml-3 justify-center float-right rounded border border-transparent shadow-sm px-5 py-2 bg-office-green text-base font-medium text-white  sm:text-sm"
                            @click="update"
                        >
                            <span v-if="!template.saving">Update</span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'circle-notch']" class="fa-spin text-small font-black text-white" /> Updating...
                            </span>
                        </button>
                        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" @click="showEditModal = false">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { defineComponent, onMounted, ref, nextTick, inject } from 'vue'
    import { createToast } from 'mosha-vue-toastify'
    import { useTemplate } from '@/store/useTemplate'

    export default defineComponent({
        setup() {
            const template = useTemplate()

            const { isModalTemplates } = inject('Modal')
            const selectedTemplate = ref([])
            const showPreviewModal = ref(false)
            const showDeleteModal = ref(false)
            const showEditModal = ref(false)
            const contentInput = ref(null)
            const smsContent = ref('')

            function deleteModal(template) {
                showDeleteModal.value = true
                selectedTemplate.value = template
            }

            function previewModal(template) {
                showPreviewModal.value = true
                selectedTemplate.value = template
            }

            function editModal(template) {
                showEditModal.value = true
                Object.assign(selectedTemplate.value, template)
                smsContent.value = template.content
            }

            async function update() {
                await template.update(selectedTemplate.value, smsContent.value)
                template.list()

                showEditModal.value = false
                createToast('Template was successfully updated.', {
                    position: 'bottom-right',
                    type: 'success',
                    timeout: 3000,
                })
            }

            function insertCode(text) {
                const el = contentInput.value
                let cursorPos = el.selectionEnd

                const content = smsContent.value

                if (content && content !== '') {
                    smsContent.value =
                        smsContent.value.substring(0, cursorPos) +
                        text +
                        smsContent.value.substring(cursorPos)
                } else {
                    smsContent.value = text + ''
                }

                cursorPos += text.length
                nextTick(()  => el.setSelectionRange(cursorPos, cursorPos))
            }

            async function deleteTemplate() {
                await template.deleteTemplate(selectedTemplate.value.id)
                template.list()
                showDeleteModal.value = false

                createToast('Template was successfully deleted.', {
                    position: 'bottom-right',
                    type: 'success',
                    timeout: 3000,
                })
            }

            onMounted(async() => {
                await template.list()
            })

            return {
                isModalTemplates,
                update,
                insertCode,
                template,
                showDeleteModal,
                showPreviewModal,
                showEditModal,
                editModal,
                previewModal,
                deleteModal,
                deleteTemplate,
                selectedTemplate,
                contentInput,
                smsContent
            }
        },
    })
</script>
