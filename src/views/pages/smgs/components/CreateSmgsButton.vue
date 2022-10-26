<script>
import DropZone from "@/components/widgets/dropZone";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import Swal from "sweetalert2";
import store from '../../../../state/store.js'
export default {
  name: 'CreateSmgsButton',
  emits: {
    onExcelFileReceived: null,
    onCreateTrainFinished: null
  },
  data() {
    return {
      train: {
        name: '',
        id: null
      },
      dropZone: {
        files: []
      },
      excel: {
        data: {
          original: [],
          englishVersion: [],
        },
        confirmed: false
      },
      uploadStatus: {
        started: false,
        totalItemsToBeUploaded: 0,
        totalItemsUploaded: 0,
      }
    }
  },
  props: {
    previewConfirmed: Boolean,
    default: () => false
  },
  methods: {
    isValidExcel(rows) {
      let conditionsToBeValid = [
        null,
        "НОМЕР SMGS",
        "СТАНЦИЯ ОТПРАВЛЕНИЯ",
        "ЗАЯВЛЕНИЯ ОТПРАВИТЕЛЯ",
        "СТАНЦИЯ НАЗНАЧЕНИЯ",
        "ПОГРАНИЧНЫЕ СТАНЦИИ ПЕРЕХОДОВ",
        "ВАГОН",
        "КОНТЕЙНЕР СОБСТВЕННОСТИ",
        "ПОГРУЖЕНО",
        "СПОСОБ ОПРЕДЕЛЕНИЯ МАССЫ",
        "ПЕРЕВОЗЧИКИ(УЧАСТКИ)",
        "КОДЫ ПО УТИ",
        "КОДЫ ПО КЗХ",
        "КОДЫ ПО КЖД",
        "Информация. не предназначенная для перевозчика. № договора  по поставку",
        "ОТПРАВИТЕЛЬ",
        "ПОЛУЧАТЕЛЬ",
        "НАИМЕНОВАНИЕ ГРУЗА",
        "НОМЕР КОНТЕЙНЕРА",
        "ТИП КНТР",
        "ТИП G1",
        "ТАРА КОНТЕЙНЕРА",
        "РОД УПАКОВКИ",
        "К-ВО МЕСТ",
        "НЕТТО",
        "ТАРА",
        "БРУТТО",
        "К-ВО",
        "ЗНАКИ",
        "Документы. приложенные отправителем",
        "ТЖ ПЛОМБА",
        "ИМЯ ИНСПЕКТОРА",
        "Дата"
      ]
      let filtered = Array.from(rows).filter(item => conditionsToBeValid.includes(item) === true);
      let isValid = filtered.length === conditionsToBeValid.length
      return isValid
    },

    async uploadExcel(file) {
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        let rows = await readXlsxFile(file)
        if (this.isValidExcel(rows[0])) {
          this.dropZone.files.length = 0 // clearing files
          this.dropZone.files.push(file);
          this.excel.data.original = rows
          this.excelFileReceived(this.excel.data.original)
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Invalid Excel Data",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Form Accepts Only Excel File",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },

    async onDropZoneChange() {
      let file = document.querySelector(".dropzoneFile").files[0]
      this.uploadExcel(file)
    },

    async onFileDrop(e) {
      let file = e.dataTransfer.files[0];
      this.uploadExcel(file)
    },

    excelFileReceived(data) {
      this.$emit('onExcelFileReceived', {data: data, action: 'create'})
    },

    async createTrain() {
      this.uploadStatus.started = true
      this.prepareData()
      await this.submitTrainSmgs()
    },

    prepareData() {
      for (let row of this.excel.data.original.slice(1, this.excel.data.original.length)) {
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
          train_name: null,
        }

        for (let [i, value] of r.entries()) {
          let headers = JSON.parse(JSON.stringify(this.excel.data.original.slice(0, 1)[0]))

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

        excel_data.train_name = this.train.name
        this.excel.data.englishVersion.push(excel_data)
      }
    },

    async submitTrainSmgs() {
      this.uploadStatus.totalItemsToBeUploaded = this.excel.data.englishVersion.length

      Array.from(this.excel.data.englishVersion).forEach(async (item) => {
        let response = await fetch('https://fastapi-smgs.herokuapp.com/api/v1/smgs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })

        let data = await response.json()

        await this.countUploadedItems(data)
      })
    },

    async countUploadedItems(data) {
      this.uploadStatus.totalItemsUploaded += 1


      if (this.uploadStatus.totalItemsUploaded === this.uploadStatus.totalItemsToBeUploaded) {
        this.train.id === null ? this.train.id = data.train.id : 0
        try {

          let userId =  await fetch(`https://fastapi-smgs.herokuapp.com/api/v1/train/${this.train.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.train.name,
              user_id: store.state.user.id
            })
          })

          console.log("userId: ", userId)

          var formData = new FormData();
          formData.append("file", this.dropZone.files[0]);
          axios
              .post(`http://fastapi-smgs.herokuapp.com/api/v1/train/uploadfile/?pk=${this.train.id}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(() => {
                this.uploadStatus.started = false
                this.uploadStatus.totalItemsUploaded = 0
                this.uploadStatus.totalItemsToBeUploaded = 0
                this.$emit('onCreateTrainFinished', true)
                let btn = document.getElementById('closeExcelUploadwModal')
                btn.click()
                Swal.fire({
                  title: 'Success!',
                  text: 'Train uploaded successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                  timer: 3000
                })


              })
        } catch {
          alert('postExel')
        }
      }
    }

  },
  components: {
    DropZone
  },

}
</script>
<template>

  <button type="button" class="btn btn-success add-btn" data-bs-toggle="modal" data-bs-target="#CreateSmgsModal">
    <i class="ri-add-line align-bottom me-1"></i> Create Train
  </button>

  <div id="CreateSmgsModal" class="modal zoomIn" tabindex="-1" aria-labelledby="CreateSmgsModalLabel"
       aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-5">
          <div class="mb-3">
            <label class="form-label mt-0 pt-0">Train Name</label>
            <input type="text" class="form-control" v-model="train.name">
          </div>
          <div>
            <label for="basiInput" class="form-label">Excel File</label>
            <DropZone @change="onDropZoneChange" @drop="onFileDrop"/>
            <ul class="list-unstyled mb-0 mt-3 mb-3">

              <div v-if="uploadStatus.started === true" class="text-center">
                <h4>{{ uploadStatus.totalItemsUploaded }} of {{ uploadStatus.totalItemsToBeUploaded }} smgs
                  uploaded</h4>
              </div>

              <div class="border rounded" v-for="(file, index) of dropZone.files" :key="index">
                <div class="d-flex p-2">
                  <div class="flex-grow-1">
                    <div class="pt-1">
                      <h5 class="fs-14 mb-1" data-dz-name="">
                        {{ file.name }}
                      </h5>
                      <p class="fs-13 text-muted mb-0" data-dz-size="">
                        <strong> {{ file.size / 1024 }} </strong> KB
                      </p>
                      <strong class="error text-danger" data-dz-errormessage=""></strong>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ms-3">
                    <button data-dz-remove="" class="btn btn-sm btn-danger"
                            @click="dropZone.files.length = 0">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

            </ul>

            <b-button variant="secondary" class="w-100" @click="createTrain"
                      :class="previewConfirmed === true && train.name !== '' ? '' : 'disabled'">
              Start Uploading
            </b-button>

            <button class="d-none" data-bs-dismiss="modal" aria-hidden="true" id="closeExcelUploadwModal"></button>
          </div>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->


</template>