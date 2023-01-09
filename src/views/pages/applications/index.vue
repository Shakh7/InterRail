<script>
// import {
//   FileTextIcon,
//   CheckSquareIcon,
//   ClockIcon,
//   XOctagonIcon
// } from "@zhuowenli/vue-feather-icons";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import animationData from "@/components/widgets/msoeawqm.json";
import animationData1 from "@/components/widgets/gsqxdxog.json";
import Lottie from "@/components/widgets/lottie.vue";
import createFormModal from "./components/CreateFormModal.vue";

export default {
  page: {
    title: "Invoice List",
    meta: [{
      name: "description",
      content: appConfig.description
    }],
  },
  data() {
    return {
      title: "Applications",
      items: [{
        text: "Home",
        href: "/",
      },
        {
          text: "Applications List",
          active: true,
        },
      ],
      config: {
        mode: "range",
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },
      date: null,
      value: null,
      searchQuery: null,
      invoiceWidgets: [
        {
          id: 1,
          label: "Invoices Sent",
          percentage: "+89.24 %",
          percentageClass: "success",
          icon: "ri-arrow-right-up-line",
          counter: "559.25",
          badge: "2,258",
          caption: "Invoices sent",
          feaIcon: "file-text",
          decimals: 1,
          prefix: "$",
          suffix: "k"
        },
        {
          id: 2,
          label: "Paid Invoices",
          percentage: "+8.09 %",
          percentageClass: "danger",
          icon: "ri-arrow-right-down-line",
          counter: "409.66",
          badge: "1,958",
          caption: "Paid by clients",
          feaIcon: "check-square",
          decimals: 2,
          prefix: "$",
          suffix: "k"
        },
        {
          id: 3,
          label: "Unpaid Invoices",
          percentage: "+9.01 %",
          percentageClass: "danger",
          icon: "ri-arrow-right-down-line",
          counter: "136.98",
          badge: "338",
          caption: "Unpaid by clients",
          feaIcon: "clock",
          decimals: 2,
          prefix: "$",
          suffix: "k"
        },
        {
          id: 4,
          label: "Cancelled Invoices",
          percentage: "+7.55 %",
          percentageClass: "success",
          icon: "ri-arrow-right-up-line",
          counter: "84.2",
          badge: "502",
          caption: "Cancelled by clients",
          feaIcon: "x-octagon",
          decimals: 1,
          prefix: "$",
          suffix: "k"
        },
      ],
      invoiceList: [
        {
          id: 1,
          invoiceId: "#VL25000351",
          img: require("@/assets/images/users/avatar-2.jpg"),
          name: "Diana Kohler",
          email: "dianakohler@velzon.com",
          country: "Brazil",
          date: "06 Apr, 2021",
          time: "09:58PM",
          amount: "$875",
          status: "Paid",
          statusClass: "success",
        },
        {
          id: 2,
          invoiceId: "#VL25000352",
          img: require("@/assets/images/users/avatar-3.jpg"),
          name: "James Morris",
          email: "jamesmorris@velzon.com",
          country: "Germany",
          date: "17 Dec, 2021",
          time: "1:24AM",
          amount: "$451.00",
          status: "Unpaid",
          statusClass: "warning",
        }
      ],
      defaultOptions: {
        animationData: animationData
      },
      defaultOptions1: {
        animationData: animationData1
      },
    };
  },
  components: {
    PageHeader,
    Multiselect,
    lottie: Lottie,
    flatPickr,
    // FileTextIcon,
    // CheckSquareIcon,
    // ClockIcon,
    // XOctagonIcon,
    createFormModal
  },
};
</script>

