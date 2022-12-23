<template>

  <div class="container-fluid p-0 mt-0" v-if="loading">

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
                        We are processing your order...
                      </h4>
                      <div class="hstack gap-3 flex-wrap">
                        <div class="text-muted" style="min-width: 115px">
                          <span class="align-middle d-inline">
                            <skeleton class="w-100"/>
                          </span>
                        </div>
                        <div class="vr"></div>
                        <div class="text-muted" style="min-width: 95px">
                          <skeleton class="w-100"/>
                        </div>
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

            <div class="tab-content text-muted">
              <div class="tab-pane active" id="actual_cost_tab" role="tabpanel">

                <div class="table-responsive table-card">
                  <table class="table table-striped">
                    <thead>
                    </thead>
                  </table>
                </div>

              </div>
              <div class="tab-pane" id="preliminary_cost_tab" role="tabpanel">
                <div class="table-responsive table-card">
                  <table class="table table-striped">
                    <thead class="table-light">
                    </thead>
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
              <table class="table table-borderless align-middle mb-0">
                <tbody>
                <tr>
                  <td class="fw-medium">Lot number</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Departure</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Destination</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Create Date</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Manager</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Customer</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Comment</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
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
      </div>
    </div>

  </div>


  <div class="container-fluid p-0 mt-0" v-else-if="!loading">

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
                        Order number - {{ order.order_number }}
                      </h4>
                      <div class="hstack gap-3 flex-wrap">
                        <div class="text-muted text-capitalize">
                          <i class="ri-building-line align-bottom me-1"></i>
                          {{ order.position.replace('_', ' ') }}
                        </div>
                        <div class="vr"></div>
                        <div class="text-muted text-capitalize">Order type :
                          {{ order.type }}
                        </div>
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
                          @click="updateCounterparty(party)"
                      >
                        <span class="badge bg-success">{{ party.category.name }}</span>
                        <span class="d-block">{{ party.counterparty.name }}</span>
                      </th>
                      <th class="text-center">Total</th>
                      <th class="text-center">Profit</th>
                    </tr>
                    <tr class="bg-white">
                      <th class="text-center"></th>
                      <th class="text-center"></th>
                      <th class="text-center">
                        ${{ agreed_rate_sum }}
                      </th>
                      <th class="text-center" v-for="party in order.counterparties" :key="party">
                        ${{ party.total_expanses }}
                      </th>
                      <th class="text-center">
                        ${{ total_expanses_sum }}
                      </th>
                      <th class="text-center">
                        ${{ agreed_rate_sum - total_expanses_sum }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(wagon, i) in expanses" :key="i">
                      <th class="text-center">{{ i + 1 }}</th>
                      <td class="text-center" style="max-width: 150px">
                        <wagonInput :id="wagon.id" :wagon="wagon.wagon"/>
                      </td>
                      <td class="text-center">
                        <agreedRate @update="fetchData()" :agreed_rate="wagon"/>
                      </td>
                      <td class="text-center" v-for="cost in wagon['actual_costs']" :key="cost.id"
                          style="max-width: 150px">
                        <actualCost @update="fetchData()" :actual_cost="cost"/>
                      </td>
                      <td class="text-center">
                        {{
                          (wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
                        }}
                      </td>
                      <td class="text-center">
                        {{
                          (wagon.agreed_rate - wagon.actual_costs.map(a => a.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('en-US')
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
                      <th class="text-center">Agreed rate
                      </th>
                      <th class="text-center py-0 m-0" v-for="party in order.counterparties" :key="party"
                          @click="updateCounterparty(party)"
                      >
                        <span class="badge bg-success">{{ party.category.name }}</span>
                        <span class="d-block">{{ party.counterparty.name }}</span>
                      </th>
                      <th class="text-center">Total</th>
                      <th class="text-center">Profit</th>
                    </tr>
                    <tr class="bg-white">
                      <th class="text-center"></th>
                      <th class="text-center"></th>
                      <th class="text-center">
                        ${{ agreed_rate_sum }}
                      </th>
                      <th class="text-center" v-for="party in order.counterparties" :key="party">
                        ${{ party.total_expanses }}
                      </th>
                      <th class="text-center">
                        ${{ total_expanses_sum }}
                      </th>
                      <th class="text-center">
                        ${{ agreed_rate_sum - total_expanses_sum }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(wagon, i) in expanses" :key="i">
                      <th class="text-center">{{ i + 1 }}</th>
                      <td class="text-center" style="max-width: 150px">
                        <wagonInput :id="wagon.id" :wagon="wagon.wagon"/>
                      </td>
                      <td class="text-center">
                        <agreedRate @update="fetchData()" :agreed_rate="wagon"/>
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
              <table class="table table-borderless align-middle mb-0">
                <tbody>
                <tr>
                  <td class="fw-medium">Lot number</td>
                  <td>{{ order.lot_number === null ? '--' : order.lot_number.trim() }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Departure</td>
                  <td>{{ order.departure.name }} ({{ order.departure.code }})</td>
                </tr>
                <tr>
                  <td class="fw-medium">Destination</td>
                  <td>{{ order.destination.name }} ({{ order.destination.code }})</td>
                </tr>
                <tr>
                  <td class="fw-medium">Create Date</td>
                  <td>{{ order.date }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Manager</td>
                  <td>
                    {{ getAccount(order.manager)['full_name'] }}
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Customer</td>
                  <td>
                    {{ getAccount(order.customer)['full_name'] }}
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Comment</td>
                  <td>
                    {{ order.comment === '' || order.comment === null ? '--' : order.comment.trim() }}
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
      </div>
    </div>

  </div>


  <CounterpartyActions
      v-if="!loading"
      :order_number="order.order_number"
      :counterparties="order.counterparties"
      :counterparty_list="counterparty_list"
      :category_list="category_list"
      @updateCounterparties="updatedCounterparties"
  />
</template>

<script>

import wagonInput from "./components/wagonInput.vue";
import agreedRate from "./components/agreedRate.vue";
import actualCost from "./components/actualCost.vue";
import CounterpartyActions from "./components/CounterpartyActions.vue";
import store from "../../../../state/store.js";
import OrdersApi from "@/api/orders/orders_api";
import skeleton from "@/components/custom/skeleton.vue";
import Swal from "sweetalert2";

export default {
  name: "empty_wagon_detail",
  data() {
    return {
      order: [],
      agreed_rate: 0,
      expanses: null,
      quantity: 0,
      wagon_empty_preliminary_costs: [],
      counterparty_list: [],
      category_list: [],
      loading: true,
      agreed_rate_sum: 0,
      total_expanses_sum: 0,
    }
  },
  components: {
    wagonInput,
    agreedRate,
    actualCost,
    CounterpartyActions,
    skeleton
  },
  methods: {
    loadData(data) {
      return this.loading ? 'Loading...' : data
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

      this.getAgreedRateSum()
      this.getTotalExpansesSum()
    },
    async updatedCounterparties() {
      await this.fetchData();
      await this.getCategoryList()
      await this.getCounterpartyList()
    },
    async getCounterpartyList() {
      if (this.counterparty_list.length > 0) return
      let orders = new OrdersApi()
      this.counterparty_list = (await orders.getCounterpartyList()).results
    },
    async getCategoryList() {
      if (this.category_list.length > 0) return;
      let orders = new OrdersApi()
      this.category_list = (await orders.getCategoryList()).results
    },
    getAgreedRateSum() {
      let sum = this.expanses.map(s => s.agreed_rate).reduce((a, b) => parseInt(a) + parseInt(b), 0)
      this.agreed_rate_sum = sum
    },
    getTotalExpansesSum() {
      let sum = this.order.counterparties.map(s => s.total_expanses).reduce((a, b) => parseInt(a) + parseInt(b), 0)
      this.total_expanses_sum = sum
    },
    async updateCounterparty(item) {
      const {value: formValues} = await Swal.fire({
        title: 'Update Counterparty',
        html:
            '<select class="form-select m-auto w-75 mt-3" id="categoryUpdate">' +
            `${this.category_list.map(c => {
              return item.category.id === c.id ? `<option value="${c.id}" selected>${c.name}</option>` : `<option value="${c.id}">${c.name}</option>`
            })}` +
            '</select>' +
            '<select class="form-select m-auto w-75 mt-3" id="counterpartyUpdate">' +
            `${this.counterparty_list.map(c => {
              return item.counterparty.id === c.id ? `<option value="${c.id}" selected>${c.name}</option>` : `<option value="${c.id}">${c.name}</option>`
            })}` +
            '</select>',
        focusConfirm: false,
        confirmButtonText: 'Save',
        confirmButtonColor: '#0AB39C',
        preConfirm: () => {
          return [
            document.getElementById('counterpartyUpdate').value,
            document.getElementById('categoryUpdate').value
          ]
        }
      })

      if (formValues) {
        let headers = new Headers();
        headers.append("Content-Type", `application/json`);

        let requestGetOptions = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            "category_id": formValues[1],
            "counterparty_id": formValues[0]
          }),
        };

        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/counterparty/update/${item.id}/`, requestGetOptions)
        if (response.status >= 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          await this.fetchData();

          await Toast.fire({
            icon: 'success',
            title: 'Successfully updated'
          })
        }
      }
    },
  },
  async mounted() {
    this.loading = true
    await this.fetchData()
    await this.getCounterpartyList()
    await this.getCategoryList()
    this.loading = false
  }
}
</script>

<style scoped>

</style>