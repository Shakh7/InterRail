<template>
  <section class="row">
    <div class="col-xl-3">
      <div class="card">
        <div class="pt-3 px-3 pb-2 d-flex flex-xl-row justify-content-between align-items-center">
          <h6 class="card-title">Contracts</h6>
          <b-button
              variant="success"
              size="sm"
              data-bs-toggle="modal"
              data-bs-target="#contract_create_modal"
          >Create contract
          </b-button>
        </div>
        <div class="card-body p-0">
          <ul class="list-unstyled vstack gap-1">
            <li v-for="contract in contracts" :key="contract.id"
                class="cursor-pointer px-3 py-2"
                :class="{
                  'bg-soft-secondary' : current_contract === contract.id
                }"
                @click="current_contract === contract.id ? current_contract = null : current_contract = contract.id"
            >
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="avatar-xs">
                    <div class="avatar-title rounded bg-soft-secondary text-secondary">
                      <i class="ri-folder-2-line fs-18"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3 ">
                  <h6 class="mb-0 fs-14">{{ contract.name }}</h6>
                  <div class="d-flex justify-content-between">
                    <small class="mb-0 text-muted">{{ formatDate(contract.start_date) }}</small>
                    <small class="mb-0 text-muted">{{ formatDate(contract.expire_date) }}</small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xl-9">
      <div class="card">
        <div class="card-header align-items-xl-center justify-content-between d-xl-flex py-2 border-0">
          <div class="flex-shrink-1">
            <ul class="nav nav-pills card-header-pills" role="tablist">
              <li class="nav-item" @click="current_tab = 'documents'">
                <a class="nav-link active" data-bs-toggle="tab" href="#contract_docs" role="tab">
                  Documents
                </a>
              </li>
              <li class="nav-item" @click="current_tab = 'acts'">
                <a class="nav-link" data-bs-toggle="tab" href="#contract_acts" role="tab">
                  Acts
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-grow-0" v-if="current_contract">
            <div v-if="current_tab === 'documents'">
              <b-button
                  data-bs-toggle="modal"
                  data-bs-target="#doc_create_modal"
                  variant="success">Add document
              </b-button>

              <!-- Dropdown Menu Item Color -->
              <div class="btn-group ms-3">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">Edit Contract
                </button>
                <div class="dropdown-menu dropdownmenu-primary">
                  <a class="dropdown-item" data-bs-toggle="modal"
                     data-bs-target="#contract_edit_modal">Edit</a>
                  <a data-bs-toggle="modal"
                     data-bs-target="#contract_delete_modal"
                     class="dropdown-item text-danger fw-medium">Delete</a>
                </div>
              </div>

              <DocumentCreateModal :contract_id="current_contract" @update="onDocUpdate"/>
            </div>
            <div v-if="current_tab === 'acts'">
              <b-button data-bs-toggle="modal"
                        data-bs-target="#act_create_modal"
                        variant="success">Add act
              </b-button>
              <div class="btn-group ms-3">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">Edit Contract
                </button>
                <div class="dropdown-menu dropdownmenu-primary">
                  <a class="dropdown-item" data-bs-toggle="modal"
                     data-bs-target="#contract_edit_modal">Edit</a>
                  <a data-bs-toggle="modal"
                     data-bs-target="#contract_delete_modal"
                     class="dropdown-item text-danger fw-medium">Delete</a>
                </div>
              </div>
              <ActEditModal :act="edit.act" :contract_id="current_contract" @update="onActUpdate"/>
            </div>
          </div>
        </div>
        <div class="card-body pt-1">
          <div class="tab-content text-muted">
            <div class="tab-pane" id="contract_acts" role="tabpanel">
              <div v-if="current_contract" class="table-responsive">
                <table class="table table-nowrap">
                  <thead class="text-center">
                  <tr>
                    <th scope="col" class="text-start">Name</th>
                    <th scope="col" class="text-start">File</th>
                    <th scope="col">Type</th>
                    <th scope="col">Size</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody class="text-center" v-if="!is_loading_acts">
                  <tr v-for="act in acts_by_contract" :key="act.id">
                    <th scope="row" class="text-start">
                      <a class="fw-semibold">{{ act.name }}</a>
                    </th>
                    <td class="text-start">{{ getDocumentFileName(act.file) }}</td>
                    <td>{{ getDocumentFileType(act.file) }}</td>
                    <td>{{ getDocumentFileSize(act.file_size) }}</td>
                    <td>
                      <i @click="downloadDocument(act.file)"
                         class="bx bxs-download fs-15 c_icon c_icon_hoverable"></i>
                      <i data-bs-toggle="modal"
                         data-bs-target="#act_edit_modal"
                         @click="edit.act = act"
                         class="bx bxs-edit-alt mx-2 fs-15 c_icon c_icon_hoverable"></i>
                      <i data-bs-toggle="modal"
                         data-bs-target="#act_delete_modal"
                         @click="edit.act = act"
                         class="bx bxs-trash-alt fs-15 c_icon c_icon_hoverable"></i>
                    </td>
                  </tr>
                  </tbody>

                  <tbody class="text-center" v-if="is_loading_acts && acts_by_contract.length === 0">
                  <tr>
                    <td colspan="5" class="py-5">
                      <b-spinner variant="secondary"></b-spinner>
                      <h6 class="mt-2 mb-0">Loading..</h6>
                    </td>
                  </tr>
                  </tbody>
                  <tbody class="text-center" v-if="!is_loading_acts && acts_by_contract.length === 0">
                  <tr>
                    <td colspan="5" class="bg-light py-5">
                      <h6 class="my-0">NO ACTS</h6>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center py-5" v-else>
                <h6>Please select a contract to view its {{ current_tab }}</h6>
              </div>
            </div>
            <div class="tab-pane active" id="contract_docs" role="tabpanel">
              <div v-if="current_contract" class="table-responsive">
                <table class="table table-nowrap">
                  <thead class="text-center">
                  <tr>
                    <th scope="col" class="text-start">Name</th>
                    <th scope="col" class="text-start">File</th>
                    <th scope="col">Type</th>
                    <th scope="col">Size</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody class="text-center" v-if="!is_loading_documents">
                  <tr v-for="document in documents_by_contract" :key="document.id">
                    <th scope="row" class="text-start">
                      <a class="fw-semibold">{{ document.name }}</a>
                    </th>
                    <td class="text-start">{{ getDocumentFileName(document.file) }}</td>
                    <td>{{ getDocumentFileType(document.file) }}</td>
                    <td>{{ getDocumentFileSize(document.file_size) }}</td>
                    <td>
                      <i @click="downloadDocument(document.file)"
                         class="bx bxs-download fs-15 c_icon c_icon_hoverable"></i>
                      <i data-bs-toggle="modal"
                         data-bs-target="#doc_edit_modal"
                         @click="edit.doc = document"
                         class="bx bxs-edit-alt mx-2 fs-15 c_icon c_icon_hoverable"></i>
                      <i data-bs-toggle="modal"
                         data-bs-target="#doc_delete_modal"
                         @click="edit.doc = document"
                         class="bx bxs-trash-alt fs-15 c_icon c_icon_hoverable"></i>
                    </td>
                  </tr>
                  </tbody>

                  <tbody class="text-center" v-if="is_loading_documents && documents_by_contract.length === 0">
                  <tr>
                    <td colspan="5" class="py-5">
                      <b-spinner variant="secondary"></b-spinner>
                      <h6 class="mt-2 mb-0">Loading..</h6>
                    </td>
                  </tr>
                  </tbody>
                  <tbody class="text-center" v-if="!is_loading_documents && documents_by_contract.length === 0">
                  <tr>
                    <td colspan="5" class="bg-light py-5">
                      <h6 class="my-0">NO DOCUMENTS</h6>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center py-5" v-else>
                <h6>Please select a contract to view its documents</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <b-modal v-model="modals.document_edit" hide-footer title="Edit Document" modal-class="zoomIn"
           class="v-modal-custom">
    <form action="" @submit.prevent="updateDocument">
      <div class="mb-3">
        <label for="employeeName" class="form-label">Document Name</label>
        <input type="text" class="form-control" id="employeeName" placeholder="Enter emploree name">
      </div>
      <div class="mb-3">
        <label for="VertimeassageInput" class="form-label">Comment</label>
        <textarea class="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your message"></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-success">Save document</button>
      </div>
    </form>
  </b-modal>

  <ActDeleteModal :act="edit.act" @update="onActUpdate"/>
  <ActCreateModal :contract_id="current_contract" @update="onActUpdate"/>


  <DocumentEditModal :doc="edit.doc" @update="onDocUpdate"/>
  <DocumentDeleteModal :doc="edit.doc" @update="onDocUpdate"/>

  <ContractEditModal :company_id="company_id"
                     :contract="contracts.filter(c => c.id === current_contract)"/>

  <ContractCreateModal :company_id="company_id" @create="onContractCreated"/>
  <ContractDeleteModal
      :contract="contracts.filter(c => c.id === current_contract)" @delete="onContractDeleted"/>
