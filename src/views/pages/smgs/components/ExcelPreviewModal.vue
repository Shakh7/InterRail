<script>
export default {
    name: 'uploadPreview',
    emits: {
        onPreviewConfirmed: true,
    },
    props: {
        excelData: {
            type: Array,
            default: () => []
        },
        action: {
            type: String,
            default: 'create'
        }
    },
    methods: {
        onConfirmed(action) {
            this.$emit('onPreviewConfirmed', action)
        }
    },
    watch: {
        excelData() {
            let a = document.getElementById('triggerExcelPreviewModal')
            a.click()
        }
    }
}
</script>

<template>
    <button class="d-none" data-bs-toggle="modal" data-bs-target="#excelPreviewModal" id="triggerExcelPreviewModal"></button>
    <div class="modal fade zoomIn" id="excelPreviewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-body p-3">
                    <table class="table table-nowrap table-bordered align-middle">
                        <thead class="text-muted table-light">
                            <tr class="text-center">
                                <th v-for="th in excelData[0]" :key="th">
                                    <VTooltip>
                                        <div class="w-100">{{th === null ? '-' : th.toString().slice(0, 1)}}</div>
                                        <template #popper>
                                            {{th === null? 'Empty' : th}}
                                        </template>
                                    </VTooltip>
                                    <!-- {{th === null ? '?' : th.toString().slice(0,1)}} -->
                                </th>
                            </tr>
                            <tr class="text-center">
                                <th v-for="th in excelData[0]" :key="th">
                                    <input class="w-100 form-control py-0" type="text" :placeholder="th">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tr in excelData.slice(1, excelData.length)" :key="tr" class="text-center">
                                <td v-for="td in tr" :key="td">
                                    <VTooltip>
                                        <b-badge :variant="td === null ? 'danger text-danger w-25' : 'light text-light w-25'">{{td === null ? '-' : '-'}}</b-badge>
                                        <template #popper>
                                            {{td === null? 'Empty' : td}}
                                        </template>
                                    </VTooltip>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="w-100 text-center">
                        <b-button class="btn-soft-secondary waves-effect" 
                            data-bs-toggle="modal" data-bs-target="#editTrain"
                            @click="onConfirmed(action)" v-if="action === 'update'">
                            Confirm
                        </b-button>

                        <b-button class="btn-soft-secondary waves-effect" 
                            data-bs-toggle="modal" data-bs-target="#CreateSmgsModal"
                            @click="onConfirmed(action)" v-if="action === 'create'">
                            Confirm
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
