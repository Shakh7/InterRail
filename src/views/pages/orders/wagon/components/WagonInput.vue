<template>
  {{ w === null }}
  <input v-if="wagon === null" v-model="w" v-on:keyup.enter="saveWagonNumber(w)"
         class="form-control form-control-sm" type="text" placeholder="Wagon number">
</template>

<script>
export default {
  name: "WagonInput",
  props: {
    wagon: {
      type: Object,
    },
  },
  computed: {
    w: {
      get() {
        return this.wagon
      }
    }
  },
  methods: {
    saveWagonNumber(wagon) {
      alert(wagon)
    }
  }
}
</script>

<style scoped>

</style>