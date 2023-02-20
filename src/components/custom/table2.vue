<script>

// import Multiselect from "@vueform/multiselect";
// import "@vueform/multiselect/themes/default.css";

import flatPickr from "vue-flatpickr-component";
import skeleton from "@/components/custom/skeleton.vue";
import spxnqpau from "@/components/widgets/spxnqpau.json";
import Lottie from "../widgets/lottie.vue";
// import pagination from "./pagination.vue";
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

      headersControllerModal: false,
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
    skeleton,
    lottie: Lottie,
    // pagination
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
    getManagersFilter() {
      return store.state.users_list.filter(user => user.role === 'staff').map(i => {
        return {
          value: i.id,
          label: i.full_name
        }
      })
    },
    getClientsFilter() {
      return store.state.users_list.filter(user => user.role === 'client').map(i => {
        return {
          value: i.id,
          label: i.full_name
        }
      })
    },
    getHeaders() {
      return this.headers
          .filter(header => header.visible === undefined || header.visible === true)
          .map(i => {
            return {
              ...i,
              searchText: '',
            }
          })
    },


    p: {
      get() {
        return {
          current: this.paginate.current,
          count: this.paginate.count,
          perPage: this.pagination.perPage,
          ratio: Math.ceil(this.paginate.count / this.pagination.perPage)
        }
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
    async getData() {
      let fetchUrl = ''

      this.isFetchingData = true

      fetchUrl = store.state.user.role === 'admin'
          ? `${this.url}?offset=${this.p.perPage * (this.p.current - 1)}&limit=${this.p.perPage}`
          : `${this.url}?offset=${this.p.perPage * (this.p.current - 1)}&limit=${this.p.perPage}&manager=${store.state.user.id}`

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

    async searchChange() {
      let currentSearchedFields = this.getHeaders.filter(header => header.searchText !== '').map(header => {
        return {
          field: header.field,
          searchText: header.searchText
        }
      })
      if (currentSearchedFields.length > 0) {
        let url = ''
        currentSearchedFields.forEach((item, index) => {
          index === 0
              ? url += `?${item.field}=${item.searchText}`
              : url += `&${item.field}=${item.searchText}`
        })
        this.paginate = {
          current: 1,
          count: this.p.count
        }
        url += store.state.user.role === 'admin'
            ? `&offset=${this.p.perPage * (this.p.current - 1)}&limit=${this.p.perPage}`
            : `&offset=${this.p.perPage * (this.p.current - 1)}&limit=${this.p.perPage}&manager=${store.state.user.id}`

        this.isFetchingData = true
        let request = await fetch(`${this.url}` + url)
        let data = await request.json()
        this.apiData = data['results']
        this.paginate.count = data['count']
        this.isFetchingData = false
      } else {
        this.paginate = {
          current: 1,
          count: this.p.count
        }
        await this.getData()
      }
    }

  },
  async mounted() {
    try {
      this.paginate.current = this.$route.query.page === undefined ? 1 : Math.ceil(this.$route.query.page)
    } catch {
      this.paginate.current = 1
    }
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
    },
    "$route.query": function () {
      this.paginate.current = Math.ceil(this.$route.query.page)
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
            <h5 class="card-title mb-0 flex-grow-1">{{ name }}</h5>
            <div class="search-box me-3">
              <input
                  type="text"
                  class="form-control search"
                  placeholder="Search for order ID, customer, order status or something..."
                  v-model="search"
              />
              <i class="ri-search-line search-icon"></i>
            </div>
            <div class="flex-shrink-0">
              <b-button variant="outline-primary" @click="headersControllerModal = !headersControllerModal"
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
                <tr>
                  <th scope="col" style="width: 50px;" v-if="selectable" class="bg-white">

                  </th>

                  <th v-for="th in getHeaders" :key="th" class="text-uppercase bg-white"
                      :class="th.align === undefined ? '' : 'text-' + th.align"
                  >
                    <div v-if="th.field === 'date'">
                      <flat-pickr
                          placeholder="Select date"
                          v-model="date"
                          class="form-control form-control-sm flatpickr-input"
                          id="demo-datepicker"
                          :config="config"
                      ></flat-pickr>
                    </div>
                    <input v-else v-model="th.searchText" @input="searchChange()"
                           class="form-control form-select-sm w-75 m-auto">
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
          <div v-if="p.ratio <= 6" class="d-flex justify-content-end py-0 w-100">

            <ul class="pagination pagination-sm pagination-separated my-0">
              <li class="page-item"
                  :class="{ 'disabled' : p.ratio === 1 || p.current === 1 }">
                <router-link class="page-link" :to="'?page=' + (p.current - 1)">
                  Prev
                </router-link>
              </li>

              <li v-for="page in p.ratio" :key="page"
                  class="page-item" :class="{ 'active' : page === p.current }"
              >
                <router-link class="page-link" :to="'?page=' + page">
                  {{ page }}
                </router-link>
              </li>

              <li class="page-item"
                  :class="{ 'disabled' : p.ratio === 1 || p.current === p.ratio }">
                <router-link class="page-link" :to="'?page=' + (p.current + 1)">
                  Next
                </router-link>
              </li>
            </ul>

          </div>

          <div v-else-if="p.ratio >= 7 " class="d-flex justify-content-end py-0 w-100">

            <ul class="pagination pagination-sm pagination-separated my-0">
              <li class="page-item"
                  :class="{ 'disabled' : p.ratio === 1 || p.current === 1 }">
                <router-link class="page-link" :to="'?page=' + (p.current - 1)">
                  Prev
                </router-link>
              </li>

              <li v-for="page in p.ratio" :key="page"
                  class="page-item" :class="{ 'active' : page === p.current }"
              >
                <router-link class="page-link" :to="'?page=' + page" v-if="p.current-2<=page && p.current+2>=page">
                  {{ page }}
                </router-link>
              </li>

              <li class="page-item"
                  :class="{ 'disabled' : p.ratio === 1 || p.current === p.ratio }">
                <router-link class="page-link" :to="'?page=' + (p.current + 1)">
                  Next
                </router-link>
              </li>
            </ul>

          </div>

        </div>
      </div>
    </div>
    <!--end col-->
  </div>

  <b-modal v-model="headersControllerModal" hide-footer title="Control Table" modal-class="zoomIn"
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

</template>
