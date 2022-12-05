<template>
  <input v-on:keyup.enter="updateActualCost" :value="actual_cost" :class="response_status"
         class="form-control form-control-sm w-75 m-auto" type="text"
         placeholder="Agreed rate">
</template>

<script>
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "agreedRate",
  data() {
    return {
      response_status: '',
    }
  },
  props: {
    id: {
      type: Number,
    },
    actual_cost: {
      type: String,
    },
  },
  methods: {
    async updateActualCost(event) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/actual_cost/update/${this.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actual_cost: event.target.value
        })
      })

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      if (response.ok) {
        this.response_status = 'border-success'
        await Toast.fire({
          icon: 'success',
          title: 'Actual cost updated',
        })
      } else {

        let error_msg = ''
        try {
          error_msg = (await response.json())['error']
        } catch (e) {
          error_msg = 'Something went wrong'
        }

        this.response_status = 'border-danger'
        await Toast.fire({
          icon: 'error',
          title: error_msg,
        })
      }

      this.$emit('update')
    }
  }
}
</script>

<style scoped>

</style>