<template>
  <PageHeader :title="title" :items="items"/>
  <!--  <div class="row">-->
  <!--    <div class="col-xl-3 col-md-6" v-for="(item, index) of invoiceWidgets" :key="index">-->
  <!--      &lt;!&ndash; card &ndash;&gt;-->
  <!--      <div class="card card-animate">-->
  <!--        <div class="card-body">-->
  <!--          <div class="d-flex align-items-center">-->
  <!--            <div class="flex-grow-1">-->
  <!--              <p class="text-uppercase fw-medium text-muted mb-0">{{ item.label }}</p>-->
  <!--            </div>-->
  <!--            <div class="flex-shrink-0">-->
  <!--              <h5 :class="`text-${item.percentageClass} fs-14 mb-0`">-->
  <!--                <i :class="`${item.icon} fs-13 align-middle`"></i> {{ item.percentage }}-->
  <!--              </h5>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="d-flex align-items-end justify-content-between mt-4">-->
  <!--            <div>-->
  <!--              <h4 class="fs-22 fw-semibold ff-secondary mb-4">-->
  <!--                {{ item.prefix }}{{ item.counter }}{{ item.suffix }}</h4>-->
  <!--              <span class="badge bg-warning me-1">{{ item.badge }}</span> <span class="text-muted">-->
  <!--                  {{ item.caption }}</span>-->
  <!--            </div>-->
  <!--            <div class="avatar-sm flex-shrink-0">-->
  <!--                <span class="avatar-title bg-light rounded fs-3">-->
  <!--                  <template v-if="item.feaIcon == 'file-text'">-->
  <!--                    <FileTextIcon class="text-success icon-md"/>-->
  <!--                  </template>-->
  <!--                  <template v-if="item.feaIcon == 'check-square'">-->
  <!--                    <CheckSquareIcon class="text-success icon-md"/>-->
  <!--                  </template>-->
  <!--                  <template v-if="item.feaIcon == 'clock'">-->
  <!--                    <ClockIcon class="text-success icon-md"/>-->
  <!--                  </template>-->
  <!--                  <template v-if="item.feaIcon == 'x-octagon'">-->
  <!--                    <XOctagonIcon class="text-success icon-md"/>-->
  <!--                  </template>-->
  <!--                </span>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>&lt;!&ndash; end card body &ndash;&gt;-->
  <!--      </div>&lt;!&ndash; end card &ndash;&gt;-->
  <!--    </div>&lt;!&ndash; end col &ndash;&gt;-->
  <!--  </div>-->

  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="invoiceList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">Applications</h5>
            <div class="flex-shrink-0">
              <createFormModal/>
            </div>
          </div>
        </div>
        <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
          <form>
            <div class="row g-3">
              <div class="col-xxl-5 col-sm-12">
                <div class="search-box">
                  <input type="text" class="form-control search bg-light border-light"
                         placeholder="Search for customer, email, country, status or something...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <flat-pickr v-model="date" :config="config" class="form-control bg-light border-light"
                            placeholder="Select date"></flat-pickr>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <div class="input-light">
                  <Multiselect class="form-control" v-model="value" :close-on-select="true" :searchable="true"
                               :create-option="true" :options="[
                            { value: 'all', label: 'all' },
                            { value: 'Unpaid', label: 'Unpaid' },
                            { value: 'Paid', label: 'Paid' },
                            { value: 'Cancel', label: 'Cancel' },
                            { value: 'Refund', label: 'Refund' },
                          ]"/>
                </div>
              </div>

              <div class="col-xxl-1 col-sm-4">
                <button type="button" class="btn btn-primary w-100">
                  <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters
                </button>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </form>
        </div>
        <div class="card-body">
          <div>
            <div class="table-responsive table-card">
              <table class="table align-middle table-nowrap" id="invoiceTable">
                <thead class="text-muted">
                <tr>
                  <th scope="col" style="width: 50px;">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                    </div>
                  </th>
                  <th class="sort text-uppercase" data-sort="invoice_id">Forwarder</th>
                  <th class="sort text-uppercase" data-sort="customer_name">Client</th>
                  <th class="sort text-uppercase" data-sort="email">Departure</th>
                  <th class="sort text-uppercase" data-sort="country">Destination</th>
                  <th class="sort text-uppercase" data-sort="date">Type</th>
                  <th class="sort text-uppercase" data-sort="invoice_amount">File</th>
                  <th class="sort text-uppercase" data-sort="status">Quantity</th>
                  <th class="sort text-uppercase" data-sort="status">Manager</th>
                  <th class="sort text-uppercase" data-sort="action">Action</th>
                </tr>
                </thead>
                <tbody class="list form-check-all">
                <tr v-for="(item, index) of invoiceList" :key="index">
                  <th scope="row">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="chk_child" value="option1">
                    </div>
                  </th>
                  <td class="id">
                    <router-link to="/invoices/detail" class="fw-medium link-primary">
                      СП OOO «ШОШТРАНС»
                    </router-link>
                  </td>
                  <td class="customer_name">
                    <div class="d-flex align-items-center" v-if="item.img">
                      CLASSIC
                    </div>
                    <div v-if="!item.img" class="d-flex align-items-center">
                      <div class="flex-shrink-0 avatar-xs me-2">
                        <div class="avatar-title bg-soft-success text-success rounded-circle fs-13">
                          {{ item.name.charAt(0) }}
                        </div>

                      </div>
                      {{ item.name }}
                    </div>
                  </td>
                  <td class="email">Чукурсай</td>
                  <td class="country">Мустаклик</td>
                  <td class="date"><small class="text-muted">Wagon</small></td>
                  <td class="invoice_amount">File</td>
                  <td class="status">
