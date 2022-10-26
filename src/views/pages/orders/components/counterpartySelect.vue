<template>
  <div class="col-md-4 mb-3">
    <div class="row gy-3">
      <div class="col-12">
        <label for="payment_status" class="form-label">Counterparty</label>
        <select class="form-select" v-model="counterparty.selected">
          <option v-for="counterparty in counterparties" :key="counterparty"
                  :value="counterparty"
          >
            {{ counterparty.name }}
          </option>
        </select>
      </div>
      <div class="col-12">
        <Multiselect
            class="form-control"
            v-model="multiselect.data"
            :searchable="true"
            mode="multiple"
            :hideSelected="false"
            :closeOnSelect="false"
            :options="getCategories"
            placeholder="Choose categories.."
            :object="true"
        />
      </div>
      <div class="col-12">
        <slot name="delete_button" :data="counterparty">
          <b-button class="btn-soft-danger waves-effect waves-light w-100">
            Delete
          </b-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  name: "counterpartySelect",
  emits: [
    'onCounterpartySelect', 'onCategorySelect',
  ],
  data() {
    return {
      multiselect: {
        data: null
      },
      counterparty: {
        selected: {id: null}
      }
    }
  },
  props: {
    counterparties: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Multiselect
  },
  computed: {
    getCategories() {
      return this.categories
    }
  },
  watch: {
    counterparty: {
      handler(newValue) {
        this.$emit('onCounterpartySelect', newValue)
      },
      deep: true
    },
    multiselect: {
      handler(newValue) {
        this.$emit('onCategorySelect', newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>