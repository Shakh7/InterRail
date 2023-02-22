<template>
  <div id="generalProductCreate" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">

        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Create Product
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <section class="p-4 pt-3 row gy-3">
          <div class="col-12 col-md-6">
            <label class="form-label">Product name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Product name">
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label">HS code</label>
            <input v-model="hc_code" type="text" class="form-control" placeholder="Hs code">
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label">ETCNG code</label>
            <input v-model="etcng_code" type="text" class="form-control" placeholder="Etsng code">
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label">ETCNG name</label>
            <input v-model="etcng_name" type="text" class="form-control" placeholder="Etsng name">
          </div>
          <div class="col-12 mt-3 pt-2">
            <b-button v-if="!isCreating" variant="primary" class="w-100" @click="createProduct()">Create</b-button>

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
import CoreApi from "@/api/core/core";
import {defineComponent} from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CreateProduct",
  data() {
    return {
      name: '',
      hc_code: '',
      etcng_code: '',
      etcng_name: '',
      isCreating: false
    }
  },
  methods: {
    async createProduct() {
      if (this.isFormValid()) {
        this.isCreating = true;
        let api = new CoreApi();
        let response = await api.createProduct({
          name: this.name,
          hc_code: this.hc_code,
          etcng_code: this.etcng_code,
          etcng_name: this.etcng_name,
        });
        this.isCreating = false;
        if (response.ok) {
          this.name = '';
          this.hc_code = '';
          this.etcng_code = '';
          this.etcng_name = '';

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
            title: 'Product created successfully'
          })

          let modal = document.querySelector('#generalProductCreate .modal-header button');
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
      return this.name !== '' && this.hc_code !== '' && this.etcng !== '' && this.etcng_name !== '';
    }
  }
})

</script>