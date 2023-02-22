<template>
  <div id="generalStationCreate" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">

        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Create Station
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <section class="p-4 pt-3 row gy-3">
          <div class="col-12 col-md-6">
            <label class="form-label">Station name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Station name">
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label">Station code</label>
            <input v-model="code" type="text" class="form-control" placeholder="Station code">
          </div>
          <div class="col-12 mt-3 pt-2">
            <b-button v-if="!isCreating" variant="primary" class="w-100" @click="createStation()">Create</b-button>

            <button v-if="isCreating" type="button" class="btn btn-primary btn-load w-100">
                <span class="d-flex align-items-center justify-content-center">
                  <span class="me-2">
                    Creating...
                  </span>
                  <span class="spinner-grow" role="status">
                    <span class="visually-hidden">Creating...</span>
                  </span>
                </span>
            </button>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import CoreApi from "../../api/Core/CoreApi";
import {defineComponent} from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CreateStation",
  data() {
    return {
      name: '',
      code: '',
      isCreating: false
    }
  },
  methods: {
    async createStation() {
      if (this.isFormValid()) {
        this.isCreating = true;
        let api = new CoreApi();
        let response = await api.createStation({
          name: this.name,
          code: this.code,
        });
        this.isCreating = false;
        if (response.ok) {
          this.name = '';
          this.code = '';

          let alert = await Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          alert.fire({
            icon: 'success',
            title: 'Station created successfully'
          })

          let modal = document.querySelector('#generalStationCreate .modal-header button');
          modal.click();

        }
      } else {
        let alert = await Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        alert.fire({
          icon: 'warning',
          title: 'Please fill all fields'
        })
      }
    },
    isFormValid() {
      return this.name !== '' && this.code !== '';
    }
  }
})

</script>