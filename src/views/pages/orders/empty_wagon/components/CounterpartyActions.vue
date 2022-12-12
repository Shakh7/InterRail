<template>
  <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">
        Order settings
      </h5>
      <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body p-0 overflow-hidden">
      <div data-simplebar style="height: calc(100vh - 112px);">

        <div class="card shadow-none my-0">
          <div class="card-header bg-light py-1"></div>
        </div>

        <div class="card mb-0 shadow-none">
          <div class="card-header py-2" type="button" data-bs-toggle="collapse" href="#containerCreate">
            <div class="row align-items-center w-100 m-auto">
              <div class="col-11 px-0 mx-0">
                <p class="card-title mb-0 py-2">
                  Create wagon
                </p>
              </div>
              <div class="col-1 text-center px-0 mx-0">
                <font-awesome-icon icon="fa-solid fa-angle-down"/>
              </div>
            </div>
          </div>
          <div class="card-body text-center p-0 border-0">
            <b-collapse class="collapse border-bottom shadow-none" id="containerCreate">

              <div class="p-3">
                <textarea
                    class="form-control mb-3"
                    rows="10"
                    placeholder="Wagon numbers"
                    v-model="wagons"
                ></textarea>
                <b-button variant="success" class="w-100" @click="createWagons">Save</b-button>
              </div>


            </b-collapse>
          </div>
        </div>
        <div class="card mb-0 shadow-none">
          <div class="card-header py-2" type="button" data-bs-toggle="collapse" href="#counterpartyCreate">
            <div class="row align-items-center w-100 m-auto">
              <div class="col-11 px-0 mx-0">
                <p class="card-title mb-0 py-2">
                  Create counterparty
                </p>
              </div>
              <div class="col-1 text-center px-0 mx-0">
                <font-awesome-icon icon="fa-solid fa-angle-down"/>
              </div>
            </div>
          </div>
          <div class="card-body text-center p-0 border-0">
            <b-collapse class="collapse border-bottom shadow-none" id="counterpartyCreate">

              <div class="p-3">

                <div class="row text-start w-100 m-auto">
                  <div class="col-6 ps-0">
                    <div class="mb-3">
                      <label class="form-label">Counterparty</label>
                      <select class="form-select" v-model="counterparty">
                        <option selected disabled>Choose...</option>
                        <option v-for="c in counterparty_list" :key="c.id" :value="c.id">{{ c.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6 px-0">
                    <div class="mb-3">
                      <label class="form-label">Category</label>
                      <select class="form-select" v-model="category">
                        <option selected disabled>Choose...</option>
                        <option v-for="c in category_list" :key="c.id" :value="c.id">{{ c.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <b-list-group class="mt-2">
                  <b-list-group-item class="d-flex justify-content-between align-items-center p-2 pe-3">
                    <input v-model="preliminary_cost" class="form-control w-100 m-0 p-1 border-0" type="number"
                           placeholder="Preliminary cost">
                  </b-list-group-item>
                  <b-button @click="createCounterparty()" variant="success" class="w-100 waves-effect waves-light mt-3">
                    Create
                  </b-button>
                </b-list-group>

              </div>

            </b-collapse>
          </div>
        </div>

        <div class="card shadow-none my-0">
          <div class="card-header bg-light py-1"></div>
        </div>

        <div v-for="(counterparty, i) in counterparties_with_actual_cost"
             :key="counterparty.id" class="card mb-0 shadow-none">
          <div class="card-header py-2" type="button" data-bs-toggle="collapse" :href="'#counterpartyCollapse' + i + 1">
            <div class="row align-items-center w-100 m-auto">
              <div class="col-11 px-0 mx-0">
                <p class="card-title mb-0">
                  {{ counterparty.counterparty }}
                </p>
                <span class="badge badge-gradient-info">{{ counterparty.category }}</span>
              </div>
              <div class="col-1 text-center px-0 mx-0">
                <font-awesome-icon icon="fa-solid fa-angle-down"/>
              </div>
            </div>
          </div>
          <div class="card-body text-center p-0 border-0">
            <b-collapse class="collapse border-bottom shadow-none" :id="'counterpartyCollapse' + i + 1">

              <div class="p-3">
                <ul class="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="tab"
                       :href="'#wagon_preliminary_cost_update_tab_' + counterparty.id" role="tab">
                      Update
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" :href="'#wagon_counterparty_delete_tab_' + counterparty.id"
                       role="tab">
                      <font-awesome-icon icon="fa-solid fa-trash" class="text-danger"/>
                    </a>
                  </li>
                </ul>

                <div class="tab-content text-start">
                  <div class="tab-pane active" :id="'wagon_preliminary_cost_update_tab_'+ counterparty.id"
                       role="tabpanel">
                    <div class="row w-100 m-auto">
                      <div class="col-10 ps-0">
                        <input class="form-control" type="number" placeholder="Actual cost"
                               v-model="counterparty.actual_cost"
                               v-on:keyup.enter="saveActualCost(counterparty.id, counterparty.actual_cost)">
                      </div>
                      <div class="col-2 text-end px-0">
                        <b-button variant="warning" class="btn-icon waves-effect waves-light w-100"
                                  @click="saveActualCost(counterparty.id, counterparty.actual_cost)">
                          <i class="ri-check-double-line"></i>
                        </b-button>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane pb-0" :id="'wagon_counterparty_delete_tab_' + counterparty.id" role="tabpanel">
                    <div class="row w-100 m-auto align-items-center pb-0">
                      <div class="col-10 ps-0">
                        <input v-model="counterparty.delete_confirmation_string" class="form-control" type="text"
                               :placeholder="counterparty.counterparty + '/' + counterparty.category">
                      </div>
                      <div class="col-2 text-end px-0">
                        <b-button @click="deleteCounterparty(counterparty)"
                                  variant="danger" class="btn-icon waves-effect waves-light w-100">
                          <i class="ri-delete-bin-5-line"></i>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </b-collapse>
          </div>
        </div>

      </div>
    </div>

    <div class="offcanvas-foorter border p-3 text-center">
      <a href="javascript:void(0);" class="link-success">
        View All Acitivity
        <i
            class="ri-arrow-right-s-line align-middle ms-1"
        ></i>
      </a>
    </div>
  </div>

</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CounterpartyActions",
  emits: ["updateCounterparties"],
  data() {
    return {
      wagons: '',
      counterparty: null,
      category: null,
      preliminary_cost: ''
    }
  },
  props: {
    order_number: Number,
    counterparties: {
      type: Array,
      default: () => []
    },
    counterparty_list: {
      type: Array,
      default: () => [],
    },
    category_list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async saveActualCost(counterparty_id, actual_cost) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/expanse/actual_cost_to_all/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "order_number": this.order_number,
          "counterparty_id": counterparty_id,
          "actual_cost": actual_cost
        })
      })

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      this.$emit('updateCounterparties')
      if (response.ok) {
        await Toast.fire({
          icon: 'success',
          title: 'Actual cost has been uploaded'
        })
      } else {
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      }
    },
    async createWagons() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/expanse/wagon_add/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "order_number": this.order_number,
          "wagon": this.wagons.split('\n')
        })
      })

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      this.$emit('updateCounterparties')
      if (response.ok) {
        await Toast.fire({
          icon: 'success',
          title: 'Wagons has been uploaded'
        })
      } else {
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      }
    },
    async createCounterparty() {

      if (this.counterparty === null || this.category === null || this.preliminary_cost.toString().trim() === '') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        await Toast.fire({
          icon: 'warning',
          title: 'Please fill all the fields'
        })
      } else {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/expanse/counterparty_add/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "order_number": this.order_number,
            "counterparty_id": this.counterparty,
            "category_id": this.category,
            "preliminary_cost": this.preliminary_cost
          })
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        this.$emit('updateCounterparties')

        if (response.ok) {
          await Toast.fire({
            icon: 'success',
            title: 'Counterparty has been uploaded'
          })
        } else if (response.ok === false) {
          await Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        } else {
          await Toast.fire({
            icon: 'error',
            title: 'Server error'
          })
        }
      }
    },

    async deleteCounterparty(counterparty) {
      if (counterparty.delete_confirmation_string !== (counterparty.counterparty + '/' + counterparty.category)) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        await Toast.fire({
          icon: 'error',
          title: 'Confirmation text is not correct'
        })
      } else {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/counterparty/delete/${counterparty.id}/`, {
          method: 'DELETE',
        });

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        this.$emit('updateCounterparties')
        if (response.ok) {
          await Toast.fire({
            icon: 'success',
            title: 'Counterparty has been deleted'
          })
        } else if (response.ok === false) {
          await Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        } else {
          await Toast.fire({
            icon: 'error',
            title: 'Server error'
          })
        }
      }
    }
  },
  computed: {
    counterparties_with_actual_cost: {
      get() {
        return this.counterparties.map(counterparty => {
          return {
            id: counterparty.id,
            counterparty: counterparty.counterparty.name,
            category: counterparty.category.name,
            actual_cost: 0,
            delete_confirmation_string: ''
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>