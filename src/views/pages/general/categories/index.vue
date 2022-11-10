<!--<template>-->
<!--  <div class="container-fluid">-->
<!--    <div class="row">-->
<!--      <div class="col-12 px-0">-->
<!--        <div class="card">-->
<!--          <div class="card-body">-->
<!--            <div class="row g-3">-->
<!--              <div class="col-md-3">-->
<!--                <div class="search-box">-->
<!--                  <input type="text" class="form-control search" placeholder="Search for categories...">-->
<!--                  <i class="ri-search-line search-icon"></i>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-md-auto ms-auto">-->
<!--                <div class="d-grid gap-2">-->
<!--                  <b-button variant="soft-info" class="w-lg waves-effect waves-light">Create</b-button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="row row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1 gy-3 pb-3">-->
<!--          <div class="col" v-for="category in categories" :key="category.id">-->
<!--            <div class="collapse show">-->
<!--              <div class="card mb-1">-->
<!--                <div class="card-body">-->

<!--                  <a class="d-flex align-items-center" data-bs-toggle="collapse"-->
<!--                     :href="'#category_' + category.id" role="button" aria-expanded="false"-->
<!--                     :aria-controls="'category_' + category.id"-->
<!--                  >-->

<!--                    <div class="flex-shrink-0">-->
<!--                      <b-button variant="light" class="position-relative p-0 avatar-xs rounded-circle">-->
<!--                        <span class="avatar-title bg-transparent text-reset">-->
<!--                            {{ category.name[0] }}-->
<!--                        </span>-->
<!--                      </b-button>-->
<!--                    </div>-->

<!--                    <div class="flex-grow-1 ms-3">-->
<!--                      <h6 class="fs-14 mb-1">{{ category.name }}</h6>-->
<!--                      <p class="text-muted mb-0">ID: {{ category.id }}</p>-->
<!--                    </div>-->

<!--                  </a>-->
<!--                </div>-->
<!--                <div class="collapse border-top border-top-dashed" :id="'category_' + category.id">-->
<!--                  <div class="card-body">-->
<!--                    <h6 class="fs-14 mb-1">-->
<!--                      Name:-->
<!--                    </h6>-->
<!--                    <input class="form-control text-muted" type="text" v-model="category.name">-->
<!--                  </div>-->
<!--                  <div class="card-footer hstack gap-2">-->
<!--                    <button class="btn btn-warning btn-sm w-100">-->
<!--                      <i class="ri-phone-line align-bottom me-1"></i> Call-->
<!--                    </button>-->
<!--                    <button class="btn btn-info btn-sm w-100">-->
<!--                      <i class="ri-question-answer-line align-bottom me-1"></i>-->
<!--                      Message-->
<!--                    </button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import CoreCategoriesApi from "@/api/core/categories/core.categories.api";-->
<!--// import Swal from "sweetalert2";-->

<!--export default {-->
<!--  name: "StationsList",-->
<!--  data() {-->
<!--    return {-->
<!--      categories: [],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async getCategories(limit, offset) {-->
<!--      let categoriesApi = new CoreCategoriesApi()-->
<!--      let response = await categoriesApi.getCategories(limit, offset)-->
<!--      let categoriesList = await response.json()-->
<!--      console.log(categoriesList)-->
<!--      this.categories = categoriesList.results-->
<!--    },-->
<!--  },-->
<!--  async mounted() {-->
<!--    await this.getCategories(100, 0)-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->