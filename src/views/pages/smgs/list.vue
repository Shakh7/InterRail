<script>
import moment from "moment";

import CreateSmgsButton from "./components/CreateSmgsButton.vue";

import UpdateSmgsModal from "./modal/UpdateSmgsModal.vue";
import UploadPreview from "./components/ExcelPreviewModal.vue";
import store from '../../../state/store'
import animationData1 from "@/components/widgets/gsqxdxog.json";
import UpdateSmgsButton from "./components/UpdateSmgsButton.vue";
import DeleteSmgsButton from "./components/DeleteSmgsButton.vue";
import CustomTable from "../../../components/custom/table2.vue";

export default {
  computed: {
    store() {
      return store
    }
  },
  page: {
    title: "Orders",
    meta: [
      {
        name: "description",
      },
    ],
  },
  data() {
    return {
      title: "Orders",
      date: null,
      url: `${process.env.VUE_APP_SMGS_URL}/smgs/`,
      defaultOptions: {
        animationData: animationData1,
      },

      table: {
        original: [],
        searched: [],
        selected: [],
      },
      excelPreview: {
        data: [],
        action: null,
        confirmed: false,
      },

      trainCrud: {
        update: {
          train: null,
        },
        delete: {
          train: null,
        },
      },

      pagination: {
        perPage: 10,
      },

      headers: [
        {
          label: 'TRAIN',
          field: 'name',
          align: 'center',
          searchable: true,
        },
        {
          label: 'SMGS COUNT',
          field: 'smgs_count',
          align: 'center',
          searchable: true,
        },
        {
          label: 'DRAFT',
          field: 'draft',
          align: 'center'
        },
        {
          label: 'ORIGINAL',
          field: 'original',
          align: 'center'
        },
        {
          label: 'ALL',
          field: 'all',
          align: 'center'
        },
        {
          label: 'EXCEL',
          field: 'excel',
          align: 'center'
        },
        {
          label: 'DATE CREATED',
          field: 'created_at',
          align: 'center'
        },
        {
          label: 'MANAGER',
          field: 'user_id',
          align: 'center',
          filterable: true,
        },
        {
          label: 'ACTIONS',
          field: 'actions',
          align: 'center'
        },
      ],
      rows: [],

      config: {
        mode: "range",
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },

      isLoading: true
    };
  },
  components: {
    CustomTable,
    DeleteSmgsButton,
    UpdateSmgsButton,

    // SmgsModalBody,
    UploadPreview,
    // lottie: Lottie,
    CreateSmgsButton,
    // DeleteSmgsButton,
    // UpdateSmgsButton,
    UpdateSmgsModal,
    // CustomTable
  },
  methods: {
    dateFormater(value, formatType) {
      return moment(value).format(`${formatType}`);
    },

    onExcelFileReceived(excel) {
      this.excelPreview.data = excel.data;
      this.excelPreview.action = excel.action;
      this.excelPreview.confirmed = false;
    },

    onUpdateFileReceived(excel) {
      console.log("excel", excel);
    },

    async getSmgsList() {
      this.isLoading = true
      let response = await fetch(
          `${process.env.VUE_APP_SMGS_URL}/smgs/?limit=100&skip=0`
      );
      let trainList = await response.json();

      console.log(trainList['results'])
      this.table.original = trainList['results'];
      //
      this.isLoading = false
    },

    previewConfirmed(action) {
      this.excelPreview.action = action;
      this.excelPreview.confirmed = true;
    },

    setUpdateTrainData(train) {
      this.trainCrud.update.train = train;
    },

    async downloadFile(id, fileType) {

      let fileLink = document.createElement("a");

      if (fileType === "draft" || fileType === "original") {
        fileLink.href = `${process.env.SMGS_URL}/trainzip/${id}?smgs_type=${fileType}`;
      } else {
        fileLink.href = `${process.env.SMGS_URL}/trainzip/${id}`;
      }
      fileLink.setAttribute("download", "import-excel-template");
      document.body.appendChild(fileLink);

      fileLink.click();
    },
  },
  async mounted() {
    await this.getSmgsList();
  },
};
</script>

