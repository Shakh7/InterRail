<template>
  <SeeCodesModal :application="current_application"/>
  <div class="row justify-content-between align-items-start">
    <div class="col-lg-2">
      <div class="card">
        <div class="card-body px-2">
          <!--          <ul class="px-0" style="list-style: none">-->
          <!--            <li class="nav-item" v-for="year in years" :key="year">-->
          <!--              <a class="nav-link menu-link ps-0" :href="'#tableYear_' + year" data-bs-toggle="collapse"-->
          <!--                 role="button"-->
          <!--                 aria-expanded="false" :aria-controls="'tableYear_' + year">-->
          <!--                <span data-key="t-orders">{{ year }}</span>-->
          <!--              </a>-->
          <!--              <div class="collapse menu-dropdown ps-5" :id="'tableYear_'+ year">-->
          <!--                <ul class="nav nav-sm flex-column">-->
          <!--                  <li class="nav-item nav-link py-1" v-for="month in months" :key="month">-->
          <!--                    - {{ month }}-->

          <!--                  </li>-->
          <!--                </ul>-->
          <!--              </div>-->
          <!--            </li>-->
          <!--          </ul>-->
          <Tree
              :nodes="data"
              :use-checkbox="false"
              :use-icon="true"
              show-child-count
              @nodeClick="onNodeClick"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-10">
      <div class="card">
        <div class="card-header">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-8">
              <span class="card-title" v-if="current_month === null">Year - {{ current_year }}</span>
              <span class="card-title" v-else>{{ months.find(m => m.id === current_month).label }}, {{
                  current_year
                }}</span>
            </div>
            <div class="col-lg-4 text-end">
              <b-button variant="outline-primary" size="sm" @click="headersControllerModal = !headersControllerModal"
                        class="btn-icon waves-effect">
                <i class="ri-menu-2-line"></i>
              </b-button>
            </div>
          </div>
        </div>
        <div class="card-body pt-0">
          <div class="table-responsive">
            <table class="table table-nowrap" v-if="data.length > 0">
              <thead class="text-center">
              <tr>
                <th scope="col" v-for="th in tableHeaders" :key="th">
                  {{ th.label.replace('_', ' ').toUpperCase() }}
                </th>
              </tr>
              </thead>
              <tbody class="text-center">
              <tr v-for="year in table_data" :key="year">
                <td v-for="th in tableHeaders" :key="th">
                  <span v-if="th.key === 'year'" class="fw-medium">{{ year[th.key] }}</span>
                  <span
                      v-else-if="th.key === 'rate' || th.key === 'charges' || th.key === 'add_charges' || th.key === 'total_price'">
                  {{ year[th.key].toLocaleString('en-UK') }}
                  </span>
                  <span v-else-if="th.key === 'range'" class="text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#seeCodesModal"
                        @click="showSeeCodesModal(year.application_id)">
                    {{ year[th.key] }}
                  </span>
                  <span v-else-if="th.key === 'month'">
                    {{ months.find(m => m.id === year[th.key]).label }}
                  </span>
                  <span v-else>{{ year[th.key] }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <b-modal v-model="headersControllerModal" hide-footer title="Control Table" modal-class="zoomIn"
           class="v-modal-custom" dialog-class="modal-dialog-right">
    <div class="hstack gap-2 flex-wrap">
      <div class="row">
        <div class="col-3 py-2" v-for="i in table_headers.filter(h => h.label !== 'actions')" :key="i">
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

<script>
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";
import Months from "@/core/Months.js";
import axios from 'axios'
import SeeCodesModal from "@/views/pages/applications/components/SeeCodesModal.vue";

export default {
  data() {
    return {
      months: Months,
      data: [],
      table_headers: [],
      table_data: [],
      current_year: null,
      current_month: null,
      headersControllerModal: false,
      current_application: {}
    }
  },
  props: {
    treeUrl: {
      type: String,
      default: null
    }
  },
  components: {
    Tree,
    SeeCodesModal
  },
  computed: {
    tableHeaders() {
      return this.table_headers.filter(header =>
          header.visible === undefined ||
          header.visible === true).filter(header => header.key !== 'application_id')
    }
  },
  methods: {
    async getTreeYears() {
      const response = await axios.get(this.treeUrl);
      this.data = response.data.map(item => {
        return {
          id: item.year,
          label: item.year,
          node_type: 'year'
        }
      });
      this.data.unshift({
        id: 'all',
        label: 'All',
        node_type: 'all'
      })
      this.current_year = 'All'
      this.changeTableDataHeader(response.data, Object.keys(response.data[0]))
    },
    async getYearMonths(year) {
      this.current_year = year
      this.current_month = null
      const response = await axios.get(this.treeUrl + '?year=' + year);
      let node = this.data.find(item => item.id === year);
      node.expanded = true
      node.nodes = response.data.map(item => {
        return {
          id: item.month,
          label: this.months.find(m => m.id === item.month).label,
          year: year,
          node_type: 'month',
        }
      });
      node.nodes.unshift({
        id: 'all',
        label: 'All',
        year: year,
        node_type: 'year_all',
      })
      this.changeTableDataHeader(response.data, Object.keys(response.data[0]))
    },
    async getMonthsData(year, month) {
      this.current_year = year
      this.current_month = month
      const response = await axios.get(this.treeUrl + '?year=' + year + '&month=' + month);
      this.changeTableDataHeader(response.data, Object.keys(response.data[0]))
    },

    showSeeCodesModal(application) {
      this.current_application = {id: application}
    },

    changeTableDataHeader(data, keys) {
      this.table_data = []
      this.table_headers = []
      keys.forEach(key => {
        this.table_headers.push({
          key: key,
          label: key,
        })
      })
      data.forEach(item => {
        let row = {}
        keys.forEach(key => {
          row[key] = item[key]
        })
        this.table_data.push(row)
      })
    },
    async onNodeClick(node) {
      if (node.node_type === 'year') {
        if (this.data.find(item => item.id === node.id).nodes !== undefined) return;
        await this.getYearMonths(node.id)
      } else if (node.node_type === 'month') {
        await this.getMonthsData(node.year, node.id)
      } else if (node.node_type === 'year_all') {
        await this.getYearMonths(node.year)
      } else if (node.node_type === 'all') {
        await this.getTreeYears()
      }
    }
  },
  async mounted() {
    if (this.treeUrl === null) return;
    await this.getTreeYears();
  }
}
</script>