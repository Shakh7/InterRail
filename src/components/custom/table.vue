<script>
// import Lottie from "@/components/widgets/lottie.vue";
// import animationData1 from "@/components/widgets/gsqxdxog.json";
import Multiselect from "@vueform/multiselect";
import flatPickr from "vue-flatpickr-component";
import "@vueform/multiselect/themes/default.css";
import skeleton from "@/components/custom/skeleton.vue";
import spxnqpau from "@/components/widgets/spxnqpau.json";
import Lottie from "../widgets/lottie.vue";
import pagination from "./pagination.vue";
import store from "../../state/store.js";

export default {
  name: 'CustomTable',
  data() {
    return {
      date: null,

      config: {
        mode: "range",
      },

      multiselect: {
        value: null,
        multiple: true,
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

      widgetsList: {
        isLoading: true,
        list: []
      }
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
    widgets: {
      type: Object,
      required: false,
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
    }
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
    async getWidgetsData() {
      this.widgetsList.isLoading = true
      let request = await fetch(this.widgets.url)
      let response = await request.json()
      this.widgetsList.list = request.ok ? response : []
      this.widgetsList.isLoading = false
    }
  },
  async mounted() {
    await this.getData()
    await this.getWidgetsData()
  },
  watch: {
    search(value) {
      if (value.trim().length >= 2) {
        this.getData(this.search.trim())
      } else {
        this.getData()
      }
    }
  }
}
</script>

<template>


  <div class="row" v-if="widgetsList.isLoading === false">
    <div v-for="widget in widgetsList.list" :key="widget" class="col-lg-3">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div class="d-flex flex-row">
              <div class="me-3">
                <i class="ri-pulse-line display-6 text-muted"></i>
              </div>
              <div class="pt-1">
                <h5 class="fs-15 fw-semibold text-capitalize">Containers</h5>
                <p class="text-muted">Filled</p>
              </div>
            </div>

            <div class="text-end pt-2">
              <h5 class="fs-15 fw-semibold text-capitalize text-primary">
                {{ widget.quantity }}
              </h5>
              <p class="text-muted">{{ widget.filled_quantity }}</p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 6px">
          <div class="progress-bar rounded-0 bg-success" role="progressbar"
               :style="'width: ' + (widget.filled_quantity / widget.quantity) * 100 + '%'"
               :aria-valuenow="widget.filled_quantity"
               aria-valuemin="0" :aria-valuemax="widget.quantity">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row" v-else>
    <div class="col-lg-3" v-for="i in 4" :key="i">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-row">
              <div class="me-3">
                <i class="ri-pulse-line display-6 text-muted"></i>
              </div>
              <div class="pt-1">
                <h5 class="fs-15 fw-semibold text-capitalize">
                  <skeleton/>
                </h5>
                <p class="text-muted">Shipment status</p>
              </div>
            </div>

            <div class="text-end">
              <h5 class="fs-15 fw-semibold text-capitalize text-primary">
                0
              </h5>
              <p class="text-muted">0%</p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 6px">
          <div class="progress-bar rounded-0 bg-soft-primary" role="progressbar" style="width: 100%" aria-valuenow="100"
               aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="orderList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">{{ name }}</h5>
            <div class="flex-shrink-0">
              <slot name="top-right">
                <button class="btn btn-soft-danger me-1">
                  <i class="ri-delete-bin-2-line"></i>
                </button>
                <button type="button" class="btn btn-info ms-1">
                  <i class="ri-file-download-line align-bottom me-1"></i> Import
                </button>
              </slot>
            </div>
          </div>
        </div>
        <div
            v-if="searchable === true"
            class="card-body border border-dashed border-end-0 border-start-0 mb-0 px-3"
        >
          <form class="mb-0">
            <div class="row g-3">
              <div class="col-xxl-6 col-sm-12">
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
              <div class="col-xxl-3 col-sm-6">
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
              <div class="col-xxl-3 col-sm-6">
                <div>
                  <Multiselect
                      class="form-control"
                      v-model="multiselect.value"
                      :close-on-select="true"
                      :searchable="true"
                      :create-option="true"
                      :options="getFilterableFields"
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
                  <th v-for="th in headers" :key="th" class="text-uppercase"
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
                  <td v-for="td in headers" :key="td"
                      :class="td.align === undefined ? '' : 'text-' + td.align">
                    <slot :name="td.field" :row="r" :key="td.field">
                      {{ r.order[td.field] }}
                    </slot>
                  </td>
                </tr>
                </tbody>

                <!-- IF LOADING -->
                <tbody v-else-if="apiData.length === 0 && isFetchingData">
                <tr v-for="i in 5" :key="i">
                  <th scope="col" style="width: 50px;" v-if="selectable === true">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox">
                    </div>
                  </th>
                  <td v-for="td in headers" :key="td">
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

</template>

