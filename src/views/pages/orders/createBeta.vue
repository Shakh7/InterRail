<script>
import custom_wizard from "@/views/pages/orders/components/custom_wizard";
import counterpartySelect from "@/views/pages/orders/components/counterpartySelect";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import OrdersApi from "@/api/orders/orders_api";
import CoreApi from "@/api/core/core_api";

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
      container_type_options: ['20', '20HC', '40', '40HC', '45'],

      order: {
        order_number: 1,
        lot_number: "1111",
        date: "2022-10-14",
        position: "block_train",
        type: "import",
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
        customer: 1,
        counterparties: [
          {
            category_id: [],
            counterparty_id: 1
          }
        ]
      },
      sending_type: "single",
      container_types: [
        {
          agreed_rate: "500.00",
          quantity: 35,
          container_type: "40HC",
          container_preliminary_costs: [
            {
              category_id: [],
              counterparty_id: 1,
            }
          ]
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
      products: {
        selected: null,
        options: []
      },

      loading: false,
    }
  },
  components: {
    custom_wizard,
    counterpartySelect,
    Multiselect
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

      } else if (option_type === 'products') {
        let products = (await core_api.getCoreList('products', query, 7)).results
        this.products.selected = null
        this.products.options = products.map((product) => {
          return {
            value: product.id,
            label: product.name,
            hc_code: product['hc_code'],
            etcng: product['etcng_code'],
          }
        })
      }
    },
    onOptionSelect(option, option_type) {
      let id = option.value
      option_type === 'departure' ? this.order.departure_id = id
          : option_type === 'destination' ? this.order.destination_id = id
              : option_type === 'products' ? this.product_id = id
                  : null
    },

    counterpartyService(action, id) {
      if (action === 'delete') {
        this.order.counterparties = this.order.counterparties.filter(counterparty =>
            counterparty.counterparty_id.id !== id || counterparty.counterparty_id === 1
        )
      } else if (action === 'add') {
        this.order.counterparties.push(
            {
              category_id: 1,
              counterparty_id: 1
            }
        )
      }
    },
    onCounterPartyChange(counterparty, type, index) {
      let selected_counterparty = JSON.parse(JSON.stringify(counterparty))
      if (type === 'counterparty') {
        this.order.counterparties[index].counterparty_id = selected_counterparty.selected
      } else if (type === 'category') {
        this.order.counterparties[index].category_id = selected_counterparty.data.map(c => {
          return {
            value: c.value,
            label: c.label,
            pre_cost: ''
          }
        })
      }
    },

    addOrRemoveContainerType(type, action) {
      if (action === "add") {
        this.container_types.push(
            {
              agreed_rate: "500.00",
              quantity: 10,
              container_type: type,
              container_preliminary_costs: this.order.counterparties.map(counterparty => {
                return {
                  category_id: counterparty.category_id.map(category => {
                    return {
                      value: category.value,
                      label: category.label,
                      pre_cost: ''
                    }
                  }),
                  counterparty_id: counterparty.counterparty_id,
                }
              })
            }
        )
      } else {
        this.container_types = this.container_types.filter(container_type => container_type.container_type !== type)
      }
    },

    isInContainerTypes(ctr_type) {
      return this.container_types.map(o => o.container_type).includes(ctr_type)
    },
    async createContainerOrder() {
      let counterparties = []

      this.order.counterparties.forEach(counterparty => {
        counterparty.category_id.forEach(category => {
          counterparties.push({
            category_id: category.value,
            counterparty_id: counterparty.counterparty_id.id,
          })
        })
      })
      let order = {
        ...this.order,
      }
      order.counterparties = counterparties

      let ctr_types = []
      this.container_types.forEach(container_type => {
        let pre_costs = []

        container_type.container_preliminary_costs.forEach(pre_cost => {
          pre_cost.category_id.forEach(category => {
            pre_costs.push({
              category_id: category.value,
              counterparty_id: pre_cost.counterparty_id.id,
              preliminary_cost: category.pre_cost
            })
          })
        })

        let ctr_typesa = {
          agreed_rate: container_type.agreed_rate,
          quantity: container_type.quantity,
          container_type: container_type.container_type,
          container_preliminary_costs: pre_costs
        }
        ctr_types.push(ctr_typesa)
      })

      let headers = new Headers();
      headers.append("Content-Type", `application/json`);

      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/create/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "order": order,
          "product_id": this.products.selected.value,
          "container_types": ctr_types,
          "sending_type": this.sending_type,
        })
      })

      console.log("response", response)
      console.log("json", await response.json())
    }
  },
  watch: {
    order: {
      handler: function (val) {
        let updated_counterparties = (JSON.parse(JSON.stringify(val))).counterparties

        this.container_types.forEach(type => {
          type.container_preliminary_costs = updated_counterparties.map(counterparty => {
            return {
              category_id: counterparty.category_id,
              counterparty_id: counterparty.counterparty_id,
            }
          })
        })
      },
      deep: true
    }
  },
  async mounted() {
    await this.getCounterpartyList()
    await this.getCategoryList()
  }
};
</script>

