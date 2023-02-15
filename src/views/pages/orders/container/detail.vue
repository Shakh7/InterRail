<template>
  <PageHeader title="Orders" :items="items"/>

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
                  <td class="fw-medium">Sending type</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Product</td>
                  <td style="min-width: 125px">
                    <skeleton class="w-100"/>
                  </td>
                </tr>
                <tr>
                  <td class="fw-medium">Type</td>
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
                        <div class="text-muted text-capitalize"><i class="ri-building-line align-bottom me-1"></i>
                          {{ order.position.replace('_', ' ') }}
                        </div>
                        <div class="vr"></div>
                        <div class="text-muted">Order type :
                          <span class="text-capitalize">{{ order.type }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-auto mt-md-0 mt-4">
                  <router-link :to="{ name: 'order_invoice_create', params: {order_number: order.order_number}}">
                    <b-button pill size="sm" variant="primary" class="btn-label waves-effect waves-light"><i
                        class="ri-file-download-line label-icon align-middle rounded-pill fs-16 me-2"></i> Invoice
                    </b-button>
                  </router-link>
                </div>
                <div class="col-md-auto mt-md-0 mt-4" v-if="order.is_code_connected">
                  <b-badge variant="secondary" class="badge-label fs-12">
                    <i class="mdi mdi-circle-medium"></i> Codes
                  </b-badge>
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
                      <th class="text-center">Container</th>
                      <th class="text-center">Agreed rate</th>
                      <th class="text-center py-0 m-0" v-for="party in order.counterparties" :key="party.id"
                          @click="updateCounterparty(party)">
                        <span class="badge bg-success">{{ party.category.name }}</span>
                        <span class="d-block">{{ party.counterparty.name }}</span>
                      </th>
                      <th class="text-center">Total</th>
                      <th class="text-center">Profit</th>
                    </tr>
                    <tr class="bg-white fs-5">
                      <th class="text-center">
                      </th>
                      <th class="text-center">
                      </th>
                      <th class="text-center">${{ agreed_cost_sum }}</th>
                      <th class="text-center m-0" v-for="party in order.counterparties" :key="party.id">
                        ${{ party.total_expanses }}
                      </th>
                      <th class="text-center">${{ profit_sum }}</th>
                      <th class="text-center">${{ agreed_cost_sum - profit_sum }}</th>
                    </tr>
                    </thead>
                    <tbody v-for="ctr_type in container_types" :key="ctr_type.id">
                    <tr class="border-success">
                      <th class="text-center my-1 bg-transparent text-success"
                          :colspan="6 + order.counterparties.length">{{ ctr_type.container_type }}
                      </th>
                    </tr>
                    <tr v-for="(container, i) in ctr_type.expanses" :key="i">
                      <th class="text-center">{{ i + 1 }}</th>
                      <td class="text-center" style="max-width: 75px">
                        <ContainerInput @update="this.fetchData()" :container_type_id="ctr_type.id"
                                        :container="container"/>
                      </td>
                      <td class="text-center">${{ container.agreed_rate }}</td>
                      <td class="text-center" v-for="pre_cost in container.actual_costs"
                          :key="pre_cost" style="max-width: 65px">
                        <ActualCostInput @update="fetchData()" :actualCost="pre_cost"/>
                      </td>
                      <td class="text-center">
                        ${{
                          container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
                        }}
                      </td>
                      <td class="text-center">
                        ${{
                          ctr_type.agreed_rate - container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
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
                    <thead class="table-light">
                    <tr>
                      <th class="text-center">#</th>
                      <th class="text-center">Container</th>
                      <th class="text-center">Agreed rate</th>
                      <th class="text-center py-0 m-0"
                          v-for="party in order.counterparties" :key="party.id">
                        <span class="badge bg-success">{{ party.category.name }}</span>
                        <span class="d-block">{{ party.counterparty.name }}</span>
                      </th>
                      <th class="text-center">Total</th>
                      <th class="text-center">Profit</th>
                    </tr>
                    </thead>
                    <tbody v-for="ctr_type in container_types" :key="ctr_type">
                    <tr v-for="(container, i) in ctr_type.expanses" :key="container">
                      <th>{{ i + 1 }}</th>
                      <td class="text-center" style="max-width: 75px">
                        <span v-if="container.container === null">  </span>
                        <span v-if="container.container !== null"> {{ container.container.name }}</span>
                      </td>
                      <td class="text-center">{{ ctr_type.agreed_rate }}</td>
                      <td class="text-center" v-for="pre_cost in container.actual_costs"
                          :key="pre_cost" style="max-width: 65px">
                        <input class="form-control form-control-sm w-75 m-auto" type="number"
                               :value="pre_cost.actual_cost">
                      </td>
                      <td class="text-center">
                        ${{
                          container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
                        }}
                      </td>
                      <td class="text-center">
                        ${{
                          ctr_type.agreed_rate - container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
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
                  <td class="fw-medium">Lot number</td>
                  <td> {{ loadData(order.lot_number) }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Sending type</td>
                  <td class="text-capitalize"> {{ loadData(sending_type).replace('_', ' ') }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Product</td>
                  <td> {{ loadData(product.name + ' (' + product.hc_code + ', ' + product.etcng_code + ')') }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Type</td>
                  <td> {{ loadData(order.type) }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Departure</td>
                  <td> {{ loadData(order.departure.name + ' (' + order.departure.code) + ')' }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Destination</td>
                  <td> {{ loadData(order.destination.name + ' (' + order.destination.code) + ')' }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Create Date</td>
                  <td>{{ loadData(order.date) }}</td>
                </tr>
                <tr>
                  <td class="fw-medium">Comment</td>
                  <td>{{ loadData(order.comment).trim() === '' ? '---' : loadData(order.comment) }}</td>
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
      v-if="!isLoading()"
      :order_number="order.order_number"
      :container_types="container_types.map(c=> { return { type: c.container_type, id: c.id, quantity: c.quantity, containers: '' }})"
      :counterparties="order.counterparties"
      :counterparty_list="counterparty_list"
      :category_list="category_list"
      @updateCounterparties="updatedCounterparties"
  />
</template>

<script>
import Swal from "sweetalert2";
import OrdersApi from '../../../../api/orders/orders_api.js';
import ContainerInput from "../components/ContainerInput.vue";
import ActualCostInput from "../components/ActualCostInput.vue";
import CounterpartyActions from "../components/CounterpartyActions.vue";
import PageHeader from "../../../../components/page-header.vue"
import skeleton from "../../../../components/custom/skeleton.vue"

export default {
  name: "detail",
  data() {
    return {
      order: [],
      product: null,
      container_types: null,
      counterparty_list: [],
      category_list: [],
      sending_type: '',
      agreed_cost_sum: 0,
      profit_sum: 0,
      items: [
        {text: "Home", href: "/",},
        {text: "Container order", active: true,},
      ],
      loading: true
    }
  },
  methods: {
    async fetchData() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${this.$route.params.id}/`)
      let data = await response.json()
      if (data.length === 0) {
        let timerInterval
        Swal.fire({
          title: 'We could not process your request!',
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result) {
            this.$router.push({path: '/orders/'})
          }
        })
      }
      this.order = data[0]['order']
      this.product = data[0]['product']
      this.container_types = data[0]['container_types']
      this.sending_type = data[0]['sending_type']
      this.sumAgreedCosts()
      this.sumProfits()
    },
    isLoading() {
      return this.order.order_number === null || this.order.order_number === undefined
    },
    loadData(data) {
      return this.isLoading() ? 'Loading...' : data
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

          Toast.fire({
            icon: 'success',
            title: 'Successfully updated'
          })
        }
        await this.fetchData();
      }
    },
    async createCounterparty() {
      const {value: formValues} = await Swal.fire({
        title: 'Create Counterparty',
        html:
            '<select class="form-select m-auto w-75 mt-3" id="categoryUpdate">' +
            `${this.category_list.map(c => {
              return `<option value="${c.id}">${c.name}</option>`
            })}` +
            '</select>' +
            '<select class="form-select m-auto w-75 mt-3" id="counterpartyUpdate">' +
            `${this.counterparty_list.map(c => {
              return `<option value="${c.id}">${c.name}</option>`
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

        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/counterparty/create/`, requestGetOptions)
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

          Toast.fire({
            icon: 'success',
            title: 'Successfully updated'
          })
        }
        await this.fetchData();
      }
    },

    sumAgreedCosts() {
      let total = 0;
      this.container_types.forEach(ctr_type => {
        total += (parseInt(ctr_type.agreed_rate) * parseInt(ctr_type.quantity));
      });
      this.agreed_cost_sum = total;
    },
    sumProfits() {
      let total = 0;
      this.order.counterparties.map(c => c.total_expanses).forEach(exp => {
        total += parseInt(exp);
      });
      this.profit_sum = total
    },

    async updatedCounterparties() {
      await this.fetchData();
      await this.getCategoryList()
      await this.getCounterpartyList()
    }
  },
  async mounted() {
    this.loading = true;
    await this.fetchData();
    await this.getCategoryList()
    await this.getCounterpartyList()
    this.loading = false;
  },
  components: {
    ContainerInput,
    ActualCostInput,
    CounterpartyActions,
    PageHeader,
    skeleton
  },
}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>