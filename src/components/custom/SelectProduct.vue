<template>
  <div :class="classes === undefined ? 'col-4' : 'col-' + classes[0]">
    <label class="form-label">
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
        @select="onOptionSelect($event)"
    />
  </div>

  <div :class="classes === undefined ? 'col-4' : 'col-' + classes[1]">
    <label class="form-label">
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
        @select="onOptionSelect($event)"
    />
  </div>

  <div class="mb-3" :class="classes === undefined ? 'col-4' : 'col-' + classes[2]">
    <label class="form-label">
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
        @select="onOptionSelect($event)"
    />
  </div>

</template>

<script>
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
    ratio: Array
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
      this.$emit('onSelect', event.value)
    }
  },
  computed: {
    classes: {
      get() {
        return this.ratio
      }
    }
  },
  components: {
    Multiselect
  },
}

</script>

<style scoped>

</style>