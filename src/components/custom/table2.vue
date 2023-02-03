<script>
// import Lottie from "@/components/widgets/lottie.vue";
// import animationData1 from "@/components/widgets/gsqxdxog.json";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import skeleton from "@/components/custom/skeleton.vue";
import spxnqpau from "@/components/widgets/spxnqpau.json";
import Lottie from "../widgets/lottie.vue";
import pagination from "./pagination.vue";
import store from "../../state/store.js";

export default {
  name: 'CustomTable2',
  data() {
    return {
      date: null,

      config: {
        mode: "range",
      },

      multiselect: {
        value: null,
        multiple: true,
        managers: {
          value: null,
          options: [],
        },
        clients: {
          value: null,
          options: [],
        },
      },
      table: {
        selected: [],
        checkbox: {
          all: false
        }
      },
      search: '',
      apiData: [],
      defaultOptions: {animationData: spxnqpau},

      paginate: {
        current: 1,
        count: 0
      },
      isFetchingData: false,

      headersControllerModal: false
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
    rows: {
      type: Array,
      default: () => []
    },
    searchable: {
      type: Boolean,
      default: () => false
    },
    selectable: {
      type: Boolean,
      default: () => false
    },
    filterableFields: [],
    isLoading: {
      type: Boolean,
      default: () => false
    },
    pagination: {
      type: Object,
      default: () => {
      }
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
    Multiselect,
    skeleton,
    lottie: Lottie,
    pagination
  },
  computed: {
    getFilterableFields() {
      let fields = []
      let filterable = this.headers.filter(header => header.filterable === true).map(header => header.field.toString().trim().toUpperCase())

      Array.from(this.rows).forEach(item => {
        for (const [key, value] of Object.entries(item)) {
          if (filterable.includes(key.toString().trim().toUpperCase())) {
            if (!fields.includes(value)) {
              fields.push({
                value: value,
                label: value
              })
            }
          }
        }
      })
      return fields
    },

    getManagersFilter: {
      get() {
        let managers = []
        this.apiData.forEach(item => {
          if (!managers.map(manager => manager.value).includes(item.manager)) {
            managers.push({
              value: item.manager,
              label: this.getAccountName(item.manager)
            })
          }
        })
        return managers
      }
    },
    getClientsFilter: {
      get() {
        let customers = []
        this.apiData.forEach(item => {
          if (!customers.map(client => client.value).includes(item.customer)) {
            customers.push({
              value: item.customer,
              label: this.getAccountName(item.customer)
            })
          }
        })
        return customers
      }
    },
    getHeaders: {
      get() {
        return this.headers.filter(header => header.visible)
      }
    }
  },
  methods: {
    pushSelected(action, id) {
      if (action === 'all') {
        let tds = document.querySelectorAll(`#${this.id} tbody tr th input[type="checkbox"]`)
        if (this.table.checkbox.all === true) {
          tds.forEach(td => {
            td.checked = false
          })
          this.table.selected = []
        } else {
          tds.forEach(td => {
            td.checked = true
          })
          this.table.selected = this.searchedTable
        }
      } else {
        if (this.table.checkbox.all === true) {
          this.table.checkbox.all = false
          this.table.selected = this.table.selected.filter(item => item.id !== id)
        } else {
          let item = this.searchedTable.filter(item => item.id === id)
          let includes = this.table.selected.includes(item[0])
          if (includes === false) {
            this.table.selected.push(item[0])
            if (this.table.selected.length === this.searchedTable.length) {
              this.table.checkbox.all = true
            }
          } else {
            this.table.selected = this.table.selected.filter(item => item.id !== id)
          }
        }
      }
    },
    rowIsSelected(id) {
      let item = this.table.selected.filter(item => item.id === id)
      return item.length > 0
    },
    async getData(search) {
      let fetchUrl = ''

      this.isFetchingData = true

      if (search) {
        fetchUrl = store.state.user.role === 'admin'
            ? `${this.url}?search=${search}&limit=${this.pagination.perPage}`
            : `${this.url}?search=${search}&limit=${this.pagination.perPage}&manager=${store.state.user.id}`
      } else {
        fetchUrl = store.state.user.role === 'admin'
            ? `${this.url}?offset=${this.pagination.perPage * (this.paginate.current - 1)}&limit=${this.pagination.perPage}`
            : `${this.url}?offset=${this.pagination.perPage * (this.paginate.current - 1)}&limit=${this.pagination.perPage}&manager=${store.state.user.id}`
      }

      let result = await fetch(fetchUrl)

      let data = await result.json()
      this.apiData = data['results']
      this.paginate.count = data['count']

      this.isFetchingData = false
    },
    async pageChange(page) {
      this.paginate.current = Math.ceil(page)
      await this.getData()
    },
    getAccountName(id) {
      let account = store.state.users_list.filter(item => item.id === id)
      return account.length > 0 ? account[0].full_name : 'Unknown'
    },

    handleHeaderVisibility(header) {
      header.hide ? header.hide = false : header.hide = true
    }
  },
  async mounted() {
    await this.getData()
  },
  watch: {
    search(value) {
      if (value.trim().length >= 1) {
        this.getData(this.search.trim())
      } else {
        this.getData()
      }
    },
    getUpdate() {
      this.getData()
    }
  }
}
</script>

<template>

  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="orderList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">{{ name }}</h5>
            <div class="flex-shrink-0">
              <b-button variant="outline-primary" @click="headersControllerModal = !headersControllerModal"
                        class="btn-icon waves-effect me-3">
                <i class="ri-menu-2-line"></i>
              </b-button>
              <slot name="top-right"></slot>
            </div>
          </div>
        </div>
        <div
            v-if="searchable === true"
            class="card-body border border-dashed border-end-0 border-start-0 mb-0 px-3"
        >
          <form class="mb-0">
            <div class="row g-3">
              <div class="col-xxl-3 col-sm-12">
                <div class="search-box">
                  <input
                      type="text"
                      class="form-control search"
                      placeholder="Search for order ID, customer, order status or something..."
                      v-model="search"
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <div>
                  <flat-pickr
                      placeholder="Select date"
                      v-model="date"
                      class="form-control flatpickr-input"
                      id="demo-datepicker"
                      :config="config"
                  ></flat-pickr>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <div>
                  <Multiselect
                      class="form-control"
                      v-model="multiselect.clients.value"
                      :close-on-select="true"
                      :searchable="true"
                      placeholder="Customers"
                      :options="getClientsFilter"
                  />
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <div>
                  <Multiselect
                      class="form-control"
                      v-model="multiselect.managers.value"
                      :close-on-select="true"
                      :searchable="true"
                      placeholder="Managers"
                      :options="getManagersFilter"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-body pt-0 mt-0">
          <div class="pt-3">
            <div class="table-responsive table-card border-bottom-0">
              <table class="table align-middle table-nowrap" :id="id">
                <thead class="text-muted table-light">
                <tr>
                  <th scope="col" style="width: 50px;" v-if="selectable === true">
                    <div class="form-check">
                      <input class="form-check-input" @click="pushSelected('all')"
                             type="checkbox" v-model="table.checkbox.all">
                    </div>
                  </th>
                  <th v-for="th in getHeaders" :key="th" class="text-uppercase"
                      :class="th.align === undefined ? '' : 'text-' + th.align"
                  >
                    {{ th.label }}
                  </th>
                </tr>
                </thead>
                <!-- IF DATA EXISTS -->
                <tbody v-if="apiData.length > 0" class="list form-check-all">
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
                <tbody v-else-if="(rows.length === 0 && isLoading) || isFetchingData">
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
                <tbody v-else-if="rows.length === 0 && !isLoading">
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
        <div class="card-footer pt-0 border-top-0" v-if="apiData.length > 0 & search.trim().length === 0">
          <div class="d-flex justify-content-end py-0 w-100">
            <pagination
                :page_count="paginate.count"
                :per_page="pagination.perPage"
                prev_text="Prev"
                next_text="Next"
                @page_change="pageChange"
                @current_page="pageChange"
            />
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>


  <b-modal v-model="headersControllerModal" hide-footer title="Control Table" modal-class="zoomIn"
           class="v-modal-custom" dialog-class="modal-dialog-right">
    <!-- Outlined Styles -->
    <div class="hstack gap-2 flex-wrap">
      <div class="row">
        <div class="col-3 py-2" v-for="i in headers.filter(h => h.label !== 'actions')" :key="i">

          <!-- Switches Color -->
          <div class="form-check form-switch">
            <input v-if="i.visible" @click="i.visible = false" class="form-check-input" type="checkbox" role="switch"
                   :id="i.label + 'Check'" checked>
            <input v-else @click="i.visible = true" class="form-check-input" type="checkbox" role="switch"
                   :id="i.label + 'Check'">
            <label class="form-check-label" :for="i.label + 'Check'">{{
                i.label
              }}</label>
          </div>

          <!--          <b-button v-if="i.visible" @click="i.visible = false" variant="info" class=" waves-effect waves-light w-100">-->
          <!--            {{-->
          <!--              i.label-->
          <!--            }}-->
          <!--          </b-button>-->
          <!--          <b-button v-else @click="i.visible = true" variant="outline-info" class=" waves-effect waves-light w-100">-->
          <!--            {{-->
          <!--              i.label-->
          <!--            }}-->
          <!--          </b-button>-->
        </div>
      </div>
    </div>

    <div class="border-top-2 text-end w-100">
      <b-button variant="outline-danger" size="md" class="me-2" disabled>Reset</b-button>
      <b-button variant="success" size="md" disabled>Save for future</b-button>
    </div>
  </b-modal>


</template>

