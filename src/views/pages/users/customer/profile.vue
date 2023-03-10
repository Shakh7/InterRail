<script>

import {
  getCompanyByName, getContractsByCompanyId,
  getDocumentsByContractId
} from '@/api/customer/CustomerApi.js'

import OverviewTab from './components/profile/overview.vue'
import ContractsTab from './components/profile/contracts.vue'

export default {
  page: {
    title: "Profile",
    meta: [{name: "description", content: 'ccscssccscsc'}],
  },
  data() {
    return {
      title: "Profile",
      items: [
        {
          text: "Velzon",
          href: "/",
        },
        {
          text: "Profile",
          active: true,
        },
      ],

      company_data: {
        id: null,
        name: '',
        slug: "",
        email: "",
        phone: "",
        address: ""
      },

      company_contracts: [],
      is_loading_contracts: false,
      documents_by_contract: [],

      is_loading_company: false,
    };
  },
  components: {
    OverviewTab,
    ContractsTab
  },
  methods: {
    async getCompanyContracts() {
      this.is_loading_contracts = true
      this.company_contracts = await getContractsByCompanyId(this.company_data.id)
      this.is_loading_contracts = false
    },
    getDocumentFileName(file) {
      return file
    },
    async onContractDelete() {
      await this.getCompanyContracts()
    },
    async getDocumentsByContract(id) {
      this.documents_by_contract = []
      this.documents_by_contract = await getDocumentsByContractId(id)
    }
  },
  computed: {
    company() {
      return this.company_data;
    },
  },
  async mounted() {
    this.is_loading_company = true
    this.company_data.name = this.$route.params.company_name
    let response = await getCompanyByName(this.company_data.name)
    if (response.ok) {
      this.company_data = response.data
      this.is_loading_company = false
    } else {
      await this.$router.push({name: 'customers_list'})
    }
  }
};
</script>

