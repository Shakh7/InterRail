<script>
import appConfig from "../../../../app.config.json";

import flatPickr from "vue-flatpickr-component";
import { CountTo } from "vue3-count-to";

import Portfolio from "./portfolio.vue";
import Revenue from "./revenue.vue";

export default {
  page: {
    title: "Starter",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Main dashboard",
      items: [
        {
          text: "Pages",
          href: "/",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
      date: new Date().getTime(),
      cyptoWidgets: [
        {
          id: 1,
          icon: "ri-money-dollar-circle-fill",
          label: "Rail Forwarder",
          counter: 2390.68,
          badge: "ri-arrow-up-s-fill",
          badgeColor: "success",
        },
        {
          id: 2,
          icon: "ri-arrow-up-circle-fill",
          label: "Train Operator",
          counter: 19523.25,
          badge: "ri-arrow-up-s-fill",
          badgeColor: "success",
        },
        {
          id: 3,
          icon: "ri-arrow-down-circle-fill",
          label: "Multi Modal",
          counter: 14799.44,
          badge: "ri-arrow-down-s-fill",
          badgeColor: "danger",
        },
      ],
    };
  },
  components: {
    flatPickr,
    CountTo,
    Portfolio,
    Revenue
  },
  };
</script>

<template>
    <div class="row">
      <div class="col">
        <div class="h-100">

          <!-- start PAGE HEADER -->
          <div class="row mb-3 pb-1">
            <div class="col-12">
              <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                <div class="flex-grow-1">
                  <h4 class="fs-16 mb-1">Good Morning, {{$store.state.user.full_name}}!</h4>
                  <p class="text-muted mb-0">
                    Here's what's happening with your account today.
                  </p>
                </div>
                <div class="mt-3 mt-lg-0">
                  <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                      <div class="col-sm-auto">
                        <div class="input-group">
                          <flat-pickr v-model="date" placeholder="Current date"
                            class="form-control border-0 dash-filter-picker shadow"></flat-pickr>

                          <div class="input-group-text bg-primary border-primary text-white">
                            <i class="ri-calendar-2-line"></i>
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <!-- <div class="col-auto">
                        <button type="button"
                          class="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"
                          @click="rightcolumn">
                          <i class="ri-pulse-line"></i>
                        </button>
                      </div> -->
                      <!--end col-->
                    </div>
                    <!--end row-->
                  </form>
                </div>
              </div>
              <!-- end card header -->
            </div>
          </div>
          <!-- end PAGE HEADER -->

          <div class="row">

            <div class="col-xxl-3">
              <Portfolio />
            </div>
            <!-- end col -->

            <div class="col-xxl-9 order-xxl-0 order-first">
              <div class="row">
                <div class="col-lg-4 col-md-6" v-for="(item, index) of cyptoWidgets" :key="index">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm flex-shrink-0">
                          <span class="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i :class="`${item.icon} align-middle`"></i>
                          </span>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">{{ item.label }}</p>
                          <h4 class="mb-0">
                            <span class="counter-value">
                              $<count-to :startVal='0' :endVal='item.counter' :duration='1500'></count-to>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <!-- end card body -->
                  </div>
                  <!-- end card -->
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->

              <div class="row">
                <div class="col-xl-12">
                  <Revenue />
                  <!-- end card -->
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
          <!-- end col -->
          </div>
            <!-- end row -->

        </div>
      </div>
    </div>
</template>