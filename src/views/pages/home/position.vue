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
          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">{{ item.label.replace('_', ' ') }}</p>

          <a class="card-link h4">
            $
            <count-to :startVal='0' :endVal='item.counter' :duration='1500'></count-to>
          </a>

        </div>
        <div class="flex-shrink-0">
          <h4 class="mb-0" :class="'text-' + item.color">
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
              <input v-model="search" type="text" class="form-control border-dashed"
                     placeholder="Search for order number">
            </b-list-group-item>
            <router-link v-for="order in ordersComputed" :key="order"
                         :to="{name: getOrderUrl(order.child_type), params: {id: order.order_number}}">
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
            </router-link>
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
  data() {
    return {
      search: ''
    }
  },
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

    getOrderUrl(order_type) {
      return order_type === 'container_order' ? 'orders_container_detail'
          : order_type === 'wagon_order' ? 'orders_wagon_detail'
              : order_type === 'wagon_empty_order' ? 'orders_empty_wagon_detail' : ''
    },
  },
  mounted() {

  },
  computed: {
    users: {
      get() {
        return store.state.users_list
      }
    },
    ordersComputed: {
      get() {
        if (this.search.length > 0) {
          return this.orders.filter(order => order.order_number.toString().includes(this.search))
        } else {
          return this.orders
        }
      }
    }
  }
}
</script>

<style scoped>

</style>