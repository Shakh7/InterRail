<template>
  <PageHeader title="SMGS" :items="items"/>
  <b-card v-if="!selected_doc">
    <b-card-body class="p-1">
      <div class="text-center" v-if="isReadingDocs">
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
        <td>{{ getFormatedDate(row.updated_at) }}</td>
        <td>
          <div class="hstack gap-3 flex-wrap">
            <b-link @click="onEditDoc(row)"
                    class="link-success fs-15"><i
                class="ri-edit-2-line"></i></b-link>
            <!-- <b-link @click=""
                class="link-danger fs-15"><i
                    class="ri-delete-bin-line"></i></b-link> -->
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="container-fluid" v-else>
    <div class="card" id="contactList">
      <div class="card-header p-2 mb-4">
        <div class="row gy-3">
          <div class="col-md-4">
          </div>
          <div class="col-md-auto ms-auto">
            <div class="d-grid gap-2">
              <b-button variant="soft-info" :disabled="visible_rows.length != selected_doc.smgses.length"
                        @click="confirm">Confirm
              </b-button>
            </div>
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
            <div class=" mb-4">
              <h5>Selected Page Number: {{ selected_smgs.index + 1 }}</h5>
            </div>
            <form @submit.prevent="addEditSmgsRow">
              <div class="modal-body">
                <div class="row">
                  <div class="col-xxl-6 ps-2">
                    <div class="mb-3">
                      <label class="form-label">SMGS Number</label>
                      <input type="number" class="form-control"
                             placeholder="SMGS Number" required v-model="selected_smgs.number"/>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="number" class="form-control" placeholder="Code"
                             required v-model="selected_smgs.code"/>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-2">
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <flat-pickr
                          v-model="selected_smgs.date" placeholder="Current date"
                          class="form-control">
                      </flat-pickr>
                    </div>
                  </div>
                  <div class="col-xxl-6 ps-0">
                    <div class="mb-3">
                      <label class="form-label">Forwarder</label>
                      <Multiselect
                          class="ms-0"
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
                </div>
              </div>
              <div class="hstack gap-2 mb-4">
                <button type="submit" class="btn btn-success" style="width: 100%">
                  {{ isCreate ? 'Add' : 'Edit' }}
                </button>
              </div>
            </form>
            <div class="table-responsive table-card">
              <table class="table text-center">
                <thead class="table-light">
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Number</th>
                  <th scope="col">Code</th>
                  <th scope="col">Date</th>
                  <th scope="col">Forwarder</th>
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
                  <td>{{ row.code }}</td>
                  <td>{{ row.date }}</td>
                  <td>{{ row.forwarder_name }}</td>
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
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import axios from 'axios'

export default {
  name: "ProductsList",
  data() {
    return {
      csrfToken: '',
      images: [],
      current_image: '',
      forwarder: {},
      forwarder_options: [],
      visible_rows: [],
      selected_smgs: {},
      smgsMap: {},
      documents: [],
      forwarder_name: '',
      isCreate: true,
      selected_doc: null,
      imagePath: '',
      isReadingDocs: false,
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
    Multiselect,
    PageHeader
  },
  methods: {
    getFormatedDate(timestamp) {
      const date = new Date(Date.parse(timestamp))
      return date.toLocaleString()
    },
    async selectedFile() {
      this.isReadingDocs = true
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
      await axios.post(`${process.env.VUE_APP_IMAGE_URL}/pdf/`, formData, {
        headers: {"Content-Type": "multipart/form-data"},
      }).then((res) => {
        this.selected_doc = res.data
        this.selected_smgs = this.selected_doc.smgses.length > 0 ? this.selected_doc.smgses[0] : {}
        this.current_image = `${process.env.VUE_APP_IMAGE_URL}/` + this.selected_smgs.image_path
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
      this.isReadingDocs = false
    },
    async getCounterpartyList() {
      await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/counterparties/?is_used_for_code=true`)
          .then((response) => response.json())
          .then(response => {
            this.forwarder_options = response.results.map(item => {
              return {
                value: item.id,
                label: item.name,
              }
            })
          })
    },
    async confirm() {

    },
    async onEditDoc(row) {
      await fetch(`${process.env.VUE_APP_IMAGE_URL}/document/by/${row.id}`)
          .then((response) => response.json())
          .then(res => {
            this.selected_doc = res
            this.visible_rows = this.selected_doc.smgses.filter(el => el.number);
            this.selected_smgs = this.selected_doc.smgses.find(el => el.index == this.visible_rows.length)
            this.current_image = `${process.env.VUE_APP_IMAGE_URL}/` + this.selected_smgs.image_path
          })
    },
    async onRowClick(row) {
      this.selected_smgs = row
      this.forwarder = {label: row.forwarder_name, value: row.forwarder_id}
      this.isCreate = false
      this.current_image = `${process.env.VUE_APP_IMAGE_URL}/` + this.selected_smgs.image_path

    },
    async addEditSmgsRow() {
      let headers = new Headers();
      headers.append("Content-Type", `application/json`);
      this.selected_smgs.forwarder_name = this.forwarder.label
      this.selected_smgs.forwarder_id = this.forwarder.value
      await axios.put(`${process.env.VUE_APP_IMAGE_URL}/smgs/${this.selected_smgs.id}/`,
          this.selected_smgs,
          {headers: headers})
          .then((res) => {
            if (this.isCreate) {
              this.visible_rows.push(res.data)
            } else {
              var foundIndex = this.visible_rows.findIndex(x => x.index == res.data.index);
              this.visible_rows[foundIndex] = res.data
            }
            this.selected_smgs = this.selected_doc.smgses.find(el => el.index == this.visible_rows.length)
          })
          .catch(err => {
            alert(err)
          })
      this.isCreate = true
      this.current_image = `${process.env.VUE_APP_IMAGE_URL}/` + this.selected_smgs.image_path
    },
  },
  async mounted() {
    fetch(`${process.env.VUE_APP_IMAGE_URL}/document/`, {method: 'GET'})
        .then((response) => response.json())
        .then((res) => {
          console.log(res)
          this.documents = res.results
        })
    await this.getCounterpartyList()
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