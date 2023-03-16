<template>
  <div :id="id" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">

        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            {{ header }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <h5 class="fw-light">Are you sure you want to delete <span class="fw-semibold">{{ confirmationPlaceholder }} </span>? </h5>
          <form @submit.prevent="deleteRecord" class="mt-4">
            <div class="mb-3">
              <label for="recordName" class="form-label text-dark fw-medium">
                <slot name="recordName">
                  Type <code><span class="fw-medium">{{ confirmationPlaceholder }}</span></code> to confirm deletion
                </slot>
              </label>
              <input v-model="confirmText" type="text" class="form-control" id="recordName"
                     :placeholder="confirmationPlaceholder">
            </div>
            <div class="text-end">
              <button class="btn btn-danger"
                      :disabled="confirmText !== confirmationPlaceholder"
                      type="submit"
                      v-if="!showDeleteButton" @click="showDeleteButton = true">
                Delete
              </button>
              <b-button-group v-else role="group" aria-label="Basic example">
                <b-button :disabled="confirmText !== confirmationPlaceholder"
                          variant="danger" type="submit">Confirm
                </b-button>
                <b-button variant="light" @click="showDeleteButton = false">Cancel</b-button>
              </b-button-group>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
// import Swal from "sweetalert2";

export default {
  emits: ['onDelete'],
  name: "DeleteConfirmation",
  data() {
    return {
      showDeleteButton: false,
      confirmText: ''
    }
  },
  props: {
    id: {
      type: String,
      default: () => 'record_delete_modal'
    },
    header: {
      type: String,
      default: () => 'Delete Record'
    },
    confirmationPlaceholder: {
      type: String,
      default: () => ''
    },
  },
  methods: {
    deleteRecord() {
      this.confirmText !== this.confirmationPlaceholder
          ? alert('Please type the confirmation text')
          : this.$emit('onDelete')
    }
  },
  watch: {
    confirmationPlaceholder() {
      this.confirmText = ''
      this.showDeleteButton = false
    }
  }
}
</script>

<style scoped>

</style>