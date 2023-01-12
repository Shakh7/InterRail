<template>
  <div class="mb-3" :class="classes === undefined ? 'col-4' : 'col-' + classes[0]">
    <label class="form-label" :class="errorColor">
      Product <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="products.selected"
        :searchable="true"
        :hideSelected="true"
        :options="products.options"
        placeholder="Product"
        @search-change="getOptions($event)"
        :object="true"
        @input="onOptionSelect($event)"
    />
  </div>

  <div class="mb-3" :class="classes === undefined ? 'col-4' : 'col-' + classes[1]">
    <label class="form-label" :class="errorColor">
      Hc code <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="products.selected"
        :searchable="true"
        :hideSelected="true"
        :options="products.options"
        placeholder="HC code"
        @search-change="getOptions($event)"
        :object="true"
        label="hc_code"
        @input="onOptionSelect($event)"
    />
  </div>

  <div class="mb-3" :class="classes === undefined ? 'col-4' : 'col-' + classes[2]">
    <label class="form-label" :class="errorColor">
      Etcng <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="products.selected"
        :searchable="true"
        :hideSelected="true"
        :options="products.options"
        placeholder="ETCNG"
        @search-change="getOptions($event)"
        :object="true"
        label="etcng"
        @input="onOptionSelect($event)"
    />
  </div>

</template>

<script>
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import CoreApi from "../../api/core/core_api.js";

export default {
  name: 'SelectProduct',
  emits: ['onSelect'],
  data() {
    return {
      products: {
        selected: null,
        options: []
      }
    }
  },
  props: {
    ratio: Array,
    current_product: {
      type: Object,
      default: () => {
      },
      required: false
    },
  },
  methods: {
    async getOptions(query) {
      if (query.length <= 2) return;
      let core_api = new CoreApi()

      let products = (await core_api.getCoreList('products', query, 7)).results
      this.products.selected = null
      this.products.options = products.map((product) => {
        return {
          value: product.id,
          label: product.name,
          hc_code: product['hc_code'],
          etcng: product['etcng_code'],
        }
      })

    },
    onOptionSelect(event) {
      this.$emit('onSelect', event === null ? null : event)
    }
  },
  computed: {
    classes: {
      get() {
        return this.ratio
      }
    },
    current_prod: {
      get() {
        return this.current_product
      }
    },
    errorColor: {
      get() {
        return this.products.selected === null && this.current_product ? 'text-danger' : ''
      }
    }
  },
  components: {
    Multiselect
  },
  mounted() {
    if (this.current_product) {
      this.products.options = [{
        value: this.current_prod.id,
        label: this.current_prod.name,
        hc_code: this.current_prod['hc_code'],
        etcng: this.current_prod['etcng_code'],
      }]
      this.products.selected = this.products.options[0]
    }
  }
}

</script>

<style scoped>

</style>