<script>
import animationData from "@/components/widgets/lupuorrc.json";
import custom_wizard from "@/views/pages/orders/components/custom_wizard";
import Multiselect from "@vueform/multiselect";
import CoreApi from "@/api/core/core_api";
import {ordersMehtods} from "@/state/helpers";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      hasData: false,
      steps: [
        {
          title: "Order Info",
          data_target: "step1",
          active: true,
          done: true,
        },
        {
          title: "Step 2",
          data_target: "step2",
        }
      ],
      defaultOptions: {animationData: animationData},

      counterparty_list: [],
      category_list: [],

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

      order: {
        id: null,
        order_number: "1000",
        lot_number: "e-1000",
        position: "rail_forwarder",
        order_type: "export",
        customer: "jennifer_carter",
        date: "2022-07-28",
        manager: "1",
        payment_status: "reserved",

        shipper: "АO “UZ AUTO MOTORS”",
        consignee: "OOO “AZERMASH PARK”",
        departure: "Tashkent",
        departure_code: "723507",
        destination: "Баку Торговая",
        destination_code: "547209",
        border_crossing: "Border crossing",
        conditions_of_carriage: "Conditions of carriage",
        rolling_stock: "Rolling stock",
        shipment_status: "in_process",
        departure_country: "Узбекистан",
        destination_country: "Азербайджан",
        comment: "This is a comment for order 1000",
        counterparties: {
          x_times: 1
        }
      }
    };
  },
  components: {
    // lottie: Lottie,
    custom_wizard,
    Multiselect
  },
  methods: {
    ...ordersMehtods,
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
    setStationOptions(data) {

      this.hasData = true
      let departure = data.departure
      let destination = data.destination
      let product = data.product

      this.departure.options = [{
        value: parseInt(departure.id),
        label: departure.name,
        code: departure.code
      }]

      this.departure.selected = {
        value: parseInt(departure.id),
        label: departure.name,
        code: departure.code
      }

      this.destination.options = [{
        value: parseInt(destination.id),
        label: destination.name,
        code: destination.code
      }]

      this.destination.selected = {
        value: parseInt(destination.id),
        label: destination.name,
        code: destination.code
      }

      this.products.options = [{
        value: parseInt(product.id),
        label: product.name,
        hc_code: product['hc_code'],
        etcng: product['etcng_code'],
      }]

      this.products.selected = {
        value: parseInt(product.id),
        label: product.name,
        hc_code: product['hc_code'],
        etcng: product['etcng_code'],
      }
    },

    async updateContainerOrder() {
      let order = this.$store.state.orders.currentlyUpdating;
      alert(order.sending_type.replace(' ', '_').toLowerCase())
      let response = await this.updateCurrentUpdating(JSON.parse(JSON.stringify({
        order: order,
        type: 'container',
        product: this.products.selected,
        sending_type: order.sending_type.replace(' ', '_').toLowerCase()
      })))
      await Swal.fire({
        position: "center",
        icon: response.ok ? "success" : "error",
        title: response.ok ? "Order updated successfully" : "Order update failed",
        showConfirmButton: false,
        timer: 5000,
      });
      await this.$router.push({name: "order_container_list"})
    }
  },
  computed: {
    currentOrder() {
      return this.$store.state.orders.currentlyUpdating;
    },
  },
  mounted() {
    let data = this.$store.state.orders.currentlyUpdating
    data.length === 0
        ? this.$router.push({name: 'order_container_list'})
        : this.setStationOptions(data)
  },
}
;
</script>

