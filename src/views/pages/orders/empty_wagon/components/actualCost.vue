<template>
  <input v-if="cost.code_cost === undefined || code.cost === null" v-on:keyup.enter="updateActualCost(cost.id, cost.actual_cost)" v-model="cost.actual_cost"
         :class="response_status"
         class="form-control form-control-sm w-75 m-auto" type="text"
         placeholder="Agreed rate">
  <input v-else :value="cost.code_cost"
         class="form-control form-control-sm w-75 m-auto" type="text"
         placeholder="Agreed rate" disabled>
</template>

<script>
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "EmptyActualCost",
  data() {
    return {
      response_status: '',
    }
  },
  props: {
    actual_cost: {
      type: Object,
    },
  },
  computed: {
    cost: {
      get() {
        return this.actual_cost
      }
    }
  },
  methods: {
    async updateActualCost(id, cost) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/expanse/actual_cost/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actual_cost: cost
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

    }
  }
}
</script>

<style scoped>

</style>