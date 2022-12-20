<script>
import router from "@/router";
import { SimpleBar } from "simplebar-vue3";
import { layoutComputed } from "@/state/helpers";

import NavBar from "@/components/nav-bar";
import Menu from "@/components/menu.vue";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";
localStorage.setItem('hoverd',false);

/**
 * Vertical layout
 */
export default {
  components: { NavBar, RightBar, Footer, SimpleBar, Menu },
  data() {
    return {
      isMenuCondensed: false,
    };
  },
  computed: {
    ...layoutComputed,
  },
  created: () => {
    document.body.removeAttribute("data-layout", "horizontal");
    document.body.removeAttribute("data-topbar", "dark");
    document.body.removeAttribute("data-layout-size", "boxed");
  },
  methods: {
    initActiveMenu() {
            if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
                localStorage.setItem('hoverd',true)
                document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
            } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
                localStorage.setItem('hoverd',false)
                document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
            } else {
                document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
            }
    },
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
  mounted() {
    if(localStorage.getItem('hoverd')=='true'){
       document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
    }
    document.getElementById('overlay').addEventListener('click',()=>{
      document.body.classList.remove('vertical-sidebar-enable')
    })

  },
};
</script>

<template>
  <div id="layout-wrapper">
    <NavBar />
    <div>
      <!-- ========== Left Sidebar Start ========== -->
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/interrail-logo-without-text.png" alt="" height="27" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/interrail-logo.png" alt="" height="37" />
            </span>
          </router-link>
          <!-- Light Logo-->
          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/interrail-logo-without-text.png" alt="" height="27" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/interrail-logo.png" alt="" height="37" />
            </span>
          </router-link>
          <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover" @click="initActiveMenu">
            <i class="ri-record-circle-line"></i>
          </button>
        </div>

        <SimpleBar id="scrollbar" class="h-100" ref="scrollbar">
          <Menu></Menu>
        </SimpleBar>
      </div>
      <!-- Left Sidebar End -->
      <!-- Vertical Overlay-->
      <div class="vertical-overlay" id="overlay"></div>
    </div>

    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
    <RightBar />
  </div>
</template>