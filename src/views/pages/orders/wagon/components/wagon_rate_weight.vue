<template>
  <input class="form-control form-control-sm m-auto" v-if="trackBy === 'Wagon' && wagonName === null" :value="wagonName"
         :placeholder="trackBy" v-on:keyup.enter="Save" type="text">

  <input class="form-control form-control-sm m-auto" v-if="trackBy === 'Wagon' && wagonName !== null"
         :value="wagonName['name']" type="text"
         :placeholder="trackBy" v-on:keyup.enter="Save">

  <input class="form-control form-control-sm m-auto" v-if="trackBy === 'Rate'" :value="rate" :placeholder="trackBy"
         v-on:keyup.enter="Save" type="number">
  <input class="form-control form-control-sm m-auto" v-if="trackBy === 'Weight'" :value="actual_weight"
         :placeholder="trackBy" v-on:keyup.enter="Save" type="number">
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "wagon_rate_weight",
  emits: ['update'],
  props: {
    id: {
      type: Number
    },
    trackBy: {
      type: String,
    },
    wagonName: {
      type: Object,
    },
    rate: {
      type: String,
    },
    actual_weight: {
      type: Number,
    },
  },
  methods: {
    async Save(event) {

      let data = {
        [this.trackBy === 'Wagon' ? 'wagon_name'
            : this.trackBy === 'Rate' ? 'agreed_rate_per_tonn'
                : this.trackBy === 'Weight' ? 'actual_weight' : '']: event.target.value
      }

      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/expanse/update/${this.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.$emit('update')
      await Swal.fire({
        position: "center",
        icon: response.ok ? "success" : "error",
        title: response.ok ? "Order expanse updated successfully" : "Order update failed",
        text: response.ok ? "" : `${(await response.json()).error}`,
        showConfirmButton: false,
        timer: response.ok ? 1000 : 3000,
      });
    },
  }
}
</script>

<style scoped>

</style>