<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-9 ps-0">
        <div class="card" id="contactList">
          <div class="card-header">
            <div class="row gy-3">
              <div class="col-md-4">
                <div class="search-box">
                  <input v-model="search" type="text" class="form-control search" placeholder="Search for products...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-grid gap-2">
                  <b-button variant="soft-info" @click="createProduct">Create</b-button>
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
                      {{ currentPage.page * 25 - (25 - index) + 1 }}
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
                    <input v-model="preview.name" class="form-control w-100 fs-5 p-0 py-1 bg-transparent"
                           :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                           style="outline: none">
                  </div>
                </div>
                <div class="table-responsive table-card">
                  <table class="table table-borderless mb-0">
                    <tbody>
                    <tr>
                      <td class="fw-medium">HC CODE</td>
                      <td>
                        <input v-model="preview.hc_code"
                               class="form-control w-100 fs-6 text-end p-0 pe-2 bg-transparent"
                               :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                               style="outline: none"
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">ETCNG CODE</td>
                      <td>
                        <input v-model="preview.etcng_code"
                               class="form-control w-100 fs-6 text-end p-0 pe-2 bg-transparent"
                               :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                               style="outline: none"
                        >
                      </td>
                    </tr>
                    <tr style="white-space: pre-wrap;">
                      <td class="fw-medium">ETCNG NAME</td>
                      <td>
                        <input v-model="preview.etcng_name"
                               class="form-control w-100 fs-6 text-end p-0 pe-2 bg-transparent"
                               :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                               style="outline: none"
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-grid">
                          <b-button variant="soft-info" v-if="preview.isInEditMode" @click="saveProduct">Save</b-button>
                          <b-button variant="soft-info" v-if="!preview.isInEditMode"
                                    @click="preview.isInEditMode = true">Edit
                          </b-button>
                        </div>
                      </td>
                      <td>
                        <div class="d-grid">
                          <b-button variant="soft-danger" @click="deleteProductConfirmation(preview)">Delete</b-button>
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
                      <td>
                        <div class="d-grid">
                          <b-button variant="soft-info">Edit</b-button>
                        </div>
                      </td>
                      <td>
                        <div class="d-grid">
                          <b-button variant="soft-danger">Delete</b-button>
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
import CoreApi from "@/api/core/core_api.js";
import Swal from "sweetalert2";
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
        isInEditMode: false,
      },
      create: false,
      search: ''
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
      this.preview = {
        id: 0,
        name: "",
        hc_code: "",
        etcng_code: "",
        etcng_name: "",
        isInEditMode: false,
      }
      let productsApi = new CoreApi()
      let response = await productsApi.getProducts(limit, offset)
      this.currentPage.all = response.count
      this.products = response.results
    },
    async createProduct() {
      const {value: formValues} = await Swal.fire({
        title: 'Create a Counterparty',
        html:
            '<input id="create_product_name" class="form-control w-75 m-auto mt-2" placeholder="Product name">' +
            '<input id="create_product_hccode" class="form-control w-75 m-auto mt-2" placeholder="Product hc code">' +
            '<input id="create_product_etcng_code" class="form-control w-75 m-auto mt-2" placeholder="Product etcng code">' +
            '<input id="create_product_etcng_name" class="form-control w-75 m-auto mt-2" placeholder="Product etcng name">',
        focusConfirm: false,
        confirmButtonText: 'Create',
        confirmButtonColor: '#0AB39C',
        preConfirm: () => {
          return [
            document.getElementById('create_product_name').value,
            document.getElementById('create_product_hccode').value,
            document.getElementById('create_product_etcng_code').value,
            document.getElementById('create_product_etcng_name').value,
          ]
        }
      })

      if (formValues) {

        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/products/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": formValues[0],
            "hc_code": formValues[1],
            "etcng_code": formValues[2],
            "etcng_name": formValues[3],
          }),
        });

        let error = (await response.json())['non_field_errors']

        await this.getProducts(25, 0)
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
          icon: error === undefined ? 'success' : 'error',
          title: error === undefined ? 'Product created successfully' : error[0]
        })
      }
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

    async saveProduct() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/products/${this.preview.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": this.preview.name,
          "hc_code": this.preview.hc_code,
          "etcng_code": this.preview.etcng_code,
          "etcng_name": this.preview.etcng_name,
        }),
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

      let error = (await response.json())['non_field_errors']

      await this.getProducts(25, 0)
      await Toast.fire({
        icon: error === undefined ? 'success' : 'error',
        title: error === undefined ? 'Product updated successfully' : error[0]
      })
    },

    async deleteProductConfirmation(product) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete ${(product.name).toString()}`,
        text: 'Deleting this station will remove all of its information from our database',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type ${(product.name.trim()).toString()} to confirm`,
        input: 'email',
        inputPlaceholder: `${(product.name).toString().trim()}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === (product.name).toString().trim()) {
              resolve(this.deleteProduct(product.id))
            } else {
              resolve('Product name did not match :)')
            }
          })
        }
      });
    },

    deleteProduct(id) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/core/products/${id}/`, {method: 'DELETE'})
          .then(response => {
            this.getProducts(25, 0)
            this.preview = {
              id: 0,
              name: "",
              hc_code: "",
              etcng_code: "",
              etcng_name: "",
              isInEditMode: false,
            }
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

            Toast.fire({
              icon: response.ok ? 'success' : 'error',
              title: response.ok ? 'Product deleted successfully' : 'Product delete failed'
            })
          })
    },
    async searchProducts(query) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/core/products/?limit=25&search=${query}`)
          .then(response => response.json()).then(data => {
        this.products = data.results
      })
    }
  },
  async mounted() {
    await this.setPage(this.$route.query.page)
  },
  watch: {
    '$route.query.page': async function (page) {
      await this.setPage(page)
    },
    search: async function (newVal) {
      await this.searchProducts(newVal)
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