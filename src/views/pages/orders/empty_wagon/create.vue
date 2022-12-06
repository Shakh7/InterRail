<script>
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import CoreApi from "@/api/core/core_api";
import counterpartySelect from "@/views/pages/orders/components/counterpartySelect";
import custom_wizard from "@/views/pages/orders/components/custom_wizard";
import OrdersApi from "@/api/orders/orders_api";
import Swal from "sweetalert2";
import store from "../../../../state/store";

export default {
  data() {
    return {
      steps: [
        {
          title: "Step 1",
          data_target: "step1",
          active: true,
          done: true,
        },
        {
          title: "Step 2",
          data_target: "step2",
        },
        {
          title: "Step 3",
          data_target: "step3",
        },
        {
          title: "Step 4",
          data_target: "step4",
        },
      ],
      counterparty_list: [],
      category_list: [],

      order: {
        lot_number: "1111",
        date: "2022-11-14",
        position: "block_train",
        type: "export",
        shipment_status: "delivered",
        payment_status: "issued",
        shipper: "LLC \"Gallaorol kaliy fosfat\"",
        consignee: "FE MEDEX",
        departure_id: 1,
        destination_id: 1,
        border_crossing: "Келес эксп - Сарыагач эксп",
        conditions_of_carriage: "FOB-FOR",
        rolling_stock: "СПС контейнер",
        departure_country: "Uzbekistan",
        destination_country: "China",
        comment: "Hello world",
        manager: this.$store.state.user.id,
        customer: null,
        counterparties: [
          {
            category_id: [],
            counterparty_id: null
          }
        ]
      },
      quantity: 1,
      agreed_rate_per_ton: null,

      wagon_preliminary_costs: [
        {
          category_id: 1,
          counterparty_id: 1,
          preliminary_cost: ''
        }
      ],

      departure: {
        selected: null,
        options: []
      },
      destination: {
        selected: null,
        options: []
      },

      autocomplete_options: []
    }
  },
  components: {
    Multiselect,
    counterpartySelect,
    custom_wizard
  },

  methods: {
    async getCounterpartyList() {
      if (this.counterparty_list.length > 0) return
      let orders = new OrdersApi()
      this.counterparty_list = (await orders.getCounterpartyList()).results
    },
    async getCategoryList() {
      if (this.category_list.length > 0) return;
      let orders = new OrdersApi()
      let categories = (await orders.getCategoryList()).results
      this.category_list = categories.map((category) => {
        return {
          value: category.id,
          label: category.name
        }
      })
    },

    async getOptions(query, option_type) {
      if (query.length <= 2) return;
      let core_api = new CoreApi()
      if (option_type === 'departure') {
        let stations = (await core_api.getCoreList('stations', query, 7)).results
        this.departure.selected = null
        this.departure.options = stations.map((station) => {
          return {
            value: parseInt(station.id),
            label: station.name,
            code: station.code
          }
        })

      } else if (option_type === 'destination') {
        let stations = (await core_api.getCoreList('stations', query, 7)).results
        this.destination.selected = null
        this.destination.options = stations.map((station) => {
          return {
            value: parseInt(station.id),
            label: station.name,
            code: station.code
          }
        })
      }
    },
    onOptionSelect(option, option_type) {
      let id = option.value
      option_type === 'departure' ? this.order.departure_id = id
          : option_type === 'destination' ? this.order.destination_id = id
              : null
    },
    counterpartyService(action, id) {
      if (action === 'delete') {
        this.order.counterparties = this.order.counterparties.filter(counterparty =>
            counterparty.counterparty_id.id !== id || counterparty.counterparty_id === 1
        )
        this.wagon_preliminary_costs = this.wagon_preliminary_costs.filter(c =>
            c.counterparty_id.id !== id
        )
      } else if (action === 'add') {
        this.order.counterparties.push(
            {
              category_id: null,
              counterparty_id: null
            }
        )

        this.wagon_preliminary_costs.push(
            {
              category_id: null,
              counterparty_id: null
            }
        )
      }
    },
    onCounterPartyChange(counterparty, type, index) {
      let selected_counterparty = JSON.parse(JSON.stringify(counterparty))
      if (type === 'counterparty') {
        this.order.counterparties[index].counterparty_id = selected_counterparty.selected
        this.wagon_preliminary_costs[index].counterparty_id = selected_counterparty.selected
      } else if (type === 'category') {
        this.order.counterparties[index].category_id = selected_counterparty.data.map(c => {
          return {
            value: c.value,
            label: c.label,
          }
        })
        this.wagon_preliminary_costs[index].category_id = selected_counterparty.data.map(c => {
          return {
            value: c.value,
            label: c.label,
            pre_cost: ''
          }
        })
      }
    },

    formatOrderDetails() {
      let order = {
        ...this.order
      }
      let order_counterparties = []
      order.counterparties.forEach(counterparty => {
        counterparty.category_id.forEach(category => {
          order_counterparties.push({
            category_id: category.value,
            counterparty_id: counterparty.counterparty_id.id
          })
        })
      })
      order.counterparties = order_counterparties

      let wagon_preliminary_costs = []
      this.wagon_preliminary_costs.forEach(counterparty => {
        counterparty.category_id.forEach(category => {
          wagon_preliminary_costs.push({
            category_id: category.value,
            counterparty_id: counterparty.counterparty_id.id,
            preliminary_cost: category.pre_cost
          })
        })
      })

      return {
        "order": order,
        "wagon_preliminary_costs": wagon_preliminary_costs
      }
    },

    async createEmptyWagonOrder() {
      let data = this.formatOrderDetails()
      let orders_api = new OrdersApi()
      let response = await orders_api.createEmptyWagonOrder({
        order: data.order,
        wagon_empty_preliminary_costs: data.wagon_preliminary_costs,
        quantity: this.quantity,
        agreed_rate: this.agreed_rate_per_ton,
      })

      await Swal.fire({
        position: "center",
        icon: response.ok ? "success" : "error",
        title: response.ok ? "Order created successfully" : "Order create failed",
        showConfirmButton: false,
        timer: 3000,
      });

      if (response.ok) await this.$router.push({name: "order_empty_wagon_list"})
    },

    async getAutoCompleteOrders() {
      let response = null
      if (store.state.user.role === 'admin') {
        response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/`);
      } else {
        response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/?manager=${store.state.user.id}`);
      }
      let data = await response.json();
      this.autocomplete_options = data
    },

    onAutoCompleteSelected(selected_order) {
      if (selected_order === "0") {
        this.order = {
          lot_number: "",
          date: "",
          position: "",
          type: "",
          shipment_status: "",
          payment_status: "",
          shipper: "",
          consignee: "",
          departure_id: 1,
          destination_id: 1,
          border_crossing: "",
          conditions_of_carriage: "",
          rolling_stock: "",
          departure_country: "",
          destination_country: "",
          comment: "",
          manager: this.$store.state.user.id,
          customer: null,
        }
      } else {
        try {
          let order_number = parseInt(selected_order)
          let result = this.autocomplete_options.filter(order => order.order_number === order_number)[0]
          this.order = result
          this.order.counterparties = [
            {
              category_id: [],
              counterparty_id: 1
            }
          ]

          let dep = [{
            value: parseInt(result.departure.id),
            label: result.departure.name,
            code: result.departure.code
          }]
          let des = [{
            value: parseInt(result.destination.id),
            label: result.destination.name,
            code: result.destination.code
          }]

          this.departure.options = dep
          this.departure.selected = dep[0]
          this.order.departure_id = dep[0].value
          this.destination.options = des
          this.destination.selected = des[0]
          this.order.destination_id = des[0].value
        } catch {
          alert('Please select a valid order')
        }
      }

    }
  },
  async mounted() {
    await this.getCounterpartyList()
    await this.getCategoryList()
    await this.getAutoCompleteOrders()
  }
};
</script>

