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

        <div class="card mb-0 shadow-none" v-for="(counterparty, i) in counterparties" :key="counterparty.id">
          <div class="card-header py-2" data-bs-toggle="collapse" :href="'#counterpartyCollapse' + i + 1">
            <div class="row align-items-center w-100 m-auto">
              <div class="col-11 px-0 mx-0">
                <p class="card-title mb-0">
                  {{ counterparty.counterparty.name }}
                </p>
                <span class="badge badge-gradient-info">{{ counterparty.category.name }}</span>
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
                        <input class="form-control" type="number" :placeholder="'Actual cost ' + container_type.id">
                      </div>
                      <div class="col-2 text-end px-0">
                        <b-button variant="success" class="btn-icon waves-effect waves-light w-100"
                                  @click="saveActualCost(counterparty.id, container_type.id, 1000)">
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
export default {
  name: "CounterpartyActions",
  props: {
    counterparties: {
      type: Object,
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
      let response = await fetch('http://178.62.91.121:5000/container_order/expanse/actual_cost_to_all/', {
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

      alert(response.status)
    }
  }
}
</script>

<style scoped>

</style>