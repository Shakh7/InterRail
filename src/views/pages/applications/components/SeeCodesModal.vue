<template>

  <button class="visually-hidden" data-bs-toggle="modal"
          data-bs-target="#seeCodesModal" id="seeCodesTriggerBtn"> Add code
  </button>

  <div id="seeCodesModal" class="modal fade" tabindex="1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">

        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Application:
            <span class="badge badge-gradient-info"> {{ application.number }}</span>
          </h5>
          <button id="seeCodesModalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>

        <div class="p-4 table-responsive">
          <table class="table table-nowrap">
            <thead>
            <tr class="text-center">
              <th scope="col">Code</th>
              <th scope="col">Order Number</th>
              <th scope="col">Status Type</th>
              <th scope="col">Status</th>
              <th scope="col">Rate</th>
              <th scope="col">Charges</th>
              <th scope="col">Add Charges</th>
              <th scope="col">Total Cost</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody v-if="!isLoading">
            <tr v-for="code in codes" :key="code.id" class="text-center">
              <th scope="row"><a href="#" class="fw-semibold">{{ code.number }}</a></th>
              <td>{{ code.order__order_number === null ? '--' : code.order__order_number }}</td>
              <td>{{ code.loading_type }}</td>
              <td>
                <span class="badge" :class="{
                    'bg-warning': code.status === 'checking',
                    'bg-secondary': code.status === 'used',
                    'bg-success': code.status === 'completed',
                    'bg-danger': code.status === 'canceled',
                }">{{ code.status }}</span>
              </td>
              <td>${{ code.rate }}</td>
              <td>${{ code.charges }}</td>
              <td>${{ code.add_charges }}</td>
              <td>${{
                  (parseFloat(code.rate) + parseFloat(code.charges) + parseFloat(code.add_charges)).toFixed(2)
                }}
              </td>
              <td>
                <a @click="goCodeUpdatePage(code.id)"
                   class="link-success fw-semibold cursor-pointer">Edit<i
                    class="ri-arrow-right-line align-middle"></i></a>
              </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
              <th colspan="5">Loading...</th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "SeeCodesModal",
  data() {
    return {
      isLoading: false,
      codes: []
    }
  },
  props: {
    application: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    async getApplicationCodeList(application_id) {
      try {
        this.isLoading = true
        let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/code_list/${application_id}/`)
        this.codes = request.ok ? await request.json() : []
        this.isLoading = false
      } catch (e) {
        alert('Something went wrong, please talk to the developers')
      }
    },
    goCodeUpdatePage(code_id) {
      document.getElementById('seeCodesModalClose').click()
      this.$router.push({name: 'code_update', params: {id: code_id}})
    }
  },
  watch: {
    application: {
      handler: function (val) {
        this.getApplicationCodeList(val.id)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>