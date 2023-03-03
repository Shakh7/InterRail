<script>
import flatPickr from "vue-flatpickr-component";
import skeleton from "@/components/custom/skeleton.vue";
import spxnqpau from "@/components/widgets/spxnqpau.json";
import Lottie from "../widgets/lottie.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: 'CustomTable2',
  data() {
    return {
      date: null,
      searchTimeout: 1000,

      config: {
        mode: "range",
      },

      modals: {
        headersController: false,
        getExcel: false,
      },

      table: {
        data: [],
        selected: [],
        per_page_options: [10, 20, 50, 100],
        per_page: null,
        current_page: 1,
        data_count: 0,
      },

      apiData: [],
      defaultOptions: {animationData: spxnqpau},
      isFetchingData: false,
    }
  },

  props: {
    name: {
      type: String,
      default: () => 'Table'
    },
    id: {
      type: String,
      default: () => 'table'
    },
    headers: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: () => ''
    },
    excel_url: {
      type: String,
      default: () => ''
    },
    searchable: {
      type: Boolean,
      default: () => false
    },
    selectable: {
      type: Boolean,
      default: () => false
    },
    perPage: {
      type: Number,
      default: () => 10
    },
    getUpdate: {
      type: Boolean,
      default: () => false
    },
    onRowClick: {
      type: Function,
      default: () => {
      }
    },
  },
  components: {
    flatPickr,
    skeleton,
    lottie: Lottie,
  },

  computed: {
    getHeaders() {
      return this.headers.filter(header => (header.visible === undefined || header.visible === true)).map(i => {
            return {
              ...i,
              searchText: '',
            }
          })
    },
    pagination: {
      get() {
        return {
          current_page: this.table.current_page,
          count: this.table.data_count,
          per_page: this.table.per_page,
          ratio: Math.ceil(this.table.data_count / this.table.per_page)
        }
      }
    }
  },

  methods: {
    async getData() {
      let axios_params = new Object({})

      let currentSearchedFields = this.getHeaders.filter(header => header.searchText !== '').map(header => {
        return {
          field: header.field,
          searchText: header.searchText
        }
      })

      if (currentSearchedFields.length > 0) {
        currentSearchedFields.forEach((item) => {
          axios_params[item.field] = item.searchText
        })
      }

      axios_params['offset'] = this.pagination.per_page * (this.pagination.current_page - 1)
      axios_params['limit'] = this.pagination.per_page

      this.isFetchingData = true
      await axios.get(this.url, {params: axios_params})
          .then(response => {
            let data = response.data
            this.apiData = data['results']
            this.table.data_count = data['count']
            this.isFetchingData = false
          })
          .catch(() => {
            this.isFetchingData = false
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 30000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'error',
              title: 'Something went wrong!'
            })
          });

    },
    async searchChange(query) {
      if (query.toString().length === 0) {
        await this.getData();
      } else if (query.toString().length >= 1) {
        this.table.current_page = 1
        setTimeout(async () => {
          await this.getData();
        }, 250);
      }
    },

    async getExcel() {
      let searchableFields = this.getHeaders.filter(o => o.searchText !== '')
      let fileLink = document.createElement("a");
      let url = this.excel_url
      searchableFields.forEach((field, i) => {
        url += i === 0
            ? `?${field.field}=${field.searchText}`
            : `&${field.field}=${field.searchText}`
      })
      fileLink.href = url;
      fileLink.setAttribute("download", "import-excel-template");
      document.body.appendChild(fileLink);
      fileLink.click();
    },

    changeTablePerPage(page) {
      this.table.per_page = page
      this.getData()
    },
    goNextPage() {
      this.table.current_page = this.table.current_page + 1
      this.getData()
    },
    goPrevPage() {
      this.table.current_page = this.table.current_page - 1
      this.getData()
    },
    goPage(page) {
      this.table.current_page = page
      this.getData()
    },
  },
  async mounted() {
    try {
      this.table.current_page = this.$route.query.page === undefined ? 1 : Math.ceil(this.$route.query.page)
      this.table.per_page = this.perPage
    } catch {
      this.table.current_page = 1
      this.table.per_page = 10
    }
    await this.getData()
  },
  watch: {
    getUpdate() {
      this.getData()
    },
    "$route.query": function () {
      this.table.current_page = Math.ceil(this.$route.query.page)
      this.getData()
    },
  }
}
</script>