<template>
  <div class="row">
    <div class="col-xl-12 pb-3">
      <custom_wizard wizard_header="Create Order" :steps="steps" class="mb-0">

        <template v-slot:content-step1-body>
          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">Order number</label>
              <input v-model="order.order_number" type="number" class="form-control"
                     placeholder="Enter order number">
            </div>

            <div class="col-md-4">
              <label for="lotNumber" class="form-label">Lot number</label>
              <input type="number" class="form-control" v-model="order.lot_number"
                     id="lotNumber" placeholder="Enter lot number">
            </div>

            <div class="col-md-4 mb-3">
              <label for="position" class="form-label">Position</label>
              <select class="form-select" aria-label="order position" v-model="order.position">
                <option selected disabled>Select position</option>
                <option value="block_forwarder">Rail forwarder</option>
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
              <label class="form-label">Product</label>
              <Multiselect
                  class="form-control"
                  v-model="products.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="products.options"
                  placeholder="Choose product.."
                  @search-change="getOptions($event, 'products')"
                  :object="true"
                  @select="onOptionSelect($event, 'products')"
              />
            </div>

            <div class="col-md-4">
              <label class="form-label">Hc code</label>
              <Multiselect
                  class="form-control"
                  v-model="products.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="products.options"
                  placeholder="Choose hc code.."
                  @search-change="getOptions($event, 'products')"
                  :object="true"
                  label="hc_code"
                  @select="onOptionSelect($event, 'products')"
              />
            </div>

            <div class="col-md-4 mb-3">
              <label class="form-label">Etcng</label>
              <Multiselect
                  class="form-control"
                  v-model="products.selected"
                  :searchable="true"
                  :hideSelected="true"
                  :options="products.options"
                  placeholder="Choose destination.."
                  @search-change="getOptions($event, 'products')"
                  :object="true"
                  label="etcng"
                  @select="onOptionSelect($event, 'products')"
              />
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
          <div class="row gx-3">
            <!-- Container Types -->
            <div class="col-12 mb-3">
              <div class="row w-100 m-auto">
                <div class="col" v-for="ctr_type in container_type_options" :key="ctr_type">
                  <div class="form-check form-check-secondary">
                    <input class="form-check-input" type="checkbox" :id="'formCheck' + ctr_type"
                           :checked="isInContainerTypes(ctr_type)"
                           @click="addOrRemoveContainerType( ctr_type,`${ isInContainerTypes(ctr_type) ? 'remove' : 'add' }`)">
                    <h6 class="form-check-label m-0" :for="'formCheck' + ctr_type"
                        @click="addOrRemoveContainerType( ctr_type,`${ isInContainerTypes(ctr_type) ? 'remove' : 'add' }`)">
                      <div class="btn-container">
                        <Transition name="slide-up">
                          <span class="ctr_animation text-dark" v-if="isInContainerTypes(ctr_type)">{{
                              ctr_type
                            }}</span>
                          <span class="ctr_animation text-muted" v-else-if="!isInContainerTypes(ctr_type)">{{
                              ctr_type
                            }}</span>
                        </Transition>
                      </div>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 px-1" v-for="ctr_type in container_types" :key="ctr_type">
              <div class="card border-1">
                <div class="card-header">
                  <button type="button"
                          @click="addOrRemoveContainerType( ctr_type.container_type,`${ isInContainerTypes(ctr_type.container_type) ? 'remove' : 'add' }`)"
                          class="btn-close float-end fs-11" aria-label="Close"></button>
                  <h6 class="card-title mb-0">Order type: {{ ctr_type.container_type }}</h6>
                </div>
                <div class="card-footer border-bottom">
                  <div class="row mb-0">
                    <div class="col-6 pe-2 mb-0">
                      <input type="text" placeholder="Quantuty" class="form-control" v-model="ctr_type.quantity">
                    </div>
                    <div class="col-6 ps-2 mb-0">
                      <input type="text" placeholder="Agreed rate" class="form-control" v-model="ctr_type.agreed_rate">
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-6 pe-2 mb-0"
                         v-for="counterparty in ctr_type.container_preliminary_costs"
                         :key="counterparty"
                    >
                      <b-list-group class="bg-light p-2 py-1">
                        <h6 class="my-0 p-2">{{
                            counterparty.counterparty_id.name === undefined ? 'Cunterparty' : counterparty.counterparty_id.name
                          }}</h6>
                        <b-list-group-item class="my-1 p-0 border-0" v-for="category in counterparty.category_id"
                                           :key="category">
                          <input type="number" class="form-control border-0 w-100"
                                 :placeholder="category.label" v-model="category.pre_cost">
                        </b-list-group-item>
                      </b-list-group>
                      <!--                      <b-list-group class="bg-light p-2 py-1" v-else>-->
                      <!--                        <h6 class="my-0 p-2">-->
                      <!--                          {{-->
                      <!--                            counterparty.counterparty_id.name === undefined ||-->
                      <!--                            counterparty.counterparty_id.name === null-->
                      <!--                                ? 'Counterparty name' : counterparty.counterparty_id.name-->
                      <!--                          }}-->
                      <!--                        </h6>-->
                      <!--                        <b-list-group-item class="my-1 border-0 p-0 ps-2 bg-transparent">-->
                      <!--                          <span class="text-primary px-2">-</span>-->
                      <!--                          <span class="text-muted">Please, select countery</span>-->
                      <!--                        </b-list-group-item>-->
                      <!--                      </b-list-group>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:next-tab-step4>
          <button @click="createContainerOrder()"
                  type="button" class="btn btn-success btn-label right ms-auto">
            <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
            Create
          </button>
        </template>

      </custom_wizard>
    </div>
    <div class="col-xl-4">
      <h6 v-for="key in Object.entries(order)" :key="key">
        {{ key[0] }}: {{ key[1] }}
      </h6>
    </div>
    <div class="col-xl-4">
      <h6 v-for="key in Object.entries(container_types)" :key="key">
        {{ key[1] }}
      </h6>
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