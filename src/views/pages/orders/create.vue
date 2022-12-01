<script>
import animationData from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import counterpartySelect from "@/views/pages/orders/components/counterpartySelect";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      defaultOptions: {animationData: animationData},
      multiselect: {
        value: null
      },

      order: {
        order_number: "",
        lot_number: "",
        position: "",
        type: "",
        customer: 1,
        date: "",
        manager: 1,
        payment_status: "",
        shipper: "",
        consignee: "",
        departure_id: null,
        destination_id: null,
        border_crossing: "",
        conditions_of_carriage: "",
        rolling_stock: "",
        shipment_status: "",
        departure_country: "",
        destination_country: "",
        comment: "",
        counterparties: [
          {
            category_id: [],
            counterparty_id: null
          }
        ]
      },
      sending_type: 'single',
      product_id: null,
      container_types: [
        {
          agreed_rate: '',
          quantity: '',
          container_type: '40',
          container_preliminary_costs: [
            {
              category_id: [],
              counterparty_id: null,
            }
          ]
        }
      ],
      container_preliminary_costs: [
        {
          agreed_rate: '',
          quantity: '',
          container_type: '40',
          counterparties: [
            {
              category_id: null,
              counterparty_id: null,
              preliminary_cost: 0
            }
          ]
        }
      ],

      categories: [],
      counterparties: [],

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

      cntrs_types: ['20', '20HC', '40', '40HC', '45'],
    };
  },
  components: {
    lottie: Lottie,
    Multiselect,
    counterpartySelect
  },
  methods: {
    addCounterParty() {
      this.order.counterparties.push({
        category_id: [],
        counterparty_id: null
      })
      this.container_types.forEach(container_type => {
        container_type.container_preliminary_costs.push({
          category_id: [],
          counterparty_id: null
        })
      })
    },

    isCategoryUsed(category) {
      let filtered = this.order.counterparties.filter(c => c.counterparty.includes(category))
      return filtered.length === 0 ? false : true
    },

    async getCategories() {
      if (this.categories.length === 0) {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/counterparty/categories/`)
        let categories = await response.json()
        categories.results.forEach(category => {
          this.categories.push({
            value: category.id,
            label: category.name
          })
        })
      }
    },
    async getCounterparties() {
      if (this.counterparties.length === 0) {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/counterparty/counterparties/`)
        let counterparties = await response.json()
        this.counterparties = counterparties.results
      }
    },

    async getOptions(query, option_type) {
      if (query.length <= 2) return;
      if (option_type === 'departure') {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/core/stations/?search=${query}`)
        let results = await response.json()
        let stations = results.results.slice(0, 7)

        stations.forEach(station => {
          this.departure.options.filter(option => option.value === station.id).length === 0
              ? this.departure.options.push(
                  {
                    value: station.id,
                    label: station.name,
                    code: station.code
                  }
              ) : null
        })

      } else if (option_type === 'destination') {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/core/stations/?search=${query}`)
        let results = await response.json()
        let stations = results.results.slice(0, 7)

        stations.forEach(station => {
          this.destination.options.filter(option => option.value === station.id).length === 0
              ? this.destination.options.push(
                  {
                    value: station.id,
                    label: station.name,
                    code: station.code
                  }
              ) : null
        })

      } else if (option_type === 'products') {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/core/products/?search=${query}`)
        let results = await response.json()
        let products = results.results.slice(0, 7)

        products.forEach(product => {
          this.products.options.filter(option => option.value === product.id).length === 0
              ? this.products.options.push(
                  {
                    value: product.id,
                    label: product.name,
                    hc_code: product['hc_code'],
                    etcng: product['etcng_code'],
                  }
              ) : null
        })
      }
    },
    onOptionSelect(option, option_type) {
      let id = option.value
      option_type === 'departure' ? this.order.departure_id = id
          : option_type === 'destination' ? this.order.destination_id = id
              : option_type === 'products' ? this.product_id = id
                  : option_type === 'categories' ? this.product_id = id
                      : null
    },

    deleteCounterParty(party_id) {
      let removed = this.order.counterparties.filter(c => c.counterparty_id.id !== party_id)
      this.order.counterparties = removed

      this.container_types.forEach(ctr_type => {
        ctr_type.container_preliminary_costs = ctr_type.container_preliminary_costs.filter(c => c.counterparty_id.id !== party_id)
      })
    },

    addOrRemoveContainerType(ctr_type, action) {
      let selectedReference = JSON.parse(JSON.stringify(this.container_types[0].container_preliminary_costs))
      // let newParty = {
      //   agreed_rate: '',
      //   quantity: '',
      //   container_type: ctr_type,
      //   container_preliminary_costs: [...selectedReference]
      // }
      console.log(selectedReference.map(o => o.category_id))

      action === 'add' ? this.container_types.push(this.container_types[0]
      ) : this.container_types = this.container_types.filter(c => c.container_type !== ctr_type)
    },
    async submitOrder() {
      let order = {
        order_number: this.order.order_number,
        lot_number: this.order.lot_number,
        date: this.order.date,
        position: this.order.position,
        type: this.order.type,
        shipment_status: this.order.shipment_status,
        payment_status: this.order.payment_status,
        shipper: this.order.shipper,
        consignee: this.order.consignee,
        departure_id: this.order.departure_id,
        destination_id: this.order.destination_id,
        border_crossing: this.order.border_crossing,
        conditions_of_carriage: this.order.conditions_of_carriage,
        rolling_stock: this.order.rolling_stock,
        departure_country: this.order.departure_country,
        destination_country: this.order.destination_country,
        comment: this.order.comment,
        manager: this.order.manager,
        customer: this.order.customer,
      }
      let counterparties = []

      this.order.counterparties.forEach(party => {
        party.category_id.forEach(category => {
          let one_category = {
            counterparty_id: null,
            category_id: null
          }
          one_category.category_id = category.value
          one_category.counterparty_id = party.counterparty_id.id
          counterparties.push(one_category)
        })
      })
      order.counterparties = counterparties

      let preliminary_costs = []
      this.container_types.forEach(ctr_type => {

        let one_preliminary_cost = {
          agreed_rate: 0,
          quantity: 1,
          container_type: '',
          container_preliminary_costs: []
        }

        one_preliminary_cost.agreed_rate = ctr_type.agreed_rate
        one_preliminary_cost.quantity = ctr_type.quantity
        one_preliminary_cost.container_type = ctr_type.container_type

        ctr_type.container_preliminary_costs.forEach(preliminary_cost => {
          preliminary_cost.category_id.forEach(o => {
            let category = {
              category_id: 1,
              counterparty_id: 1,
              preliminary_cost: "1500.00"
            }
            category.category_id = o.value
            category.counterparty_id = preliminary_cost.counterparty_id.id
            category.preliminary_cost = o.preliminary_cost
            one_preliminary_cost.container_preliminary_costs.push(category)
          })
        })

        preliminary_costs.push(one_preliminary_cost)
      })

      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/api/order/create/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "order": order,
          "sending_type": this.sending_type,
          "container_types": preliminary_costs,
          "product_id": this.product_id,
        })
      })
      response.status === 201
          ? await Swal.fire({
            title: 'Success!',
            text: 'Order has been created',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 5000,
          })
          : await Swal.fire({
            title: 'Error!',
            text: `${response.statusText}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    },

    onComponentOptionSelect(counterparty, option_type, index) {
      if (option_type === 'counterparty') {
        let counterparty_id = JSON.parse(JSON.stringify(counterparty))
        this.order.counterparties[index].counterparty_id = counterparty_id.selected

        this.container_types.forEach(container_type => {
          container_type.container_preliminary_costs[index].counterparty_id = counterparty_id.selected
        })

      } else if (option_type === 'category') {
        let categories = JSON.parse(JSON.stringify(counterparty))
        this.order.counterparties[index].category_id = []

        this.container_types.forEach(container_type => {
          container_type.container_preliminary_costs[index].category_id.length = 0
        })

        categories.data.forEach(category => {
          this.order.counterparties[index].category_id.push(category)
          this.container_types.forEach(container_type => {
            container_type.container_preliminary_costs[index].category_id.push(category)
          })
        })

      }
    },
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
  },
  async mounted() {
    await this.getCounterparties()
    await this.getCategories()
  },
};
</script>

