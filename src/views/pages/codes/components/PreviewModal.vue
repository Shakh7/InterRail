<template>
  <div id="CodePreviewModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0 overflow-hidden p-4">

        <div class="py-3 border-top border-bottom border-top-dashed border-bottom-dashed mb-4">
          <div class="row justify-content-between gy-4">
            <div class="col-lg-3 col-sm-6 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Application Number :</p>
                <h5 class="fs-15 mb-0">
                  <span class="badge badge-gradient-info">{{ code.application_number }}</span>
                </h5>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 text-center">
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
            <div class="col-lg-3 col-sm-6 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Departure :</p>
                <h5 class="fs-15 my-0"><span v-if="code.departure">{{ code.departure.name }}</span></h5>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 text-center">
              <div>
                <p class="mb-2 text-uppercase fw-medium">Destination :</p>
                <h5 class="fs-15 my-0"><span v-if="code.destination">{{ code.destination.name }}</span></h5>
              </div>
            </div>
          </div>
        </div>

        <form class="row justify-content-between">
          <div class="col-12 col-lg-6 pe-3 table-responsive">
            <table class="table table-striped">

              <tbody>
              <tr>
                <th scope="row">Order number</th>
                <td class="text-end">
                  <span v-if="code.order_number">{{ code.order_number }}</span>
                <span v-else class="text-danger">--</span></td>
              </tr>
              <tr>
                <th scope="row">Forwarder</th>
                <td class="text-end">
                  <span v-if="code.forwarder">{{ code.forwarder }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr>
                <th scope="row">SMGS number</th>
                <td class="text-end">
                  <span v-if="code.smgs_number">{{ code.smgs_number }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Loading type</th>
                <td class="text-end">
                  <span v-if="code.loading_type">{{ code.loading_type }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr v-if="code.loading_type === 'Container'">
                <th scope="row">Container type</th>
                <td class="text-end">
                  <span v-if="code.container_type">{{ code.container_type }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr v-if="code.loading_type === 'Container'">
                <th scope="row">Container number</th>
                <td class="text-end">
                  <span v-if="code.container_number">{{ code.container_number }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr v-if="code.loading_type === 'Wagon'">
                <th scope="row">Weight</th>
                <td class="text-end">
                  <span v-if="code.weight">{{ code.weight }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr v-if="code.loading_type === 'Wagon'">
                <th scope="row">Wagon number</th>
                <td class="text-end">
                  <span v-if="code.wagon_number">{{ code.wagon_number }}</span>
                <span v-else class="text-danger">--</span>
                </td>
              </tr>
              <tr >
                <th scope="row">Customer</th>
                <td class="text-end">
                  <user :userId="code.customer" :avatar="true" avatarBgColor="success" ></user>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="col-12 col-lg-6 ps-3">
            <table class="table table-striped">
              <tbody>
              <tr>
                <th scope="row">Status</th>
                <td class="text-end">
                  <span v-if="code.status" class="badge" :class="{
                  'bg-warning': code.status === 'Checking',
                  'bg-secondary': code.status === 'Used',
                  'bg-success': code.status === 'Completed',
                  'bg-danger': code.status === 'Completed',
              }">{{ code.status }}</span>
                <span v-else class="text-danger">--</span></td>
              </tr>
              <tr>
                <th scope="row">Product</th>
                <td class="text-end" >
                  <div v-if="code.product" style="max-width: 230px">
                    <VTooltip>
                    <div class="text-truncate">{{ code.product.name }}</div>
                    <template #popper>
                      {{ code.product.name }}
                    </template>
                  </VTooltip>
                  </div>
                <span v-else class="text-danger text-end">--</span>
                </td>
              </tr>
              <tr>
                <th scope="row">HS code</th>
                <td class="text-end" >
                  <span v-if="code.product">{{ code.product.hc_code }}</span>
                <span v-else class="text-danger text-end">--</span>
                </td>
              </tr>
              <tr>
                <th scope="row">ETCNG code</th>
                <td class="text-end" >
                  <span v-if="code.product">{{ code.product.etcng_code }}</span>
                <span v-else class="text-danger text-end">--</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Rate</th>
                <td class="text-end">
                  <span v-if="code.rate">{{ code.rate }}</span>
                <span v-else class="text-danger">0</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Add charges</th>
                <td class="text-end">
                  <span v-if="code.add_charges">{{ code.add_charges }}</span>
                <span v-else class="text-danger">0</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Charges</th>
                <td class="text-end">
                  <span v-if="code.charges">{{ code.charges }}</span>
                <span v-else class="text-danger">0</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import user from '../../../../components/custom/user.vue'

export default {
  name: "PreviewModal",
  props: {
    codeData: {
      type: Object,
      default: () => {
      },
    },
  },
  computed: {
    code() {
      return this.codeData;
    },
  },
  components: {
    user
  }
}
</script>

<style scoped>

</style>