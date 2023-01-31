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
                          {{
                            order.order_number === null || order.order_number === undefined
                                ? 'We are processing your order...'
                                : 'Order number - ' + order.order_number

                          }}
                        </h4>
                        <div class="hstack gap-3 flex-wrap">
                          <div class="text-muted text-capitalize"><i class="ri-building-line align-bottom me-1"></i>
                            {{ loadData(order.position).replace('_', ' ') }}
                          </div>
                          <div class="vr"></div>
                          <div class="text-muted">Create Date : <span class="fw-medium">{{
                              loadData(order.date)
                            }}</span>
                          </div>
<!--                          <div class="vr"></div>-->
<!--                          <div class="badge rounded-pill bg-info fs-12">New</div>-->
<!--                          <div class="badge rounded-pill bg-danger fs-12">High</div>-->
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

<!--                      <button type="button" class="btn py-0 fs-16 text-body" id="settingDropdown"-->
<!--                              data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                        <i class="ri-share-line"></i>-->
<!--                      </button>-->

<!--                      <ul class="dropdown-menu" aria-labelledby="settingDropdown" style="">-->
<!--                        <li>-->
<!--                          <a class="dropdown-item" href="#">-->
<!--                            <i class="ri-eye-fill align-bottom me-2 text-muted"></i>View-->
<!--                          </a>-->
<!--                        </li>-->

<!--                        <li>-->
<!--                          <a class="dropdown-item" href="#">-->
<!--                            <i class="ri-share-forward-fill align-bottom me-2 text-muted"></i> Share with-->
<!--                          </a>-->
<!--                        </li>-->

