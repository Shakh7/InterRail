<template>
  <Transition name="slide-up">

    <div class="row vh-100 justify-content-center align-items-center" v-if="isLoading()">
      <div class="col-12 text-center pb-5">
        <b-spinner variant="info" class="mb-5"></b-spinner>
      </div>
    </div>

    <div class="container-fluid p-0 mt-0" v-else-if="!isLoading()">

      <div class="row">
        <div class="col-lg-12">
          <div class="card mt-n4 mx-n4 mb-n5">
            <div class="bg-soft-success">
              <div class="card-body pb-4 mb-5">
                <div class="row">
                  <div class="col-md">
                    <div class="row align-items-center">
                      <div class="col-md-auto">
                        <div class="avatar-md mb-md-0 mb-4">
                          <div class="avatar-title bg-white rounded-circle">
                            <img
                                src="https://static.wixstatic.com/media/db110e_21c6b16c1b524da3b794f2ed58cf9441~mv2.png/v1/fill/w_265,h_265,al_c,usm_0.66_1.00_0.01/Logistics%20Icon.png"
                                alt="" class="avatar-md">
                          </div>
                        </div>
                      </div>
                      <div class="col-md">
                        <h4 class="fw-semibold">
                          Order number - {{ loadData(order.order_number) }}
                        </h4>
                        <div class="hstack gap-3 flex-wrap">
                          <div class="text-muted text-capitalize"><i class="ri-building-line align-bottom me-1"></i>
                            {{ loadData(order.position).split('_').join(' ') }}
                          </div>
                          <div class="vr"></div>
                          <div class="text-muted">Create Date : <span class="fw-medium"></span>
                            {{ loadData(order.date) }}
                          </div>
                          <div class="vr"></div>
                          <div class="badge rounded-pill bg-info fs-12">New</div>
                          <div class="badge rounded-pill bg-danger fs-12">High</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-auto mt-md-0 mt-4">
                    <div class="hstack gap-1 flex-wrap">

                      <button type="button" class="btn avatar-xs mt-n1 p-0 favourite-btn active">
                        <span class="avatar-title bg-transparent fs-15">
                          <i class="ri-star-fill"></i>
                        </span>
                      </button>

                      <button type="button" class="btn py-0 fs-16 text-body" id="settingDropdown"
                              data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="ri-share-line"></i>
                      </button>

                      <ul class="dropdown-menu" aria-labelledby="settingDropdown" style="">
                        <li>
                          <a class="dropdown-item" href="#">
                            <i class="ri-eye-fill align-bottom me-2 text-muted"></i>View
                          </a>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            <i class="ri-share-forward-fill align-bottom me-2 text-muted"></i> Share with
                          </a>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                          </a>
                        </li>
                      </ul>
                      <button type="button" class="btn py-0 fs-16 text-body"><i class="ri-flag-line"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xxl-9">
          <div class="card">
            <div class="card-body p-4 pt-2">
              <!-- TAB STARTS -->
              <ul class="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" data-bs-toggle="tab" href="#actual_cost_tab"
                     role="tab" aria-selected="false" tabindex="-1"> ACTUAL COST </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#preliminary_cost_tab"
                     role="tab" aria-selected="false" tabindex="-1"> PRELIMINARY COST
                  </a>
                </li>
              </ul>
              <!-- TAB ENDS -->

              <!-- TAB CONTENT STARTS -->
              <div class="tab-content text-muted">
                <div class="tab-pane active" id="actual_cost_tab" role="tabpanel">

                  <div class="table-responsive table-card">
                    <table class="table table-striped">
                      <thead>
                      <tr class="bg-light">
                        <th class="text-center">#</th>
                        <th class="text-center">Wagon</th>
                        <th class="text-center">Agreed rate
                        </th>
                        <th class="text-center py-0 m-0" v-for="party in order.counterparties" :key="party"
                        >
                          <span class="badge bg-success">{{ party.category.name }}</span>
                          <span class="d-block">{{ party.counterparty.name }}</span>
                        </th>
                        <th class="text-center">Total</th>
                        <th class="text-center">Profit</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(wagon, i) in expanses" :key="i">
                        <th class="text-center">{{ i + 1 }}</th>
                        <td class="text-center" style="max-width: 150px">
                          <wagonInput :id="wagon.id" :wagon="wagon.wagon"/>
                        </td>
                        <td class="text-center">
                          <agreedRate @update="this.fetchData()" :id="wagon.id" :agreed_rate="wagon.agreed_rate"/>
                        </td>
                        <td class="text-center" v-for="actual_cost in wagon.actual_costs" :key="actual_cost"
                            style="max-width: 150px">
                          <actualCost @update="this.fetchData()" :id="actual_cost.id"
                                      :actual_cost="actual_cost.actual_cost"/>
                        </td>
                        <td class="text-center">
                          {{
                            (wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                          }}
                        </td>
                        <td class="text-center">
                          {{
                            ((expanses.map(s => s.agreed_rate).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                          }}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane" id="preliminary_cost_tab" role="tabpanel">
                  <div class="table-responsive table-card">
                    <table class="table table-striped">
                      <thead>
                      <tr class="bg-light">
                        <th class="text-center">#</th>
                        <th class="text-center">Wagon</th>
                        <th class="text-center">Agreed rate <br>${{
                            (expanses.filter(a => a.agreed_rate !== null).map(s => s.agreed_rate).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                          }}</th>
                        <th class="text-center py-0 m-0" v-for="party in order.counterparties" :key="party">
                          <span class="badge bg-success">{{ party.category.name }}</span>
                          <span class="d-block">{{ party.counterparty.name }}</span>
                        </th>
                        <th class="text-center">Total</th>
                        <th class="text-center">Profit</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(wagon, i) in expanses" :key="i">
                        <th class="text-center">{{ i + 1 }}</th>
                        <td class="text-center" style="max-width: 150px">
                          <wagonInput :id="wagon.id" :wagon="wagon.wagon"/>
                        </td>
                        <td class="text-center">
                          <agreedRate @update="this.fetchData()" :id="wagon.id" :agreed_rate="wagon.agreed_rate"/>
                        </td>
                        <td class="text-center" v-for="pre_cost in wagon_empty_preliminary_costs" :key="pre_cost"
                            style="max-width: 150px">
                          {{ pre_cost.preliminary_cost }}
                        </td>
                        <td class="text-center">
                          {{
                            (wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                          }}
                        </td>
                        <td class="text-center">
                          {{
                            ((expanses.map(s => s.agreed_rate).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                          }}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- TAB CONTENT ENDS -->
            </div>
          </div>
        </div>
        <div class="col-xxl-3">
          <div class="card">
            <div class="card-header"><h5 class="card-title mb-0">Order Details</h5></div>
            <div class="card-body">
              <div class="table-responsive table-card">
                <div class="text-center py-5" v-if="isLoading()">
                  <b-spinner variant="info"></b-spinner>
                </div>
                <table class="table table-borderless align-middle mb-0" v-if="isLoading() === false">
                  <tbody>
                  <tr>
                    <td class="fw-medium">Order number</td>
                    <td>{{ loadData(order.order_number) }}</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Lot number</td>
                    <td>{{ loadData(order.lot_number) }}</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Departure</td>
                    <td>{{ loadData(order.departure.name) }} ({{ loadData(order.departure.code) }})</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Destination</td>
                    <td>{{ loadData(order.destination.name) }} ({{ loadData(order.destination.code) }})</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Create Date</td>
                    <td>{{ loadData(order.date) }}</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Manager</td>
                    <td>
                      {{ getAccount(loadData(order.manager))['full_name'] }}
                    </td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Customer</td>
                    <td>
                      {{ getAccount(loadData(order.customer))['full_name'] }}
                    </td>
                  </tr>
                  </tbody>
                </table>

                <button
                    class="btn btn-soft-success fw-medium w-100"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                >See Actions
                </button>


              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h6 class="card-title fw-semibold mb-0">Files Attachment</h6></div>
            <div class="card-body">
              <div class="d-flex align-items-center border border-dashed p-2 rounded">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light rounded"><i class="ri-file-zip-line fs-20 text-primary"></i></div>
                </div>
                <div class="flex-grow-1 ms-3"><h6 class="mb-1"><a href="javascript:void(0);">Velzon-admin.zip</a></h6>
                  <small class="text-muted">3.2 MB</small></div>
                <div class="hstack gap-3 fs-16"><a href="javascript:void(0);" class="text-muted"><i
                    class="ri-download-2-line"></i></a><a href="javascript:void(0);" class="text-muted"><i
                    class="ri-delete-bin-line"></i></a></div>
              </div>
              <div class="d-flex align-items-center border border-dashed p-2 rounded mt-2">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light rounded"><i class="ri-file-ppt-2-line fs-20 text-danger"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3"><h6 class="mb-1"><a href="javascript:void(0);">Velzon-admin.ppt</a></h6>
                  <small class="text-muted">4.5 MB</small></div>
                <div class="hstack gap-3 fs-16"><a href="javascript:void(0);" class="text-muted"><i
                    class="ri-download-2-line"></i></a><a href="javascript:void(0);" class="text-muted"><i
                    class="ri-delete-bin-line"></i></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </Transition>
</template>

<script>

import wagonInput from "@/views/pages/orders/empty_wagon/components/wagonInput.vue";
import agreedRate from "@/views/pages/orders/empty_wagon/components/agreedRate.vue";
import actualCost from "@/views/pages/orders/empty_wagon/components/actualCost.vue";
import store from "@/state/store.js";
import {ref} from "vue";

export default {
  name: "empty_wagon_detail",
  data() {

    let isFetchingData = ref(true);
    let order = []
    let agreed_rate = 0
    let quantity = 0
    let expanses = ref(null)
    let wagon_empty_preliminary_costs = []

    return {
      order,
      agreed_rate,
      expanses,
      quantity,
      wagon_empty_preliminary_costs,
      isFetchingData
    }
  },
  components: {wagonInput, agreedRate, actualCost},
  methods: {
    loadData(data) {
      return this.isLoading() ? 'Loading...' : data
    },
    isLoading() {
      return this.isFetchingData
    },
    getAccount(id) {
      let user = store.state.users_list.filter(user => user.id === id)[0]
      return user
    },
    getPreliminaryCostById(id) {
      let cost = this.wagon_empty_preliminary_costs.filter(cost => cost.id === id)[0]
      return cost
    },
    async fetchData() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/list/${this.$route.params.id}/`)
      let data = (await response.json())[0]

      this.order = data['order']
      this.agreed_rate = data['agreed_rate']
      this.expanses = data['expanses']
      this.quantity = data['quantity']
      this.wagon_empty_preliminary_costs = data['wagon_empty_preliminary_costs']

      this.isFetchingData = false
    }
  },
  async mounted() {
    await this.fetchData()
  }
}
</script>

<style scoped>

</style>