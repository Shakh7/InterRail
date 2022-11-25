<template>
  <input class="form-control form-control-sm w-75 m-auto"
         type="number" placeholder="Actual cost"
         v-model="cost.actual_cost" :class="inputClass"
         v-on:keyup.enter="showPrice(cost.id)">
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ActualCostInput",
  emits: ["update"],
  data() {
    return {
      inputClass: ""
    }
  },
  props: {
    actualCost: {
      type: Object,
    }
  },
  methods: {
    async showPrice(id) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/expanse/actual_cost/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "actual_cost": this.cost.actual_cost
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
        this.inputClass = 'border-success'
        await Toast.fire({
          icon: 'success',
          title: 'Actual cost updated'
        })
      } else {
        this.inputClass = 'border-danger'
        await Toast.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      }
    }
  },
  computed: {
    cost: {
      get() {
        return this.actualCost
      }
    }
  },
}
</script>

<style scoped>

</style>