<template>
  <div class="card">
    <div class="card-body p-0" type="button">
      <div class="d-flex p-3 align-items-center dropdown" data-bs-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
        <div class="avatar-sm flex-shrink-0">
                          <span class="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i :class="`${item.icon} align-middle`"></i>
                          </span>
        </div>
        <div class="flex-grow-1 ms-3">
          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">{{ item.label }}</p>

          <a class="card-link h4">
            $
            <count-to :startVal='0' :endVal='item.counter' :duration='1500'></count-to>
          </a>

        </div>
        <div class="flex-shrink-0">
          <h4 class="text-success mb-0">
            <i class="ri-table-alt-fill align-middle"></i>
            {{ item.containers_count }}
          </h4>
        </div>
      </div>
      <div class="dropdown-menu w-100 mt-2">
        <h6 class="dropdown-header">Orders list {{ orders.length }}</h6>
        <div data-simplebar style="max-height: 350px;">
          <b-list-group>
            <b-list-group-item class="list-group-istem border-0 p-1 px-3">
              <input type="text" class="form-control border-dashed" placeholder="Search">
            </b-list-group-item>
            <a v-for="order in orders" :key="order" :href="setUrlForOrder(order.child_type) + order.order_number + '/'">
              <b-list-group-item class="list-group-item-action border-0 border-bottom">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1">
                    <div class="d-flex">
                      <div class="flex-shrink-0 avatar-xs">
                        <div class="avatar-title bg-soft-info text-info rounded">
                          <i class="ri-netflix-fill"></i>
                        </div>
                      </div>
                      <div class="flex-shrink-0 ms-2">
                        <h6 class="fs-14 mb-0">Order: {{ order.order_number }}</h6>
                        <small class="text-muted">{{
                            users.filter(user => user.id === order.manager)[0].full_name
                          }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <span class="text-info">
                      <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="fs-14"/>
                    </span>
                  </div>
                </div>
              </b-list-group-item>
            </a>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CountTo} from "vue3-count-to";
import store from "../../../state/store.js";

export default {
  name: "position",
  props: {
    item: {
      type: Object,
    },
    orders: {
      type: Array,
    },
  },
  components: {
    CountTo,
  },
  methods: {
    setUrlForOrder(order_type) {
      return order_type === 'container_order'
          ? `/orders/container/view/` :
          order_type === 'wagon_order' ? `/orders/wagon/view/` : `/orders/empty-wagon-order/view/`
    },
  },
  mounted() {

  },
  computed: {
    users: {
      get() {
        return store.state.users_list
      }
    }
  }
}
</script>

<style scoped>

</style>