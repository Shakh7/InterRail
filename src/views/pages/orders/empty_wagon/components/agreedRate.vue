<template>
  <input v-model="this.rate" :class="response_status" v-on:keyup.enter="updateExpanse"
         class="form-control form-control-sm w-75 m-auto" type="text"
         placeholder="Agreed rate">
</template>

<script>
// import Swal from "sweetalert2";

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
  computed: {
    rate: {
      get() {
        return this.agreed_rate
      }
    }
  },
  methods: {
    async updateExpanse() {

      alert(this.rate)

      // let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/update/${this.id}/`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     agreed_rate: event.target.value
      //   })
      // })
      //
      //
      // const Toast = Swal.mixin({
      //   toast: true,
      //   position: 'bottom',
      //   showConfirmButton: false,
      //   timer: 3000,
      //   timerProgressBar: true,
      //   didOpen: (toast) => {
      //     toast.addEventListener('mouseenter', Swal.stopTimer)
      //     toast.addEventListener('mouseleave', Swal.resumeTimer)
      //   }
      // })
      //
      // if (response.ok) {
      //   this.response_status = 'border-success'
      //   await Toast.fire({
      //     icon: 'success',
      //     title: 'Agreed rate updated',
      //   })
      // } else {
      //   this.response_status = 'border-danger'
      //   await Toast.fire({
      //     icon: 'error',
      //     title: (await response.json())['error'],
      //   })
      // }
      //
      // this.$emit('update')
    }
  }
}
</script>

<style scoped>

</style>