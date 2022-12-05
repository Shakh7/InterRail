<template>
  <input v-model="computedRate.agreed_rate" :class="response_status"
         class="form-control form-control-sm w-75 m-auto" type="text"
         placeholder="Agreed rate" v-on:keyup.enter="updateAgreedRate(computedRate.id, computedRate.agreed_rate)">
</template>

<script>
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "EmptyAgreedRate",
  data() {
    return {
      response_status: '',
    }
  },
  props: {
    agreed_rate: {
      type: Object,
    },
  },
  computed: {
    computedRate: {
      get() {
        return this.agreed_rate
      },
    }
  },
  methods: {
    async updateAgreedRate(id, rate) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agreed_rate: rate
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

      this.$emit('update')

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