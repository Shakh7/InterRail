<template>
  <input v-if="wagon_computed === null" v-model="new_wagon_name" class="form-control form-control-sm" type="text"
         placeholder="Wagon number" v-on:keyup.enter="updateExpanse(id, new_wagon_name)" :class="response_status">
  <input v-else v-model="wagon_computed.name" class="form-control form-control-sm" type="text"
         placeholder="Wagon number" v-on:keyup.enter="updateExpanse(id, wagon_computed.name)" :class="response_status">

  <div v-if="wagon_computed !== null && code !== ''" class="y position-relative">
    <span
      class="order-connected-code position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"> {{ code }}
    </span>
  </div>

</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "wagonInput",
  data() {
    return {
      new_wagon_name: '',
      response_status: '',
    }
  },
  props: {
    id: {
      type: Number,
      default: () => 0
    },
    wagon: {
      type: Object,
    },
    code: {
      type: String,
    },
  },
  computed: {
    wagon_computed: {
      get() {
        return this.wagon
      }
    }
  },
  methods: {
    // sleep(milliseconds) {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // },
    async updateExpanse(id, newValue) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wagon_name: newValue
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
          title: 'Wagon name updated',
        })
      } else {
        let error_msg = ''
        try {
          let error = await response.json()
          error_msg = error.error
        } catch (e) {
          error_msg = 'Something went wrong'
        }
        this.response_status = 'border-danger'
        await Toast.fire({
          icon: 'error',
          title: error_msg,
        })
      }
    }
  }
}
</script>

<style scoped>

</style>