<template>
  <div v-if="!is_loading_company" class="profile-foreground position-relative mx-n4 mt-n4">
    <div class="profile-wid-bg">
      <img
          src="@/assets/images/profile-bg.jpg"
          alt=""
          class="profile-wid-img"
      />
    </div>
  </div>
  <div v-if="!is_loading_company" class="pt-4 mb-4 mb-lg-3 pb-lg-4">
    <div class="row g-4">
      <div class="col-auto">
        <div class="avatar-lg">
          <img
              src="@/assets/images/users/avatar-1.jpg"
              alt="user-img"
              class="img-thumbnail rounded-circle"
          />
        </div>
      </div>
      <div class="col">
        <div class="p-2">
          <h3 class="text-white mb-1">{{ company_data.name }}</h3>
          <p class="text-white-75">Company name</p>
          <div class="hstack text-white-50 gap-1">
            <div class="me-2">
              <i
                  class="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"
              ></i
              >{{ company_data.address }}
            </div>
            <div>
              <i
                  class="ri-building-line me-1 text-white-75 fs-16 align-middle"
              ></i
              >Themesbrand
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
      <!--      <div class="col-12 col-lg-auto order-last order-lg-0">-->
      <!--        <div class="row text text-white-50 text-center">-->
      <!--          <div class="col-lg-6 col-4">-->
      <!--            <div class="p-2">-->
      <!--              <h4 class="text-white mb-1">24.3K</h4>-->
      <!--              <p class="fs-14 mb-0">Followers</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="col-lg-6 col-4">-->
      <!--            <div class="p-2">-->
      <!--              <h4 class="text-white mb-1">1.3K</h4>-->
      <!--              <p class="fs-14 mb-0">Following</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--end col-->
    </div>
    <!--end row-->
  </div>

  <div v-if="!is_loading_company" class="row">
    <div class="col-lg-12">
      <div>
        <div class="d-flex">
          <!-- Nav tabs -->
          <ul
              class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
              role="tablist"
          >
            <li class="nav-item">
              <a
                  class="nav-link fs-14 active"
                  data-bs-toggle="tab"
                  href="#overview-tab"
                  role="tab"
              >
                <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                <span class="d-none d-md-inline-block">Overview</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link fs-14"
                  data-bs-toggle="tab"
                  href="#activities"
                  role="tab"
              >
                <i class="ri-list-unordered d-inline-block d-md-none"></i>
                <span class="d-none d-md-inline-block">Activities</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link fs-14"
                  data-bs-toggle="tab"
                  href="#projects"
                  role="tab"
              >
                <i class="ri-price-tag-line d-inline-block d-md-none"></i>
                <span class="d-none d-md-inline-block">Projects</span>
              </a>
            </li>
            <li class="nav-item" @click="getCompanyContracts()">
              <a
                  class="nav-link fs-14"
                  data-bs-toggle="tab"
                  href="#contracts"
                  role="tab"
              >
                <i class="ri-folder-4-line d-inline-block d-md-none"></i>
                <span class="d-none d-md-inline-block">Contracts</span>
              </a>
            </li>
          </ul>
          <div class="flex-shrink-0">
            <router-link :to="{name: 'customer_profile_settings'}" class="btn btn-success"
            ><i class="ri-edit-box-line align-bottom"></i> Edit Profile
            </router-link
            >
          </div>
        </div>
        <!-- Tab panes -->
        <div class="tab-content pt-4 text-muted">
          <div class="tab-pane active pb-4" id="overview-tab" role="tabpanel">
            <OverviewTab :company="company"/>
          </div>
          <div class="tab-pane fade" id="activities" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-3">Activities</h5>
                <div class="acitivity-timeline">
                  <div class="acitivity-item d-flex">
                    <div class="flex-shrink-0">
                      <img
                          src="@/assets/images/users/avatar-1.jpg"
                          alt=""
                          class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Oliver Phillips
                        <span
                            class="badge bg-soft-primary text-primary align-middle"
                        >New</span
                        >
                      </h6>
                      <p class="text-muted mb-2">
                        We talked about a project on linkedin.
                      </p>
                      <small class="mb-0 text-muted">Today</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                      <div
                          class="avatar-title bg-soft-success text-success rounded-circle"
                      >
                        N
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Nancy Martino
                        <span
                            class="badge bg-soft-secondary text-secondary align-middle"
                        >In Progress</span
                        >
                      </h6>
                      <p class="text-muted mb-2">
                        <i class="ri-file-text-line align-middle ms-2"></i>
                        Create new project Buildng product
                      </p>
                      <div class="avatar-group mb-2">
                        <a
                            href="javascript: void(0);"
                            class="avatar-group-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Christi"
                        >
                          <img
                              src="@/assets/images/users/avatar-4.jpg"
                              alt=""
                              class="rounded-circle avatar-xs"
                          />
                        </a>
                        <a
                            href="javascript: void(0);"
                            class="avatar-group-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Frank Hook"
                        >
                          <img
                              src="@/assets/images/users/avatar-3.jpg"
                              alt=""
                              class="rounded-circle avatar-xs"
                          />
                        </a>
                        <a
                            href="javascript: void(0);"
                            class="avatar-group-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title=" Ruby"
                        >
                          <div class="avatar-xs">
                            <div
                                class="avatar-title rounded-circle bg-light text-primary"
                            >
                              R
                            </div>
                          </div>
                        </a>
                        <a
                            href="javascript: void(0);"
                            class="avatar-group-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="more"
                        >
                          <div class="avatar-xs">
                            <div class="avatar-title rounded-circle">2+</div>
                          </div>
                        </a>
                      </div>
                      <small class="mb-0 text-muted">Yesterday</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <img
                          src="@/assets/images/users/avatar-2.jpg"
                          alt=""
                          class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Natasha Carey
                        <span
                            class="badge bg-soft-success text-success align-middle"
                        >Completed</span
                        >
                      </h6>
                      <p class="text-muted mb-2">
                        Adding a new event with attachments
                      </p>
                      <div class="row">
                        <div class="col-xxl-4">
                          <div class="row border border-dashed gx-2 p-2 mb-2">
                            <div class="col-4">
                              <img
                                  src="@/assets/images/small/img-2.jpg"
                                  alt=""
                                  class="img-fluid rounded"
                              />
                            </div>
                            <!--end col-->
                            <div class="col-4">
                              <img
                                  src="@/assets/images/small/img-3.jpg"
                                  alt=""
                                  class="img-fluid rounded"
                              />
                            </div>
                            <!--end col-->
                            <div class="col-4">
                              <img
                                  src="@/assets/images/small/img-4.jpg"
                                  alt=""
                                  class="img-fluid rounded"
                              />
                            </div>
                            <!--end col-->
                          </div>
                          <!--end row-->
                        </div>
                      </div>
                      <small class="mb-0 text-muted">25 Nov</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <img
                          src="@/assets/images/users/avatar-6.jpg"
                          alt=""
                          class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">Bethany Johnson</h6>
                      <p class="text-muted mb-2">
                        added a new member to velzon dashboard
                      </p>
                      <small class="mb-0 text-muted">19 Nov</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <div class="avatar-xs acitivity-avatar">
                        <div
                            class="avatar-title rounded-circle bg-soft-danger text-danger"
                        >
                          <i class="ri-shopping-bag-line"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Your order is placed
                        <span
                            class="badge bg-soft-danger text-danger align-middle ms-1"
                        >Out of Delivery</span
                        >
                      </h6>
                      <p class="text-muted mb-2">
                        These customers can rest assured their order has been
                        placed.
                      </p>
                      <small class="mb-0 text-muted">16 Nov</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <img
                          src="@/assets/images/users/avatar-7.jpg"
                          alt=""
                          class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">Lewis Pratt</h6>
                      <p class="text-muted mb-2">
                        They all have something to say beyond the words on the
                        page. They can come across as casual or neutral,
                        exotic or graphic.
                      </p>
                      <small class="mb-0 text-muted">22 Oct</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <div class="avatar-xs acitivity-avatar">
                        <div
                            class="avatar-title rounded-circle bg-soft-info text-info"
                        >
                          <i class="ri-line-chart-line"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">Monthly sales report</h6>
                      <p class="text-muted mb-2">
                        <span class="text-danger">2 days left</span>
                        notification to submit the monthly sales report.
                        <a
                            href="javascript:void(0);"
                            class="link-warning text-decoration-underline"
                        >Reports Builder</a
                        >
                      </p>
                      <small class="mb-0 text-muted">15 Oct</small>
                    </div>
                  </div>
                  <div class="acitivity-item d-flex">
                    <div class="flex-shrink-0">
                      <img
                          src="@/assets/images/users/avatar-8.jpg"
                          alt=""
                          class="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        New ticket received
                        <span
                            class="badge bg-soft-success text-success align-middle"
                        >Completed</span
                        >
                      </h6>
                      <p class="text-muted mb-2">
                        User
                        <span class="text-secondary">Erica245</span> submitted
                        a ticket.
                      </p>
                      <small class="mb-0 text-muted">26 Aug</small>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-body-->
            </div>
            <!--end card-->
          </div>
          <div class="tab-pane fade" id="projects" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-warning"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Chat App Update</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >2 year Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-warning fs-10">
                              Inprogress
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-1.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-3.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-light text-primary"
                                    >
                                      J
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-success"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >ABC Project Customization</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >2 month Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-primary fs-10">
                              Progress
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-8.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-6.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-primary"
                                    >
                                      2+
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-info"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Client - Frank Hook</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >1 hr Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-info fs-10">New</div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-4.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-light text-primary"
                                    >
                                      M
                                    </div>
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-3.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-primary"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark">Velzon Project</a>
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >11 hr Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-success fs-10">
                              Completed
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-5.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-danger"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Brand Logo Design</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >10 min Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-info fs-10">New</div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-6.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-light text-primary"
                                    >
                                      E
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-primary"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark">Chat App</a>
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >8 hr Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-warning fs-10">
                              Inprogress
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-light text-primary"
                                    >
                                      R
                                    </div>
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-3.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-8.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-warning"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark">Project Update</a>
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >48 min Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-warning fs-10">
                              Inprogress
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-6.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-5.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-4.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none profile-project-success"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Client - Jennifer</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >30 min Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-primary fs-10">
                              Process
                            </div>
                          </div>
                        </div>

                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-1.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none mb-xxl-0 profile-project-info"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Bsuiness Template - UI/UX design</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >7 month Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-success fs-10">
                              Completed
                            </div>
                          </div>
                        </div>
                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-2.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-3.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-4.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-primary"
                                    >
                                      2+
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none mb-xxl-0 profile-project-success"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark">Update Project</a>
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >1 month Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-info fs-10">New</div>
                          </div>
                        </div>
                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-light text-primary"
                                    >
                                      A
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none mb-sm-0 profile-project-danger"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >Bank Management System</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >10 month Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-success fs-10">
                              Completed
                            </div>
                          </div>
                        </div>
                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-6.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-5.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <div
                                        class="avatar-title rounded-circle bg-primary"
                                    >
                                      2+
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 col-sm-6">
                    <div
                        class="card profile-project-card shadow-none mb-0 profile-project-primary"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex">
                          <div class="flex-grow-1 text-muted overflow-hidden">
                            <h5 class="fs-14 text-truncate">
                              <a href="#" class="text-dark"
                              >PSD to HTML Convert</a
                              >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                              Last Update :
                              <span class="fw-semibold text-dark"
                              >29 min Ago</span
                              >
                            </p>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="badge badge-soft-info fs-10">New</div>
                          </div>
                        </div>
                        <div class="d-flex mt-4">
                          <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5 class="fs-12 text-muted mb-0">
                                  Members :
                                </h5>
                              </div>
                              <div class="avatar-group">
                                <div class="avatar-group-item">
                                  <div class="avatar-xs">
                                    <img
                                        src="@/assets/images/users/avatar-7.jpg"
                                        alt=""
                                        class="rounded-circle img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end card body -->
                    </div>
                    <!-- end card -->
                  </div>
                  <!--end col-->
                  <div class="col-lg-12">
                    <div class="mt-4">
                      <ul
                          class="pagination pagination-separated justify-content-center mb-0"
                      >
                        <li class="page-item disabled">
                          <a href="javascript:void(0);" class="page-link"
                          ><i class="mdi mdi-chevron-left"></i
                          ></a>
                        </li>
                        <li class="page-item active">
                          <a href="javascript:void(0);" class="page-link"
                          >1</a
                          >
                        </li>
                        <li class="page-item">
                          <a href="javascript:void(0);" class="page-link"
                          >2</a
                          >
                        </li>
                        <li class="page-item">
                          <a href="javascript:void(0);" class="page-link"
                          >3</a
                          >
                        </li>
                        <li class="page-item">
                          <a href="javascript:void(0);" class="page-link"
                          >4</a
                          >
                        </li>
                        <li class="page-item">
                          <a href="javascript:void(0);" class="page-link"
                          >5</a
                          >
                        </li>
                        <li class="page-item">
                          <a href="javascript:void(0);" class="page-link"
                          ><i class="mdi mdi-chevron-right"></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--end row-->
              </div>
              <!--end card-body-->
            </div>
            <!--end card-->
          </div>
          <div class="tab-pane fade" id="contracts" role="tabpanel">
            <ContractsTab :company_id="company.id"
                          @onContractDeleted="getCompanyContracts()"
                          @onContractCreated="getCompanyContracts()"
                          :contracts="company_contracts" :is_loading="is_loading_contracts"/>
          </div>
        </div>
        <!--end tab-content-->
      </div>
    </div>
    <!--end col-->
  </div>

</template>
