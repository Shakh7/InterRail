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
                  Create container
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

                <ul class="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3" role="tablist">
                  <li class="nav-item" v-for="(container_type, tab_index) in container_types" :key="container_type">
                    <a class="nav-link" :class="tab_index === 0 ? 'active' : ''"
                       data-bs-toggle="tab" :href="'#container_type_create_' + tab_index + 10" role="tab">
                      {{ container_type.type }}
                    </a>
                  </li>
                </ul>
                <div class="tab-content text-start">
                  <div v-for="(container_type, tab_index) in container_types" :key="container_type"
                       class="tab-pane" :class="tab_index === 0 ? 'active' : ''"
                       :id="'container_type_create_' + tab_index + 10" role="tabpanel">

                    <div class="row w-100 m-auto">
                      <div class="col-12 px-0 mb-3">
                        <label for="exampleFormControlTextarea5" class="form-label">
                          Containers List
                        </label>
                        <textarea v-model="container_type.containers" class="form-control"
                                  :placeholder="'Container list for ' + container_type.type"
                                  id="exampleFormControlTextarea5"
                                  :rows="container_type.quantity >= 20 ? container_type.quantity / 2 : container_type.quantity"
                        ></textarea>
                        <div id="exampleFormControlTextarea5" class="form-text"> One container for each line</div>
                      </div>
                      <div class="col-12 text-end px-0">
                        <b-button @click="createContainer(container_type.id, container_type.containers)"
                                  variant="success" class="btn-icon waves-effect waves-light w-100">
                          Start uploading
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <b-list-group-item
                      v-for="container_type in container_types_computed" :key="container_type"
                      class="d-flex justify-content-between align-items-center p-2 pe-3">
                    <input v-model="container_type.cost" class="form-control w-75 m-0 p-1 border-0" type="number"
                           placeholder="Preliminary cost">
                    <span class="badge bg-success m-0">{{ container_type.type }}</span>
                  </b-list-group-item>
                  <b-button @click="createCounterparty()"
                            variant="success" class="w-100 waves-effect waves-light mt-3">
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
                  <li class="nav-item" v-for="(container_type, tab_index) in container_types" :key="container_type">
                    <a class="nav-link" :class="tab_index === 0 ? 'active' : ''"
                       data-bs-toggle="tab" :href="'#container_type_' + tab_index + '_' + i" role="tab">
                      {{ container_type.type }}
                    </a>
                  </li>
                </ul>

                <div class="tab-content text-start">
                  <div v-for="(container_type, tab_index) in container_types" :key="container_type"
                       class="tab-pane" :class="tab_index === 0 ? 'active' : ''"
                       :id="'container_type_' + tab_index + '_' + i" role="tabpanel">

                    <div class="row w-100 m-auto">
                      <div class="col-10 ps-0">
                        <input v-model="counterparty.actual_cost" class="form-control" type="number"
                               :placeholder="'Actual cost ' + container_type.id">
                      </div>
                      <div class="col-2 text-end px-0">
                        <b-button variant="success" class="btn-icon waves-effect waves-light w-100"
                                  v-on:keyup.enter="saveActualCost(counterparty.id, container_type.id, counterparty.actual_cost)"
                                  @click="saveActualCost(counterparty.id, container_type.id, counterparty.actual_cost)">
                          <i class="ri-check-double-line"></i>
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
      counterparty: null,
      category: null
    }
  },
  props: {
    order_number: {
      type: Number,
    },
    counterparties: {
      type: Array,
      default: () => []
    },
    container_types: {
      type: Array,
      default: () => [],
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
    async saveActualCost(counterparty_id, container_type_id, actual_cost) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/expanse/actual_cost_to_all/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "container_type_id": container_type_id,
          "counterparty_id": counterparty_id,
          "actual_cost": actual_cost
        })
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

      if (response.ok) {
        this.$emit('updateCounterparties')
        await Toast.fire({
          icon: 'success',
          title: 'Actual cost for all containers has been updated'
        })
      } else {
        this.$emit('updateCounterparties')
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      }
    },
    async createContainer(container_type_id, containers) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/expanse/container_to_all/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "container_type_id": container_type_id,
          "containers": containers.split('\n')
        })
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
          title: 'Container has been uploaded'
        })
      } else {
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      }

    },
    async createCounterparty() {

      let data = {
        order_number: this.order_number,
        counterparty_id: this.counterparty,
        category_id: this.category,
        preliminary_costs: this.container_types_computed.map((container_type) => {
          return {
            container_type_id: container_type.id,
            preliminary_cost: container_type.cost
          }
        })
      }

      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/expanse/counterparty_add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      //


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
          title: 'Counterparty has been created'
        })
      } else {
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
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
            actual_cost: 0
          }
        })
      }
    },

    container_types_computed: {
      get() {
        return this.container_types.map(container_type => {
          return {
            id: container_type.id,
            type: container_type.type,
            cost: ''
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>