<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0">Create {{ currentRoute.query.type }} order</h4>
        </div>
        <div class="card-body form-steps">
          <form class="vertical-navs-step">
            <div class="row gy-5">
              <div class="col-xl-3">
                <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                  <button class="nav-link active" id="v-pills-order-info-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-order-info" type="button" role="tab"
                          aria-controls="v-pills-order-info" aria-selected="true">
                    <span class="step-title me-2">
                      <i class="ri-close-circle-fill step-icon me-2"></i>
                      Step 1
                    </span>
                    Order Info
                  </button>
                  <button class="nav-link" id="v-pills-order-step-2-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-order-step-2" type="button" role="tab"
                          aria-controls="v-pills-order-step-2" aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 2
                                                            </span>
                    Product info
                  </button>
                  <button class="nav-link" id="v-pills-payment-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-payment" type="button" role="tab" aria-controls="v-pills-payment"
                          aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 3
                                                            </span>
                    Counterparty info
                  </button>
                  <button class="nav-link" id="v-pills-order-step-4-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-order-step-4" type="button" role="tab"
                          aria-controls="v-pills-order-step-4"
                          aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 4
                                                            </span>
                    Counterparty expanses
                  </button>
                  <button class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish"
                          aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 5
                                                            </span>
                    Finish
                  </button>

                  <div class="card tasks-box mt-2 border" draggable="false" style="">
                    <div class="card-body">
                      <div class="d-flex mb-2"><h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                        <a class="" draggable="false">Do you have a similar order ?</a></h6>
                      </div>
                      <p class="text-muted">Select a similar order and see how it copies the fields from it</p>
                      <div class="col-12">
                        <!--                      <label for="orderType" class="form-label">Order</label>-->
                        <select class="form-select" aria-label="order template">
                          <option value="">Select order</option>
                          <option value="1000">1000 - HEFEI 07</option>
                          <option value="1001">1001 - XIAMEN 41</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9">
                <div class="px-xl-4">
                  <div class="tab-content">
                    <div class="tab-pane fade show active" id="v-pills-order-info" role="tabpanel"
                         aria-labelledby="v-pills-order-info-tab">

                      <div>
                        <div class="row g-3">

                          <div class="col-md-4">
                            <label class="form-label">Order number</label>
                            <input v-model="order.order_number" type="number" class="form-control"
                                   placeholder="Enter order number">
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
                              <option value="Rail forwarder">Rail forwarder</option>
                              <option value="Block train">Block train</option>
                              <option value="Multi modal">Multi modal</option>
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
                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab
                            nexttab" data-nexttab="v-pills-order-step-2-tab">
                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                          Go to next
                        </button>
                      </div>

                    </div>
                    <div class="tab-pane fade" id="v-pills-order-step-2" role="tabpanel"
                         aria-labelledby="v-pills-order-step-2-tab">

                      <div>
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
                                placeholder="Choose departure.."
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
                                placeholder="Choose destination.."
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
                              <option value="frank_hook">Frank Hook</option>
                              <option value="jennifer_carter">Jennifer Carter</option>
                              <option value="donald_palmer">Donald Palmer</option>
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

                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab"
                                data-previous="v-pills-bill-info-tab"><i
                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to Order Info
                        </button>
                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab
