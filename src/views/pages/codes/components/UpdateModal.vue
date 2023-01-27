<template>
  <div id="CodeUpdateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">

        <div class="modal-header p-3">
          <h5 class="modal-title">Code update</h5>
          <button id="CodeUpdateModalCloseBtn" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>

        <div v-if="form !== null"
             class="py-3 bg-light border-top border-bottom border-top-dashed border-bottom-dashed">
          <div class="row justify-content-between gy-4">
            <div class="col-6 col-lg-3 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Application Number :</p>
                <h5 class="fs-15 mb-0">
                  <span class="badge badge-gradient-info">{{ code.application_number }}</span>
                </h5>
              </div>
            </div>
            <div class="col-6 col-lg-3 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Code :</p>
                <h5 class="fs-15 mb-0">
                  <span v-if="code.number !== null" class="badge bg-primary">{{
                      code.number
                    }}</span>
                  <span v-else class="text-danger">--</span>
                </h5>
              </div>
            </div>
            <div class="col-6 col-lg-3 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Date :</p>
                <h5 class="fs-15 my-0"><span v-if="code.date">{{ code.date }}</span></h5>
              </div>
            </div>
            <div class="col-6 col-lg-3 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Manager :</p>
                <h5 class="fs-15 my-0">
                  <user :userId="code.manager" align="center"></user>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <section v-if="form !== null" class="px-4">
          <form class="row justify-content-between gx-3">
            <div class="col-12 col-lg-6 pe-3">
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Order number:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <SelectOrder @onSelect="handleOrderSelect"
                               :current_order="code.order_number.toString()"
                               :loading_type="code.loading_type"
                               placeholder="Order number"
                               :classList="'border-0 pe-0'"
                               styles="max-height: 28px"/>
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Forwarder:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <Multiselect v-model="code.forwarder_id" :options="forwarders" class="border-0 pe-0"
                               :searchable="true" placeholder="Forwarder" :caret="false" style="max-height: 28px"/>
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">SMGS number:</label>
                </div>
                <div class="col-lg-7">
                  <input v-model="code.smgs_number" type="text" class="form-control form-control-sm border-0"
                         placeholder="SMGS number">
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Loading type:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <Multiselect v-model="code.loading_type" :options="loadingTypeOptions"
                               class="border-0 pe-0" :caret="false" :searchable="true" placeholder="Loading type"
                               style="max-height: 28px"/>
                </div>
              </div>
              <div v-if="code.loading_type === 'Container'" class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Container type:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <Multiselect v-model="code.container_type" :options="['20', '40']" :searchable="true"
                               class="border-0 pe-0" :caret="false" placeholder="Container type"
                               style="max-height: 28px"/>
                </div>
              </div>
              <div v-if="code.loading_type === 'Container'" class="row py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Container number:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <Multiselect v-model="code.container_expanse_id" :options="containerList" :searchable="true" style="max-height: 28px"
                               placeholder="Container" class="border-0 pe-0"
                              @input="code.container_expanse_id = $event"/>
                </div>
              </div>
              <div v-if="code.loading_type === 'Wagon'" class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Weight:</label>
                </div>
                <div class="col-lg-7">
                  <input v-model="code.weight" type="text" class="form-control form-control-sm border-0"
                         placeholder="Weight">
                </div>
              </div>


            </div>
            <div class="col-12 col-lg-6 pe-3">
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Status:</label>
                </div>
                <div class="col-lg-7 text-end ps-1">
                  <Multiselect v-model="code.status" :options="statusOptions" :caret="false"
                               class="border-0 pe-0" placeholder="Status" style="max-height: 28px"
                  >
                    <template v-slot:singlelabel="label">
                      <div class="w-100 text-start">
                        <span class="text-start" :class="'text-' + label.value.color">{{ label.value.label }}</span>
                      </div>
                    </template>
                    <template v-slot:option="props">
                      <span :class="'fw-medium text-' + props.option.color">{{ props.option.label }}</span>
                    </template>
                  </Multiselect>
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Rate:</label>
                </div>
                <div class="col-lg-7 text-end">
                  <input v-model="code.rate" type="number" class="form-control form-control-sm border-0"
                         placeholder="Rate">
                </div>
              </div>

              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Add charges:</label>
                </div>
                <div class="col-lg-7 text-end">
                  <input v-model="code.add_charges" type="number" class="form-control form-control-sm border-0"
                         placeholder="Add charges">
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Charges:</label>
                </div>
                <div class="col-lg-7 text-end">
                  <input v-model="code.charges" type="number" class="form-control form-control-sm border-0"
                         placeholder="Add charges">
                </div>
              </div>
              <div class="row border-bottom py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label class="form-label my-0">Wagon number:</label>
                </div>
                <div class="col-lg-7">
                  <input v-model="code.wagon_number" type="text" class="form-control form-control-sm border-0"
                         placeholder="Wagon number">
                </div>
              </div>

              <div class="row py-2 align-items-center">
                <div class="col-lg-5 py-2">
                  <label for="meassageInput" class="form-label my-0">Customer:</label>
                </div>
                <div class="col-lg-7 ps-1">
                  <Multiselect v-model="code.customer" :options="customers" :searchable="true" :caret="false"
                               class="border-0 pe-0" placeholder="Container type" style="max-height: 28px"/>
                </div>
              </div>
            </div>
          </form>

        </section>

        <section class="px-4 pt-4 pb-3 bg-light mb-3 border-top border-bottom" v-if="form !== null">
          <div class="row mb-2">
            <SelectProduct :ratio="[3,3,3]" :current_product="code.product"
                           @onSelect="this.code.product = { id: $event.value, name: $event.label, hc_code: $event.hc_code, etcng_code: $event.etcng }"/>

            <div class="col-12 col-lg-3 mb-3">
              <label class="form-label">Territory</label>
              <Multiselect v-model="code.territory_id" :options="territories" :multiple="true"
                           :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                           placeholder="Select" :preselect-first="true"/>
            </div>
          </div>

          <div class="row">
            <SelectStations
                :ratio="[3,3,3,3]" :current_departure="code.departure"
                :current_destination="code.destination"
                @onSelect="onStationSelect($event)"/>
          </div>
        </section>

        <section v-if="form !== null" class="px-4 pb-3">
          <div class="mb-3">
            <label class="form-label">Comment</label>
            <textarea v-model="code.comment" class="form-control" rows="3" placeholder="Comment"></textarea>
          </div>


          <div class="hstack flex-wrap gap-2 mb-lg-0">
            <button @click="saveCode()" class="btn btn-success w-100" :disabled="isFormValid">Save</button>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import user from '../../../../components/custom/user.vue'
