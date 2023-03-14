<template>
  <!-- Grids in modals -->
    <b-modal v-model="showModal" hide-footer title="Import smgses from XLSX" class="v-modal-custom" centered>
      <form action="/" method="POST" @submit.prevent="submit">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Forwarder</label>
            <v-select :options="forwarder.options" label="name" v-model="forwarder.selected" @search="getCounterpartyOptions($event)" >
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  :required="!forwarder.selected"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </v-select>
            </div>
            <div class="mb-3">
              <label for="xlsxfile" class="form-label">XLSX</label>
              <input id="xlsxfile" class="form-control" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            </div>
          </div>
          <div class="modal-footer hstack gap-2 justify-content-end">
              <b-button type="button" variant="light" @click="showModal = false">
                  Close</b-button>
              <b-button type="submit" variant="success">Submit</b-button>
          </div>
        </form>
    </b-modal>
  <PageHeader title="SMGS" :items="items"/>
  <b-card v-if="!selected_doc">
    <b-card-body class="p-1">
      <div class="text-center" v-if="isReadingDoc">
        <b-spinner variant="info" class="mb-2"></b-spinner>
        <h5 class="mb-0">We are processing your documents, please wait !</h5>
      </div>
      <DropZone v-else @change="selectedFile"/>
    </b-card-body>
  </b-card>
  <div class="card container-fluid p-2 mt-2" v-if="!selected_doc">
    <table class="table  table-nowrap">
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Document Name</th>
        <th scope="col">Pages</th>
        <th scope="col">Updated Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in documents" :key="row.id">
        <th>{{ index + 1 }}</th>
        <td>{{ row.name }}</td>
        <td>{{ row.pages }}</td>
        <td>{{ getFormatedDate(row.modified) }}</td>
        <td>
          <div class="hstack gap-3 flex-wrap">
            <b-link @click="onEditDoc(row.id)"
                    class="link-success fs-15"><i
                class="ri-edit-2-line"></i></b-link>
            <b-link @click="deleteDocRow(row)"
                class="link-danger fs-15"><i
                    class="ri-delete-bin-line"></i></b-link>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="container-fluid" v-else>
    <div class="card">
      <div class="card-header p-2">
        <div class="row">
          <div class="col-md-auto ms-auto">
            <b-button class="p-2 m-1" variant="success" @click="downloadXLSX">Download XLSX</b-button>
            <b-button class="p-2 m-1" variant="primary" @click="showModal = !showModal">Upload XLSX</b-button>
            <b-button variant="soft-info" :disabled="visible_rows.length != selected_doc.smgses.length"
                      @click="confirm">Confirm
            </b-button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xxl-6 ps-2">
            <div class="image-container">
              <!-- <div class="text">{{ currentIndex+1 +'/'+ images.length }}</div> -->
              <!-- <button class="prev" @click="previousImage">&#10094;</button> -->
              <img :src="current_image" class="image"/>
              <!-- <button class="next" @click="nextImage">&#10095;</button> -->
            </div>
          </div>
          <div class="col-xxl-6 ps-3">
            <h5>Selected Page Number: {{ selected_smgs.index + 1 + '/' + selected_doc.smgses.length }}</h5>
            <!-- Primary Alert -->
            <b-alert :show="showAlert" dismissible variant="success" class="alert-border-left fade show" role="alert">
              <i class="ri-user-smile-line me-1 align-large"></i>
              Code: <b>{{ this.scanned.code ? this.scanned.code: ""  }}</b> Smgs: <b>{{ this.scanned.smgs_number ? this.scanned.smgs_number: ""  }}</b>  Container: <b>{{ this.scanned.container ? this.scanned.container: ""  }}</b>
            </b-alert>
            <form @submit.prevent="addEditSmgsRow">
              <div class="modal-body">
                <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                      required
                      v-model="forwarder.selected"
                      placeholder="Select forwarder"
                      :options="forwarder.options"
                      @search="getCounterpartyOptions($event)"
                      @option:selected="selectForwarder($event)"
                      label="name">
                    </v-select>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                        <v-select 
                          required
                          v-model="code.selected"
                          placeholder="Search code"
                          :options="code.options"
                          @search="getCodeOptions($event)"
                          @option:selected="onCodeOptionSelect($event)"
                          label="number">
                        </v-select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <input type="number" class="form-control"
                             placeholder="SMGS Number" required v-model="selected_smgs.number"/>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <flat-pickr
                          v-model="selected_smgs.date" placeholder="Current date"
                          class="form-control">
                      </flat-pickr>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="wagon.selected"
                        placeholder="Search wagon"
                        :options="wagon.options"
                        @search="getWagonOrContainerOptions($event, 'wagon')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="container.selected"
                        placeholder="Search container"
                        :options="container.options"
                        @search="getWagonOrContainerOptions($event, 'container')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="departure.selected"
                        placeholder="Search departure station"
                        :options="departure.options"
                        @search="getStationOptions($event, 'departure')"
                        @option:selected="onOptionSelect($event, 'departure')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="destination.selected"
                        placeholder="Search destination station"
                        :options="destination.options"
                        @search="getStationOptions($event, 'destination')"
                        @option:selected="onOptionSelect($event, 'destination')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="consignee.selected"
                        placeholder="Search consignee"
                        :options="consignee.options"
                        @search="getThirdPartyOptions($event, 'consignees')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <v-select 
                        required
                        v-model="shipper.selected"
                        placeholder="Search shipper"
                        :options="shipper.options"
                        @search="getThirdPartyOptions($event, 'shippers')"
                        label="name">
                      </v-select>
                    </div>
                  </div>
                </div>
                <!-- <div class="row">
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <input type="number" class="form-control"
                             placeholder="Weight" required v-model="selected_smgs.weight"/>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <Multiselect
                          class="ms-0 form-label"
                          v-model="forwarder"
                          :searchable="true"
                          :closeOnSelect="true"
                          :options="forwarder_options"
                          placeholder="Forwarder"
                          :object="true"
                          required
                      />
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="hstack gap-2 mb-4">
                <button type="submit" class="btn btn-success" style="width: 100%">
                  {{ isCreate ? 'Add' : 'Edit' }}
                </button>
              </div>
            </form>
            <div class="table-responsive table-card">
              <table class="table text-center table-bordered">
                <thead class="table-light">
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">SMGS №</th>
                  <th scope="col">Code №</th>
                  <th scope="col">Date</th>
                  <th scope="col">Wagon</th>
                  <th scope="col">Container</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in visible_rows" :key="row.id"
                    @click="onRowClick(row)"
                    :class="row.index == selected_smgs.index ? 'text-success border-success': ''">
                  <th scope="row">
                    {{ row.index + 1 }}
                  </th>
                  <td style="white-space: pre-wrap;" class="text-start">
                    {{ row.number }}
                  </td>
                  <td>{{ row.code ? row.code.number: '' }}</td>
                  <td>{{ row.date }}</td>
                  <td>{{ row.wagon ? row.wagon.name: '' }}</td>
                  <td>{{ row.container ? row.container.name: '' }}</td>
                  <!-- <td>{{ row.forwarder ? row.forwarder.name: '' }}</td>g -->
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import Swal from "sweetalert2";
import PageHeader from "../../../components/page-header.vue";
import DropZone from "@/components/widgets/dropZone";
import axios from 'axios'
import OrderService from "@/api";
import CoreApi from "@/api/core/core";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: "ProductsList",
  data() {
    return {
      code: {
        selected: null,
        options: []
      },
      destination: {
        selected: null,
        options: []
      },
      departure: {
        selected: null,
        options: []
      },
      wagon: {
        selected: null,
        options: []
      },
      container: {
        selected: null,
        options: []
      },
      consignee: {
        selected: null,
        options: []
      },
      shipper: {
        selected: null,
        options: []
      },
      forwarder: {
        selected: null,
        options: []
      },
      showAlert: false,
      current_image: '',
      visible_rows: [],
      selected_smgs: {},
      documents: [],
      isCreate: true,
      selected_doc: null,
      imagePath: '',
      isReadingDoc: false,
      showModal: false,
      scanned: {},
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "SMGS",
          href: "/smgs/extractor/",
        },
      ]
    }
  },
  components: {
    DropZone,
    flatPickr,
    PageHeader,
    vSelect
  },
  created() {
    this.coreApi = new CoreApi();
  },
  mounted() {
    this.getDocument()
  },
  methods: {
    getFormatedDate(timestamp) {
      const date = new Date(Date.parse(timestamp))
      return date.toLocaleString()
    },
    async selectedFile() {
      this.isReadingDoc = true
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      const formData = new FormData();
      formData.append("file", document.querySelector(".dropzoneFile").files[0]);
      await OrderService({
        url: '/smgs/pdf/',
        method: 'post',
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
      }).then((res) => {
        this.selected_doc = res.data
        this.selected_smgs = this.selected_doc.smgses.length > 0 ? this.selected_doc.smgses[0] : {}
        this.current_image = `${process.env.VUE_APP_ORDER_URL}/` + this.selected_smgs.image_path
        Toast.fire({
          icon: 'success',
          title: 'File upload was successful!'
        })
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err
        })
      })
      this.isReadingDoc = false
    },
    async submit() {
      const formData = new FormData();
      formData.append('file', document.getElementById('xlsxfile').files[0]);
      await OrderService({
        url: `/smgs/xlsx/process/${this.forwarder.selected.id}/`,
        method: 'post',
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
      }).then(() => {
        Swal.fire("Smgses Updated!", "", "success");
      }).catch((err) => {
        Swal.fire("Sorry!", `${err}`, "error");
      })
      await this.onEditDoc(this.selected_doc.id)
      this.showModal = !this.showModal
    },
    async deleteDocRow(row) {
      Swal.fire({
          title: "Do you want to delete?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#f46a6a",
          confirmButtonColor: "#0ab39c",
          confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        // TODO: refactor the async operation
          if (result.value) {
            await axios.delete(`${process.env.VUE_APP_ORDER_URL}/smgs/document/${row.id}/`, {})
            .then(async () => {
              await this.getDocument()
              await Swal.fire({
                title: "Deleted!",
                text: "Document has been deleted successfully", 
                timer: 100,
                icon: "success"});
            }).catch((err) => {
              Swal.fire(`Error to delete file ${row.name}`, "An Error Has Occured !", err);
            })
          }
      });
    },
    async selectForwarder(query) {
      console.log(query)
      let image_path = this.selected_smgs.image_path.split("/").slice(2).join("/");
      let res = await fetch(`${process.env.VUE_APP_ORDER_URL}/smgs/image/${image_path}/${query.id}/`)
      let result = await res.json()
      if (result.scanned.code || result.scanned.smgs_number || result.scanned.container) {
        this.showAlert = true
        this.scanned = result.scanned
        // setTimeout(() => { this.showAlert = false }, 2000);
      }
      this.container.selected = result.populated.container ? result.populated.container : null
      // this.selected_smgs.number = result
      if (result.populated.code) {
        const code = result.populated.code
        this.code.selected = {id: code.id, number: code.number}
        this.departure.selected = code.departure ? code.departure : null
        this.destination.selected = code.destination ? code.destination : null
      }
    },
    async getCounterpartyOptions(query) {
      if (query.length < 1) {return}
      let forwarders = (await this.coreApi.getCounterpartiesForCode(query,7, 0)).results
        this.forwarder.selected = null
        this.forwarder.options = forwarders
    },
    async getCodeOptions(query) {
      if (query.length < 2) {return}
      let res = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/extractor/list/?forwarder_id=${this.forwarder.selected.id}&number=${query}`)
      let result = await res.json()
      this.code.selected = null
      this.code.options = result.results
    },
    async downloadXLSX() {
      window.open(`${process.env.VUE_APP_ORDER_URL}/smgs/xlsx/download/${this.selected_doc.id}/`, '_blank');
    },
    async confirm() {

    },
    async onEditDoc(id) {
      await fetch(`${process.env.VUE_APP_ORDER_URL}/smgs/document/by/${id}/`)
          .then((response) => response.json())
          .then(res => {
            this.selected_doc = res
            this.visible_rows = this.selected_doc.smgses.filter(el => el.number);
            this.selected_smgs =  this.visible_rows.length == this.selected_doc.smgses.length ? this.selected_doc.smgses[this.visible_rows.length-1]:this.selected_doc.smgses.find(el => el.index == this.visible_rows.length)
            this.current_image = `${process.env.VUE_APP_ORDER_URL}/` + this.selected_smgs.image_path
          })
    },
    async onRowClick(row) {
      this.selected_smgs = row
      this.forwarder.selected = row.forwarder
      this.code.selected = row.code
      this.departure.selected = row.departure_station
      this.destination.selected = row.destination_station
      this.shipper.selected = row.shipper
      this.consignee.selected = row.consignee
      this.wagon.selected = row.wagon
      this.container.selected = row.container
      this.isCreate = false
      this.current_image = `${process.env.VUE_APP_ORDER_URL}/` + this.selected_smgs.image_path
    },
    async getCode(input) {
      console.log(input)
      // codes = await OrderService({
      //   url: `/code/application/list/?number=${input}&limit=${7}`,
      //   method: 'get',
      // })
    },
    async addEditSmgsRow() {
      let headers = new Headers();
      headers.append("Content-Type", `application/json`);
      this.selected_smgs.forwarder_id = this.forwarder.selected.id
      this.selected_smgs.code_id = this.code.selected.id
      this.selected_smgs.departure_station_id = this.departure.selected.id
      this.selected_smgs.destination_station_id = this.destination.selected.id
      this.selected_smgs.wagon_id = this.wagon.selected.id
      this.selected_smgs.container_id = this.container.selected.id
      this.selected_smgs.consignee_id = this.consignee.selected.id
      this.selected_smgs.shipper_id = this.shipper.selected.id
      await axios.put(`${process.env.VUE_APP_ORDER_URL}/smgs/update/${this.selected_smgs.id}/`,
          this.selected_smgs,
          {headers: headers})
          .then((res) => {
            if (this.isCreate) {
              this.visible_rows.push(res.data)
            } else {
              var foundIndex = this.visible_rows.findIndex(x => x.index == res.data.index);
              this.visible_rows[foundIndex] = res.data
            }
            this.selected_smgs = this.visible_rows.length == this.selected_doc.smgses.length ? this.selected_doc.smgses[this.visible_rows.length-1]:this.selected_doc.smgses.find(el => el.index == this.visible_rows.length)
          })
          .catch(err => {
            alert(err)
          })
      this.isCreate = true
      this.current_image = `${process.env.VUE_APP_ORDER_URL}/` + this.selected_smgs.image_path
    },

    async getDocument() {
      await fetch(`${process.env.VUE_APP_ORDER_URL}/smgs/document/`, {method: 'GET'})
        .then((response) => response.json())
        .then((res) => {
          this.documents = res.results
        })
    },

    async handleError(err) {
      console.log(err)
    },

    async getStationOptions(query, option_type) {
      if (query.length <= 1) return;
      const options = (await this.coreApi.getCoreList('stations', query, 4)).results
      if (option_type === 'departure') {
        this.departure.selected = null
        this.departure.options = options
      } else if (option_type === 'destination') {
        this.destination.selected = null
        this.destination.options = options
      }
    },
    async getWagonOrContainerOptions(query, option_type) {
      if (query.length <= 1) return;
      const options = (await this.coreApi.getCoreList(option_type, query, 4)).results
      if (option_type === 'container') {
        this.container.selected = null
        this.container.options = options
      } else if (option_type === 'wagon') {
        this.wagon.selected = null
        this.wagon.options = options
      }
    },
    async getThirdPartyOptions(query, option_type) {
      if (query.length <= 1) return;

      const options = (await this.coreApi.getCoreList(option_type, query, 4)).results
      if (option_type === 'consignees') {
        this.consignee.selected = null
        this.consignee.options = options
      } else if (option_type === 'shippers') {
        this.shipper.selected = null
        this.shipper.options = options
      }
    },
    async onCodeOptionSelect(selected) {
      let res = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/extractor/${selected.id}/`)
      let result = await res.json()
        this.departure.selected = result.departure ? result.departure : null
        this.destination.selected = result.destination ? result.destination : null
    },
    itemProjectionFunction(item) {
      console.log(item)
      return item
    },  
    async onOptionSelect(event, option_type) {
      console.log(event)
      console.log(option_type)
    }
  },
}
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  float: left;
  /* marginRight: 20px; */
  position: relative;
}

.image-container {
  width: 100%;
  height: auto;
}

.btn-container {
  display: inline-block;
  position: relative;
}

.btn-container .card {
  width: 100%;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.pdf-and-table-container {
  display: flex;
}

.prev:hover,
.next:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Caption text */
.text {
  color: #000000;
  font-size: 25px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  top: 0;
  text-align: center;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  /* color: gray; */
  font-weight: bold;
  font-size: 28px;
  transition: 0.6s ease;
}

.dropzone {
  text-align: center;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

/* Position the "next button" to the right */
.next {
  right: 0;
}

</style>