<script>
localStorage.setItem("rightbar_isopen", false);
import { layoutMethods, layoutComputed } from "@/state/helpers";
import { SimpleBar } from "simplebar-vue3";

/**
 * Right sidebar component
 */
export default {
  components: {
    SimpleBar,
  },
  data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"],
      },
    };
  },
  methods: {
    ...layoutMethods,
    hide() {
      this.$parent.toggleRightSidebar();
    },
    handleRightBarClick() {
      this.$parent.hideRightSidebar();
    },
    middleware(event) {
      if (event.target.classList)
        return !event.target.classList.contains("toggle-right");
    },
  },
  mounted(){
    let rightbar_isopen = localStorage.getItem('rightbar_isopen')
    if(rightbar_isopen=='true'){
      document.getElementById('mdi-cog').click()
      localStorage.setItem("rightbar_isopen", false);
    }
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
      set(layout) {
        localStorage.setItem("rightbar_isopen", true);
        this.changeLayoutType({
          layoutType: layout,
        });
      },
    },
    layoutWidth: {
      get() {
        return this.$store ? this.$store.state.layout.layoutWidth : {} || {};
      },
      set(width) {
        this.changeLayoutWidth({
          layoutWidth: width,
        });
      },
    },
    topbar: {
      get() {
        return this.$store ? this.$store.state.layout.topbar : {} || {};
      },
      set(topbar) {
        this.changeTopbar({
          topbar: topbar,
        });
      },
    },
    sidebarSize: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarSize : {} || {};
      },
      set(type) {
        return this.changeSidebarSize({
          sidebarSize: type,
        });
      },
    },
    position: {
      get() {
        return this.$store ? this.$store.state.layout.position : {} || {};
      },
      set(position) {
        return this.changePosition({
          position: position,
        });
      },
    },
    sidebarView: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarView : {} || {};
      },
      set(sidebarView) {
        return this.changeSidebarView({
          sidebarView: sidebarView,
        });
      },
    },
    sidebarColor: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarColor : {} || {};
      },
      set(sidebarColor) {
        return this.changeSidebarColor({
          sidebarColor: sidebarColor,
        });
      },
    },
    mode: {
      get() {
        return this.$store ? this.$store.state.layout.mode : {} || {};
      },
      set(mode) {
        return this.changeMode({
          mode: mode,
        });
      },
    },
  },
  watch: {
    mode: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.documentElement.setAttribute("data-layout-mode", "dark");
              break;
            case "light":
              document.documentElement.setAttribute(
                "data-layout-mode",
                "light"
              );
              break;
          }
        }
      },
    },
    sidebarColor: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.documentElement.setAttribute("data-sidebar", "dark");
              break;
            case "light":
              document.documentElement.setAttribute("data-sidebar", "light");
              break;
          }
        }
      },
    },
    sidebarView: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "detached":
              document.documentElement.setAttribute(
                "data-layout-style",
                "detached"
              );
              break;
            case "default":
              document.documentElement.setAttribute(
                "data-layout-style",
                "default"
              );
              break;
          }
        }
      },
    },
    position: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.documentElement.setAttribute(
                "data-layout-position",
                "fixed"
              );
              break;
            case "scrollable":
              document.documentElement.setAttribute(
                "data-layout-position",
                "scrollable"
              );
              break;
          }
        }
      },
    },
    sidebarSize: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "lg":
              document.documentElement.setAttribute("data-sidebar-size", "lg");
              break;
            case "sm":
              document.documentElement.setAttribute("data-sidebar-size", "sm");
              break;
            case "md":
              document.documentElement.setAttribute("data-sidebar-size", "md");
              break;
            case "sm-hover":
              document.documentElement.setAttribute(
                "data-sidebar-size",
                "sm-hover"
              );
              break;
          }
        }
      },
    },
    topbar: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "light":
              document.documentElement.setAttribute("data-topbar", "light");
              break;
            case "dark":
              document.documentElement.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    layoutWidth: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fluid":
              document.documentElement.setAttribute(
                "data-layout-width",
                "fluid"
              );
              break;
            case "boxed":
              document.documentElement.setAttribute(
                "data-layout-width",
                "boxed"
              );
              break;
          }
        }
      },
    },
    layoutType: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "horizontal":
              document.documentElement.setAttribute(
                "data-layout",
                "horizontal"
              );
              break;
            case "vertical":
              document.documentElement.setAttribute("data-layout", "vertical");
              break;
            case "twocolumn":
              document.documentElement.setAttribute("data-layout", "twocolumn");
              break;
          }
        }
      },
    },
  },
};
</script>

