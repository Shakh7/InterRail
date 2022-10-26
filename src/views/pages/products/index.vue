<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-9 ps-0">
        <div class="card" id="contactList">
          <div class="card-header">
            <div class="row gy-3">
              <div class="col-md-4">
                <div class="search-box">
                  <input type="text" class="form-control search" placeholder="Search for products...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-grid gap-2">
                  <b-button variant="soft-info" @click="createProduct">Create {{create}}</b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card">
                <table class="table table-nowrap mb-0 text-center">
                  <thead class="table-light">
                  <tr>
                    <th scope="col" style="width: 50px;">
                      №
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col"> Hc Code</th>
                    <th scope="col">Etcng Code</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(product, index) in products" :key="product.id"
                      @click="onRowClick(product)"
                      :class="product.id === preview.id ? 'text-success border-success': ''">
                    <th scope="row">
                      {{ currentPage.page * 25 - (25 - index) + 1}}
                    </th>
                    <td style="white-space: pre-wrap;" class="text-start">
                      <span>
                        {{ product.name }}
                      </span>
                    </td>
                    <td>{{ product.hc_code }}</td>
                    <td>{{ product.etcng_code }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <div class="pagination-wrap hstack gap-2">
                  <a v-if="currentPage.page > 1" class="page-item pagination-next" @click="changePage(true, false)">
                    Previous
                  </a>
                  <ul class="pagination listjs-pagination mb-0">
                    <li :class="currentPage.page === '1' ? 'active' : ''">
                      <router-link class="page" to="?page=1">1</router-link>
                    </li>
                    <li :class="currentPage.page === '2' ? 'active' : ''">
                      <router-link class="page" to="?page=2">2</router-link>
                    </li>
                    <li :class="currentPage.page === '3' ? 'active' : ''">
                      <router-link class="page" to="?page=3">3</router-link>
                    </li>
                    <li class="">
                      <router-link class="page" to="?page=635">635</router-link>
                    </li>
                    <li class="">
                      <router-link class="page" to="?page=636">636</router-link>
                    </li>
                  </ul>
                  <a class="page-item pagination-next" @click="changePage(false, true)">
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-3">

        <div class="btn-container w-100 p-0 m-0">
          <Transition name="slide-up">
            <div class="card p-0 m-0" v-if="preview.id > 0">
              <div class="card-body">
                <h6 class="text-muted text-uppercase fw-semibold mb-3">Product Information</h6>
                <div class="d-md-flex bg-light mb-4">
                  <div class="p-3 mb-0 bg-light">
                    <h5><code>Name</code></h5>
                    <span class="fs-5">{{ preview.name }}</span>
                  </div>
                </div>
                <div class="table-responsive table-card">
                  <table class="table table-borderless mb-0">
                    <tbody>
                    <tr>
                      <td class="fw-medium">HC CODE</td>
                      <td>
                        <span class="text-dark">{{ preview.hc_code }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">ETCNG CODE</td>
                      <td>
                        <span class="text-dark">{{ preview.etcng_code }}</span>
                      </td>
                    </tr>
                    <tr style="white-space: pre-wrap;">
                      <td class="fw-medium">ETCNG NAME</td>
                      <td>
                        <span class="text-dark">{{ preview.etcng_name }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="d-grid gap-2">
                          <b-button variant="soft-info">Edit</b-button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card p-0 m-0" v-else-if="preview.id === 0">
              <div class="card-body p-4 text-center">
                <div class="mx-auto avatar-lg mb-3">
                  <img src="https://cdn0.iconfinder.com/data/icons/buno-cloud-computing/32/__search_cloud_audit-512.png"
                       class="img-fluid">
                </div>
                <h5 class="card-title mb-1">Please, select a product to view</h5>
              </div>
            </div>
            <div class="card p-0 m-0" v-else-if="create">
              <div class="card-body">
                <h6 class="text-muted text-uppercase fw-semibold mb-3">Product Information</h6>
                <div class="d-md-flex bg-light mb-4">
                  <div class="p-3 mb-0 bg-light">
                    <h5><code>Name</code></h5>
                    <span class="fs-5">{{ preview.name }}</span>
                  </div>
                </div>
                <div class="table-responsive table-card">
                  <table class="table table-borderless mb-0">
                    <tbody>
                    <tr>
                      <td class="fw-medium">HC CODE</td>
                      <td>
                        <span class="text-dark">{{ preview.hc_code }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">ETCNG CODE</td>
                      <td>
                        <span class="text-dark">{{ preview.etcng_code }}</span>
                      </td>
                    </tr>
                    <tr style="white-space: pre-wrap;">
                      <td class="fw-medium">ETCNG NAME</td>
                      <td>
                        <span class="text-dark">{{ preview.etcng_name }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="d-grid gap-2">
                          <b-button variant="soft-info">Edit</b-button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoreProductsApi from "@/api/core/products/core.products.api";
// import Swal from "sweetalert2";

export default {
  name: "ProductsList",
  data() {
    return {
      currentPage: {
        per_page: 25,
        page: 1,
        all: 0,
      },
      products: [],
      preview: {
        id: 0,
        name: "",
        hc_code: "",
        etcng_code: "",
        etcng_name: "",
      },
      create: false,
    }
  },
  methods: {
    async setPage(page) {
      let page_case = Number.isInteger(Number(page))
          ? page < 1 ? 0 : page
          : page === undefined ? "default_page" : "NaN";

      switch (page_case) {
        case 0:
          await this.$router.push({path: "/products", query: {page: 1}});
          this.currentPage.page = 1
          await this.getProducts(this.currentPage.per_page, 0);
          break
        case 'default_page':
          this.currentPage.page = 1
          await this.getProducts(this.currentPage.per_page, 0)
          break
        case 'NaN':
          alert("NOT A NUMBER")
          break
        default:
          this.currentPage.page = page
          await this.getProducts(this.currentPage.per_page, (this.currentPage.page - 1) * this.currentPage.per_page)
          break
      }
    },
    async changePage(previous, next) {
      let page = parseInt(this.currentPage.page)
      if (previous) {
        await this.$router.push({path: "/products", query: {page: page - 1}});
      } else if (next) {
        await this.$router.push({path: "/products", query: {page: page + 1}});
      } else {
        await this.$router.push({path: "/products", query: {page: 1}});
      }
    },
    async getProducts(limit, offset) {
      let productsApi = new CoreProductsApi()
      let response = await productsApi.getProducts(limit, offset)
      let productsList = await response.json()
      this.currentPage.all = productsList.count
      this.products = productsList.results
    },
    async createProduct() {
      this.preview = {
        id: 0,
        name: "",
        hc_code: "",
        etcng_code: "",
        etcng_name: "",
      }
      this.create = true
    },
    onRowClick(product) {
      if (this.preview.id === product.id) {
        this.preview = {
          id: 0,
          name: "",
          hc_code: "",
          etcng_code: "",
          etcng_name: "",
        }
      } else {
        this.preview.id = product.id
        this.preview.name = product.name
        this.preview.hc_code = product.hc_code
        this.preview.etcng_code = product.etcng_code
        this.preview.etcng_name = product.etcng_name
      }
    },
  },
  async mounted() {
    await this.setPage(this.$route.query.page)
  },
  watch: {
    '$route.query.page': async function (page) {
      await this.setPage(page)
    }
  }
}
</script>

<style scoped>
.btn-container {
  display: inline-block;
  position: relative;
}

.btn-container .card {
  position: absolute;
  width: 100%;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
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