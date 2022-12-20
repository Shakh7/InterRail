<script>
import "flatpickr/dist/flatpickr.css";
import PageHeader from "../../../components/page-header.vue";

export default {
  data() {
    return {
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Counterparties List",
          active: true,
        },
      ],
      counterparties: [],
      enabled: true,
      dragging: false,
      loading: true,
    };
  },
  components: {PageHeader},
  methods: {
    async getCounterparties() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/counterparty/list/`)
      let data = await response.json()

      const groupByCounterparty = (arr = []) => {
        let result = [];
        result = arr.reduce((r, a) => {
          r[a.counterparty] = r[a.counterparty] || [];
          r[a.counterparty].push(a);
          return r;
        }, Object.create(null));
        return result;
      };

      this.counterparties = groupByCounterparty(data.results)
      this.loading = false;
    },
    loadData(data) {
      return data.length > 0 ? data[0].counterparty : 'Loading'
    },
    isLoading() {
      return this.loading
    },
  },
  async mounted() {
    this.loading = true;
    await this.getCounterparties()
  }
}
</script>

<template>
  <PageHeader title="Counterparties" :items="items"/>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-lg-auto">
        </div><!--end col-->
        <div class="col-lg-3 col-auto">
          <div class="search-box">
            <input type="text" class="form-control search" placeholder="Search for counterparty">
            <i class="ri-search-line search-icon"></i>
          </div>
        </div>
        <div class="col-auto ms-sm-auto">
        </div><!--end col-->
      </div><!--end row-->
    </div><!--end card-body-->
  </div><!--end card-->
  <Transition name="slide-up">
    <div class="row vh-100 justify-content-center align-items-center" v-if="isLoading()">
      <div class="col-12 text-center pb-5">
        <b-spinner variant="info" class="mb-5"></b-spinner>
      </div>
    </div>
    <div class="tasks-board mb-3" v-else-if="!isLoading()">
      <div class="tasks-list" v-for="data in counterparties" :key="data">
        <div class="d-flex mb-3">
          <div class="flex-grow-1">
            <h6 class="fs-14 fw-semibold mb-0">{{ data.length === 0 ? 'Loading' : loadData(data) }}<small
                class="badge bg-success align-bottom ms-1">{{ data.length }}</small></h6>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div class="">
            <div class="card" v-for="(item, index) of data" :key="index">
              <div class="card-body p-2">
                <div class="row w-100 m-auto align-items-center">
                  <div class="col-9 ps-0">
                    <h5 class="my-0 mb-1">Order: {{ item.order_number }}</h5>
                    <h6 class="my-0">
                      <b-badge variant="success">{{ item.category }}</b-badge>
                    </h6>
                  </div>
                  <div class="col-3 text-end pe-0"> 0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3">
          <button class="btn w-100 fw-medium"
                  :class="loadData(data) === 'TRANSGROUP' ? 'btn-soft-success' : 'btn-soft-danger'">
            0
          </button>
        </div>
      </div>
    </div>
  </Transition>

</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>