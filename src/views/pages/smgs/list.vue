<script>
import "@vueform/multiselect/themes/default.css";
import "flatpickr/dist/flatpickr.css";
// import Swal from "sweetalert2";
import moment from "moment";
import appConfig from "../../../../app.config.json";

import CreateSmgsButton from "./components/CreateSmgsButton.vue";
import DeleteSmgsButton from "./components/DeleteSmgsButton.vue";
import UpdateSmgsButton from "./components/UpdateSmgsButton.vue";

import UpdateSmgsModal from "./modal/UpdateSmgsModal.vue";
import UploadPreview from "./components/ExcelPreviewModal.vue";

UpdateSmgsButton;

// import Lottie from "@/components/widgets/lottie.vue";
import animationData1 from "@/components/widgets/gsqxdxog.json";

// import axios from 'axios';
// import animationData from "@/components/widgets/msoeawqm.json";

import store from "../../../state/store.js";
import CustomTable from '../../../components/custom/table.vue'

export default {
  page: {
    title: "Orders",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Orders",
      date: null,
      multiselect: {
        value: null,
      },
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
      rows: [
        {
          id: 1,
          email: 'email_one@gmail.com',
          company: 'company_one',
        },
        {
          id: 2,
          email: 'email_two@gmail.com',
          company: 'company_two',
        },
        {
          id: 3,
          email: 'email_three@gmail.com',
          company: 'company_three',
        }
      ]

    };
  },
  components: {

    // SmgsModalBody,
    UploadPreview,
    // lottie: Lottie,
    CreateSmgsButton,
    DeleteSmgsButton,
    UpdateSmgsButton,
    UpdateSmgsModal,
    CustomTable
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
      let response = await fetch(
          "https://fastapi-smgs.herokuapp.com/api/v1/train/?limit=100&skip=0"
      );
      let trainList = await response.json();

      if (store.state.user.role === "admin") {
        this.table.original = trainList;
      } else {
        this.table.original = Array.from(trainList).filter((train) => {
          return train.user_id === store.state.user.id;
        });
      }
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
        fileLink.href = `https://fastapi-smgs.herokuapp.com/api/v1/trainzip/${id}?smgs_type=${fileType}`;
      } else {
        fileLink.href = `https://fastapi-smgs.herokuapp.com/api/v1/trainzip/${id}`;
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

  <CustomTable
      name="SMGS TABLE"
      id="smgs_table"
      :headers="headers"
      :rows="table.original"
      :selectable="true"
      :searchable="true"
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
                  slotProps.row.user_id === $store.state.user.id
                      ? $store.state.user.full_name
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
