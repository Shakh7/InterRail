<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/gsqxdxog.json";

export default {
  data() {
    return {
      config: {
        wrap: true,
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },
      date: null,
      date1: null,
      defaultOptions: {animationData: animationData},
      unassigned: [
        {
          title: "Profile Page Satructure",
          description: "Profile Page means a web page accessible to the public or to guests.",
          features: ["Admin"],
          users: [require("@/assets/images/users/avatar-6.jpg"), require("@/assets/images/users/avatar-5.jpg")],
          id: "#VL2436",
          watch: "04",
          message: "19",
          file: "2"
        },
      ],
      enabled: true,
      dragging: false,
      loading: true,
    };
  },
  components: {
    lottie: Lottie,
    flatPickr
  },
  methods: {
    async getCounterparties() {
      let response = await fetch('http://178.62.91.121:5000/order/counterparty/list/')
      let data = await response.json()

      const groupByMake = (arr = []) => {
        let result = [];
        result = arr.reduce((r, a) => {
          r[a.counterparty] = r[a.counterparty] || [];
          r[a.counterparty].push(a);
          return r;
        }, Object.create(null));
        return result;
      };

      this.unassigned = groupByMake(data.results)
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
      <div class="tasks-list" v-for="data in unassigned" :key="data">
        <div class="d-flex mb-3">
          <div class="flex-grow-1">
            <h6 class="fs-14 fw-semibold mb-0">{{ data.length === 0 ? 'Loading' : loadData(data) }}<small
                class="badge bg-success align-bottom ms-1">{{ data.length }}</small></h6>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div class="">
            <div class="card" v-for="(item, index) of data" :key="index">
              <div class="card-body pb-0">
                <div class="d-flex mb-2">
                  <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                    <router-link to="/apps/tasks-details">Order: {{ item.order_number }}</router-link>
                  </h6>
                  <div class="dropdown">
                    <a href="javascript:void(0);" class="text-muted" id="dropdownMenuLink1" data-bs-toggle="dropdown"
                       aria-expanded="false"><i class="ri-more-fill"></i></a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                      <li>
                        <router-link class="dropdown-item" to="/apps/tasks-details"><i
                            class="ri-eye-fill align-bottom me-2 text-muted"></i> View
                        </router-link>
                      </li>
                      <li><a class="dropdown-item" href="#"><i
                          class="ri-edit-2-line align-bottom me-2 text-muted"></i> Edit</a></li>
                      <li><a class="dropdown-item" data-bs-toggle="modal" href="#deleteRecordModal"><i
                          class="ri-delete-bin-5-line align-bottom me-2 text-muted"></i> Delete</a></li>
                    </ul>
                  </div>
                </div>
                <p class="text-muted">{{ item.category }}</p>
              </div>
              <div class="card-footer border-top-dashed">
                <div class="d-flex">
                  <div class="flex-grow-1">
                    <h6 class="text-danger mb-0">
                      {{
                        (item.category === 'Wagon operations' && item.counterparty === 'Fingda') ? '$1055'
                            : (item.category === 'Ocean freight' && item.counterparty === 'Fingda') ? '$2110'
                                : (item.category === 'Rail freight' && item.counterparty === 'Fingda') ? '$10000'
                                    : (item.category === 'Wagon operations' && item.counterparty === 'UZJDK') ? '$7500'
                                        : (item.category === 'Ocean freight' && item.counterparty === 'UZJDK') ? '$10500'
                                            : (item.category === 'Rail freight' && item.counterparty === 'UZJDK') ? '$15000' : 0
                      }}</h6>
                  </div>
                  <div class="flex-shrink-0">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3">
          <button class="btn w-100 fw-medium"
                  :class="loadData(data) === 'TRANSGROUP' ? 'btn-soft-success' : 'btn-soft-danger'">
            $ {{
              data.length === 0 ? 'Loading'
                  : loadData(data) === "Fingda" ? 13165
                      : loadData(data) === "UZJDK" ? 33000 : 0
            }}
          </button>
        </div>
      </div>
    </div>
  </Transition>


  <div class="modal fade" id="addmemberModal" tabindex="-1" aria-labelledby="addmemberModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header p-3 bg-soft-warning">
          <h5 class="modal-title" id="addmemberModalLabel">Add Member</h5>
          <button type="button" class="btn-close" id="btn-close-member" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row g-3">
              <div class="col-lg-12">
                <label for="submissionidInput" class="form-label">Submission ID</label>
                <input type="number" class="form-control" id="submissionidInput" placeholder="Submission ID">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="profileimgInput" class="form-label">Profile Images</label>
                <input class="form-control" type="file" id="profileimgInput">
              </div><!--end col-->
              <div class="col-lg-6">
                <label for="firstnameInput" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstnameInput" placeholder="Enter firstname">
              </div><!--end col-->
              <div class="col-lg-6">
                <label for="lastnameInput" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastnameInput" placeholder="Enter lastname">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="designationInput" class="form-label">Designation</label>
                <input type="text" class="form-control" id="designationInput" placeholder="Designation">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="titleInput" class="form-label">Title</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Title">
              </div><!--end col-->
              <div class="col-lg-6">
                <label for="numberInput" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="numberInput" placeholder="Phone number">
              </div><!--end col-->
              <div class="col-lg-6">
                <label for="joiningdateInput" class="form-label">Joining Date</label>

                <flat-pickr
                    v-model="date"
                    :config="config"
                    placeholder="Select date"
                    class="form-control"
                ></flat-pickr>
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="emailInput" class="form-label">Email ID</label>
                <input type="email" class="form-control" id="emailInput" placeholder="Email">
              </div><!--end col-->
            </div><!--end row-->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal"><i
              class="ri-close-line align-bottom me-1"></i> Close
          </button>
          <button type="button" class="btn btn-success" id="addMember">Add Member</button>
        </div>
      </div>
    </div>
  </div><!--end add member modal-->

  <div class="modal fade" id="createboardModal" tabindex="-1" aria-labelledby="createboardModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header p-3 bg-soft-info">
          <h5 class="modal-title" id="createboardModalLabel">Add Board</h5>
          <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#">
            <div class="row">
              <div class="col-lg-12">
                <label for="boardName" class="form-label">Board Name</label>
                <input type="text" class="form-control" id="boardName" placeholder="Enter board name">
              </div>
              <div class="mt-4">
                <div class="hstack gap-2 justify-content-end">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-success" id="addNewBoard">Add Board</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div><!--end add board modal-->

  <div class="modal fade" id="creatertaskModal" tabindex="-1" aria-labelledby="creatertaskModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header p-3 bg-soft-info">
          <h5 class="modal-title" id="creatertaskModalLabel">Create New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#">
            <div class="row g-3">
              <div class="col-lg-12">
                <label for="projectName" class="form-label">Project Name</label>
                <input type="text" class="form-control" id="projectName" placeholder="Enter project name">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="sub-tasks" class="form-label">Task Title</label>
                <input type="text" class="form-control" id="sub-tasks" placeholder="Task title">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="task-description" class="form-label">Task Description</label>
                <textarea class="form-control" id="task-description" rows="3"></textarea>
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="formFile" class="form-label">Tasks Images</label>
                <input class="form-control" type="file" id="formFile">
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="tasks-progress" class="form-label">Add Team Member</label>
                <div data-simplebar style="height: 95px;">
                  <ul class="list-unstyled vstack gap-2 mb-0">
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="anna-adame">
                        <label class="form-check-label d-flex align-items-center" for="anna-adame">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-1.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Anna Adame
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="frank-hook">
                        <label class="form-check-label d-flex align-items-center" for="frank-hook">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-3.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Frank Hook
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="alexis-clarke">
                        <label class="form-check-label d-flex align-items-center" for="alexis-clarke">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-6.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Alexis Clarke
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="herbert-stokes">
                        <label class="form-check-label d-flex align-items-center" for="herbert-stokes">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Herbert Stokes
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="michael-morris">
                        <label class="form-check-label d-flex align-items-center" for="michael-morris">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-7.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Michael Morris
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="nancy-martino">
                        <label class="form-check-label d-flex align-items-center" for="nancy-martino">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Nancy Martino
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="thomas-taylor">
                        <label class="form-check-label d-flex align-items-center" for="thomas-taylor">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-8.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Thomas Taylor
                                                    </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="tonya-noble">
                        <label class="form-check-label d-flex align-items-center" for="tonya-noble">
                                                    <span class="flex-shrink-0">
                                                        <img src="@/assets/images/users/avatar-10.jpg" alt=""
                                                             class="avatar-xxs rounded-circle"/>
                                                    </span>
                          <span class="flex-grow-1 ms-2">
                                                        Tonya Noble
                                                    </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div><!--end col-->
              <div class="col-lg-4">
                <label for="due-date" class="form-label">Due Date</label>

                <flat-pickr
                    v-model="date1"
                    placeholder="Select date"
                    class="form-control"
                ></flat-pickr>
              </div><!--end col-->
              <div class="col-lg-4">
                <label for="categories" class="form-label">Tags</label>
                <input type="text" class="form-control" id="categories" placeholder="Enter tag">
              </div><!--end col-->
              <div class="col-lg-4">
                <label for="tasks-progress" class="form-label">Tasks Progress</label>
                <input type="text" class="form-control" maxlength="3" id="tasks-progress"
                       placeholder="Enter progress">
              </div><!--end col-->
              <div class="mt-4">
                <div class="hstack gap-2 justify-content-end">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-success">Add Task</button>
                </div>
              </div><!--end col-->
            </div><!--end row-->
          </form>
        </div>
      </div>
    </div>
  </div><!--end add board modal-->

  <div class="modal fade zoomIn" id="deleteRecordModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
        </div>
        <div class="modal-body">
          <div class="mt-2 text-center">
            <lottie
                class="avatar-xl"
                colors="primary:#405189,secondary:#f06548"
                :options="defaultOptions"
                :height="100"
                :width="100"
            />
            <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p class="text-muted mx-4 mb-0">Are you sure you want to remove this tasks ?</p>
            </div>
          </div>
          <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn w-sm btn-danger" id="delete-record">Yes, Delete It!</button>
          </div>
        </div>
      </div>
    </div>
  </div><!--end modal -->

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