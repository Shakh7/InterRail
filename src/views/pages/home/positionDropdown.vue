<template>
  <b-dropdown size="lg" variant="primary" class=" dropdown-menu-end p-0 d-inline-block position-relative" id="dropdownMenuButton">
    <b-dropdown-header>
      <div class="col">
        <h6 class="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
      </div>
      <div class="col-auto dropdown-tabs">
        <span class="badge badge-soft-light fs-13" data-key="t-view-all"> 4 New</span>
      </div>
    </b-dropdown-header>
    <b-card>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="All (4)" active>
          <div data-simplebar style="max-height: 300px;" class="pe-2">
            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <div class="avatar-xs me-3">
            <span class="avatar-title bg-soft-info text-info rounded-circle fs-16">
                <i class="bx bx-badge-check"></i>
            </span>
                </div>
                <div class="flex-1">
                  <h6 class="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic Optimization <span
                      class="text-secondary">reward</span> is ready!</h6>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-2.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <div class="avatar-xs me-3">
            <span class="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                <i class='bx bx-message-square-dots'></i>
            </span>
                </div>
                <div class="flex-1">
                  <h6 class="mt-0 mb-2 fs-13 lh-base">You have received <b class="text-success">20</b> new messages in
                    the conversation</h6>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-8.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">We talked about a project on linkedin.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <div class="my-3 text-center">
              <button type="button" class="btn btn-soft-success waves-effect waves-light">View All Notifications <i
                  class="ri-arrow-right-line align-middle"></i></button>
            </div>
          </div>
        </b-tab>

        <b-tab title="Messages">
          <div data-simplebar style="max-height: 300px;" class="pe-2">
            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-3.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">We talked about a project on linkedin.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 30 min ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-2.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-6.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">Mentionned you in his comment on 📃 invoice #12501.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <a href="#!" class="text-reset notification-item d-block dropdown-item">
              <div class="d-flex">
                <img src="assets/images/users/avatar-8.jpg"
                     class="me-3 rounded-circle avatar-xs" alt="user-pic">
                <div class="flex-1">
                  <h6 class="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                  <div class="fs-13 text-muted">
                    <p class="mb-1">We talked about a project on linkedin.</p>
                  </div>
                  <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                    <span><i class="mdi mdi-clock-outline"></i> 3 days ago</span>
                  </p>
                </div>
                <div class="px-2 fs-16">
                  <input class="form-check-input" type="checkbox">
                </div>
              </div>
            </a>

            <div class="my-3 text-center">
              <button type="button" class="btn btn-soft-success waves-effect waves-light">View All Messages <i
                  class="ri-arrow-right-line align-middle"></i></button>
            </div>
          </div>
        </b-tab>

        <b-tab title="Alerts">
          <div class="w-50 pt-3 mx-auto">
            <img src="assets/images/svg/bell.svg" class="img-fluid" alt="user-pic">
          </div>
          <div class="text-center pb-5 mt-2">
            <h6 class="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
          </div>
        </b-tab>

      </b-tabs>
    </b-card>
  </b-dropdown>
</template>

<script>
export default {
  name: "positionDropdown"
}
</script>

<style scoped>

</style>