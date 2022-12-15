<template>
  <div class="app-search d-none d-md-block">
    <div class="position-relative">
      <input v-model="search" type="text" class="form-control" placeholder="Search for containers..." autocomplete="off"
             id="search-options"/>
      <span class="mdi mdi-magnify search-widget-icon"></span>
      <span class="mdi mdi-close-circle
                  search-widget-icon search-widget-icon-close
                  d-none" id="search-close-options">
      </span>
    </div>

    <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
      <SimpleBar data-simplebar style="max-height: 320px">
        <!-- item-->
<!--        <div class="dropdown-header">-->
<!--          <h6 class="text-overflow text-muted mb-0 text-uppercase">-->
<!--            Recent Searches-->
<!--          </h6>-->
<!--        </div>-->

<!--        <div class="dropdown-item bg-transparent text-wrap">-->
<!--          <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded mb-1 me-1">-->
<!--            how to setup-->
<!--            <i class="mdi mdi-magnify ms-1"></i>-->
<!--          </router-link>-->
<!--          <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded mb-1 mr-1">-->
<!--            buttons-->
<!--            <i class="mdi mdi-magnify ms-1"></i>-->
<!--          </router-link>-->
<!--        </div>-->

        <div class="dropdown-header mb-0">
          <h6 class="text-overflow text-muted mb-0 text-uppercase">
            Containers
          </h6>
        </div>

        <b-list-group class="mt-0" v-if="!isLoading">
          <a v-for="result in searchResults" :key="result" :href="getOrderUrl(result.child_type) + result.order_number + `?container=${this.search}`">
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
                      <h6 class="fs-14 mb-0">Order: {{ result.order_number }}</h6>
                      <small class="text-muted">{{ getAccount(result.manager) }}</small>
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

        <div class="text-center py-4 pb-3" v-if="isLoading && search.trim() > 2">
          <b-spinner variant="info"></b-spinner>
          <h6 class="mt-2">Searching..</h6>
        </div>

        <div class="text-center py-4 pb-3" v-if="!isLoading && searchResults.length === 0">
          <lottie
              colors="primary:#405189,secondary:#08a88a"
              :options="defaultOptions"
              :height="50"
              :width="50"
          />
          <h6 class="mt-2">No results found</h6>
        </div>
      </SimpleBar>

    </div>
  </div>
</template>

<script>
import {
  SimpleBar
} from "simplebar-vue3";
import spxnqpau from './widgets/msoeawqm.json';
import Lottie from "./widgets/lottie.vue";
import store from "../state/store";

export default {
  name: "ContainerSearch",
  data() {
    return {
      search: "",
      isLoading: false,
      searchResults: [],
      defaultOptions: {animationData: spxnqpau},
    }
  },
  components: {SimpleBar, lottie: Lottie},
  methods: {
    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      var searchInput = document.getElementById("search-options");

      searchInput.addEventListener("focus", () => {
        var inputLength = searchInput.value.trim().length;
        if (inputLength > 2) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchInput.addEventListener("keyup", () => {
        var inputLength = searchInput.value.trim().length;
        if (inputLength > 2) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });

      document.body.addEventListener("click", (e) => {
        if (e.target.getAttribute("id") !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    },
    async searchContainer(query) {
      if (store.state.user.role === 'admin') {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/?container=${query}`);
        let data = await response.json();
        return data;
      } else if (store.state.user.role === 'staff') {
        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/?container=${query}&manager=${store.state.user.id}`);
        let data = await response.json();
        return data;
      }
    },
    getAccount(user_id) {
      let result = store.state.users_list.filter(item => item.id === user_id)
      return result[0].full_name
    },

    getOrderUrl(order_type) {
      return order_type === 'container_order' ? '/orders/container/view/'
          : order_type === 'wagon_order' ? '/orders/wagon/view/'
              : order_type === 'wagon_empty_order' ? '/orders/empty_wagon/view/' : ''
    },
  },
  mounted() {
    this.isCustomDropdown();
  },
  watch: {
    search: function (val) {
      if (val.length > 2) {
        this.searchResults = []
        this.isLoading = true;
        this.searchContainer(val).then((data) => {
          this.isLoading = false;
          this.searchResults = data;
        });
      }
    },
  }
}
</script>

<style scoped>

</style>