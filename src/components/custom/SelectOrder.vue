<template>
  <div>
    <Multiselect v-model="selectedOrder"
                 :id="id" :class="classList"
                 :placeholder="placeholder"
                 :options="orderNumbers" :searchable="true" :loading="isLoading"
                 :hide-selected="false"
                 @search-change="asyncFindForwarder"
                 :caret="false" :style="styles"
                 @input="handleChange"
    />

  </div>
</template>

<script>
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import OrderApi from "../../api/order/OrderApi.js";

let api = new OrderApi()

export default {
  emits: ['onSelect'],
  components: {
    Multiselect
  },
  data() {
    return {
      selectedOrder: null,
      orderNumbers: [],
      isLoading: false
    }
  },
  props: {
    id: {
      type: String,
      default: 'select'
    },
    classList: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select'
    },
    styles: {
      type: String,
      default: ''
    },
    current_order: {
      type: String,
      required: false
    },
    loading_type: {
      type: String,
      default: '',
      required: false
    },
  },
  methods: {
    asyncFindForwarder(query) {
      if (query.trim().length <= 0) return;
      this.isLoading = true
      api.getOrderNumbers(
          `?order_number=${query}&loading_type=${this.loading_type.toLowerCase()}`
      ).then((response) => {

        this.selectedOrder = 0

        this.orderNumbers = response.map(i => {
          return {
            value: i.order_number,
            label: i.order_number
          }
        })
        this.isLoading = false
      })
    },

    handleChange(val) {
      this.$emit('onSelect', val)
    }
  },
  mounted() {
    if (this.current_order) {
      this.orderNumbers = [{
        value: this.current_order,
        label: this.current_order
      }]
      this.selectedOrder = this.current_order
    }
  },
  watch: {
    current_order(value) {
      let validValue = value === ""
      if (!validValue) {
        this.orderNumbers = [{
          value: value,
          label: value
        }]
        this.selectedOrder = value
      } else {
        this.orderNumbers = []
        this.selectedOrder = 0
      }
    }
  }
}
</script>

<style scoped>

</style>