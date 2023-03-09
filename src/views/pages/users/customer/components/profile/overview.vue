<template>
  <div class="row">
    <div class="col-xxl-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-5">Complete The Profile</h5>
          <div
              class="progress animated-progess custom-progress progress-label"
          >
            <div
                class="progress-bar bg-danger"
                role="progressbar"
                style="width: 30%"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
            >
              <div class="label">30%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-3">Company Info</h5>
          <div class="table-responsive">
            <table class="table table-borderless mb-0">
              <tbody>
              <tr>
                <th class="ps-0" scope="row" style="min-width: 70px">Name:</th>
                <td class="text-muted">{{ company.name }}</td>
              </tr>
              <tr>
                <th class="ps-0" scope="row">Mobile:</th>
                <td class="text-muted">{{ company.phone }}</td>
              </tr>
              <tr>
                <th class="ps-0" scope="row">E-mail:</th>
                <td class="text-muted">{{ company.email }}</td>
              </tr>
              <tr>
                <th class="ps-0" scope="row">Address:</th>
                <td class="text-muted">{{ company.address }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
    <div class="col-xxl-9">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-3">About</h5>
          <p>
            Hi I'm c, It will be as simple as Occidental;
            in fact, it will be Occidental. To an English person, it
            will seem like simplified English, as a skeptical
            Cambridge friend of mine told me what Occidental is
            European languages are members of the same family.
          </p>
          <p>
            You always want to make sure that your fonts work well
            together and try to limit the number of fonts you use to
            three or less. Experiment and play around with the fonts
            that you already have in the software you’re working
            with reputable font websites. This may be the most
            commonly encountered tip I received from the designers I
            spoke with. They highly encourage that you use different
            fonts in one design, but do not over-exaggerate and go
            overboard.
          </p>
          <div class="row">
            <div class="col-6 col-md-4">
              <div class="d-flex mt-4">
                <div
                    class="flex-shrink-0 avatar-xs align-self-center me-3"
                >
                  <div
                      class="avatar-title bg-light rounded-circle fs-16 text-primary"
                  >
                    <i class="ri-user-2-fill"></i>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <p class="mb-1">Designation :</p>
                  <h6 class="text-truncate mb-0">
                    Lead Designer / Developer
                  </h6>
                </div>
              </div>
            </div>
            <!--end col-->
            <div class="col-6 col-md-4">
              <div class="d-flex mt-4">
                <div
                    class="flex-shrink-0 avatar-xs align-self-center me-3"
                >
                  <div
                      class="avatar-title bg-light rounded-circle fs-16 text-primary"
                  >
                    <i class="ri-global-line"></i>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <p class="mb-1">Website :</p>
                  <a href="#" class="fw-semibold">www.c.com</a>
                </div>
              </div>
            </div>
            <!--end col-->
          </div>
          <!--end row-->
        </div>
      </div>
      <div class="card card-body">
        <div class="swiper project-swiper">

          <swiper
              :slides-per-view="3"
              :space-between="50"
              :thumbs="{ swiper: thumbsSwiper }"
          >
            <swiper-slide>
              <div class="swiper-slide">
                <div
                    class="card profile-project-card shadow-none profile-project-success mb-0"
                >
                  <div class="card-body p-4">
                    <div class="d-flex">
                      <div
                          class="flex-grow-1 text-muted overflow-hidden"
                      >
                        <h5 class="fs-14 text-truncate mb-1">
                          <a href="#" class="text-dark"
                          >ABC Project Customization</a
                          >
                        </h5>
                        <p class="text-muted text-truncate mb-0">
                          Last Update :
                          <span class="fw-semibold text-dark"
                          >4 hr Ago</span
                          >
                        </p>
                      </div>
                      <div class="flex-shrink-0 ms-2">
                        <div
                            class="badge badge-soft-warning fs-10"
                        >
                          Inprogress
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-4">
                      <div class="flex-grow-1">
                        <div
                            class="d-flex align-items-center gap-2"
                        >
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
                                    class="avatar-title rounded-circle bg-light text-primary"
                                >
                                  A
                                </div>
                              </div>
                            </div>
                            <div class="avatar-group-item">
                              <div class="avatar-xs">
                                <img
                                    src="@/assets/images/users/avatar-2.jpg"
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
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-slide">
                <div
                    class="card profile-project-card shadow-none profile-project-danger mb-0"
                >
                  <div class="card-body p-4">
                    <div class="d-flex">
                      <div
                          class="flex-grow-1 text-muted overflow-hidden"
                      >
                        <h5 class="fs-14 text-truncate mb-1">
                          <a href="#" class="text-dark"
                          >Client - John</a
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
                        <div
                            class="badge badge-soft-success fs-10"
                        >
                          Completed
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-4">
                      <div class="flex-grow-1">
                        <div
                            class="d-flex align-items-center gap-2"
                        >
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
                                <div
                                    class="avatar-title rounded-circle bg-light text-primary"
                                >
                                  C
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
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-slide">
                <div
                    class="card profile-project-card shadow-none profile-project-info mb-0"
                >
                  <div class="card-body p-4">
                    <div class="d-flex">
                      <div
                          class="flex-grow-1 text-muted overflow-hidden"
                      >
                        <h5 class="fs-14 text-truncate mb-1">
                          <a href="#" class="text-dark"
                          >Brand logo Design</a
                          >
                        </h5>
                        <p class="text-muted text-truncate mb-0">
                          Last Update :
                          <span class="fw-semibold text-dark"
                          >2 hr Ago</span
                          >
                        </p>
                      </div>
                      <div class="flex-shrink-0 ms-2">
                        <div
                            class="badge badge-soft-warning fs-10"
                        >
                          Inprogress
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-4">
                      <div class="flex-grow-1">
                        <div
                            class="d-flex align-items-center gap-2"
                        >
                          <div>
                            <h5 class="fs-12 text-muted mb-0">
                              Members :
                            </h5>
                          </div>
                          <div class="avatar-group">
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
            </swiper-slide>
          </swiper>

        </div>
      </div>
    </div>
  </div>



</template>

<script>
import SwiperCore, {Thumbs, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper-bundle.css";

SwiperCore.use([Thumbs, Navigation, Pagination]);

export default {
  name: "customer_profile_overview",
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      thumbsSwiper: null,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  }
}
</script>

<style scoped>

</style>