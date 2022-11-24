<template>
  <input v-model="actual_cost.actual_cost" v-on:keyup.enter="Save(actual_cost)"
         class="form-control form-control-sm w-75 m-auto" type="number" placeholder="Actual cost">
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ActualCostInput",
  emits: ['update'],
  props: {
    actualCost: {
      type: Object,
    },
  },
  computed: {
    actual_cost: {
      get() {
        return this.actualCost
      }
    }
  },
  methods: {
    async Save(cost) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/expanse/actual_cost/update/${cost.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "actual_cost": cost.actual_cost
        })
      })

      this.$emit('update')
      await Swal.fire({
        position: "center",
        icon: response.ok ? "success" : "error",
        title: response.ok ? "Actual cost updated successfully" : "Actual cost update failed",
        text: response.ok ? "" : `${(await response.json()).error}`,
        showConfirmButton: false,
        timer: response.ok ? 1000 : 3000,
      });
    }
  }
}
</script>

<style scoped>

</style>