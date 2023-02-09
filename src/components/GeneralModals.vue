<template>
  <CreateProduct/>
  <CreateStation/>
</template>

<script>
import CreateProduct from '../components/modals/CreateProduct.vue'
import CreateStation from '../components/modals/CreateStation.vue'

export default {
  name: "GeneralModals",
  components: {
    CreateProduct,
    CreateStation
  }
}
</script>