<!--                                        <span class="badge text-uppercase" :class="{-->
<!--                                            'badge-soft-success':item.status=='Paid',-->
<!--                                            'badge-soft-warning':item.status=='Unpaid',-->
<!--                                            'badge-soft-danger':item.status=='Cancel',-->
<!--                                            'badge-soft-primary':item.status=='Refund',-->
<!--                                          }">{{ item.status }}</span>-->
                    <span class="badge text-uppercase badge-soft-success">45</span>
                  </td>
                  <td class="status">
                    <span>Manager</span>
                  </td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown"
                              aria-expanded="false">
                        <i class="ri-more-fill align-middle"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>

                          <router-link class="dropdown-item" :to="'/invoices/detail/'+item._id">
                            <i class="ri-eye-fill align-bottom me-2 text-muted"></i> View
                          </router-link>
                        </li>
                        <li><a class="dropdown-item"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                          Edit</a></li>
                        <li><a class="dropdown-item" href="javascript:void(0);"><i
                            class="ri-download-2-line align-bottom me-2 text-muted"></i> Download</a></li>
                        <li class="dropdown-divider"></li>
                        <li>
                          <a class="dropdown-item remove-item-btn" @click="deletedata(item)">
                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="noresult" style="display: none" :class="{'d-block': invoiceList.length == 0}">
                <div class="text-center">
                  <lottie class="avatar-xl" colors="primary:#121331,secondary:#08a88a" :options="defaultOptions"
                          :height="75" :width="75"/>
                  <h5 class="mt-2">Sorry! No Result Found</h5>
                  <p class="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                    orders for you search.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade flip" id="deleteOrder" tabindex="-1" aria-labelledby="deleteOrderLabel"
               aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body p-5 text-center">
                  <lottie class="avatar-xl" colors="primary:#405189,secondary:#f06548" :options="defaultOptions1"
                          :height="90" :width="90"/>
                  <div class="mt-4 text-center">
                    <h4>You are about to delete a order ?</h4>
                    <p class="text-muted fs-15 mb-4">Deleting your order will remove all of
                      your information from our database.</p>
                    <div class="hstack gap-2 justify-content-center remove">
                      <button class="btn btn-link link-success fw-medium text-decoration-none"
                              data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close
                      </button>
                      <button class="btn btn-danger" id="delete-record">Yes, Delete It</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>