<template>
  <input v-model="actual_cost.actual_cost" v-on:keyup.enter="saveWagonNumber(actual_cost)"
         class="form-control form-control-sm w-75 m-auto" type="number" placeholder="Actual cost">
</template>

<script>
export default {
  name: "ActualCostInput",
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
    saveWagonNumber(actual) {
      alert(actual.actual_cost)
    }
  }
}
</script>

<style scoped>

</style>