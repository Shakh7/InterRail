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
      },
      product: null,
      sending_type: ''
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
          : option_type === 'destination' ? this.order.destination_id = id : null
    },
    setStationOptions(data) {

      this.order = data['order']
      this.product = data['product']
      this.sending_type = data['sending_type']

      let departure = this.order.departure
      let destination = this.order.destination
      let product = this.product

      delete this.order['departure']
      delete this.order['destination']

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

      this.order.departure_id = parseInt(departure.id)

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

      this.order.destination_id = parseInt(destination.id)

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

      this.hasData = true
    },

    async updateContainerOrder() {
      // await Swal.fire('Under maintenance')
      let order = this.$store.state.orders.currentlyUpdating['order'];
      let response = await this.updateCurrentUpdating(JSON.parse(JSON.stringify({
        order: order,
        type: 'container',
        product: this.products.selected.value,
        sending_type: this.sending_type.replace(' ', '_').toLowerCase()
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
      return this.$store.state.orders.currentlyUpdating['order'];
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
          <select class="form-select" aria-label="sending type" v-model="sending_type">
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
            <option value="In process">In process</option>
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

</template>
