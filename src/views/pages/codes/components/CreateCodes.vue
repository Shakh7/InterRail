<template>
  <div id="codeCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header p-3">
          <h5 class="modal-title">Create Code</h5>
          <button id="codeCreateModalCloseBtn" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>

        <section class="bg-light">
          <div class="row px-4 mb-1">

            <div class="col-md-6 mb-3 pt-3">
              <label for="counterpartySelect" class="form-label">Counterparty {{ forwarder_id }}</label>
              <Multiselect :options="counterpartyOptions"
                           v-model="forwarder_id"
                           :searchable="true"
                           placeholder="Select counterparty"/>
            </div>


            <div class="col-md-6 mb-3 pt-3">
              <label for="orderNumberSelect" class="form-label">Order {{ order_number }}</label>
              <Multiselect :options="orderOptions"
                           v-model="order_number"
                           :searchable="true"
                           :disabled="forwarder_id === null"
                           placeholder="Select order"/>
            </div>

          </div>
        </section>

        <div v-if="(this.order_number !== null && this.forwarder_id !== null) && (order_containers.length > 0)"
             class="row px-4 pb-4 pt-2">

          <div class="col-md-6 mb-3">
            <label for="containersTextarea" class="form-label">Containers</label>
            <textarea
                v-model="containers"
                :disabled="this.forwarder_id === null || this.order_number === null"
                class="form-control code-textarea" id="containersTextarea"
                :rows="order_containers.length > 0 ? order_containers.length : 8"
                :placeholder="order_containers.join('\n')">
            </textarea>
            <small>Total containers: {{ order_containers.length }}</small>
          </div>
          <div class="col-md-6 mb-3">
            <label for="codesTextarea" class="form-label">Codes</label>
            <textarea
                v-model="codes"
                :disabled="this.forwarder_id === null || this.order_number === null"
                class="form-control code-textarea" id="containersTextarea"
                :rows="order_containers.length > 0 ? order_containers.length : 8"
                placeholder="One code per line..">
            </textarea>
          </div>

          <div class="col-md-4 mb-3">
            <label for="codesTextarea" class="form-label">Rate</label>
            <input v-model="rate"
                   class="form-control"
                   placeholder="Rate">
          </div>
          <div class="col-md-4 mb-3">
            <label for="codesTextarea" class="form-label">Add charges</label>
            <input v-model="add_charges"
                   class="form-control"
                   placeholder="Add charges">
          </div>
          <div class="col-md-4 mb-3">
            <label for="codesTextarea" class="form-label">Charges</label>
            <input v-model="charges"
                   class="form-control"
                   placeholder="Charges">
          </div>

          <div class="col-md-12 text-end pt-2">
            <b-button variant="success" @click="createCodes"
                      :disabled="this.forwarder_id === null || this.order_number === null">
              Create Codes
            </b-button>
          </div>

        </div>

        <div class="row px-4">

          <div v-if="(this.order_number !== null && this.forwarder_id !== null) && order_containers.length === 0"
               class="col-12 mb-4">
            <lottie
                colors="primary:#405189,secondary:#08a88a"
                :options="defaultNoContentOptions"
                :height="80"
                :width="80"
            />
            <h6 class="text-center text-danger">No container found !</h6>
            <h5 class="text-center link-primary my-0 cursor-pointer" @click="goToAddContainer()">
              Go to add containers
              <i class="ri-external-link-line"></i>
            </h5>
          </div>

          <div v-if="(this.order_number === null || this.forwarder_id === null) && order_containers.length === 0"
               class="col-12 py-5">
            <lottie
                colors="primary:#405189,secondary:#08a88a"
                :options="defaultNoContentOptions"
                :height="80"
                :width="80"
            />

            <h5 class="text-center my-0">Select Counterparty and Order</h5>
          </div>

          <div v-if="wrong_containers.length > 0"
               class="col-md-12 pb-3">
            <h5 class="mb-2 text-danger fw-semibold">Invalid form:</h5>
            <div>
              <ul>
                <li v-for="container in [...new Set(wrong_containers)]" :key="container">
                  <span>{{ container }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import animationNoContentData from "../../../../components/widgets/spxnqpau.json";
import Lottie from "@/components/widgets/lottie.vue";
import Swal from "sweetalert2";

export default {
  name: "CreateCodes",
  props: {
    forwarders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      forwarder_id: null,
      order_number: null,
      containers: '',
      codes: '',
      rate: '',
      add_charges: '',
      charges: '',


      order_numbers: [],
      order_containers: [],
      wrong_containers: [],

      isLoadingContainers: false,
      defaultNoContentOptions: {animationData: animationNoContentData},
    }
  },
  components: {
    Multiselect,
    lottie: Lottie
  },
  computed: {
    counterpartyOptions() {
      return this.forwarders.map((forwarder) => {
        return {
          value: forwarder.value,
          label: forwarder.label,
        };
      });
    },
    orderOptions() {
      return this.order_numbers.map((order) => {
        return {
          value: order.order_number,
          label: order.order_number,
          customer: order.customer
        };
      });
    },
  },
  methods: {
    async getOrderNumbers() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/order_numbers/?counterparty_id=${this.forwarder_id}&loading_type=container`)
      let response = await request.json()
      this.order_numbers = response
    },
    async getOrderContainers(val) {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/container_order/containers/${val}/${this.forwarder_id}/`)
      let response = await request.json()
      this.order_containers = response.containers
          .filter(i => i.container_name !== null)
          .map(c => c.container_name)
    },
    async createCodes() {
      if (this.isValid()) {
        let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/connect_order_code/${this.order_number}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            loading_type: 'container',
            counterparty_id: this.forwarder_id,
            codes: this.codes.split('\n'),
            containers_or_wagons: this.containers.split('\n'),
            rate: this.rate,
            add_charges: this.add_charges,
            charges: this.charges,
          })
        })
        if (!request.ok) {
          let response = await request.json()
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: response.message.toString().toUpperCase(),
          })
        } else {
          document.getElementById('codeCreateModalCloseBtn').click()
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Codes connected successfully',
            showCancelButton: false,
          })
        }
      }
    },
    isValid() {
      this.wrong_containers = []
      let containers = this.containers.split('\n')
      let codes = this.codes.split('\n')

      var dups_ctr = [];
      var dups_codes = [];

      containers.forEach((container, index) => {

        if ((dups_ctr.map(a => a.value).indexOf(container) == -1) && (containers.indexOf(container, index + 1) != -1)) {
          dups_ctr.push({
            value: container,
            message: 'Duplicate container'
          });
        }

        if (container.length !== 11) {
          dups_ctr.map(a => a.value).includes(container) ? null : dups_ctr.push({
            value: container,
            message: 'Container has wrong letters'
          });
        }

      })


      codes.forEach((code, index) => {

        if ((dups_codes.map(a => a.value).indexOf(code) == -1) && (codes.indexOf(code, index + 1) != -1)) {
          dups_codes.push({
            value: code,
            message: 'Duplicate code'
          });
        }

      })

      this.wrong_containers = dups_ctr.map(i => i.message).concat(dups_codes.map(o => o.message))

      if (containers.length !== codes.length) {
        this.wrong_containers.push('Containers quantity did not mach with codes quantity')
      }

      if (this.rate === '' || this.rate === null) {
        this.wrong_containers.push('Rate is required')
      }

      return dups_ctr.length === 0 && dups_codes.length === 0 && this.wrong_containers.length === 0
    },
    goToAddContainer() {
      document.getElementById('codeCreateModalCloseBtn').click()
      this.$router.push({name: 'orders_container_detail', params: {id: this.order_number}});
    }
  },
  watch: {
    forwarder_id(val) {
      this.order_number = null
      this.wrong_containers = []
      val ? this.getOrderNumbers() : this.order_numbers = []
    },
    order_number(val) {
      this.wrong_containers = []
      val ? this.getOrderContainers(val) : this.order_containers = []
    },
  },
}
</script>

<style scoped>
.code-textarea {
  resize: none;
}
</style>