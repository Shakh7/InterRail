<script>
// import DropZone from "@/components/widgets/dropZone";
// import Swal from "sweetalert2";
// import readXlsxFile from "read-excel-file";

export default {
  name: "UpdateSmgsMOdal",
  emits: {
    onUpdateFileReceived: null
  },
  data() {
    return {
      dropZone: {
        files: [],
      },
      trainData: {
        id: null,
        name: ''
      },
      excel: {
        data: {
          original: null,
          en: null
        }
      }
    };
  },
  methods: {
    async changePlease() {
      alert('Change')
      return
      // let file = document.querySelector(".dropzoneFile").files[0]
      // this.uploadExcel(file)
    },

    async onFileDrop() {
      // let file = e.dataTransfer.files[0];
      // this.uploadExcel(file)
    },
  },
  components: {
    // DropZone
  },
  props: {
    train: {
      type: Object
    },
  },
  watch: {
    train (newVal) {
      this.trainData = newVal
    }
  }
};
</script>

<template>
  <div
    id="UpdateSmgsModal"
    class="modal zoomIn"
    tabindex="-1"
    aria-labelledby="UpdateSmgsModalLabel"
    aria-hidden="true"
    style="display: none"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-5 text-center">
          <h4>Under Development !</h4>
          <!-- <div class="mb-3">
            <label class="form-label mt-0 pt-0">Train Name.</label>
            <input type="text" class="form-control" v-model="trainData.name"/>
          </div> -->
          <!-- <div> -->
            <!-- <label for="basiInput" class="form-label">Excel File</label>
            <DropZone />
            <span>Dvdvdv</span> -->
            <!-- <ul class="list-unstyled mb-0 mt-3 mb-3">
              <div v-if="uploadStatus.started === true" class="text-center">
                <h4>
                  {{ uploadStatus.totalItemsUploaded }} of
                  {{ uploadStatus.totalItemsToBeUploaded }} smgs uploaded
                </h4>
              </div>

              <div
                class="border rounded"
                v-for="(file, index) of dropZone.files"
                :key="index"
              >
                <div class="d-flex p-2">
                  <div class="flex-grow-1">
                    <div class="pt-1">
                      <h5 class="fs-14 mb-1" data-dz-name="">
                        {{ file.name }}
                      </h5>
                      <p class="fs-13 text-muted mb-0" data-dz-size="">
                        <strong> {{ file.size / 1024 }} </strong> KB
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
                      class="btn btn-sm btn-danger"
                      @click="dropZone.files.length = 0"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </ul> -->

            <!-- <b-button variant="secondary" class="w-100">
              Start Uploading
            </b-button> -->

            <!-- <button
              class="d-none"
              data-bs-dismiss="modal"
              aria-hidden="true"
            ></button> -->
            
          <!-- </div> -->
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>