nexttab" data-nexttab="v-pills-payment-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to
                          Counterparty
                        </button>
                      </div>

                    </div>
                    <div class="tab-pane fade" id="v-pills-payment" role="tabpanel"
                         aria-labelledby="v-pills-payment-tab">
                      <div>
                        <div class="row gy-3">
                          <counterpartySelect
                              v-for="(c, i) in order.counterparties" :key="c"
                              :counterparties="counterparties"
                              :categories="categories"
                              @onCounterpartySelect="onComponentOptionSelect($event, 'counterparty', i)"
                              @onCategorySelect="onComponentOptionSelect($event, 'category', i)"
                          >
                            <template v-slot:delete_button="slotProps">
                              <b-button class="btn-soft-danger waves-effect waves-light w-100"
                                        @click="deleteCounterParty(slotProps.data.selected.id)">
                                Delete {{ slotProps.data.selected.id }}
                              </b-button>
                            </template>
                          </counterpartySelect>
                        </div>
                        <div v-if="currentRoute.query.type === 'container'">
                          <button type="button" class="btn btn-soft-success btn-label" @click="addCounterParty">
                            <i class=" ri-add-fill label-icon align-middle fs-16 me-2"></i> Add
                          </button>
                        </div>
                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab"
                                data-previous="v-pills-order-step-2-tab"><i
                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to Product
                          Info
                        </button>
                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab
nexttab" data-nexttab="v-pills-finish-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                          Counterparty
                          Expanses
                        </button>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-order-step-4" role="tabpanel"
                         aria-labelledby="v-pills-order-step-4-tab">

                      <div>

                        <div class="row gy-3">
                          <div class="col-12 mb-3">
                            <div class="form-check form-check-inline" v-for="ctr_type in cntrs_types" :key="ctr_type">
                              <label :for="'ctr_type_' + ctr_type" class="form-check-label">{{ ctr_type }}</label>
                              <input
                                  :id="'ctr_type_' + ctr_type" class="form-check-input" type="checkbox"
                                  @click="addOrRemoveContainerType( ctr_type,`${ container_types.map(o => o.container_type).includes(ctr_type) ? 'remove' : 'add' }`)"
                                  :checked="container_types.map(o => o.container_type).includes(ctr_type)">
                            </div>
                          </div>

                          <div class="col-12 my-0 rounded px-2">
                            <div class="row gy-3 rounded w-100 m-auto pb-3 p-0">
                              <div v-for="ctr_type in container_types" :key="ctr_type" class="col-6 px-2">
                                <div class="card mb-0 border">
                                  <div class="card-header">
                                    <button type="button" class="btn-close float-end fs-11" aria-label="Close"></button>
                                    <h6 class="card-title mb-0">Order type: {{ ctr_type.container_type }}</h6>
                                  </div>
                                  <div class="card-footer border-bottom">
                                    <div class="row gy-2">
                                      <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="Quantity"
                                               v-model="ctr_type.quantity">
                                      </div>
                                      <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="Agreed rate"
                                               v-model="ctr_type.agreed_rate">
                                      </div>
                                    </div>
                                  </div>
                                  <div class="card-body row gy-3">
                                    <div v-for="c in ctr_type.container_preliminary_costs" :key="c">
                                      <div>
                                        <label class="form-label">
                                          {{ c.counterparty_id }}
                                        </label>
                                        <div class="row w-100 m-auto">
                                          <div class="col-12 px-0" v-for="category in c.category_id" :key="category">
                                            <input type="text" class="form-control my-1"
                                                   :placeholder="category.label" v-model="category.preliminary_cost">
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

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab"
                                data-previous="v-pills-order-step-2-tab"><i
                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to Counterparty
                          Expanses
                        </button>
                        <button @click="submitOrder" type="button"
                                class="btn btn-success btn-label right ms-auto nexttabnexttab"
                                data-nexttab="v-pills-finish-tab">
                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> Order Complete
                        </button>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-finish" role="tabpanel"
                         aria-labelledby="v-pills-finish-tab">
                      <div class="text-center pt-4 pb-2">

                        <div class="mb-4">
                          <lottie
                              colors="primary:#0ab39c,secondary:#405189"
                              :options="defaultOptions"
                              :height="120"
                              :width="120"
                          />
                        </div>
                        <h5>Your Order is Completed !</h5>
                        <p class="text-muted">You Will receive an order confirmation email with details of your
                          order.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--              <div class="col-lg-3">-->
              <!--                <div class="d-flex justify-content-between align-items-center mb-3">-->
              <!--                  <h5 class="fs-14 text-primary mb-0"><i class="ri-shopping-cart-fill align-middle me-2"></i> Your-->
              <!--                    cart</h5>-->
              <!--                  <span class="badge bg-danger rounded-pill">3</span>-->
              <!--                </div>-->
              <!--                <ul class="list-group mb-3">-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Order number</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">{{ order.number }}</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Second product</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">$8</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Third item</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">$5</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between bg-light">-->
              <!--                    <div class="text-success">-->
              <!--                      <h6 class="my-0">Discount code</h6>-->
              <!--                      <small>−$5 Discount</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-success">−$5</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between">-->
              <!--                    <span>Total (USD)</span>-->
              <!--                    <strong>$20</strong>-->
              <!--                  </li>-->
              <!--                </ul>-->
              <!--              </div>-->
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-6 pb-3">
      <h5 class="mb-3">Order Counterparties: </h5>
      <div v-for="c in order.counterparties" :key="c">
        <h6>Counterparty: {{ c.counterparty_id }}</h6>
        <h6>Categories: {{ c.category_id }}</h6>
        <hr class="text-muted">
      </div>
    </div>
    <div class="col-6 pb-3">
      <h5 class="mb-3">Container Types: </h5>
      <div v-for="c in container_types" :key="c">
        <h6>Quantity: {{ c.quantity }}</h6>
        <h6>Agreed rate: {{ c.agreed_rate }}</h6>
        <h6>Container type: {{ c.container_type }}</h6>
        <h6>Pre costes:</h6>
        <div v-for="i in c.container_preliminary_costs" :key="i">
          <div class="px-4">
            <hr class="text-muted my-1">
            <h6>Counterparty: {{ i.counterparty_id }}</h6>
            <h6>Categories: {{ i.category_id }}</h6>
          </div>
        </div>
        <hr class="text-muted">
      </div>
    </div>
  </div>
</template>
