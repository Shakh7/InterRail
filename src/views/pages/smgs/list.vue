<script>
import moment from "moment";

import CreateSmgsButton from "./components/CreateSmgsButton.vue";

import UpdateSmgsModal from "./modal/UpdateSmgsModal.vue";
import UploadPreview from "./components/ExcelPreviewModal.vue";
import store from '../../../state/store'
import animationData1 from "@/components/widgets/gsqxdxog.json";
// import UpdateSmgsButton from "./components/UpdateSmgsButton.vue";
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
      url: `${process.env.VUE_APP_SMGS_URL}/train/`,
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
    // UpdateSmgsButton,

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
          `${process.env.VUE_APP_SMGS_URL}/train/?limit=100&skip=0`
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
        fileLink.href = `${process.env.VUE_APP_SMGS_URL}/trainzip/${id}?smgs_type=${fileType}`;
      } else {
        fileLink.href = `${process.env.VUE_APP_SMGS_URL}/trainzip/${id}`;
      }
      fileLink.setAttribute("download", "import-excel-template");
      document.body.appendChild(fileLink);

      fileLink.click();
    },

    async downloadExcel(url) {
      let BASE_URL = 'https://smgs.interrail.uz'
      let a = document.createElement('a')
      a.href = BASE_URL + url
      a.click()
      a.remove()
    },

    getAccount(id) {
      let user = this.store.state.users_list.find((account) => account.id === id)
      return user ? user.full_name : 'Unknown'
    },
  },
};
</script>

<template>

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
      <span v-if="slotProps.row.excel_file">
                        <font-awesome-icon
                            icon="fa-solid fa-file-excel p-0 m-0"
                            class="excel_file c_icon_hoverable"
                            @click="downloadExcel(slotProps.row.excel_file)"
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
                        : getAccount(slotProps.row.user_id)
                  }}</span>
    </template>

    <template v-slot:actions="slotProps">

      <router-link :to="{name: 'smgs_update', params: {id: slotProps.row.id }}" class="text-dark px-1 mx-1">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="c_icon_hoverable c_icon "/>
      </router-link>

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