<template>

  <custom_wizard wizard_header="Update order" :steps="steps" v-if="hasData">
    <template v-slot:content-step1-body>
      <div class="row g-3">

        <div class="col-md-4">
          <label for="lotNumber" class="form-label">Lot number</label>
          <input type="text" class="form-control" v-model="currentOrder.lot_number"
                 id="lotNumber" placeholder="Enter lot number">
        </div>

        <div class="col-md-4">
          <label for="position" class="form-label">Sending type</label>
          <select class="form-select" aria-label="sending type" v-model="currentOrder.sending_type">
            <option selected disabled>Select sending type</option>
            <option value="Single">Single</option>
            <option value="Block train">Block train</option>
          </select>
        </div>

        <div class="col-md-4 mb-3">
          <label for="position" class="form-label">Position</label>
          <select class="form-select" aria-label="order position" v-model="currentOrder.position">
            <option selected disabled>Select position</option>
            <option value="Rail forwarder">Rail forwarder</option>
            <option value="Block train">Block train</option>
            <option value="Multi modal">Multi modal</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="shipper" class="form-label">Shipper</label>
          <input type="text" class="form-control" v-model="currentOrder.shipper"
                 id="shipper" placeholder="Shipper">
        </div>

        <div class="col-md-4">
          <label for="consignee" class="form-label">Consignee</label>
          <input type="text" class="form-control" v-model="currentOrder.consignee"
                 id="consignee" placeholder="Consignee">
        </div>

        <div class="col-md-4 mb-3">
          <label for="orderType" class="form-label">Order type</label>
          <select class="form-select" aria-label="order type select"
                  v-model="currentOrder.type">
            <option selected disabled>Select order type</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
            <option value="Transit">Transit</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="shipment_status" class="form-label">Shipment status</label>
          <select class="form-select" id="shipment_status" v-model="currentOrder.shipment_status">
            <option selected disabled>Select shipment status</option>
            <option value="Block train">In process</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="payment_status" class="form-label">Payment status</label>
          <select class="form-select" id="payment_status" v-model="currentOrder.payment_status">
            <option selected disabled>Select payment status</option>
            <option value="Reserved">Reserved</option>
            <option value="Issued">Issued</option>
            <option value="Received">Received</option>
          </select>
        </div>

        <div class="col-md-4 mb-3">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" v-model="currentOrder.date">
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
          <input type="text" class="form-control" v-model="currentOrder.border_crossing"
                 placeholder="Border crossing">
        </div>

        <div class="col-md-4">
          <label class="form-label">Conditions of carriage</label>
          <input type="text" class="form-control" v-model="currentOrder.conditions_of_carriage"
                 placeholder="Conditions of carriage">
        </div>

        <div class="col-md-4 mb-3">
          <label class="form-label">Rolling stock</label>
          <input type="text" class="form-control" v-model="currentOrder.rolling_stock"
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
          <input type="text" class="form-control" v-model="currentOrder.departure_country"
                 placeholder="Departure country">
        </div>

        <div class="col-md-4">
          <label class="form-label">Destination country</label>
          <input type="text" class="form-control" v-model="currentOrder.destination_country"
                 placeholder="Destination country">
        </div>

        <div class="col-md-4 mb-3">
          <label for="payment_status" class="form-label">Customer</label>
          <select class="form-select" id="payment_status" v-model="currentOrder.customer">
            <option selected disabled>Select user</option>
            <option v-for="client in $store.state.users_list.filter(user => user.role === 'client')" :key="client"
                    :value="client.id">{{ client.full_name }}
            </option>
          </select>
        </div>

        <div class="col-12">
          <label for="comment" class="form-label">Comment</label>
          <textarea class="form-control" id="comment" rows="4" v-model="currentOrder.comment"
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

    <template v-slot:next-tab-step2>
      <button @click="updateContainerOrder()"
              type="button" class="btn btn-success btn-label right ms-auto">
        <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
        Update
      </button>
    </template>

  </custom_wizard>
  <!--  <div class="row">-->
  <!--    <div class="col-xl-12">-->
  <!--      <div class="card">-->
  <!--        <div class="card-header">-->
  <!--          <h4 class="card-title mb-0">Update order {{ currentOrder.order_number }}</h4>-->
  <!--        </div>-->
  <!--        <div class="card-body form-steps">-->
  <!--          <form class="vertical-navs-step">-->
  <!--            <div class="row gy-5">-->
  <!--              <div class="col-lg-3">-->
  <!--                <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">-->
  <!--                  <button class="nav-link active done" id="v-pills-order-info-tab" data-bs-toggle="pill"-->
  <!--                          data-bs-target="#v-pills-order-info" type="button" role="tab"-->
  <!--                          aria-controls="v-pills-order-info" aria-selected="true">-->
  <!--                    <span class="step-title me-2">-->
  <!--                      <i class="ri-close-circle-fill step-icon me-2"></i>-->
  <!--                      Step 1-->
  <!--                    </span>-->
  <!--                    Order Info-->
  <!--                  </button>-->
  <!--                  <button class="nav-link" id="v-pills-order-step-2-tab" data-bs-toggle="pill"-->
  <!--                          data-bs-target="#v-pills-order-step-2" type="button" role="tab"-->
  <!--                          aria-controls="v-pills-order-step-2" aria-selected="false">-->
  <!--                                                            <span class="step-title me-2">-->
  <!--                                                                <i class="ri-close-circle-fill step-icon me-2"></i>-->
  <!--                                                                Step 2-->
  <!--                                                            </span>-->
  <!--                    Product info-->
  <!--                  </button>-->
  <!--                  <button class="nav-link" id="v-pills-payment-tab" data-bs-toggle="pill"-->
  <!--                          data-bs-target="#v-pills-payment" type="button" role="tab" aria-controls="v-pills-payment"-->
  <!--                          aria-selected="false">-->
  <!--                                                            <span class="step-title me-2">-->
  <!--                                                                <i class="ri-close-circle-fill step-icon me-2"></i>-->
  <!--                                                                Step 3-->
  <!--                                                            </span>-->
  <!--                    Counterparty info-->
  <!--                  </button>-->
  <!--                  <button class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill"-->
  <!--                          data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish"-->
  <!--                          aria-selected="false">-->
  <!--                                                            <span class="step-title me-2">-->
  <!--                                                                <i class="ri-close-circle-fill step-icon me-2"></i>-->
  <!--                                                                Step 4-->
  <!--                                                            </span>-->
  <!--                    Finish-->
  <!--                  </button>-->
  <!--                </div>-->

  <!--                &lt;!&ndash; end nav &ndash;&gt;-->
  <!--              </div>-->
  <!--              <div class="col-lg-9">-->
  <!--                <div class="px-lg-4">-->
  <!--                  <div class="tab-content">-->
  <!--                    <div class="tab-pane fade show active" id="v-pills-order-info" role="tabpanel"-->
  <!--                         aria-labelledby="v-pills-order-info-tab">-->

  <!--                      <div>-->
  <!--                        <div class="row g-3">-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Order number</label>-->
  <!--                            <input v-model="order.order_number" type="number" class="form-control"-->
  <!--                                   placeholder="Enter order number">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="lotNumber" class="form-label">Lot number</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.lot_number"-->
  <!--                                   id="lotNumber" placeholder="Enter lot number">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-3">-->
  <!--                            <label for="position" class="form-label">Position</label>-->
  <!--                            <select class="form-select" aria-label="order position" v-model="order.position">-->
  <!--                              <option selected disabled>Select position</option>-->
  <!--                              <option value="rail_forwarder">Rail forwarder</option>-->
  <!--                              <option value="block_train">Block train</option>-->
  <!--                              <option value="multi_modal">Multi modal</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="shipper" class="form-label">Shipper</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.shipper"-->
  <!--                                   id="shipper" placeholder="Shipper">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="consignee" class="form-label">Consignee</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.consignee"-->
  <!--                                   id="consignee" placeholder="Consignee">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-3">-->
  <!--                            <label for="orderType" class="form-label">Order type</label>-->
  <!--                            <select class="form-select" aria-label="order type select" v-model="order.order_type">-->
  <!--                              <option selected disabled>Select order type</option>-->
  <!--                              <option value="import">Import</option>-->
  <!--                              <option value="export">Export</option>-->
  <!--                              <option value="transit">Transit</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-md-7">-->
  <!--                            <label for="departure" class="form-label">Departure</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.departure"-->
  <!--                                   id="departure" placeholder="Departure">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-5 mb-3">-->
  <!--                            <label for="departure_code" class="form-label">Departure code</label>-->
  <!--                            <input type="number" class="form-control" v-model="order.departure_code"-->
  <!--                                   id="departure_code" placeholder="Departure code">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-7">-->
  <!--                            <label for="destination" class="form-label">Destination</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.destination"-->
  <!--                                   id="destination" placeholder="Destination">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-5">-->
  <!--                            <label for="destination_code" class="form-label">Destination code</label>-->
  <!--                            <input type="number" class="form-control"-->
  <!--                                   id="destination_code" v-model="order.destination_code"-->
  <!--                                   placeholder="Destination code">-->
  <!--                          </div>-->

  <!--                        </div>-->
  <!--                      </div>-->

  <!--                      <div class="d-flex align-items-start gap-3 mt-4">-->
  <!--                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab-->
  <!--                            nexttab" data-nexttab="v-pills-order-step-2-tab">-->
  <!--                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>-->
  <!--                          Go to next-->
  <!--                        </button>-->
  <!--                      </div>-->

  <!--                    </div>-->
  <!--                    &lt;!&ndash; end tab pane &ndash;&gt;-->
  <!--                    <div class="tab-pane fade" id="v-pills-order-step-2" role="tabpanel"-->
  <!--                         aria-labelledby="v-pills-order-step-2-tab">-->

  <!--                      <div>-->
  <!--                        <div class="row g-3">-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Border crossing</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.border_crossing"-->
  <!--                                   placeholder="Border crossing">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Conditions of carriage</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.conditions_of_carriage"-->
  <!--                                   placeholder="Conditions of carriage">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-3">-->
  <!--                            <label class="form-label">Rolling stock</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.rolling_stock"-->
  <!--                                   placeholder="Rolling stock">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="shipment_status" class="form-label">Shipment status</label>-->
  <!--                            <select class="form-select" id="shipment_status" v-model="order.shipment_status">-->
  <!--                              <option selected disabled>Select shipment status</option>-->
  <!--                              <option value="in_process">In process</option>-->
  <!--                              <option value="delivered">Delivered</option>-->
  <!--                              <option value="completed">Completed</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="payment_status" class="form-label">Payment status</label>-->
  <!--                            <select class="form-select" id="payment_status" v-model="order.payment_status">-->
  <!--                              <option selected disabled>Select payment status</option>-->
  <!--                              <option value="reserved">Reserved</option>-->
  <!--                              <option value="issued">Issued</option>-->
  <!--                              <option value="received">Received</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-3">-->
  <!--                            <label for="date" class="form-label">Date</label>-->
  <!--                            <input type="date" class="form-control" id="date" v-model="order.date">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Departure country</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.departure_country"-->
  <!--                                   placeholder="Departure country">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Destination country</label>-->
  <!--                            <input type="text" class="form-control" v-model="order.destination_country"-->
  <!--                                   placeholder="Destination country">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-3">-->
  <!--                            <label for="payment_status" class="form-label">Customer</label>-->
  <!--                            <select class="form-select" id="payment_status" v-model="order.customer">-->
  <!--                              <option selected disabled>Select payment status</option>-->
  <!--                              <option value="frank_hook">Frank Hook</option>-->
  <!--                              <option value="jennifer_carter">Jennifer Carter</option>-->
  <!--                              <option value="donald_palmer">Donald Palmer</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-12">-->
  <!--                            <label for="comment" class="form-label">Comment</label>-->
  <!--                            <textarea class="form-control" id="comment" rows="4" v-model="order.comment"-->
  <!--                                      placeholder="Enter comment here.."></textarea>-->
  <!--                          </div>-->

  <!--                        </div>-->

  <!--                        <hr class="my-4 text-muted">-->

  <!--                        <div class="form-check">-->
  <!--                          <input type="checkbox" class="form-check-input" id="save-info">-->
  <!--                          <label class="form-check-label" for="save-info">Save this information for next-->
  <!--                            time</label>-->
  <!--                        </div>-->

  <!--                      </div>-->

  <!--                      <div class="d-flex align-items-start gap-3 mt-4">-->
  <!--                        <button type="button" class="btn btn-light btn-label previestab"-->
  <!--                                data-previous="v-pills-bill-info-tab"><i-->
  <!--                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to Order Info-->
  <!--                        </button>-->
  <!--                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab-->
  <!--nexttab" data-nexttab="v-pills-payment-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to-->
  <!--                          counterparty-->
  <!--                        </button>-->
  <!--                      </div>-->

  <!--                    </div>-->
  <!--                    &lt;!&ndash; end tab pane &ndash;&gt;-->
  <!--                    <div class="tab-pane fade" id="v-pills-payment" role="tabpanel"-->
  <!--                         aria-labelledby="v-pills-payment-tab">-->
  <!--                      &lt;!&ndash;                      <div>&ndash;&gt;-->
  <!--                      &lt;!&ndash;                        <h5>Counterparty details</h5>&ndash;&gt;-->
  <!--                      &lt;!&ndash;                        <p class="text-muted">Fill all information below</p>&ndash;&gt;-->
  <!--                      &lt;!&ndash;                      </div>&ndash;&gt;-->

  <!--                      <div>-->
  <!--                        &lt;!&ndash;                        <div class="my-3">&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          <div class="form-check form-check-inline">&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <input id="credit" name="paymentMethod" type="radio" class="form-check-input"&ndash;&gt;-->
  <!--                        &lt;!&ndash;                                   checked&ndash;&gt;-->
  <!--                        &lt;!&ndash;                                   required>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <label class="form-check-label" for="credit">Credit card</label>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          </div>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          <div class="form-check form-check-inline">&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <input id="debit" name="paymentMethod" type="radio" class="form-check-input"&ndash;&gt;-->
  <!--                        &lt;!&ndash;                                   required>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <label class="form-check-label" for="debit">Debit card</label>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          </div>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          <div class="form-check form-check-inline">&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <input id="paypal" name="paymentMethod" type="radio" class="form-check-input"&ndash;&gt;-->
  <!--                        &lt;!&ndash;                                   required>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                            <label class="form-check-label" for="paypal">PayPal</label>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                          </div>&ndash;&gt;-->
  <!--                        &lt;!&ndash;                        </div>&ndash;&gt;-->

  <!--                        <div class="row gy-3" v-for="c in order.counterparties.x_times" :key="c">-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label for="containerType" class="form-label">Container type</label>-->
  <!--                            <select class="form-select" aria-label="order position">-->
  <!--                              <option selected disabled>Select container type</option>-->
  <!--                              <option value="20">20</option>-->
  <!--                              <option value="20HC">20HC</option>-->
  <!--                              <option value="40">40</option>-->
  <!--                              <option value="40HC">40HC</option>-->
  <!--                              <option value="45">45</option>-->
  <!--                            </select>-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4">-->
  <!--                            <label class="form-label">Quantity</label>-->
  <!--                            <input type="number" class="form-control"-->
  <!--                                   placeholder="Quantity">-->
  <!--                          </div>-->

  <!--                          <div class="col-md-4 mb-4">-->
  <!--                            <label class="form-label">Agreed rate</label>-->
  <!--                            <input type="number" class="form-control"-->
  <!--                                   placeholder="Agreed rate">-->
  <!--                          </div>-->

  <!--                        </div>-->

  <!--                        <div>-->
  <!--                          <button type="button" class="btn btn-soft-success btn-label previestab"-->
  <!--                                  data-previous="v-pills-order-step-2-tab" @click="order.counterparties.x_times++">-->
  <!--                            <i class=" ri-add-fill label-icon align-middle fs-16 me-2"></i> Add-->
  <!--                          </button>-->
  <!--                        </div>-->

  <!--                      </div>-->

  <!--                      <div class="d-flex align-items-start gap-3 mt-4">-->
  <!--                        <button type="button" class="btn btn-light btn-label previestab"-->
  <!--                                data-previous="v-pills-order-step-2-tab"><i-->
  <!--                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to product-->
  <!--                          Info-->
  <!--                        </button>-->

  <!--                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab"-->
  <!--                                data-nexttab="v-pills-finish-tab">-->
  <!--                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> Order Complete-->
  <!--                        </button>-->

  <!--                      </div>-->
  <!--                    </div>-->
  <!--                    &lt;!&ndash; end tab pane &ndash;&gt;-->
  <!--                    <div class="tab-pane" id="v-pills-finish" role="tabpanel"-->
  <!--                         aria-labelledby="v-pills-finish-tab">-->
  <!--                      <div class="text-center pt-4 pb-2">-->

  <!--                        <div class="mb-4">-->
  <!--                          <lottie-->
  <!--                              colors="primary:#0ab39c,secondary:#405189"-->
  <!--                              :options="defaultOptions"-->
  <!--                              :height="120"-->
  <!--                              :width="120"-->
  <!--                          />-->
  <!--                        </div>-->
  <!--                        <h5>Your Order is Completed !</h5>-->
  <!--                        <p class="text-muted">You Will receive an order confirmation email with details of your-->
  <!--                          order.</p>-->
  <!--                      </div>-->
  <!--                    </div>-->
  <!--                    &lt;!&ndash; end tab pane &ndash;&gt;-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              &lt;!&ndash;              <div class="col-lg-3">&ndash;&gt;-->
  <!--              &lt;!&ndash;                <div class="d-flex justify-content-between align-items-center mb-3">&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <h5 class="fs-14 text-primary mb-0"><i class="ri-shopping-cart-fill align-middle me-2"></i> Your&ndash;&gt;-->
  <!--              &lt;!&ndash;                    cart</h5>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <span class="badge bg-danger rounded-pill">3</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                </div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                <ul class="list-group mb-3">&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <li class="list-group-item d-flex justify-content-between lh-sm">&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <h6 class="my-0">Order number</h6>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <small class="text-muted">Brief description</small>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    </div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <span class="text-muted">{{ order.number }}</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  </li>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <li class="list-group-item d-flex justify-content-between lh-sm">&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <h6 class="my-0">Second product</h6>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <small class="text-muted">Brief description</small>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    </div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <span class="text-muted">$8</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  </li>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <li class="list-group-item d-flex justify-content-between lh-sm">&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <h6 class="my-0">Third item</h6>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <small class="text-muted">Brief description</small>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    </div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <span class="text-muted">$5</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  </li>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <li class="list-group-item d-flex justify-content-between bg-light">&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <div class="text-success">&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <h6 class="my-0">Discount code</h6>&ndash;&gt;-->
  <!--              &lt;!&ndash;                      <small>−$5 Discount</small>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    </div>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <span class="text-success">−$5</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  </li>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  <li class="list-group-item d-flex justify-content-between">&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <span>Total (USD)</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;                    <strong>$20</strong>&ndash;&gt;-->
  <!--              &lt;!&ndash;                  </li>&ndash;&gt;-->
  <!--              &lt;!&ndash;                </ul>&ndash;&gt;-->
  <!--              &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--            </div>-->
  <!--          </form>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