</template>

<script>
import {getDocumentsByContractId, getActsByContractId} from "@/api/customer/CustomerApi.js"
import moment from "moment";

import ActEditModal from "@/views/pages/users/customer/modals/act_edit.vue"
import ActDeleteModal from "@/views/pages/users/customer/modals/act_delete.vue"
import ActCreateModal from "@/views/pages/users/customer/modals/act_create.vue"

import DocumentCreateModal from "@/views/pages/users/customer/modals/document_create.vue"
import DocumentEditModal from "@/views/pages/users/customer/modals/document_edit.vue"
import DocumentDeleteModal from "@/views/pages/users/customer/modals/document_delete.vue"

import ContractEditModal from "@/views/pages/users/customer/modals/contract_edit.vue"
import ContractDeleteModal from "@/views/pages/users/customer/modals/contract_delete.vue"
import ContractCreateModal from "@/views/pages/users/customer/modals/contract_create.vue"

export default {
  emits: ['onContractDeleted', 'onContractCreated'],
  name: "contracts",
  props: {
    contracts: {
      type: Array,
      default: () => []
    },
    is_loading: {
      type: Boolean,
      default: false
    },
    company_id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      documents_by_contract: [],
      acts_by_contract: [],

      current_contract: null,
      current_tab: 'documents',

      is_loading_documents: false,
      is_loading_acts: false,

      modals: {
        contract_edit: false,
        document_edit: false,
        act_edit: false
      },

      edit: {
        contract: null,
        doc: null,
        act: null,
      }
    }
  },
  components: {
    ActEditModal,
    ActDeleteModal,
    ActCreateModal,

    DocumentCreateModal,
    DocumentEditModal,
    DocumentDeleteModal,

    ContractEditModal,
    ContractDeleteModal,
    ContractCreateModal
  },
  methods: {
    async getDocumentsByContract(contractId) {
      this.is_loading_documents = true
      this.documents_by_contract = []
      this.documents_by_contract = await getDocumentsByContractId(contractId)
      this.is_loading_documents = false
    },
    async getActsByContract(contractId) {
      this.is_loading_acts = true
      this.acts_by_contract = []
      this.acts_by_contract = await getActsByContractId(contractId)
      this.is_loading_acts = false
    },
    formatDate(date) {
      return moment(date).format('ll')
    },
    getDocumentFileName(file) {
      return file.split('/').pop()
    },
    getDocumentFileType(file) {
      return file.split('.').pop().toUpperCase()
    },
    getDocumentFileSize(size) {
      return ((size / 1024) / 1024).toFixed(2) + ' MB'
    },
    downloadDocument(file_path) {
      let url = process.env.VUE_APP_ORDER_URL + file_path
      fetch(url)
          .then(resp => resp.blob())
          .then(blobobject => {
            const blob = window.URL.createObjectURL(blobobject);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blob;
            anchor.download = url.toString().split('/')[url.toString().split('/').length - 1];
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(blob);
          })
          .catch(() => alert('An error in downloading the file sorry'));
    },
    onContractDeleted() {
      this.current_contract = null
      this.$emit('onContractDeleted')
    },
    onContractCreated() {
      this.$emit('onContractCreated')
    },
    async onActUpdate() {
      await this.getActsByContract(this.current_contract)
    },
    async onDocUpdate() {
      await this.getDocumentsByContract(this.current_contract)
    }
  },
  watch: {
    current_contract(newVal) {
      if (newVal === null) return
      this.getDocumentsByContract(newVal)
      this.getActsByContract(newVal)
    },
  }
}
</script>

<style scoped>

</style>