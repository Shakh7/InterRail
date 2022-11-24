<template>
  <input v-model="agreed_rate" v-on:keyup.enter="saveWagonNumber(agreed_rate)"
         className="form-control form-control-sm w-75 m-auto" type="number" placeholder="Actual cost"
  >
</template>

<script>
export default {
  name: "AgreedRate",
  props: {
    agreedRate: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    agreed_rate: {
      get() {
        return this.agreedRate
      }
    }
  },
  methods: {
    saveWagonNumber() {
      alert(this.agreed_rate)
    }
  }
}
</script>

<style scoped>

</style>