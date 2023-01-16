<script>
import DropZone from "@/components/widgets/dropZone";
import PageHeader from "../../../components/page-header.vue";
import readXlsxFile from "read-excel-file";
import Swal from "sweetalert2";

export default {
  name: 'smgs_update',
  data() {
    return {
      title: "File Uploads",
      items: [
        {text: "Forms", href: "/",},
        {text: "File Uploads", active: true,},
      ],
      trainData: null,
      dropzoneFile: '',
      files: [],
      preview: {
        showModal: false,
        data: [],
        dataInEnglish: [],
        confirmed: false
      },
      uploadStatus: {
        total: 0,
        uploaded: 0,
        failed: 0,
        success: 0,
      }
    };
  },
  methods: {
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.remove();
    },
    async selectedFile() {
      this.dropzoneFile = document.querySelector(".dropzoneFile").files[0];
      this.files.push(this.dropzoneFile);
      await this.readExcel(this.dropzoneFile)
      this.preview.showModal = true
    },
    drop(e) {
      this.dropzoneFile = e.dataTransfer.files[0];
      this.files.push(this.dropzoneFile);
      this.preview.showModal = true
    },
    async readExcel(file) {
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        let rows = await readXlsxFile(file)
        this.preview.data = rows
      } else {
        await Swal.fire({
          position: "center",
          icon: "warning",
          title: "Form Accepts Only Excel File",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    async getTrainData() {
      let req = await fetch(`${process.env.VUE_APP_SMGS_URL}/train/${this.$route.params.id}`)
      let res = await req.json()
      this.trainData = res
    },

    onPreviewConfirmed() {
      this.preview.showModal = false
      this.preview.confirmed = true
    },
    onPreviewCancelled() {
      this.preview.showModal = false
      this.preview.confirmed = false
    },

    async updateTrain() {
      this.prepareData(this.preview.data)
      await this.submitTrain()
    },

    prepareData() {
      for (let row of this.preview.data.slice(1, this.preview.data.length)) {
        let r = JSON.parse(JSON.stringify(row))

        let excel_data = {
          railway_code: null,
          sender: null,
          departure_station: null,
          sender_statement: null,
          recipient: null,
          destination_station: null,
          border_crossing_stations: null,
          railway_carriage: null,
          shipping_name: null,
          container_owner: null,
          container: null,
          container_type: null,
          container_type_code: null,
          type_of_packaging: null,
          number_of_seats: null,
          net: null,
          tara: null,
          gross: null,
          seals: null,
          seal_quantity: null,
          submerged: null,
          method_of_determining_mass: null,
          payment_of_legal_fees: null,
          carriers: null,
          documents_by_sender: null,
          additional_information: null,
          custom_seal: null,
          inspector_name: null,
          date: null,
          train_id: null,
        }

        for (let [i, value] of r.entries()) {
          let headers = JSON.parse(JSON.stringify(this.preview.data.slice(0, 1)[0]))

          switch (headers[i]) {
            case 'НОМЕР SMGS':
              excel_data.railway_code = value === null ? '' : value
              break;
            case 'ОТПРАВИТЕЛЬ':
              excel_data.sender = value === null ? '' : value
              break;
            case 'СТАНЦИЯ ОТПРАВЛЕНИЯ':
              excel_data.departure_station = value === null ? '' : value
              break;
            case 'ЗАЯВЛЕНИЯ ОТПРАВИТЕЛЯ':
              excel_data.sender_statement = value === null ? '' : value
              break;
            case 'ПОЛУЧАТЕЛЬ':
              excel_data.recipient = value === null ? '' : value
              break;
            case 'СТАНЦИЯ НАЗНАЧЕНИЯ':
              excel_data.destination_station = value === null ? '' : value
              break;
            case 'ПОГРАНИЧНЫЕ СТАНЦИИ ПЕРЕХОДОВ':
              excel_data.border_crossing_stations = value === null ? '' : value
              break;
            case 'ВАГОН':
              excel_data.railway_carriage = value === null ? '' : value
              break;
            case 'НАИМЕНОВАНИЕ ГРУЗА':
              excel_data.shipping_name = value === null ? '' : value
              break;
            case 'КОНТЕЙНЕР СОБСТВЕННОСТИ':
              excel_data.container_owner = value === null ? '' : value
              break;
            case 'РОД УПАКОВКИ':
              excel_data.type_of_packaging = value === null ? '' : value
              break;
            case 'К-ВО МЕСТ':
              excel_data.number_of_seats = value === null ? '' : value
              break;
            case 'НЕТТО':
              excel_data.net = value === null ? '' : value
              break;
            case 'ТАРА КОНТЕЙНЕРА':
              excel_data.tara = value === null ? '' : value
              break;
            case 'БРУТТО':
              excel_data.gross = value === null ? '' : value
              break;
            case 'ЗНАКИ':
              excel_data.seals = value === null ? '' : value
              break;
            case 'К-ВО':
              excel_data.seal_quantity = value === null ? '' : value
              break;
            case 'ПОГРУЖЕНО':
              excel_data.submerged = value === null ? '' : value
              break;
            case 'СПОСОБ ОПРЕДЕЛЕНИЯ МАССЫ':
              excel_data.method_of_determining_mass = value === null ? '' : value
              break;
            case 'КОДЫ ПО УТИ':
              excel_data.payment_of_legal_fees = value === null ? '' : value
              break;
            case 'ПЕРЕВОЗЧИКИ(УЧАСТКИ)':
              excel_data.carriers = value === null ? '' : value
              break;
            case 'Документы. приложенные отправителем':
              excel_data.documents_by_sender = value === null ? '' : value
              break;
            case 'Информация. не предназначенная для перевозчика. № договора  по поставку':
              excel_data.additional_information = value === null ? '' : value
              break;
            case 'ТЖ ПЛОМБА':
              excel_data.custom_seal = value === null ? '' : value
              break;
            case 'ИМЯ ИНСПЕКТОРА':
              excel_data.inspector_name = value === null ? '' : value
              break;
            case 'НОМЕР КОНТЕЙНЕРА':
              excel_data.container = value === null ? '' : value
              break;
            case 'ТИП КНТР':
              excel_data.container_type = value === null ? '' : value
              break;
            case 'ТИП G1':
              excel_data.container_type_code = value === null ? '' : value
              break;
            case 'Дата':
              excel_data.date = value === null ? '' : value
              break;
            default:
              break;
          }
        }
        excel_data.train_id = this.train.id
        this.preview.dataInEnglish.push(excel_data)
      }
    },

    async submitTrain() {
      this.uploadStatus.total = this.preview.dataInEnglish.length

      this.preview.dataInEnglish.forEach((item) => {
        fetch(`${process.env.VUE_APP_SMGS_URL}/smgs/${this.train.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        }).then(response => response.json())
            .then(data => console.log(data));
      })

      alert('done')
    }
  },
  components: {
    PageHeader,
    DropZone,
  },
  computed: {
    train: {
      get() {
        return this.trainData === null ? null : this.trainData[0]
      }
    }
  },
  async mounted() {
    await this.getTrainData()
  }
};
</script>

<template>
  <PageHeader :title="title" :items="items"/>

  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card" v-if="train !== null">

        <div class="card-header">
          <a :href="'https://smgs.interrail.uz' + train.excel_file">
            <font-awesome-icon
                icon="fa-solid fa-file-excel p-0 m-0"
                class="excel_file c_icon_hoverable"
            />
          </a>
          <span class="card-title mb-0 ms-2">Train: {{ train.name }}</span>
        </div>
        <!-- end card header -->

        <div class="card-body">
          <p class="text-muted">
            Drop files here or click to upload excel file
          </p>

          <DropZone @drop.prevent="drop" @change="selectedFile"/>
          <ul class="list-unstyled my-3" id="dropzone-preview">
            <div
                class="border rounded"
                v-for="(file, index) of files"
                :key="index"
            >
              <div class="d-flex p-2">
                <div class="flex-grow-1">
                  <div class="pt-1">
                    <h5 class="fs-14 mb-1" data-dz-name="">
                      {{ file.name }}
                    </h5>
                    <p class="fs-13 text-muted mb-0" data-dz-size="">
                      <strong>{{ file.size / 1024 }}</strong> KB
                    </p>
                    <strong
                        class="error text-danger"
                        data-dz-errormessage=""
                    ></strong>
                  </div>
                </div>
                <div class="flex-shrink-0 ms-3">
                  <button
                      data-dz-remove=""
                      class="btn btn-sm btn-primary me-2"
                      @click="preview.showModal = true"
                  >
                    Preview
                  </button>

                  <button
                      data-dz-remove=""
                      class="btn btn-sm btn-danger"
                      @click="deleteRecord"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          </ul>

          <div class="w-100 text-center">
            <button class="btn btn-success btn-border" v-if="preview.confirmed"
                    @click="updateTrain()">
              Submit
            </button>
            <button class="btn btn-success btn-border" disabled v-if="!preview.confirmed">Submit</button>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>


  <!-- Excel Preview Modal -->
  <b-modal v-model="preview.showModal" hide-footer title="EXCEL FILE PREVIEW" class="v-modal-custom" fullscreen>
    <div class="table-responsive table-card px-3 pb-5 mt-1">
      <table class="table table-nowrap mb-5">
        <thead class="table-light">
        <tr class="text-center">
          <th v-for="th in preview.data[0]" :key="th">
            <VTooltip>
              <div class="w-100">{{ th === null ? '-' : th.toString().slice(0, 1) }}</div>
              <template #popper>
                {{ th === null ? 'Empty' : th }}
              </template>
            </VTooltip>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tr in preview.data.slice(1, preview.data.length)" :key="tr" class="text-center">
          <td v-for="td in tr" :key="td">
            <VTooltip>
              <b-badge :variant="td === null ? 'danger text-danger w-25' : 'light text-light w-25'">
                {{ td === null ? '-' : '-' }}
              </b-badge>
              <template #popper>
                {{ td === null ? 'Empty' : td }}
              </template>
            </VTooltip>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="w-100 text-center">
        <b-button variant="outline-danger" class="waves-effect waves-light me-1" @click="onPreviewCancelled()">
          Cancel
        </b-button>
        <b-button variant="success" class="w-lg waves-effect waves-light ms-1" @click="onPreviewConfirmed()">
          Confirm
        </b-button>
      </div>
    </div>
  </b-modal>

</template>