<!--                        <li>-->
<!--                          <a class="dropdown-item" href="#">-->
<!--                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete-->
<!--                          </a>-->
<!--                        </li>-->
<!--                      </ul>-->
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
                        <th class="text-center">Agreed rate per ton</th>
                        <th class="text-center">Weight</th>
                        <th class="text-center">Total rate</th>
                        <th class="text-center py-0 m-0" v-for="party in order.counterparties" :key="party.id"
                            @click="updateCounterparty(party)"
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
                        <td class="text-center">
                          <wagon_rate_weight :code="wagon.code.toString()"
                              @update="this.fetchData()" trackBy="Wagon" :id="wagon.id" :wagonName="wagon.wagon"/>
                        </td>
                        <td class="text-center">
                          <wagon_rate_weight @update="this.fetchData()" trackBy="Rate" :id="wagon.id" :rate="wagon.agreed_rate_per_tonn"/>
                        </td>
                        <td class="text-center">
                          <wagon_rate_weight @update="this.fetchData()" trackBy="Weight" :id="wagon.id" :actual_weight="wagon.actual_weight"/>
                        </td>
                        <td class="text-center">{{
                            wagon.agreed_rate_per_tonn === null ? wagon.actual_weight : (wagon.agreed_rate_per_tonn * wagon.actual_weight)
                          }}
                        </td>
                        <td class="text-center" v-for="pre_cost in wagon.actual_costs"
                            :key="pre_cost" style="max-width: 65px">
                          <ActualCostInput @update="this.fetchData()" :actualCost="pre_cost"/>
                          <!--                          <ActualCostInput :actualCost="pre_cost"/>-->
                        </td>
                        <td class="text-center">
                          ${{
                            wagon.actual_costs.map(w => w.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
                          }}
                        </td>
                        <td class="text-center">
                          ${{
                            ((wagon.agreed_rate_per_tonn === null ? 1 : wagon.agreed_rate_per_tonn) * wagon.actual_weight) - wagon.actual_costs.map(w => w.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))
                          }}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane" id="preliminary_cost_tab" role="tabpanel">
                  <div class="table-responsive table-card">
                    <!--                    <table class="table table-striped">-->
                    <!--                      <thead class="table-light">-->
                    <!--                      <tr>-->
                    <!--                        <th class="text-center">#</th>-->
                    <!--                        <th class="text-center">Container</th>-->
                    <!--                        <th class="text-center">Agreed rate</th>-->
                    <!--                        <th class="text-center py-0 m-0"-->
                    <!--                            v-for="party in order.counterparties" :key="party.id">-->
                    <!--                          <span class="badge bg-success">{{ party.category.name }}</span>-->
                    <!--                          <span class="d-block">{{ party.counterparty.name }}</span>-->
                    <!--                        </th>-->
                    <!--                        <th class="text-center">Total</th>-->
                    <!--                        <th class="text-center">Profit</th>-->
                    <!--                        <th class="text-center font-weight-medium">Actions</th>-->
                    <!--                      </tr>-->
                    <!--                      </thead>-->
                    <!--                      <tbody v-for="ctr_type in container_types" :key="ctr_type">-->
                    <!--                      <tr v-for="(container, i) in ctr_type.expanses" :key="container">-->
                    <!--                        <th>{{ i + 1 }}</th>-->
                    <!--                        <td class="text-center" style="max-width: 75px">-->
                    <!--                          <span v-if="container.container === null">  </span>-->
                    <!--                          <span v-if="container.container !== null"> {{ container.container.name }}</span>-->
                    <!--                        </td>-->
                    <!--                        <td class="text-center">{{ ctr_type.agreed_rate }}</td>-->
                    <!--                        <td class="text-center" v-for="pre_cost in container.actual_costs"-->
                    <!--                            :key="pre_cost" style="max-width: 65px">-->
                    <!--                          <input class="form-control form-control-sm w-75 m-auto" type="number"-->
                    <!--                                 :value="pre_cost.actual_cost">-->
                    <!--                        </td>-->
                    <!--                        <td class="text-center">-->
                    <!--                          ${{-->
                    <!--                            container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))-->
                    <!--                          }}-->
                    <!--                        </td>-->
                    <!--                        <td class="text-center">-->
                    <!--                          ${{-->
                    <!--                            ctr_type.agreed_rate - container.actual_costs.map(ctr => ctr.actual_cost).reduce((a, b) => parseInt(a) + parseInt(b))-->
                    <!--                          }}-->
                    <!--                        </td>-->
                    <!--                        <td class="text-center font-weight-medium">-->
                    <!--                          <button type="button" class="btn py-0 fs-16 text-body" id="settingDropdown"-->
                    <!--                                  data-bs-toggle="dropdown" aria-expanded="false">-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>-->
                    <!--                          </button>-->
                    <!--                          <ul class="dropdown-menu dropdownmenu-secondary" aria-labelledby="settingDropdown" style="">-->
                    <!--                            <li>-->
                    <!--                              <a class="dropdown-item" href="#">-->
                    <!--                                <i class="ri-eye-fill align-bottom me-2 text-muted"></i>View-->
                    <!--                              </a>-->
                    <!--                            </li>-->

                    <!--                            <li>-->
                    <!--                              <a class="dropdown-item" href="#">-->
                    <!--                                <i class="ri-share-forward-fill align-bottom me-2 text-muted"></i> Share with-->
                    <!--                              </a>-->
                    <!--                            </li>-->

                    <!--                            <li>-->
                    <!--                              <a class="dropdown-item text-danger" href="#">-->
                    <!--                                <i class="ri-delete-bin-fill align-bottom me-2 text-danger"></i> Delete-->
                    <!--                              </a>-->
                    <!--                            </li>-->
                    <!--                          </ul>-->
                    <!--                        </td>-->
                    <!--                      </tr>-->
                    <!--                      </tbody>-->
                    <!--                    </table>-->
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
                    <td> {{ loadData(order.order_number) }}</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Lot number</td>
                    <td> {{ loadData(order.lot_number) }}</td>
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
<!--          <div class="card">-->
<!--            <div class="card-header"><h6 class="card-title fw-semibold mb-0">Files Attachment</h6></div>-->
<!--            <div class="card-body">-->
<!--              <div class="d-flex align-items-center border border-dashed p-2 rounded">-->
<!--                <div class="flex-shrink-0 avatar-sm">-->
<!--                  <div class="avatar-title bg-light rounded"><i class="ri-file-zip-line fs-20 text-primary"></i></div>-->
<!--                </div>-->
<!--                <div class="flex-grow-1 ms-3"><h6 class="mb-1"><a href="javascript:void(0);">Velzon-admin.zip</a></h6>-->
<!--                  <small class="text-muted">3.2 MB</small></div>-->
<!--                <div class="hstack gap-3 fs-16"><a href="javascript:void(0);" class="text-muted"><i-->
<!--                    class="ri-download-2-line"></i></a><a href="javascript:void(0);" class="text-muted"><i-->
<!--                    class="ri-delete-bin-line"></i></a></div>-->
<!--              </div>-->
<!--              <div class="d-flex align-items-center border border-dashed p-2 rounded mt-2">-->
<!--                <div class="flex-shrink-0 avatar-sm">-->
<!--                  <div class="avatar-title bg-light rounded"><i class="ri-file-ppt-2-line fs-20 text-danger"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="flex-grow-1 ms-3"><h6 class="mb-1"><a href="javascript:void(0);">Velzon-admin.ppt</a></h6>-->
<!--                  <small class="text-muted">4.5 MB</small></div>-->
<!--                <div class="hstack gap-3 fs-16"><a href="javascript:void(0);" class="text-muted"><i-->
<!--                    class="ri-download-2-line"></i></a><a href="javascript:void(0);" class="text-muted"><i-->
<!--                    class="ri-delete-bin-line"></i></a></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>

    </div>

  </Transition>

    <CounterpartyActions
        v-if="!isLoading()"
        :order_number="order.order_number"
        :counterparties="order.counterparties"
        :counterparty_list="counterparty_list"
        :category_list="category_list"
        @updateCounterparties="updatedCounterparties"
    />
