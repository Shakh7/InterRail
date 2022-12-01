<template>
  <input v-on:keyup.enter="updateExpanse" :value="agreed_rate" :class="response_status"
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
    agreed_rate: {
      type: String,
    },
  },
  methods: {
    // sleep(milliseconds) {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // },
    async updateExpanse(event) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/update/${this.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agreed_rate: event.target.value
        })
      })

      this.$emit('update')

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
          title: 'Agreed rate updated',
        })
      } else {
        this.response_status = 'border-danger'
        await Toast.fire({
          icon: 'error',
          title: (await response.json())['error'],
        })
      }
    }
  }
}
</script>

<style scoped>

</style>