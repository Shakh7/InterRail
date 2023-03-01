<script>
import {
  layoutComputed
} from "@/state/helpers";


import routes from "../router/routes";
import store from "../state/store";

export default {
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
      routes: routes
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
    user() {
      return store.state.user;
    }
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");
      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
                closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                let aChild = siblingCollapse.parentNode.firstChild;
                if (aChild.hasAttribute("aria-expanded")) {
                  aChild.setAttribute("aria-expanded", "false");
                }
                siblingCollapse.classList.remove("show");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2)
                item.firstElementChild.setAttribute("aria-expanded", "false");
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                let aChild = item1.parentNode.firstChild;
                if (aChild.hasAttribute("aria-expanded")) {
                  aChild.setAttribute("aria-expanded", "false");
                }
                item1.classList.remove("show");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.hide();
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },

    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document.querySelector("#navbar-nav").querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add("active");
              parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
              if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                  parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add(
                      "active");
              }
            }
          }
        }
      }, 0);
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div id="two-column-menu"></div>


    <template v-if="layoutType === 'vertical'">

      <!--      <ul class="navbar-nav h-100" id="navbar-nav">-->

      <!--        <div v-for="route in routes" :key="route.path">-->
      <!--          <div v-if="route.meta.isVisableInMenu && route.meta.permissions.includes(user.role)">-->
      <!--            <li class="menu-title">-->
      <!--              <span data-key="t-orders-menu"> {{ route.name }}</span>-->
      <!--            </li>-->

      <!--            <li class="nav-item" v-if="route.children !== undefined">-->
      <!--              <a class="nav-link menu-link" :href="'#sidebar' + route.name" data-bs-toggle="collapse" role="button"-->
      <!--                 aria-expanded="false" :aria-controls="'sidebar' + route.name">-->
      <!--                <i class="ri-honour-line  ri-list-ordered"></i>-->
      <!--                <span data-key="t-orders" class="text-capitalize">{{ route.name }}</span>-->
      <!--              </a>-->
      <!--              <div class="collapse menu-dropdown" :id="'sidebar' + route.name">-->
      <!--                <ul class="nav nav-sm flex-column">-->
      <!--                  <div v-for="child in route.children" :key="child">-->
      <!--                    <li class="nav-item text-capitalize" v-if="child.hide === undefined">-->
      <!--                      <router-link :to="route.path + child.path" class="nav-link custom-abc"-->
      <!--                                   data-key="t-analytics">-->
      <!--                        {{ child.name.split('_').join(" ") }}-->
      <!--                      </router-link>-->
      <!--                    </li>-->
      <!--                  </div>-->
      <!--                </ul>-->
      <!--              </div>-->
      <!--            </li>-->

      <!--            <li class="nav-item" v-else>-->
      <!--              <router-link class="nav-link menu-link" to="/rates/">-->
      <!--                <i class="ri-honour-line  ri-list-ordered"></i>-->
      <!--                <span data-key="t-orders"> {{ route.children }}</span>-->
      <!--              </router-link>-->
      <!--            </li>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </ul>-->

      <ul class="navbar-nav h-100" id="navbar-nav">


        <!-- start Users management Menu -->
        <div v-if="$store.state.user.role === 'admin'">
          <li class="menu-title">
            <span data-key="t-users-management"> {{ $t("t-users-management") }} </span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link menu-link" :to="{name: 'users_list'}">
              <i class="ri-group-line"></i>
              <span data-key="t-users">{{ $t("t-users") }}</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link menu-link" :to="{name: 'managers_list'}">
              <i class="ri-home-line ri-user-3-line"></i>
              <span data-key="t-users">{{ $t("t-managers") }}</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link menu-link" :to="{name: 'clients_list'}">
              <i class="ri-home-line ri-user-3-line"></i>
              <span data-key="t-users">{{ $t("t-clients") }}</span>
            </router-link>
          </li>
        </div>
        <!-- end Users management Menu -->

        <li class="menu-title">
          <span data-key="t-orders-menu"> Codes </span>
        </li>

        <li class="nav-item">