import SelectProduct from "../../../../components/custom/SelectProduct.vue";
import SelectStations from "../../../../components/custom/SelectStations.vue";
// import Swal from "sweetalert2";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import CounterpartyApi from "../../../../api/counterparty/CounterpartyApi.js";
import Swal from "sweetalert2";
import SelectOrder from "../../../../components/custom/SelectOrder.vue";

export default {
  emits: ['update'],
  name: "PreviewModal",
  components: {
    user,
    SelectProduct,
    SelectStations,
    Multiselect,
    SelectOrder
  },
  data() {
    return {
      form: null,
      order_numbers: [],
      statusOptions: [
        {value: 'Checking', label: 'Checking', color: 'warning'},
        {value: 'Used', label: 'Used', color: 'secondary'},
        {value: 'Completed', label: 'Completed', color: 'success'},
        {value: 'Canceled', label: 'Canceled', color: 'danger'},
      ],
      loadingTypeOptions: [
        {value: 'Container', label: 'Container'},
        {value: 'Wagon', label: 'Wagon'},
      ],
      territories: [],
      forwarders: [],
      containerList: [],
    }
  },
  props: {
    codeData: {
      type: Object,
      default: () => {
      },
    },
  },
  methods: {
    async saveCode() {
      let code = {
        ...this.code
      }

      code.departure_id = code.departure.id
      code.destination_id = code.destination.id
      code.product_id = code.product.id
      code.loading_type = code.loading_type.toLowerCase()
      code.status = code.status.toLowerCase()
      code.wagon_number = code.loading_type === 'wagon' ? code.wagon_number : ' '
      code.smgs_number = code.smgs_number === null ? ' ' : code.smgs_number
      code.charges = code.charges === '' ? 0 : code.charges
      code.add_charges = code.add_charges === '' ? 0 : code.add_charges

      code.container_type = code.loading_type === 'wagon' ? '' : code.container_type
      code.weight = code.loading_type === 'container' ? '' : code.weight

      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/list/${this.code.id}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(code),
      });

      if (request.ok) {
        document.getElementById('CodeUpdateModalCloseBtn').click()
        this.$emit('update')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Code has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    async getTerritories() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/territories/`);
      let response = await request.json()

      this.territories = request.ok ? response.results.map(territory => {
        return {
          value: territory.id,
          label: territory.name
        }
      }) : []
    },

    async getForwarders() {
      let api = new CounterpartyApi()
      let response = await api.getCounterparties()
      this.forwarders = response.results.map(forwarder => {
        return {
          value: forwarder.id,
          label: forwarder.name
        }
      })
    },

    onStationSelect(event) {
      if (event.option === 'departure') {
        this.code.departure = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      } else {
        this.code.destination = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      }
    },

    async handleOrderSelect(event) {
      if (event !== null) {
        this.code.order_number = event
        await this.getContainerList(event)
      } else {
        this.containerList = []
      }
    },

    async getContainerList(order_number) {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/containers/${order_number}/`)
      let response = await request.json()
      this.containerList = !request.ok
          ? [] : response.filter(i => i.container_name !== null).map(container => {
            return {
              value: container.container_expanse_id,
              label: container.container_name
            }
          })
    }

  },
  computed: {
    code() {
      return this.form
    },
    customers: {
      get() {
        return this.$store.state.users_list.filter(c => c.role === 'client').map(i => {
          return {
            value: i.id,
            label: i.full_name,
          }
        })
      }
    },

    isFormValid() {
      let order_number = this.code.order_number === ''
      let forwarder = this.code.forwarder_id === null
      let loading_type = this.code.loading_type === null
      let container_type = false
      let container = false
      let weight = ''

      if (this.code.loading_type === 'Wagon') {
        weight = this.code.weight === null
      } else {
        container_type = this.code.container_type === null || this.code.container_type === ''
      }

      return forwarder || loading_type || container_type || container || weight || order_number
    }
  },
  watch: {
    codeData: {
      handler(val) {
        this.form = {
          id: val.id,
          number: val.number,
          order_number: val.order_number === null ? '' : val.order_number,
          sub_codes: val.sub_codes,
          date: val.date,
          application_number: val.application_number,
          forwarder_id: val.forwarder_id,
          territory_id: val.territory.id,
          smgs_number: val.smgs_number === null ? '' : val.smgs_number,
          smgs_date: val.smgs_date,
          departure: val.departure,
          destination: val.destination,
          product: val.product,
          loading_type: val.loading_type,
          container_type: val.container_type,
          status: val.status,
          weight: val.weight === null ? '' : val.weight,
          wagon_number: val.wagon_number,

          rate: val.rate,
          charges: val.charges,
          add_charges: val.add_charges,
          comment: val.comment,
          smgs_file: val.smgs_file,
          manager: val.manager,
          customer: val.customer,
          container_expanse_id: val.container_expanse_id,
          wagon_expanse_id: null,
          wagon_empty_expanse_id: null,
        }

        if (this.form.order_number !== '') {
          this.getContainerList(this.form.order_number)
        }
      },
      deep: true
    }
  },
  async mounted() {
    await this.getTerritories()
    await this.getForwarders()
  }
}
</script>

<style scoped>

</style>