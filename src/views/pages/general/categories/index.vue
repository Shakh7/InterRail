<template>
  <PageHeader title="General" :items="items"/>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 px-0">
        <div class="card">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <div class="search-box">
                  <input v-model="search" type="text" class="form-control search"
                         placeholder="Search for categories...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-grid gap-2">
                  <b-button variant="soft-info" class="w-lg waves-effect waves-light"
                            @click="createCategory()">Create
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1 gy-3 pb-3">
          <div class="col" v-for="category in categoryComputed" :key="category.id">
            <div class="collapse show">
              <div class="card mb-1">
                <div class="card-body">

                  <a class="d-flex align-items-center" data-bs-toggle="collapse"
                     :href="'#category_' + category.id" role="button" aria-expanded="false"
                     :aria-controls="'category_' + category.id"
                  >

                    <div class="flex-shrink-0">
                      <b-button variant="light" class="position-relative p-0 avatar-xs rounded-circle">
                        <span class="avatar-title bg-transparent text-reset">
                            {{ category.name[0] }}
                        </span>
                      </b-button>
                    </div>

                    <div class="flex-grow-1 ms-3">
                      <h6 class="fs-14 mb-1">{{ category.name }}</h6>
                      <p class="text-muted mb-0">name</p>
                    </div>

                  </a>
                </div>
                <div class="collapse border-top border-top-dashed" :id="'category_' + category.id">
                  <div class="card-body">
                    <h6 class="fs-14 mb-1">
                      Name:
                    </h6>
                    <input class="form-control text-muted" type="text" v-model="category.name">
                  </div>
                  <div class="card-footer hstack gap-2">
                    <button class="btn btn-soft-info btn-sm w-50 fs-6"
                            @click="updateCategory(category.id, category.name)">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                      Save
                    </button>
                    <button class="btn btn-soft-danger btn-sm w-50 fs-6"
                            @click="deleteCategoryConfirmation(category)">
                      <font-awesome-icon icon="fa-solid fa-trash"/>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h6>Showing {{ categoryComputed.length }} out of {{ categories.length }} categories</h6>
      </div>
    </div>
  </div>
</template>

<script>
import CoreApi from "@/api/core/core_api.js";
import Swal from "sweetalert2";
import PageHeader from "../../../../components/page-header.vue";

export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
      search: '',
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Categories List",
          active: true,
        },
      ]
    }
  },
  methods: {
    async getCategories(limit, offset) {
      let categoriesApi = new CoreApi()
      let response = await categoriesApi.getCategories(limit, offset)
      this.categories = response.results
    },
    async createCategory() {
      const {value: formValues} = await Swal.fire({
        title: 'Create a Category',
        html:
            '<input id="create_category_name" class="form-control w-75 m-auto mt-2" placeholder="Category name">',
        focusConfirm: false,
        confirmButtonText: 'Create',
        confirmButtonColor: '#0AB39C',
        preConfirm: () => {
          return [
            document.getElementById('create_category_name').value,
          ]
        }
      })

      if (formValues) {

        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/categories/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": formValues[0],
          }),
        });

        let error = (await response.json())['non_field_errors']

        await this.getCategories()
        await this.showResponse(error, 'Category created successfully')
      }
    },
    async deleteCategoryConfirmation(counterparty) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete ${(counterparty.name).toString()}`,
        text: 'Deleting this category will remove all of its information from our database',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type ${(counterparty.name).toString()} to confirm`,
        input: 'text',
        inputPlaceholder: `${(counterparty.name).toString()}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === (counterparty.name).toString()) {
              resolve(this.deleteCategory(counterparty.id))
            } else {
              resolve('Category name did not match :)')
            }
          })
        }
      });
    },
    deleteCategory(id) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/categories/${id}/`, {method: 'DELETE'})
          .then(response => {
            this.getCategories()
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
              title: response.ok ? 'Category deleted' : 'Category delete failed',
            })
          });
    },
    async updateCategory(id, name) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/categories/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
        }),
      });
      let error = (await response.json())['non_field_errors']

      await this.getCategories()
      await this.showResponse(error, 'Category updated successfully')
    },
    async showResponse(response, successMessage) {
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
        icon: response === undefined ? 'success' : 'error',
        title: response === undefined ? successMessage : response[0]
      })
    }
  },
  async mounted() {
    await this.getCategories(100, 0)
  },
  computed: {
    categoryComputed() {
      return this.search.trim() === ''
          ? this.categories
          : this.categories.filter(category => category.name.trim().toLowerCase().includes(this.search.trim().toLowerCase()))
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style scoped>
</style>