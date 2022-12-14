<script>
// import Lottie from "@/components/widgets/lottie.vue";
// import animationData1 from "@/components/widgets/gsqxdxog.json";
import Multiselect from "@vueform/multiselect";
import flatPickr from "vue-flatpickr-component";
import "@vueform/multiselect/themes/default.css";

export default {
  emits: ['page-change'],
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
      apiData: []
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
  },
  components: {
    flatPickr,
    Multiselect
  },
  computed: {
    searchedTable() {
      let searchableFields = this.headers.filter(header => header.searchable === true).map(header => header.field)
      let data = this.rows
      let searchResults = []

      if (this.search.length > 0) {
        Array.from(data).forEach(item => {
          for (let [key, value] of Object.entries(item)) {
            if (value !== null) {
              let expectedValue = value.toString().toLowerCase()
              let query = this.search.toString().trim().toLowerCase()
              if (searchableFields.includes(key)) {
                if (expectedValue.includes(query)) {
                  searchResults.includes(item) === false ? searchResults.push(item) : 0
                }
              }
            }
          }
        })
      } else {
        searchResults = data
      }

      if (this.date !== null) {
        let dates = this.date.split('to')
        searchResults = searchResults.filter(item => {
          let itemDate = new Date(item.date)
          if (dates.length === 1) {
            return dates[0].trim() === item.date
          } else {
            let startDate = new Date(dates[0].trim())
            let endDate = new Date(dates[1].trim())
            return itemDate >= startDate && itemDate <= endDate
          }
        })

        return searchResults
      }

      return searchResults;
    },
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
      let result = await fetch(this.url)
      let data = await result.json()
      this.apiData = data['results']
    }
  },
  watch: {
    "$route.query": function () {
      this.$emit('page-change', this.$route.query.page)
    },
  },
  async mounted() {
    await this.getData()
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
            <div class="table-responsive table-card">
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
                <tbody class="list form-check-all">
                <tr v-for="r in searchedTable" :key="r" :class="rowIsSelected(r.id) ? 'bg-soft-secondary' : ''">
                  <th scope="col" style="width: 50px;" v-if="selectable === true">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" @click="pushSelected('one', r.id)">
                    </div>
                  </th>
                  <td v-for="td in headers" :key="td"
                      :class="td.align === undefined ? '' : 'text-' + td.align">
                    <slot :name="td.field" :row="r" :key="td.field">{{ r[td.field] }}</slot>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>

</template>