</template>

<script>
import {ref} from "vue";
import Swal from "sweetalert2";
import OrdersApi from "@/api/orders/orders_api";
import ActualCostInput from "@/views/pages/orders/wagon/components/ActualCostInput.vue";
import wagon_rate_weight from "@/views/pages/orders/wagon/components/wagon_rate_weight";
// import ActualCostInput from "@/views/pages/orders/components/ActualCostInput";
import CounterpartyActions from "./components/CounterpartyActions.vue";

export default {
  name: "detail",
  data() {
    const order = []
    let product = ref(null)
    let wagon_preliminary_costs = ref([])
    let expanses = ref([])
    let container_types = ref(null)
    let updateCounterpartyInfo = ref(null)
    let counterparty_list = []
    let category_list = []

    return {
      order,
      product,
      wagon_preliminary_costs,
      expanses,
      container_types,
      updateCounterpartyInfo,
      counterparty_list,
      category_list
    }
  },
  methods: {
    async fetchData() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/list/${this.$route.params.id}/`)
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
      this.expanses = data[0]['expanses']
      this.wagon_preliminary_costs = data[0]['wagon_preliminary_costs']
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

          await Toast.fire({
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

      return total
    },
    sumProfit() {
      let total = 0;

      this.order.counterparties.map(c => c.total_expanses).forEach(exp => {
        total += parseInt(exp);
      });

      return total
    },

    async updatedCounterparties() {
      await this.fetchData();
      await this.getCategoryList()
      await this.getCounterpartyList()
    }
  },
  async mounted() {
    await this.fetchData();
    await this.getCategoryList()
    await this.getCounterpartyList()
  },
  components: {
    // ContainerInput,
    // ActualCostInput,
    // CounterpartyActions
    ActualCostInput,
    wagon_rate_weight,
    CounterpartyActions
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