<template>
  <div>
    <div class="customizer-setting d-none d-md-block">
      <div class="btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas" id="mdi-cog">
        <i class="mdi mdi-spin mdi-cog-outline fs-22"></i>
      </div>
    </div>
    <div class="offcanvas offcanvas-end border-0" tabindex="-1" id="theme-settings-offcanvas">
      <div
        class="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header">
        <h5 class="m-0 me-2 text-white">Theme Customizer</h5>
        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-0">
        <SimpleBar class="h-100">
          <div class="p-4">
           
            <h6 class="mb-0 fw-semibold text-uppercase">Color Scheme</h6>
            <p class="text-muted">Choose Light or Dark Scheme.</p>
            <div class="colorscheme-cardradio">
              <div class="row">
                <div class="col-4">
                  <div class="form-check card-radio">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="data-layout-mode"
                      id="layout-mode-light"
                      value="light"
                      v-model="mode"
                    />
                    <label
                      class="form-check-label p-0 avatar-md w-100"
                      for="layout-mode-light"
                    >
                      <span class="d-flex gap-1 h-100">
                        <span class="flex-shrink-0">
                          <span
                            class="bg-light d-flex h-100 flex-column gap-1 p-1"
                          >
                            <span class="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                          </span>
                        </span>
                        <span class="flex-grow-1">
                          <span class="d-flex h-100 flex-column">
                            <span class="bg-light d-block p-1"></span>
                            <span class="bg-light d-block p-1 mt-auto"></span>
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <h5 class="fs-13 text-center mt-2">Light</h5>
                </div>

                <div class="col-4">
                  <div class="form-check card-radio dark">
                    <input
                      class="form-check-input"
                      v-model="mode"
                      type="radio"
                      name="data-layout-mode"
                      id="layout-mode-dark"
                      value="dark"
                    />
                    <label
                      class="form-check-label p-0 avatar-md w-100 bg-dark"
                      for="layout-mode-dark"
                    >
                      <span class="d-flex gap-1 h-100">
                        <span class="flex-shrink-0">
                          <span
                            class="
                              bg-soft-light
                              d-flex
                              h-100
                              flex-column
                              gap-1
                              p-1
                            "
                          >
                            <span class="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                            <span class="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                          </span>
                        </span>
                        <span class="flex-grow-1">
                          <span class="d-flex h-100 flex-column">
                            <span class="bg-soft-light d-block p-1"></span>
                            <span class="bg-soft-light d-block p-1 mt-auto"></span>
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <h5 class="fs-13 text-center mt-2">Dark</h5>
                </div>
              </div>
            </div>

            <h6 class="mt-4 mb-0 fw-semibold text-uppercase">Topbar Color</h6>
            <p class="text-muted">Choose Light or Dark Topbar Color.</p>

            <div class="row">
              <div class="col-4">
                <div class="form-check card-radio">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="data-topbar"
                    id="topbar-color-light"
                    value="light"
                    v-model="topbar"
                  />
                  <label
                    class="form-check-label p-0 avatar-md w-100"
                    for="topbar-color-light"
                  >
                    <span class="d-flex gap-1 h-100">
                      <span class="flex-shrink-0">
                        <span
                          class="bg-light d-flex h-100 flex-column gap-1 p-1"
                        >
                          <span
                            class="
                              d-block
                              p-1
                              px-2
                              bg-soft-primary
                              rounded
                              mb-2
                            "
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                        </span>
                      </span>
                      <span class="flex-grow-1">
                        <span class="d-flex h-100 flex-column">
                          <span class="bg-light d-block p-1"></span>
                          <span class="bg-light d-block p-1 mt-auto"></span>
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
                <h5 class="fs-13 text-center mt-2">Light</h5>
              </div>
              <div class="col-4">
                <div class="form-check card-radio">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="data-topbar"
                    id="topbar-color-dark"
                    value="dark"
                    v-model="topbar"
                  />
                  <label
                    class="form-check-label p-0 avatar-md w-100"
                    for="topbar-color-dark"
                  >
                    <span class="d-flex gap-1 h-100">
                      <span class="flex-shrink-0">
                        <span
                          class="bg-light d-flex h-100 flex-column gap-1 p-1"
                        >
                          <span
                            class="
                              d-block
                              p-1
                              px-2
                              bg-soft-primary
                              rounded
                              mb-2
                            "
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                          <span
                            class="d-block p-1 px-2 pb-0 bg-soft-primary"
                          ></span>
                        </span>
                      </span>
                      <span class="flex-grow-1">
                        <span class="d-flex h-100 flex-column">
                          <span class="bg-primary d-block p-1"></span>
                          <span class="bg-light d-block p-1 mt-auto"></span>
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
                <h5 class="fs-13 text-center mt-2">Dark</h5>
              </div>
            </div>
       
            <div v-if="layoutType != 'horizontal'" id="sidebar-color">
              <h6 class="mt-4 mb-0 fw-semibold text-uppercase">
                Sidebar Color
              </h6>
              <p class="text-muted">Choose Ligth or Dark Sidebar Color.</p>

              <div class="row">
                <div class="col-4">
                  <div class="form-check sidebar-setting card-radio">
                    <input
                      class="form-check-input"
                      v-model="sidebarColor"
                      type="radio"
                      name="data-sidebar"
                      id="sidebar-color-light"
                      value="light"
                    />
                    <label
                      class="form-check-label p-0 avatar-md w-100"
                      for="sidebar-color-light"
                    >
                      <span class="d-flex gap-1 h-100">
                        <span class="flex-shrink-0">
                          <span class="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                            <span
                              class="
                                d-block
                                p-1
                                px-2
                                bg-soft-primary
                                rounded
                                mb-2
                              "
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-primary"
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-primary"
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-primary"
                            ></span>
                          </span>
                        </span>
                        <span class="flex-grow-1">
                          <span class="d-flex h-100 flex-column">
                            <span class="bg-light d-block p-1"></span>
                            <span class="bg-light d-block p-1 mt-auto"></span>
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <h5 class="fs-13 text-center mt-2">Light</h5>
                </div>
                <div class="col-4">
                  <div class="form-check sidebar-setting card-radio">
                    <input
                      class="form-check-input"
                      v-model="sidebarColor"
                      type="radio"
                      name="data-sidebar"
                      id="sidebar-color-dark"
                      value="dark"
                    />
                    <label
                      class="form-check-label p-0 avatar-md w-100"
                      for="sidebar-color-dark"
                    >
                      <span class="d-flex gap-1 h-100">
                        <span class="flex-shrink-0">
                          <span
                            class="
                              bg-primary
                              d-flex
                              h-100
                              flex-column
                              gap-1
                              p-1
                            "
                          >
                            <span
                              class="
                                d-block
                                p-1
                                px-2
                                bg-soft-light
                                rounded
                                mb-2
                              "
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-light"
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-light"
                            ></span>
                            <span
                              class="d-block p-1 px-2 pb-0 bg-soft-light"
                            ></span>
                          </span>
                        </span>
                        <span class="flex-grow-1">
                          <span class="d-flex h-100 flex-column">
                            <span class="bg-light d-block p-1"></span>
                            <span class="bg-light d-block p-1 mt-auto"></span>
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <h5 class="fs-13 text-center mt-2">Dark</h5>
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  </div>
</template>