<template>

  <!--  <div class="row">-->
  <!--    <div class="col-lg-12">-->
  <!--      <div class="card" id="smgsList">-->
  <!--        <div class="card-header border-0">-->
  <!--          <div class="d-flex align-items-center">-->
  <!--            <h5 class="card-title mb-0 flex-grow-1">Applications</h5>-->
  <!--            <div class="flex-shrink-0">-->
  <!--              <CreateSmgsButton-->
  <!--                  @onExcelFileReceived="onExcelFileReceived"-->
  <!--                  @onCreateTrainFinished="getSmgsList"-->
  <!--                  :previewConfirmed="excelPreview.confirmed"-->
  <!--              />-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">-->
  <!--          <form>-->
  <!--            <div class="row g-3">-->
  <!--              <div class="col-xxl-5 col-sm-12">-->
  <!--                <div class="search-box">-->
  <!--                  <input type="text" class="form-control search bg-light border-light"-->
  <!--                         placeholder="Search for customer, email, country, status or something...">-->
  <!--                  <i class="ri-search-line search-icon"></i>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              &lt;!&ndash;end col&ndash;&gt;-->
  <!--              <div class="col-xxl-3 col-sm-4">-->
  <!--                <flat-pickr v-model="date" :config="config" class="form-control bg-light border-light"-->
  <!--                            placeholder="Select date"></flat-pickr>-->
  <!--              </div>-->
  <!--              &lt;!&ndash;end col&ndash;&gt;-->
  <!--              <div class="col-xxl-3 col-sm-4">-->
  <!--                <div class="input-light">-->
  <!--                  <Multiselect class="form-control" :close-on-select="true" :searchable="true"-->
  <!--                               :create-option="true" :options="[-->
  <!--                            { value: 'all', label: 'all' },-->
  <!--                            { value: 'Unpaid', label: 'Unpaid' },-->
  <!--                            { value: 'Paid', label: 'Paid' },-->
  <!--                            { value: 'Cancel', label: 'Cancel' },-->
  <!--                            { value: 'Refund', label: 'Refund' },-->
  <!--                          ]"/>-->
  <!--                </div>-->
  <!--              </div>-->

  <!--              <div class="col-xxl-1 col-sm-4">-->
  <!--                <button type="button" class="btn btn-primary w-100">-->
  <!--                  <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters-->
  <!--                </button>-->
  <!--              </div>-->
  <!--              &lt;!&ndash;end col&ndash;&gt;-->
  <!--            </div>-->
  <!--            &lt;!&ndash;end row&ndash;&gt;-->
  <!--          </form>-->
  <!--        </div>-->
  <!--        <div class="card-body">-->
  <!--          <div v-if="!isLoading">-->
  <!--            <div class="table-responsive table-card">-->
  <!--              <table class="table align-middle table-nowrap" id="invoiceTable">-->
  <!--                <thead class="text-muted text-center">-->
  <!--                <tr>-->
  <!--                  &lt;!&ndash;                  <th scope="col" style="width: 50px;">&ndash;&gt;-->
  <!--                  &lt;!&ndash;                    <div class="form-check">&ndash;&gt;-->
  <!--                  &lt;!&ndash;                      <input class="form-check-input" type="checkbox" id="checkAll" value="option">&ndash;&gt;-->
  <!--                  &lt;!&ndash;                    </div>&ndash;&gt;-->
  <!--                  &lt;!&ndash;                  </th>&ndash;&gt;-->
  <!--                  <th class="sort text-uppercase" data-sort="invoice_id">Number</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="customer_name">Forwarder</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="email">Departure</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="country">Destination</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="date">File</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="invoice_amount">Date</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="status">Client</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="status">Manager</th>-->
  <!--                  <th class="sort text-uppercase" data-sort="action">Action</th>-->
  <!--                </tr>-->
  <!--                </thead>-->
  <!--                <tbody class="list form-check-all text-center">-->
  <!--                <tr v-for="item of table.original" :key="item">-->
  <!--                  <td class="email">C</td>-->
  <!--                  <td class="country">B</td>-->
  <!--                  <td class="country">A</td>-->
  <!--                  <td class="invoice_amount">-->

  <!--                    <span class="text-danger">-->
  <!--                        <font-awesome-icon-->
  <!--                            icon="fa-solid fa-file-zipper"-->
  <!--                            class="c_icon_hoverable text-secondary"-->
  <!--                        />-->
  <!--                    </span>-->

  <!--                  </td>-->
  <!--                  <td class="status">-->
  <!--                    &lt;!&ndash;                                        <span class="badge text-uppercase" :class="{&ndash;&gt;-->
  <!--                    &lt;!&ndash;                                            'badge-soft-success':item.status=='Paid',&ndash;&gt;-->
  <!--                    &lt;!&ndash;                                            'badge-soft-warning':item.status=='Unpaid',&ndash;&gt;-->
  <!--                    &lt;!&ndash;                                            'badge-soft-danger':item.status=='Cancel',&ndash;&gt;-->
  <!--                    &lt;!&ndash;                                            'badge-soft-primary':item.status=='Refund',&ndash;&gt;-->
  <!--                    &lt;!&ndash;                                          }">{{ item.status }}</span>&ndash;&gt;-->
  <!--                    <span class="text-primary fw-medium">Status</span>-->
  <!--                  </td>-->
  <!--                  <td>-->
  <!--                    <font-awesome-icon icon="fa-solid fa-pen-to-square"-->
  <!--                                       class="c_icon me-1 c_icon_hoverable"/>-->

  <!--                    <span class="border-start border-dark ps-1">-->
  <!--                      <font-awesome-icon icon="fa-solid fa-trash"-->
  <!--                                         class="c_icon c_icon_hoverable text-danger"/>-->
  <!--                    </span>-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                </tbody>-->
  <!--              </table>-->
  <!--            </div>-->
  <!--          </div>-->

  <!--          <div v-if="isLoading">-->
  <!--            <div class="text-center">-->
  <!--              <h5 class="mt-2">Loading...</h5>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--    </div>-->
  <!--  </div>-->

  <CustomTable
      name="SMGS TABLE"
      id="smgs_table"
      :headers="headers"
      :selectable="true"
      :searchable="true"
      :url="url"
      :isLoading="false"
      :pagination="pagination"
  >

    <template #top-right>
      <CreateSmgsButton
          @onExcelFileReceived="onExcelFileReceived"
          @onCreateTrainFinished="getSmgsList"
          :previewConfirmed="excelPreview.confirmed"
      />
    </template>

    <template v-slot:name="slotProps">
      <span>{{ slotProps.row.name }}</span>
    </template>

    <template v-slot:smgs_count="slotProps">
      <span class="badge bg-success">{{ slotProps.row.smgs_count }}</span>
    </template>

    <template v-slot:draft="slotProps">
                <span>
                  <font-awesome-icon
                      icon="fa-solid fa-file-zipper"
                      class="c_icon_hoverable zip_file"
                      @click="downloadFile(slotProps.row.id, 'draft')"
                  />
                </span>
    </template>

    <template v-slot:original="slotProps">
                <span>
                  <font-awesome-icon
                      icon="fa-solid fa-file-zipper"
                      class="c_icon_hoverable zip_file"
                      @click="downloadFile(slotProps.row.id, 'original')"
                  />
                </span>
    </template>

    <template v-slot:all="slotProps">
                <span>
                  <font-awesome-icon
                      icon="fa-solid fa-folder"
                      class="c_icon_hoverable text-warning"
                      @click="downloadFile(slotProps.row.id, 'zip_all')"
                  />
                </span>
    </template>

    <template v-slot:excel="slotProps">
      <span v-if="slotProps.row.excel_file === null">---</span>
      <span>
                        <font-awesome-icon
                            v-if="slotProps.row.excel_file"
                            icon="fa-solid fa-file-excel p-0 m-0"
                            class="excel_file c_icon_hoverable"
                            @click="downloadFile(slotProps.row.id, 'excel')"
                        />
                      </span>
    </template>

    <template v-slot:created_at="slotProps">
      <span>{{ dateFormater(slotProps.row.created_at, "LL") }}</span>
    </template>

    <template v-slot:user_id="slotProps">
                <span>{{
                    slotProps.row.user_id === store.state.user.id
                        ? store.state.user.full_name
                        : slotProps.row.user_id
                  }}</span>
    </template>

    <template v-slot:actions="slotProps">

      <UpdateSmgsButton
          @onUpdateBtnClicked="setUpdateTrainData"
          :train="{ id: slotProps.row.id, name: slotProps.row.name }"
      />

      <DeleteSmgsButton
          :train="{ id: slotProps.row.id, name: slotProps.row.name }"
          @onTrainDeleted="getSmgsList"
      />
    </template>

  </CustomTable>


  <UpdateSmgsModal :train="trainCrud.update.train"/>

  <UploadPreview
      :excelData="excelPreview.data"
      :action="excelPreview.action"
      @onPreviewConfirmed="previewConfirmed"
  />

</template>