<template>

  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="orderList">

        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 d-flex flex-column">
              <h5 class="card-title mb-1">{{ name }}</h5>
              <span>Showing <span class="link-success fw-semibold">{{
                  pagination.per_page * (pagination.current_page - 1) === 0 ? 1 : pagination.per_page * (pagination.current_page - 1) + 1
                }}</span>
              to <span class="link-success fw-semibold">{{ pagination.per_page * pagination.current_page }}</span>
              of <span class="link-success fw-semibold">{{ pagination.count }}</span> entries</span>
            </div>

            <div class="flex-shrink-0">
              <b-button v-if="excel_url !== ''" variant="outline-primary" @click="modals.getExcel = !modals.getExcel"
                        class="btn-icon waves-effect me-3">
                <font-awesome-icon icon="fa-solid fa-file-excel" class="fs-5"/>
              </b-button>
              <b-button variant="outline-primary" @click="modals.headersController = !modals.headersController"
                        class="btn-icon waves-effect me-3">
                <i class="ri-menu-2-line"></i>
              </b-button>
              <slot name="top-right"></slot>
            </div>

          </div>
        </div>

        <div class="card-body pt-0 mt-0">
          <div class="pt-3">
            <div class="table-responsive table-card border-bottom-0">
              <table class="table align-middle table-nowrap" :id="id">
                <thead class="text-muted table-light">
                <tr>

                  <th scope="col" style="width: 50px;" v-if="selectable">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox">
                    </div>
                  </th>

                  <th v-for="th in getHeaders" :key="th" class="text-uppercase"
                      :class="th.align === undefined ? '' : 'text-' + th.align"
                  >
                    {{ th.label }}
                  </th>

                </tr>

                <tr>
                  <th scope="col" style="width: 80px;" v-if="selectable" class="bg-white">
                    <!--                    <select class="form-select form-select-sm" v-model="table.per_page" @change="getData()">-->
                    <!--                      <option v-for="page in table.per_page_options" :key="page" :value="page">{{ page }}</option>-->
                    <!--                    </select>-->
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown"
                              aria-expanded="false"> {{ table.per_page }}
                      </button>
                      <div class="dropdown-menu dropdownmenu-info">
                        <a class="dropdown-item" v-for="page in table.per_page_options" :key="page"
                           :class="{'text-info bg-soft-info fw-bold': page === table.per_page}"
                           @click="changeTablePerPage(page)">
                          {{ page }}
                        </a>
                      </div>
                    </div>
                  </th>

                  <th v-for="th in getHeaders.filter(i => i.field !== 'actions')" :key="th"
                      class="text-uppercase bg-white"
                      :class="th.align === undefined ? '' : 'text-' + th.align"
                  >
                    <div v-if="th.searchType === 'date'">
                      <flat-pickr
                          placeholder="Select date"
                          v-model="date"
                          class="form-control form-control-sm flatpickr-input"
                          id="demo-datepicker"
                          :config="config"
                          @change="searchChange"
                      ></flat-pickr>
                    </div>
                    <select class="form-select form-select-sm" v-model="th.searchText" @change="searchChange(th.searchText)"
                            v-else-if="th.searchType === 'select'">
                      <option v-for="option in th.searchOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <input v-else v-model="th.searchText" @input="searchChange(th.searchText)"
                           class="form-control form-select-sm w-75 m-auto" type="text">
                  </th>
                </tr>
                </thead>
                <!-- IF DATA EXISTS -->
                <tbody v-if="apiData.length > 0 && !isFetchingData" class="list form-check-all">
                <tr v-for="r in apiData" :key="r">
                  <th scope="col" style="width: 50px;" v-if="selectable === true">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox">
                    </div>
                  </th>
                  <td v-for="td in getHeaders" :key="td"
                      :class="td.align === undefined ? '' : 'text-' + td.align">
                    <slot :name="td.field" :row="r" :key="td.field">
                      {{ r[td.field] }}
                    </slot>
                  </td>
                </tr>
                </tbody>

                <!-- IF LOADING -->
                <tbody v-else-if="apiData && isFetchingData">
                <tr v-for="i in 5" :key="i">
                  <th scope="col" style="width: 50px;" v-if="selectable === true">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox">
                    </div>
                  </th>
                  <td v-for="td in getHeaders" :key="td">
                    <skeleton/>
                  </td>
                </tr>
                </tbody>

                <!-- IF LOADED AND NO DATA -->
                <tbody v-else-if="apiData.length === 0 && !isFetchingData">
                <tr class="text-center border-white">
                  <td v-if="selectable === true" :colspan="headers.length">
                    <lottie
                        colors="primary:#405189,secondary:#08a88a"
                        :options="defaultOptions"
                        :height="80"
                        :width="80"
                    />
                    <h5>No data here!</h5>
                  </td>
                  <td v-else :colspan="headers.length + 1">
                    <lottie
                        colors="primary:#405189,secondary:#08a88a"
                        :options="defaultOptions"
                        :height="80"
                        :width="80"
                    />
                    <h5>No data here!</h5>
                  </td>
                </tr>
                </tbody>

              </table>
            </div>
          </div>
        </div>

        <div class="card-footer pt-0 border-top-0" v-if="apiData.length > 0 && !isFetchingData">
          <div v-if="pagination.ratio <= 6" class="d-flex justify-content-end py-0 w-100">

            <ul class="pagination pagination-sm pagination-separated my-0">
              <li class="page-item" @click="goPrevPage()"
                  :class="{ 'disabled' : pagination.ratio === 1 || pagination.current_page === 1 }">
                <a class="page-link cursor-pointer">
                  Prev
                </a>
              </li>

              <li v-for="page in pagination.ratio" :key="page"
                  class="page-item" :class="{ 'active' : page === pagination.current_page }"
                  @click="goPage(page)">
                <a class="page-link cursor-pointer">
                  {{ page }}
                </a>
              </li>

              <li class="page-item" @click="goNextPage()"
                  :class="{ 'disabled' : pagination.ratio === 1 || pagination.current_page === pagination.ratio }">
                <a class="page-link cursor-pointer">
                  Next
                </a>
              </li>
            </ul>

          </div>

          <div v-else-if="pagination.ratio >= 7 " class="d-flex justify-content-end py-0 w-100">

            <ul class="pagination pagination-sm pagination-separated my-0">
              <li class="page-item" @click="goPrevPage()"
                  :class="{ 'disabled' : pagination.ratio === 1 || pagination.current_page === 1 }">
                <a class="page-link cursor-pointer">
                  Prev
                </a>
              </li>

              <li v-for="page in pagination.ratio" :key="page" @click="goPage(page)"
                  class="page-item" :class="{ 'active' : page === pagination.current_page }"
              >
                <a class="page-link cursor-pointer"
                   v-if="pagination.current_page-2<=page && pagination.current_page+2>=page">
                  {{ page }}
                </a>
              </li>

              <li class="page-item" @click="goNextPage()"
                  :class="{ 'disabled' : pagination.ratio === 1 || pagination.current_page === pagination.ratio }">
                <a class="page-link cursor-pointer">
                  Next
                </a>
              </li>

            </ul>

          </div>

        </div>
      </div>
    </div>
    <!--end col-->
  </div>

  <b-modal v-model="modals.headersController" hide-footer title="Control Table" modal-class="zoomIn"
           class="v-modal-custom" dialog-class="modal-dialog-right">
    <div class="hstack gap-2 flex-wrap">
      <div class="row">
        <div class="col-3 py-2" v-for="i in headers.filter(h => h.label !== 'actions')" :key="i">
          <div class="form-check form-switch">
            <input
                class="form-check-input" role="switch"
                :id="i.label + 'Check'" type="checkbox"
                v-if="i.visible === true || i.visible === undefined"
                @click="i.visible = false" checked
            >
            <input
                class="form-check-input" role="switch"
                :id="i.label + 'Check'" type="checkbox"
                v-if="i.visible === false"
                @click="i.visible = true"
            >
            <label class="form-check-label" :for="i.label + 'Check'">
              {{ i.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
  <b-modal v-model="modals.getExcel" hide-footer title="Extract Excel" modal-class="zoomIn"
           class="v-modal-custom" dialog-class="modal-dialog-right">

    <b-alert v-if="getHeaders.filter(o => o.searchText !== '').length > 0"
             show dismissible variant="info" class="fade show" role="alert">
      <strong class="me-2">Note: </strong> Following search queries applies to your excel data!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </b-alert>


    <div v-for="i in getHeaders.filter(o => o.searchText !== '')" :key="i"
         class="border-bottom py-2 d-flex justify-content-between align-items-center mb-3">
      <span class="fw-medium">{{ i.label }}</span>
      <span class="d-flex justify-content-between align-items-center">
        {{ i.searchText }}
        <i class="ri-search-line my-0 py-0 ms-2 text-muted"></i>
      </span>
    </div>

    <b-button variant="primary" @click="getExcel" class="w-100">Get Excel</b-button>
  </b-modal>

</template>
