<script>
  import {
    SimpleBar
  } from "simplebar-vue3";

  import i18n from "../i18n";
  // import router from '../router/index.js'

  /**
   * Nav-bar Component
   */
  export default {
    data() {
      return {
        languages: [{
            flag: require("@/assets/images/flags/us.svg"),
            language: "en",
            title: "English",
          },
          {
            flag: require("@/assets/images/flags/russia.svg"),
            language: "ru",
            title: "русский",
          },
        ],
        lan: i18n.locale,
        text: null,
        flag: null,
        value: null,
        myVar: 1,
      };
    },
    components: {
      SimpleBar
    },

    methods: {

      logout() {
        localStorage.removeItem('jwt')
        window.location.reload(true)
      },

      isCustomDropdown() {
        //Search bar
        var searchOptions = document.getElementById("search-close-options");
        var dropdown = document.getElementById("search-dropdown");
        var searchInput = document.getElementById("search-options");

        searchInput.addEventListener("focus", () => {
          var inputLength = searchInput.value.length;
          if (inputLength > 0) {
            dropdown.classList.add("show");
            searchOptions.classList.remove("d-none");
          } else {
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
          }
        });

        searchInput.addEventListener("keyup", () => {
          var inputLength = searchInput.value.length;
          if (inputLength > 0) {
            dropdown.classList.add("show");
            searchOptions.classList.remove("d-none");
          } else {
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
          }
        });

        searchOptions.addEventListener("click", () => {
          searchInput.value = "";
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        });

        document.body.addEventListener("click", (e) => {
          if (e.target.getAttribute("id") !== "search-options") {
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
          }
        });
      },
      toggleHamburgerMenu() {
        var windowSize = document.documentElement.clientWidth;

        if (windowSize > 767)
          document.querySelector(".hamburger-icon").classList.toggle("open");

        //For collapse horizontal menu
        if (
          document.documentElement.getAttribute("data-layout") === "horizontal"
        ) {
          document.body.classList.contains("menu") ?
            document.body.classList.remove("menu") :
            document.body.classList.add("menu");
        }

        //For collapse vertical menu
        if (document.documentElement.getAttribute("data-layout") === "vertical") {
          if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove("vertical-sidebar-enable");
            document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
              document.documentElement.setAttribute("data-sidebar-size", "") :
              document.documentElement.setAttribute("data-sidebar-size", "sm");
          } else if (windowSize > 1025) {
            document.body.classList.remove("vertical-sidebar-enable");
            document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
              document.documentElement.setAttribute("data-sidebar-size", "sm") :
              document.documentElement.setAttribute("data-sidebar-size", "lg");
          } else if (windowSize <= 767) {
            document.body.classList.add("vertical-sidebar-enable");
            document.documentElement.setAttribute("data-sidebar-size", "lg");
          }
        }

        //Two column menu
        if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
          document.body.classList.contains("twocolumn-panel") ?
            document.body.classList.remove("twocolumn-panel") :
            document.body.classList.add("twocolumn-panel");
        }
      },
      toggleMenu() {
        this.$parent.toggleMenu();
      },
      toggleRightSidebar() {
        this.$parent.toggleRightSidebar();
      },
      initFullScreen() {
        document.body.classList.toggle("fullscreen-enable");
        if (
          !document.fullscreenElement &&
          /* alternative standard method */
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      },
      setLanguage(locale, country, flag) {
        this.lan = locale;
        this.text = country;
        this.flag = flag;
        document.getElementById("header-lang-img").setAttribute("src", flag);
        i18n.global.locale = locale;
      },
      toggleDarkMode() {
        if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
          document.documentElement.setAttribute("data-layout-mode", "light");
        } else {
          document.documentElement.setAttribute("data-layout-mode", "dark");
        }
      },
    },
    computed: {},
    mounted() {
      document.addEventListener("scroll", function () {
        var pageTopbar = document.getElementById("page-topbar");
        if (pageTopbar) {
          document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
            "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
        }
      });
      if (document.getElementById("topnav-hamburger-icon"))
        document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

      this.isCustomDropdown();
    },
  };
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <!-- Left side / search -->
        <div class="d-flex">
          <!-- LOGO -->
          
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-dark.png" alt="" height="17" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/interrail-logo.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/interrail-logo.png" alt="" height="17" />
              </span>
            </router-link>
          </div>

          <button type="button" class="
              btn btn-sm
              px-3
              fs-16
              header-item
              vertical-menu-btn
              topnav-hamburger
            " id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="position-relative">
              <input type="text" class="form-control" placeholder="Search..." autocomplete="off" id="search-options"
                value="" />
              <span class="mdi mdi-magnify search-widget-icon"></span>
              <span class="
                  mdi mdi-close-circle
                  search-widget-icon search-widget-icon-close
                  d-none
                " id="search-close-options"></span>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <SimpleBar data-simplebar style="max-height: 320px">
                <!-- item-->
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Recent Searches
                  </h6>
                </div>

                <div class="dropdown-item bg-transparent text-wrap">
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">buttons <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                </div>
                <!-- item-->
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">
                    Pages
                  </h6>
                </div>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                      ri-bubble-chart-line
                      align-middle
                      fs-18
                      text-muted
                      me-2
                    "></i>
                  <span>Analytics Dashboard</span>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                  <span>Help Center</span>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                      ri-user-settings-line
                      align-middle
                      fs-18
                      text-muted
                      me-2
                    "></i>
                  <span>My account settings</span>
                </a>

                <!-- item-->
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">
                    Members
                  </h6>
                </div>

                <div class="notification-list">
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </a>
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </a>
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </a>
                </div>
              </SimpleBar>

              <div class="text-center pt-3 pb-1">
                <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                    class="ri-arrow-right-line ms-1"></i></router-link>
              </div>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown d-md-none topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-search fs-22"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown">
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search ..."
                      aria-label="Recipient's username" />
                    <button class="btn btn-primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="dropdown ms-1 topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img id="header-lang-img" src="@/assets/images/flags/us.svg" alt="Header Language" height="20"
                class="rounded" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <!-- item-->
              <a href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                @click="setLanguage(entry.language, entry.title, entry.flag)"
                :class="{ active: lan === entry.language }" class="dropdown-item notify-item language py-2"
                data-lang="en" title="English">
                <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18" />
                <span class="align-middle">{{ entry.title }}</span>
              </a>
            </div>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-toggle="fullscreen" @click="initFullScreen">
              <i class="bx bx-fullscreen fs-22"></i>
            </button>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class=" btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
              @click="toggleDarkMode">
              <i class="bx bx-moon fs-22"></i>
            </button>
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="bx bx-bell fs-22"></i>
              <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                3<span class="visually-hidden">unread messages</span></span>
            </button>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-notifications-dropdown">
              <div class="dropdown-head bg-primary bg-pattern rounded-top">
                <div class="p-3">
                  <div class="row align-items-center">
                    <div class="col">
                      <h6 class="m-0 fs-16 fw-semibold text-white">
                        Notifications
                      </h6>
                    </div>
                    <div class="col-auto dropdown-tabs">
                      <span class="badge badge-soft-light fs-13"> 4 New</span>
                    </div>
                  </div>
                </div>

                <div class="px-2 pt-2">
                  <ul class="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true"
                    id="notificationItemsTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab"
                        aria-selected="false" @click.capture.stop>
                        All (4)
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="true"
                        @click.capture.stop>
                        Messages
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false"
                        @click.capture.stop>
                        Alerts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tab-content" id="notificationItemsTabContent">

                <div class="tab-pane fade py-2 ps-2 show active" id="all-noti-tab" role="tabpanel">
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-info text-info rounded-circle fs-16">
                            <i class="bx bx-badge-check"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 lh-base">
                              Your <b>Elite</b> author Graphic Optimization
                              <span class="text-secondary">reward</span> is
                              ready!
                            </h6>
                          </a>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Angela Bernier
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow forecast's graph 🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                            <i class="bx bx-message-square-dots"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 fs-13 lh-base">
                              You have received <b class="text-success">20</b> new messages in the conversation
                            </h6>
                          </a>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-8.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Maureen Gibson
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 4 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="my-3 text-center">
                      <button type="button" class="btn btn-soft-success">
                        View All Notifications
                        <i class="ri-arrow-right-line align-middle"></i>
                      </button>
                    </div>
                  </SimpleBar>
                </div>

                <div class="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              James Lemire
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 30 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Angela Bernier
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow
                              forecast's graph 🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-6.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Kenneth Brown
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Mentionned you in his comment on 📃 invoice
                              #12501.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 10 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-8.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Maureen Gibson
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 3 days
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="my-3 text-center">
                      <button type="button" class="btn btn-soft-success">
                        View All Messages
                        <i class="ri-arrow-right-line align-middle"></i>
                      </button>
                    </div>
                  </SimpleBar>
                </div>

                <div class="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab">
                  <div class="w-25 w-sm-50 pt-3 mx-auto">
                    <img src="@/assets/images/svg/bell.svg" class="img-fluid" alt="user-pic" />
                  </div>
                  <div class="text-center pb-5 mt-2">
                    <h6 class="fs-18 fw-semibold lh-base">
                      Hey! You have no any notifications
                    </h6>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-3.jpg"
                  alt="Header Avatar" />
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{$store.state.user.full_name}} </span>
                  <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{{$store.state.user.role}}</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <!-- item-->
              <h6 class="dropdown-header">Welcome {{$store.state.user.full_name}}!</h6>
              <router-link class="dropdown-item" to="/pages/profile"><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span></router-link>
              <router-link class="dropdown-item" to="/chat">
                <i class=" mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Messages</span></router-link>
              <router-link class="dropdown-item" to="/apps/tasks-kanban">
                <i class="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Taskboard</span></router-link>
              <router-link class="dropdown-item" to="/pages/faqs"><i
                  class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Help</span></router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/pages/profile"><i
                  class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Balance : <b>$5971.67</b></span></router-link>
              <router-link class="dropdown-item" to="/pages/profile-setting"><span
                  class="badge bg-soft-success text-success mt-1 float-end">New</span><i
                  class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Settings</span></router-link>
              <router-link class="dropdown-item" to="/auth/lockscreen-basic"><i
                  class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Lock screen</span></router-link>
              <a class="dropdown-item" style="cursor: pointer" @click="logout"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">Logout</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>