<!--          <router-link class="nav-link menu-link" :to="{name: 'applications_list'}">-->
<!--            <i class="ri-file-paper-line"></i>-->
<!--            <span data-key="t-orders">Applications</span>-->
<!--          </router-link>-->

          <a class="nav-link menu-link" href="#sidebarApplications" data-bs-toggle="collapse" role="button"
             aria-expanded="false" aria-controls="sidebarApplications">
            <i class="ri-file-paper-line"></i>
            <span data-key="t-orders">Applications</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarApplications">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link class="nav-link menu-link" :to="{name: 'applications_list'}">
                  List
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link menu-link" :to="{name: 'applications_statistics'}">
                  Statistics
                </router-link>
              </li>
            </ul>
          </div>

        </li>

        <li class="nav-item">
<!--          <router-link class="nav-link menu-link" :to="{name: 'codes_list'}">-->
<!--            <i class="ri-file-paper-line"></i>-->
<!--            <span data-key="t-orders">Codes</span>-->
<!--          </router-link>-->

          <a class="nav-link menu-link" href="#sidebarCodes" data-bs-toggle="collapse" role="button"
             aria-expanded="false" aria-controls="sidebarCodes">
            <i class="ri-file-paper-line"></i>
            <span data-key="t-orders">Codes</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarCodes">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link class="nav-link menu-link" :to="{name: 'codes_list'}">
                  List
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link menu-link" :to="{name: 'codes_statistics'}">
                  Statistics
                </router-link>
              </li>
            </ul>
          </div>
        </li>


        <li class="menu-title">
          <span data-key="t-orders-menu"> Orders </span>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarOrders" data-bs-toggle="collapse" role="button"
             aria-expanded="false" aria-controls="sidebarOrders">
            <i class="ri-honour-line  ri-list-ordered"></i>
            <span data-key="t-orders">Orders</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarOrders">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link :to="{name: 'order_container_list'}" class="nav-link custom-abc" data-key="t-analytics">
                  Container orders
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'order_wagon_list'}" class="nav-link custom-abc" data-key="t-analytics">
                  Wagon orders
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'order_empty_wagon_list'}" class="nav-link custom-abc" data-key="t-analytics">
                  Empty wagon
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <router-link class="nav-link menu-link" :to="{name: 'invoices_list'}">
            <i class="ri-file-paper-line"></i>
            <span data-key="t-orders">Invoices</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link menu-link" :to="{name: 'counterparty_list'}">
            <i class="ri-file-paper-line"></i>
            <span data-key="t-orders">Counterparty</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link menu-link" to="/rates/">
            <i class="ri-honour-line  ri-list-ordered"></i>
            <span data-key="t-orders">Rates</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#sidebarTasks" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false"
             aria-controls="sidebarTasks" data-key="t-tasks">
            <i class="ri-settings-3-line"></i>
            General
          </a>
          <div class="collapse menu-dropdown" id="sidebarTasks">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'products_list'}" class="nav-link" data-key="t-kanbanboard">
                  Products
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'stations_list'}" class="nav-link" data-key="t-list-view">
                  Stations
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'categories_list'}" class="nav-link" data-key="t-task-details">
                  Categories
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'counterparties_list'}" class="nav-link" data-key="t-task-details">
                  Counterparties
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="menu-title">
          <span data-key="t-orders-menu"> Terminal </span>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="https://terminal.interrail.uz/container_status/list/">
            <font-awesome-icon icon="fa-solid fa-train"/>
            <span data-key="t-orders">Terminal</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="https://terminal.interrail.uz/trains/train_list/">
            <font-awesome-icon icon="fa-solid fa-train"/>
            <span data-key="t-orders">Trains</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="https://terminal.interrail.uz/container_in_terminal/in_terminal/list/">
            <font-awesome-icon icon="fa-solid fa-train"/>
            <span data-key="t-orders">Containers</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="https://code.interrail.uz/">
            <i class="ri-file-list-3-line"></i>
            <span data-key="t-orders">Codes</span>
          </a>
        </li>

        <li class="menu-title">
          <span data-key="t-orders-menu"> Services </span>
        </li>
        <!-- start SMGS Menu -->
        <li class="nav-item">
          <router-link class="nav-link menu-link" to="/smgs/list/">
            <font-awesome-icon icon="fa-solid fa-print"/>
            <span data-key="t-orders">SMGS printing</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'smgs_extractor'}" class="nav-link" data-key="t-task-details">
            <font-awesome-icon icon="fa-solid fa-print"/>
            <span data-key="t-orders">SMGS extractor</span>
          </router-link>
        </li>

      </ul>
    </template>

  </div>
  <!-- Sidebar -->
</template>