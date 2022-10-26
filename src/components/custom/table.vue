<script>
// import Lottie from "@/components/widgets/lottie.vue";
// import animationData1 from "@/components/widgets/gsqxdxog.json";
import Multiselect from "@vueform/multiselect";
import flatPickr from "vue-flatpickr-component";
import "@vueform/multiselect/themes/default.css";

export default {
  name: 'CustomTable',
  data() {
    return {
      date: null,

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
      search: {
        query: ''
      },

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
    filterableFields: []
  },
  components: {
    flatPickr,
    Multiselect
  },
  computed: {
    searchedTable() {
      let searchableFields = this.headers.filter(header => header.searchable === true).map(header => header.field)
      let searchResults = []

      if (this.search.query === '') {
        searchResults = this.rows
      } else {
        Array.from(this.rows).forEach(item => {
          for (const [key, value] of Object.entries(item)) {
            if (searchableFields.includes(key)) {
              if (value.toString().trim().toLowerCase().includes(this.search.query.toString().trim().toLowerCase())) {
                searchResults.includes(item) === false ? searchResults.push(item) : 0
              }
            }
          }
        })
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
        if (this.table.checkbox.all === true) {
          let tds = document.querySelectorAll(`#${this.id} tbody tr th input[type="checkbox"]`)
          tds.forEach(td => {
            td.checked = false
          })
          this.table.selected = []
        } else {
          let tds = document.querySelectorAll(`#${this.id} tbody tr th input[type="checkbox"]`)
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
      if (item.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
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
              <div class="col-xxl-5 col-sm-12">
                <div class="search-box">
                  <input
                      type="text"
                      class="form-control search"
                      placeholder="Search for order ID, customer, order status or something..."
                      v-model="search.query"
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
                  ></flat-pickr>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-2 col-sm-4">
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
              <!--end col-->
              <div class="col-xxl-2 col-sm-4">
                <div>
                  <button type="button" class="btn btn-primary w-100">
                    <i class="ri-equalizer-fill me-1 align-bottom"></i>
                    Filters
                  </button>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
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
          <div class="d-flex justify-content-end mt-3">
            <div class="pagination-wrap hstack gap-2">
              <a class="page-item pagination-prev disabled" href="#">
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li class="active">
                  <a class="page" href="#">1</a>
                </li>
              </ul>
              <a class="page-item pagination-next" href="#">
                Next
              </a>
            </div>
          </div>
          <!--end modal -->
        </div>
      </div>
    </div>
    <!--end col-->
  </div>

</template>

