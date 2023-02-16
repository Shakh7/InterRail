<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import OrderApi from "../../api/order/OrderApi";
import Swal from "sweetalert2";

export default {
  props: {
    orderNumber: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
      },

      date: null,

      rows: [],
      orderData: null,

      sscs: 'retybi'
    };
  },
  components: {
    Multiselect,
    flatPickr,
  },
  methods: {
    addRow() {
      this.rows.push({
        forwarder: null,
        quantity: 5,
        unit: 1,
        amount: 1,
        usd: 0
      })
    },
    removeRow(row, index) {
      if (this.rows.filter(i => !i.deleted).length === 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cannot delete the last row!',
        })
      } else {
        let r = this.rows[index]
        r.deleted = true
      }
    },
    async getOrder() {
      let api = new OrderApi();
      let order = await api.getOrderByNumber(this.orderNumber);
      this.orderData = order;
      this.date = this.order.date


      this.orderData[0]['container_types'].forEach(c => {
        c.container_preliminary_costs.forEach(f => {
          this.rows.push({
            forwarder: f.counterparty.counterparty.id,
            quantity: c.quantity,
            unit: c.container_type,
            amount: c.agreed_rate,
            deleted: false,
            deleted_and_hidden: false,
          })
        })
      })
    },

    restoreRow(row, index) {
      let r = this.rows[index]
      r.deleted = false
    },
  },
  computed: {
    totalUSD() {
      return this.rows.filter(i => !i.deleted).reduce((total, row) => (parseFloat(total) + (parseFloat(row.amount) * parseFloat(row.quantity))).toFixed(2).toLocaleString('en-US'), 0);
    },
    totalAmount() {
      return this.rows.filter(i => !i.deleted).reduce((total, row) => (parseFloat(total) + parseFloat(row.amount)).toFixed(2), 0);
    },
    totalQuantity() {
      return this.rows.filter(i => !i.deleted).reduce((total, row) => total + row.quantity, 0);
    },
    order() {
      return this.orderData[0]['order']
    },
    counterparties() {
      return this.orderData[0]['order']['counterparties'].map(c => {
        return {
          value: c.counterparty.id,
          label: c.counterparty.name
        }
      })
    },
    containers: {
      get() {
        let containers = []
        this.orderData[0]['container_types'].forEach(c => {
          c['expanses'].filter(v => v.container !== null).forEach(e => {
            containers.push({
              container_type: c.container_type,
              container: e.container.name,
            })
          })
        })
        return containers
      }
    },
    customer() {
      return this.$store.state.users_list.filter(user => user.id === this.order.customer)[0];
    },
  },
  async mounted() {
    await this.getOrder()
  }
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-xl-9" v-if="orderData">
      <div class="card">

        <div class="card-body border-bottom border-bottom-dashed p-4 pb-2">

          <div class="row justify-content-between">
            <div class="col-lg-4">
              <h5 class="text-dark fw-semibold mb-1">InterRailServicesAG</h5>
              <h6>Postfach230</h6>
              <h6>Winkelriedstrasse19</h6>
              <h6>CH-9001St.Gallen/Switzerland</h6>
            </div>
            <div class="col-lg-5 text-end">
              <div class="profile-user mb-3">
                      <span
                          class="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                          style="height: 60px; width: 256px">
                        <img src="http://10.0.2.241:8080/img/interrail-logo.268299c8.png"
                             class="card-logo user-profile-image img-fluid" alt="logo dark"/>
                      </span>
              </div>
              <div class="mt-4">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm table-nowrap align-middle mb-0">
                    <tbody>
                    <tr>
                      <th scope="row">INVOICE NO:</th>
                      <td style="width: 150px">
                        <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                               placeholder="U78968.22" readonly/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="card-body p-4 py-3">
          <div class="row align-items-end justify-content-between">
            <div class="col-lg-5 col-sm-6">
              <h6 class="text-dark fw-semibold mb-1">{{ customer['full_name'] }}</h6>
              <h6>{{ customer['email'] }}</h6>
              <h6>Customer</h6>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div>
                <label for="date-field">St.Gallen,Date:</label>
                <flat-pickr v-model="date" id="invoicedate" placeholder="Select date and time" :config="config"
                            class="form-control bg-light border-light border-0"></flat-pickr>
              </div>
            </div>
          </div>
          <!--end row-->
        </div>

        <div class="card-body p-4 py-3 border-top border-top-dashed">
          <div class="row align-items-end justify-content-between">
            <div class="col-lg-6">
              <div class="table-responsive">
                <table class="table table-borderless table-sm table-nowrap align-middle mb-0">
                  <tbody>
                  <tr>
                    <th scope="row">SHIPPER:</th>
                    <td>
                      <input :value="order.shipper" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="SHIPPER" readonly/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">CONSIGNEE:</th>
                    <td>
                      <input :value="order.consignee" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="CONSIGNEE" readonly/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row align-items-end justify-content-between">
            <div class="col-lg-6">
              <div class="table-responsive">
                <table class="table table-borderless table-sm table-nowrap align-middle mb-0">
                  <tbody>
                  <tr>
                    <th scope="row" class="pe-4">
                      <span class="pe-3">FROM:</span>
                    </th>
                    <td>
                      <input :Value="order.departure_country" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="CONSIGNEE" readonly/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="table-responsive">
                <table class="table table-borderless table-sm table-nowrap align-middle mb-0">
                  <tbody>
                  <tr>
                    <th scope="row" class="pe-5">
                      <span class="pe-3">TO:</span>
                    </th>
                    <td>
                      <input :value="order.destination_country" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="CONSIGNEE" readonly/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body p-4 py-2 border-top border-top-dashed">
          <div class="row align-items-end justify-content-between">
            <div class="col-11 col-lg-9 lh-lg">
              {{ containers.map(c => c.container).join(', ') }}
            </div>
            <div class="col-1 col-lg-3 lh-lg text-end fw-semibold">
              <VTooltip>
                  <span>{{ containers.map(c => c.container).length }}/
                    {{ this.orderData[0].container_types.map(c => c.quantity).reduce((a, b) => a + b, 0) }}</span>
                <template #popper>
                  Showing <span class="fw-semibold">
                  {{ containers.map(c => c.container).length }}</span> container out of
                  <span class="fw-semibold">
                    {{ this.orderData[0].container_types.map(c => c.quantity).reduce((a, b) => a + b, 0) }}</span>
                </template>
              </VTooltip>
            </div>
          </div>
        </div>

        <div class="card-body p-4 pb-0 border-top border-top-dashed ">
          <div class="table-responsive">
            <table class="table table-borderless table-nowrap mb-0">
              <thead class="align-middle text-center">
              <tr class="table-active">
                <th scope="col">Services</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit</th>
                <th scope="col">Amount</th>
                <th scope="col">USD</th>
                <th scope="col">
                </th>
              </tr>
              </thead>
              <tbody>

              <tr class="text-center" v-for="(row, n) in rows.filter(r => r.deleted_and_hidden === false)"
                  :key="row.forwarder" :id="n+1" :class="{'bg-soft-danger deleted-row' : row.deleted}">
                <td class="text-start">
                  <Multiselect class="form-control w-md" v-model="row.forwarder"
                               :searchable="true" :options="counterparties"/>
                </td>
                <td>
                  <div class="input-step">
                    <button type="button" v-if="row.quantity >=1" @click="row.quantity--">–</button>
                    <button type="button" v-else>–</button>
                    <input type="number" v-model="row.quantity" readonly/>
                    <button type="button" @click="row.quantity++">+</button>
                  </div>
                </td>
                <td class="text-end">
                  <div>
                    <input v-model="row.unit" type="text" class="form-control bg-light border-0"
                           placeholder="Unit" readonly/>
                  </div>
                </td>
                <td class="text-end">
                  <div>
                    <input v-model="row.amount" type="number" class="form-control bg-light border-0"
                           placeholder="$0.00"/>
                  </div>
                </td>
                <td class="text-end">
                  <div>
                    <VTooltip>
                      <input :value="'$'+ row.quantity * row.amount" type="text" class="form-control bg-light border-0"
                             placeholder="$0.00" readonly/>
                      <template #popper>
                        <span>This field is read only</span>
                      </template>
                    </VTooltip>
                  </div>
                </td>
                <td class="pt-3">

                  <b-button v-if="row.deleted" @click="restoreRow(row, n)" variant="success" size="sm"
                            class="waves-effect waves-light" style="z-index: 999">
                    <i class="ri-arrow-go-back-line"></i>
                  </b-button>

                  <b-button v-else-if="!row.deleted" @click="removeRow(row, n)" variant="danger" size="sm"
                            class="waves-effect waves-light">
                    <i class="ri-delete-bin-7-line"></i>
                  </b-button>

                </td>
              </tr>

              <tr class="border-top border-top-dashed">
                <th>
                  <button class="btn btn-sm btn-soft-secondary" @click="addRow">
                    <i class="ri-add-fill me-1 align-bottom"></i> Add
                  </button>
                </th>
                <td class="fw-semibold text-center">{{ totalQuantity }}</td>
                <th colspan="1"></th>
                <td class="fw-semibold text-center">${{ totalAmount }}</td>
                <td class="fw-semibold text-center">${{ totalUSD }}</td>
                <th colspan="1"></th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card-body p-4 border-top border-top-dashed ">
          <div class="hstack gap-2 justify-content-end d-print-none mt-4">
            <button type="button" class="btn btn-success">
              <i class="ri-printer-line align-bottom me-1"></i> Save
            </button>
            <a href="javascript:void(0);" class="btn btn-primary"><i
                class="ri-download-2-line align-bottom me-1"></i> Download
              Invoice</a>
            <a href="javascript:void(0);" class="btn btn-danger"><i
                class="ri-send-plane-fill align-bottom me-1"></i> Send
              Invoice</a>
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>
  <!--end row-->
</template>

<style scoped>
.deleted-row {
  position: relative;
}

.deleted-row::after {
  content: "Deleted";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  padding-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
