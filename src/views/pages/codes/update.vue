<script>
import PageHeader from "../../../components/page-header.vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import animationData from "@/components/widgets/uetqnvvg.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
  data() {
    return {
      title: "Code Details",
      items: [
        {
          text: "Codes",
          href: "/",
        },
        {
          text: "Code Update",
          active: true,
        },
      ],

      isLoading: true,
      codeData: null,
      loading_type: null,
      hasMouned: false,

      options: {
        sending_type: [
          {value: 'single', label: 'Одиночная'},
          {value: 'block_train', label: 'КП'}
        ],
        container_type: [
          {value: '20', label: '20'},
          {value: '40', label: '40'}
        ],
        loading_type: [
          {value: 'container', label: 'Container'},
          {value: 'wagon', label: 'Wagon'},
          {value: 'wagon(empty)', label: 'Wagon(empty)'},
        ],
        code_status: [
          {value: 'checking', label: 'Checking', color: 'warning'},
          {value: 'used', label: 'Used', color: 'primary'},
          {value: 'completed', label: 'Completed', color: 'success'},
          {value: 'canceled', label: 'Canceled', color: 'danger'},
        ],
        order_numbers: [],
        containers: [],
        wagons: [],
        empty_wagons: [],
      },

      defaultOptions: {animationData: animationData},
    };
  },
  components: {
    PageHeader,
    Multiselect,
    lottie: Lottie
  },
  computed: {
    code: {
      get() {
        return this.codeData
      }
    }
  },
  methods: {
    async getCodeData() {
      this.isLoading = true
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/list/${this.$route.params.id}/`)
      let response = await request.json()
      this.codeData = response
      this.isLoading = false
      this.loading_type = this.code.loading_type
    },
    async findOrderNumber(query) {
      let url = `${process.env.VUE_APP_ORDER_URL}/order/order_numbers/?counterparty_id=${this.code.forwarder.id}&loading_type=${this.loading_type}`
      url = query ? url + `/&order_number=${query}` : url
      let request = await fetch(url)
      let response = await request.json()
      console.log(response)
      this.options.order_numbers = response.map(i => {
        return {
          value: i.order_number,
          label: i.order_number
        }
      })
    },
    readData(key) {
      return this.isLoading ? 'Loading..' : this.codeData[key]
    }
  },
  async mounted() {
    await this.getCodeData()
    await this.findOrderNumber()
    this.hasMouned = true
  },
  watch: {
    loading_type() {
      if (!this.hasMouned) return
      this.findOrderNumber()
    },
  }
};
</script>

<template>
  <PageHeader :title="title" :items="items"/>

  <div class="row" v-if="code !== null">
    <div class="col-xl-9">
      <div class="card">
        <div class="card-header">
          <div class="d-flex align-items-center">
            <h5 class="card-title flex-grow-1 mb-0">Code {{ readData('number') }}</h5>
            <div class="flex-shrink-0">
              <button
                  class="btn btn-success btn-sm"
              ><i class="ri-save-2-fill align-middle me-1"></i>
                Save
              </button
              >
            </div>
          </div>
        </div>
        <div class="card-body">
          <div>
            <TransitionGroup tag="ul" name="fade" class="row transition_box">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label" :class="{'text-danger': code.loading_type === null}">Loading type</label>
                  <Multiselect v-model="loading_type" :options="options.loading_type"/>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <Multiselect v-model="code.status" :options="options.code_status"
                               placeholder="Code status">
                    <template v-slot:singlelabel="label">
                      <div class="w-100 text-start">
                        <span class="text-start fw-medium" :class="'text-' + label.value.color">{{
                            label.value.label
                          }}</span>
                      </div>
                    </template>
                    <template v-slot:option="props">
                      <span :class="'fw-medium text-' + props.option.color">{{ props.option.label }}</span>
                    </template>
                  </Multiselect>
                </div>
              </div>


              <div class="col-6" v-if="loading_type === 'container'">
                <div class="mb-3">
                  <label class="form-label">Container type</label>
                  <Multiselect v-model="code.container_type" :options="options.container_type"
                               placeholder="Select container type"/>
                </div>
              </div>

              <div class="col-6" v-if="loading_type === 'container'">
                <div class="mb-3">
                  <label class="form-label">Container number</label>
                  <Multiselect v-model="code.container_type" :options="options.container"
                               placeholder="Select container"/>
                </div>
              </div>


              <div class="col-6" v-if="loading_type === 'container'">
                <div class="mb-1">
                  <label for="wagonNumber" class="form-label">Wagon number</label>
                  <input type="text" class="form-control" placeholder="Wagon number" id="wagonNumber">
                </div>
              </div>

              <div class="col-6" v-else-if="loading_type === 'wagon'">
                <div class="mb-1">
                  <label for="wagonNumber" class="form-label">Wagon number</label>
                  <Multiselect v-model="code.wagon_actual_cost_id" :options="options.wagons"
                               :placeholder="'Select ' + loading_type"/>
                </div>
              </div>

              <div class="col-6" v-else-if="loading_type === 'wagon(empty)'">
                <div class="mb-1">
                  <label for="wagonNumber" class="form-label">Wagon number</label>
                  <Multiselect v-model="code.wagon_empty_actual_cost_id" :options="options.empty_wagons"
                               :placeholder="'Select ' + loading_type"/>
                </div>
              </div>

              <div class="col-6" v-else>
                <div class="mb-1">
                  <label class="form-label text-danger">Wagon number</label>
                  <input disabled type="text" class="form-control" placeholder="Select loading type to write here">
                </div>
              </div>

              <div class="col-6">
                <div class="mb-1">
                  <label for="smgsNumber" class="form-label">SMGS number</label>
                  <input v-model="code.smgs_number" type="text" class="form-control" placeholder="SMGS number"
                         id="smgsNumber">
                </div>
              </div>


            </TransitionGroup>
          </div>

          <div class="row border-top pt-3">
            <div class="col-4">
              <div class="mb-3">
                <label for="codeRate" class="form-label">Rate</label>
                <input v-model="code.rate" type="text" class="form-control" placeholder="Rate"
                       id="codeRate">
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="codeCharges" class="form-label">Charges</label>
                <input v-model="code.charges" type="text" class="form-control" placeholder="Charges"
                       id="codeCharges">
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="codeAddCharges" class="form-label">Add charges</label>
                <input v-model="code.add_charges" type="text" class="form-control" placeholder="Add charges"
                       id="codeAddCharges">
              </div>
            </div>
            <div class="col-12 py-2">
              <label for="codeComment" class="form-label">Comment</label>
              <textarea v-model="code.comment" type="text" class="form-control" placeholder="Comment"
                        id="codeComment" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!--end card-->
    </div>
    <!--end col-->
    <div class="col-xl-3">
      <div class="card" v-if="codeData.order_number !== null">
        <div class="card-header">
          <div class="d-flex">
            <h5 class="card-title flex-grow-1 mb-0">
              <i
                  class="mdi mdi-truck-fast-outline align-middle me-1 text-muted"
              ></i>
              Order Details
            </h5>
            <div class="flex-shrink-0">
              <a
                  href="javascript:void(0);"
                  class="badge badge-soft-primary fs-11"
              >Track Order</a
              >
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <lottie
                colors="primary:#405189,secondary:#08a88a"
                :options="defaultOptions"
                :height="80"
                :width="80"
            />
            <h5 class="fs-16 mt-2">RQK Logistics</h5>
            <p class="text-muted mb-0">ID: MFDS1400457854</p>
            <p class="text-muted mb-0">Payment Mode : Debit Card</p>
          </div>
        </div>
      </div>
      <div class="card" v-if="codeData.order_number === null">
        <div class="card-header">
          <div class="d-flex">
            <h5 class="card-title flex-grow-1 mb-0">
              <i
                  class="mdi mdi-truck-fast-outline align-middle me-1 text-muted"
              ></i>
              Order Details
            </h5>
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <p class="text-muted mb-3">{{ code.forwarder }}</p>
            <lottie
                colors="primary:#405189,secondary:#08a88a"
                :options="defaultOptions"
                :height="80"
                :width="80"
            />
            <h5 class="fs-16 mt-2">Connect Order</h5>
            <p class="text-muted mb-3">Code is not connected with order</p>
            <Multiselect :options="options.order_numbers" :searchable="true"
                         :loading="isLoading" :hide-selected="false"
                         @search-change="findOrderNumber"
            />
          </div>
        </div>
      </div>
      <!--end card-->

      <div class="card">
        <div class="card-header">
          <div class="d-flex">
            <h5 class="card-title flex-grow-1 mb-0">Customer Details</h5>
            <div class="flex-shrink-0">
              <a href="javascript:void(0);" class="link-secondary"
              >View Profile</a
              >
            </div>
          </div>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mb-0 vstack gap-3">
            <li>
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <img
                      src="@/assets/images/users/avatar-3.jpg"
                      alt=""
                      class="avatar-sm rounded"
                  />
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="fs-14 mb-1">Joseph Parkers</h6>
                  <p class="text-muted mb-0">Customer</p>
                </div>
              </div>
            </li>
            <li>
              <i class="ri-mail-line me-2 align-middle text-muted fs-16"></i
              >josephparker@gmail.com
            </li>
            <li>
              <i class="ri-phone-line me-2 align-middle text-muted fs-16"></i
              >+(256) 245451 441
            </li>
          </ul>
        </div>
      </div>
      <!--end card-->
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="ri-map-pin-line align-middle me-1 text-muted"></i>
            Billing Address
          </h5>
        </div>
        <div class="card-body">
          <ul class="list-unstyled vstack gap-2 fs-13 mb-0">
            <li class="fw-medium fs-14">Joseph Parker</li>
            <li>+(256) 245451 451</li>
            <li>2186 Joyce Street Rocky Mount</li>
            <li>New York - 25645</li>
            <li>United States</li>
          </ul>
        </div>
      </div>
      <!--end card-->
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="ri-map-pin-line align-middle me-1 text-muted"></i>
            Shipping Address
          </h5>
        </div>
        <div class="card-body">
          <ul class="list-unstyled vstack gap-2 fs-13 mb-0">
            <li class="fw-medium fs-14">Joseph Parker</li>
            <li>+(256) 245451 451</li>
            <li>2186 Joyce Street Rocky Mount</li>
            <li>California - 24567</li>
            <li>United States</li>
          </ul>
        </div>
      </div>
      <!--end card-->

      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i
                class="ri-secure-payment-line align-bottom me-1 text-muted"
            ></i>
            Payment Details
          </h5>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <div class="flex-shrink-0">
              <p class="text-muted mb-0">Transactions:</p>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-0">#VLZ124561278124</h6>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2">
            <div class="flex-shrink-0">
              <p class="text-muted mb-0">Payment Method:</p>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-0">Debit Card</h6>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2">
            <div class="flex-shrink-0">
              <p class="text-muted mb-0">Card Holder Name:</p>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-0">Joseph Parker</h6>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2">
            <div class="flex-shrink-0">
              <p class="text-muted mb-0">Card Number:</p>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-0">xxxx xxxx xxxx 2456</h6>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <p class="text-muted mb-0">Total Amount:</p>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-0">$415.96</h6>
            </div>
          </div>
        </div>
      </div>
      <!--end card-->
    </div>
    <!--end col-->
  </div>
  <!--end row-->
</template>


<style scoped>
.transition_box {
  position: relative;
  padding: 0;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>