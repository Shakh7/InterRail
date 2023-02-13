<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: {
    shipper: {
      type: Object,
      required: false
    },
    consignee: {
      type: Object,
      required: false
    },
    departure: {
      type: Object,
      required: false
    },
    destination: {
      type: Object,
      required: false
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

      services: [
        {
          value: '1',
          label: 'Service 1'
        },
        {
          value: '2',
          label: 'Service 2'
        },
        {
          value: '3',
          label: 'Service 3'
        }
      ],
      rows: [
        {
          forwarder: '1',
          quantity: 1,
          unit: 1,
          amount: 1,
          usd: 0
        }
      ]
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
  },
  computed: {
    totalUSD() {
      return this.rows.reduce((total, row) => total + row.amount * row.quantity, 0);
    },
    totalAmount() {
      return this.rows.reduce((total, row) => total + row.amount, 0);
    },
    totalQuantity() {
      return this.rows.reduce((total, row) => total + row.quantity, 0);
    },
    order() {
      return {
        shipper: this.shipper,
        consignee: this.consignee,
        departure: this.departure,
        destination: this.destination,
      }
    }
  }
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-xl-10">
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
              <h6 class="text-dark fw-semibold mb-1">InterRailServicesAG</h6>
              <h6>Postfach230</h6>
              <h6>Winkelriedstrasse19</h6>
              <h6>CH-9001St.Gallen/Switzerland</h6>
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
                      <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                             placeholder="SHIPPER"/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">CONSIGNEE:</th>
                    <td>
                      <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                             placeholder="CONSIGNEE"/>
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
                      <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                             placeholder="CONSIGNEE"/>
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
                      <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                             placeholder="CONSIGNEE"/>
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
            <div class="col-lg-6 lh-lg">
              TGHU589900, TGHU589900, TGHU589900, TGHU589900, TGHU589900, TGHU589900, TGHU589900
            </div>
          </div>
        </div>

        <div class="card-body p-4 pb-0 border-top border-top-dashed ">
          <div class="table-responsive">
            <table class="invoice-table table table-borderless table-nowrap mb-0">
              <thead class="align-middle text-center">
              <tr class="table-active">
                <th scope="col" style="width: 50px">#</th>
                <th scope="col">Services</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit</th>
                <th scope="col">Amount</th>
                <th scope="col">USD</th>
                <th scope="col">
                </th>
              </tr>
              </thead>
              <tbody class="text-center">
              <tr v-for="(row, n) in rows" :key="row" :id="n+1">
                <th scope="row">{{ n + 1 }}</th>
                <td class="text-start">
                  <Multiselect class="form-control w-md" v-model="row.forwarder"
                               :searchable="true" :options="services"/>
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
                    <input v-model="row.unit" type="number" class="form-control bg-light border-0"
                           placeholder="$0.00"/>
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
                    <input :value="'$'+ row.quantity * row.amount" type="text" class="form-control bg-light border-0"
                           placeholder="$0.00" readonly/>
                  </div>
                </td>
                <td>
                  <a class="btn btn-success">Delete</a>
                </td>
              </tr>

              <tr class="border-top border-top-dashed">
                <th>
                  <button class="btn btn-sm btn-soft-secondary" @click="addRow">
                    <i class="ri-add-fill me-1 align-bottom"></i> Add
                  </button>
                </th>
                <th colspan="1"></th>
                <td class="fw-semibold">{{ totalQuantity }}</td>
                <th colspan="1"></th>
                <td class="fw-semibold">${{ totalAmount }}</td>
                <td class="fw-semibold">${{ totalUSD }}</td>
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