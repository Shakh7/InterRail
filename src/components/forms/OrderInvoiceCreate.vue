<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Swal from "sweetalert2";
import axios from "axios"

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
        wrap: true,
        altFormat: "M j, Y",
        altInput: true,
      },

      date: new Date().toJSON().slice(0, 10),

      rows: [],
      orderData: null,

      detailedInfo: false,

      sscs: 'retybi'
    };
  },
  components: {
    Multiselect,
    flatPickr,
  },
  methods: {
    addRow() {
      this.orderData.freight_charges.push({
        is_new: true,
        quantity: 5,
        container_type: 1,
        agreed_rate: 1,
        total: 0
      })
    },
    removeRow(row, index) {
      if (this.orderData.freight_charges.filter(i => !i.deleted).length === 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cannot delete the last row!',
        })
      } else {
        let r = this.orderData.freight_charges[index]
        r.deleted = true
      }
    },
    async getOrder() {
      let order = await axios.get('/container_order/info_for_invoice/' + this.orderNumber + '/');
      this.orderData = order.data
      this.orderData.freight_charges.forEach(i => {
        i.forwarder = 'Add Charges'
      });
    },
    restoreRow(row, index) {
      let r = this.orderData.freight_charges[index]
      r.deleted = false
    },
  },
  // watch: {
  //   detailedInfo(newVal) {
  //     if (!newVal) return
  //     setTimeout(() => {
  //       window.scroll({
  //         top: document.body.scrollHeight * 0.5,
  //         behavior: 'smooth'
  //       });
  //     }, 100)
  //   }
  // },
  computed: {
    freightCharges: {
      get() {
        return this.orderData.freight_charges
      }
    },
    totalQuantity() {
      return this.orderData.freight_charges.filter(a => a.is_new !== true).map(i => i.quantity).reduce((a, b) => a + b, 0)
    },
    totalAmount() {
      return this.orderData.freight_charges.map(i => i.agreed_rate).reduce((a, b) => a + b, 0)
    },
    total() {
      let total = 0
      this.orderData.freight_charges.forEach(i => {
        total += i.agreed_rate * i.quantity
      })
      return total
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
              <h5 class="text-dark fw-semibold mb-1">InterRail Services AG</h5>
              <h6>Postfach230</h6>
              <h6>Winkelriedstrasse19</h6>
              <h6>CH-9001St.Gallen/Switzerland</h6>
            </div>
            <div class="col-lg-5 text-end">
              <img alt="Responsive image" class="img-fluid"
                   src="https://system.interrail.uz/img/interrail-logo.268299c8.png">
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
              <h6 class="text-dark fw-semibold mb-1">Customer</h6>
              <h6>Customer</h6>
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
                      <input :value="orderData.shipper" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="SHIPPER" readonly/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">CONSIGNEE:</th>
                    <td>
                      <input :value="orderData.consignee" type="text" class="form-control bg-light border-0"
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
                      <input :value="orderData.departure_country" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="Departure Country" readonly/>
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
                      <input :value="orderData.destination_country" type="text" class="form-control bg-light border-0"
                             id="cart-subtotal"
                             placeholder="Destination Country" readonly/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="border-top border-top-dashed px-4 py-2">
          <p class="w-75 lh-lg mb-0" v-if="orderData.containers.filter(i=>i!==null).length > 0">
            {{ orderData.containers.join(', ') }} </p>
          <p class="w-75 lh-lg mb-0 text-danger" v-else>
            Order has {{ orderData.containers.length }} container. However, the container names for your order have not been provided yet!</p>
        </div>

        <div class="card-body p-4 pb-0 border-top border-bottom border-top-dashed border-bottom-dashed">
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
              <tr class="text-center" v-for="(row, n) in freightCharges"
                  :key="n" :class="{'deleted-row bg-soft-danger' : row.deleted}">
                <td class="text-start">
                  <Multiselect :options="['Freight Charges', 'Add Charges']"
                               class="form-control w-md" v-model="row.forwarder" :searchable="true"/>
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
                  <input v-model="row.container_type" type="text" class="form-control bg-light border-0"
                         placeholder="Container Type" :readonly="!row.is_new===true"/>
                </td>
                <td class="text-end">
                  <input v-model="row.agreed_rate" type="number" class="form-control bg-light border-0"
                         placeholder="$0.00"/>
                </td>
                <td class="text-end">
                  <div>
                    <VTooltip>
                      <input :value="'$'+ (row.agreed_rate * row.quantity).toLocaleString('en-US')" type="text"
                             class="form-control bg-light border-0"
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
                <td class="fw-semibold text-center">${{ total.toLocaleString('en-US') }}</td>
                <th colspan="1"></th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="p-4 pb-0">
          <div class="form-check my-0">
            <input class="form-check-input" type="checkbox" id="detailedInfoCheckbox" v-model="detailedInfo">
            <label class="form-check-label" for="detailedInfoCheckbox">
              Include detailed information in the invoice
            </label>
          </div>
        </div>


        <div class="mt-3" v-if="detailedInfo">
          <div class="table-responsive">
            <table class="table table-nowrap">
              <thead class="text-center">
              <tr>
                <th scope="col">Container</th>
                <th scope="col">Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date</th>
                <th scope="col">Agreed Rate</th>
              </tr>
              </thead>
              <tbody class="text-center">
              <tr v-for="i in 6" :key="i">
                <td scope="row">TGHU165695{{ i }}</td>
                <td>40HC</td>
                <td>1</td>
                <td>10.03.2023</td>
                <td><a class="link-success">$400</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card-body px-4">
          <div class="hstack gap-2 justify-content-end d-print-none mt-4">
            <button type="button" class="btn btn-info" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
              <i class="ri-printer-line align-bottom me-1"></i> Detailed
            </button>
            <a href="javascript:void(0);" class="btn btn-success"><i
                class="ri-download-2-line align-bottom me-1"></i> Download
              Invoice</a>
          </div>
        </div>

      </div>
    </div>
    <!--end col-->
  </div>
  <!--end row-->


  <!-- right offcanvas -->
  <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Detailed Invoice</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body pt-0">
      <div class="h-100 d-flex flex-column text-center justify-content-between gy-3">
        <div class="table-responsive">
          <table class="table table-nowrap">
            <thead class="text-center">
            <tr>
              <th scope="col">Container</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date</th>
              <th scope="col">Agreed Rate</th>
            </tr>
            </thead>
            <tbody class="text-center">
            <tr v-for="i in 6" :key="i">
              <td scope="row">TGHU165695{{ i }}</td>
              <td>40HC</td>
              <td>1</td>
              <td>10.03.2023</td>
              <td><a class="link-success">$400</a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="w-100">
          <b-button variant="primary">Download Excel</b-button>
        </div>
      </div>
    </div>
  </div>

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