<template>
  <div class="row">
    <div class="col-xl-12 pb-3">
      <custom_wizard wizard_header="Create Order" :steps="steps" class="mb-0"
                     :autocomplete_options="autocomplete_options"
                     @autocomplete-selected="onAutoCompleteSelected">

        <template v-slot:content-step1-body>
          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">Order number</label>
              <input type="number" class="form-control"
                     placeholder="Enter order number" disabled>
            </div>

            <div class="col-md-4">
              <label for="lotNumber" class="form-label">Lot number</label>
              <input type="text" class="form-control" v-model="order.lot_number"
                     id="lotNumber" placeholder="Enter lot number">
            </div>

            <div class="col-md-4 mb-3">
              <label for="position" class="form-label">Position</label>
              <select class="form-select" aria-label="order position" v-model="order.position">
                <option selected disabled>Select position</option>
                <option value="rail_forwarder">Rail forwarder</option>
                <option value="block_train">Block train</option>
                <option value="multi_modal">Multi modal</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="shipper" class="form-label">Shipper</label>
              <input type="text" class="form-control" v-model="order.shipper"
                     id="shipper" placeholder="Shipper">
            </div>

            <div class="col-md-4">
              <label for="consignee" class="form-label">Consignee</label>
              <input type="text" class="form-control" v-model="order.consignee"
                     id="consignee" placeholder="Consignee">
            </div>

            <div class="col-md-4 mb-3">
              <label for="orderType" class="form-label">Order type</label>
              <select class="form-select" aria-label="order type select"
                      v-model="order.type">
                <option selected disabled>Select order type</option>
                <option value="import">Import</option>
                <option value="export">Export</option>
                <option value="transit">Transit</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="shipment_status" class="form-label">Shipment status</label>
              <select class="form-select" id="shipment_status" v-model="order.shipment_status">
                <option selected disabled>Select shipment status</option>
                <option value="in_process">In process</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="payment_status" class="form-label">Payment status</label>
              <select class="form-select" id="payment_status" v-model="order.payment_status">
                <option selected disabled>Select payment status</option>
                <option value="reserved">Reserved</option>
                <option value="issued">Issued</option>
                <option value="received">Received</option>
              </select>
            </div>

            <div class="col-md-4 mb-3">
              <label for="date" class="form-label">Date</label>
              <input type="date" class="form-control" id="date" v-model="order.date">
            </div>

            <div class="col-md-7">
              <label for="departure" class="form-label">Departure</label>
              <Multiselect
                  class="form-control"
                  v-model="departure.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="departure.options"
                  placeholder="Choose departure.."
                  @search-change="getOptions($event, 'departure')"
                  :object="true"
                  @select="onOptionSelect($event, 'departure')"
              />
            </div>

            <div class="col-md-5 mb-3">
              <label for="departure_code" class="form-label">Departure code</label>
              <Multiselect
                  class="form-control"
                  v-model="departure.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="departure.options"
                  placeholder="Choose departure.."
                  @search-change="getOptions($event, 'departure')"
                  :object="true"
                  label="code"
                  @select="onOptionSelect($event, 'departure')"
              />
            </div>

            <div class="col-md-7">
              <label for="destination" class="form-label">Destination</label>
              <Multiselect
                  class="form-control"
                  v-model="destination.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="destination.options"
                  placeholder="Choose destination.."
                  @search-change="getOptions($event, 'destination')"
                  :object="true"
                  @select="onOptionSelect($event, 'destination')"
              />
            </div>

            <div class="col-md-5">
              <label for="destination_code" class="form-label">Destination code</label>
              <Multiselect
                  class="form-control"
                  v-model="destination.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="destination.options"
                  placeholder="Choose destination.."
                  @search-change="getOptions($event, 'destination')"
                  :object="true"
                  label="code"
                  @select="onOptionSelect($event, 'destination')"
              />
            </div>

          </div>
        </template>

        <template v-slot:content-step2-body>
          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">Border crossing</label>
              <input type="text" class="form-control" v-model="order.border_crossing"
                     placeholder="Border crossing">
            </div>

            <div class="col-md-4">
              <label class="form-label">Conditions of carriage</label>
              <input type="text" class="form-control" v-model="order.conditions_of_carriage"
                     placeholder="Conditions of carriage">
            </div>

            <div class="col-md-4 mb-3">
              <label class="form-label">Rolling stock</label>
              <input type="text" class="form-control" v-model="order.rolling_stock"
                     placeholder="Rolling stock">
            </div>

            <div class="col-md-4">
              <label class="form-label">Departure country</label>
              <input type="text" class="form-control" v-model="order.departure_country"
                     placeholder="Departure country">
            </div>

            <div class="col-md-4">
              <label class="form-label">Destination country</label>
              <input type="text" class="form-control" v-model="order.destination_country"
                     placeholder="Destination country">
            </div>

            <div class="col-md-4 mb-3">
              <label for="payment_status" class="form-label">Customer</label>
              <select class="form-select" id="payment_status" v-model="order.customer">
                <option selected disabled>Select payment status</option>
                <option v-for="client in $store.state.users_list.filter(user => user.role === 'client')" :key="client"
                        :value="client.id">{{ client.full_name }}
                </option>
              </select>
            </div>

            <div class="col-12">
              <label for="comment" class="form-label">Comment</label>
              <textarea class="form-control" id="comment" rows="4" v-model="order.comment"
                        placeholder="Enter comment here.."></textarea>
            </div>

          </div>

          <hr class="my-4 text-muted">

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info">
            <label class="form-check-label" for="save-info">Save this information for next
              time</label>
          </div>
        </template>

        <template v-slot:content-step3-body>
          <div class="row gy-3">
            <counterpartySelect
                v-for="(c,i) in order.counterparties" :key="c"
                :counterparties="counterparty_list"
                :categories="category_list"
                @onCounterpartySelect="onCounterPartyChange($event, 'counterparty', i)"
                @onCategorySelect="onCounterPartyChange($event, 'category', i)"
            >
              <template v-slot:delete_button="slotProps">
                <b-button @click="counterpartyService('delete', slotProps.data.selected.id)"
                          class="btn-soft-danger waves-effect waves-light w-100">
                  Delete
                </b-button>
              </template>
            </counterpartySelect>
            <div class="col-md-12 mb-3">
              <button type="button" class="btn btn-soft-success btn-label" @click="counterpartyService('add')">
                <i class=" ri-add-fill label-icon align-middle fs-16 me-2"></i> Add
              </button>
            </div>
          </div>
        </template>

        <template v-slot:content-step4-body>
          <div class="row gx-3 w-100 m-auto">
            <div class="col-lg-9 px-1">
              <div class="card border-1">
                <div class="card-header">
                  <button type="button" class="btn-close float-end fs-11" aria-label="Close">
                  </button>
                  <h6 class="card-title mb-0">Preliminary costs</h6>
                </div>
                <div class="card-footer border-bottom">
                  <div class="row mb-0">
                    <div class="col-6 pe-2 mb-0">
                      <input type="text" placeholder="Quantuty" class="form-control" v-model="quantity">
                    </div>
                    <div class="col-6 ps-2 mb-0">
                      <input type="text" placeholder="Agreed rate per ton" class="form-control"
                             v-model="agreed_rate_per_ton">
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-4 pe-2 mb-0"
                         v-for="c in wagon_preliminary_costs.filter(i => i.counterparty_id !== null && i.category_id !== null )"
                         :key="c">
                      <b-list-group class="bg-light p-2 py-1">
                        <h6 class="my-0 p-2">{{ c.counterparty_id.name }}</h6>
                        <b-list-group-item class="my-1 p-0 border-0"
                                           v-for="category in c.category_id" :key="category">
                          <input type="number" class="form-control border-0 w-100"
                                 :placeholder="category.label" v-model="category.pre_cost">
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:next-tab-step4>
          <button @click="createEmptyWagonOrder()" type="button" class="btn btn-success btn-label right ms-auto">
            <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
            Create
          </button>
        </template>

      </custom_wizard>
    </div>
  </div>
</template>

<style>
.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}

.ctr_animation {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
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