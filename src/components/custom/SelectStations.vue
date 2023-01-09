<template>
  <div :class="classes === undefined ? 'col-md-3' : 'col-md-' + classes[0]">
    <label for="departure" class="form-label">
      Departure <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="departure.selected"
        :searchable="true"
        :hideSelected="true"
        :options="departure.options"
        placeholder="Departure"
        @search-change="getOptions($event, 'departure')"
        :object="true"
        @input="onOptionSelect($event, 'departure')"
    />
  </div>

  <div class="mb-3" :class="classes === undefined ? 'col-md-3' : 'col-md-' + classes[1]">
    <label for="departure_code" class="form-label">
      Code <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="departure.selected"
        :searchable="true"
        :hideSelected="true"
        :options="departure.options"
        placeholder="Code"
        @search-change="getOptions($event, 'departure')"
        :object="true"
        label="code"
        @input="onOptionSelect($event, 'departure')"
    />
  </div>

  <div :class="classes === undefined ? 'col-md-3' : 'col-md-' + classes[2]">
    <label for="destination" class="form-label">
      Destination <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="destination.selected"
        :searchable="true"
        :hideSelected="true"
        :options="destination.options"
        placeholder="Destination"
        @search-change="getOptions($event, 'destination')"
        :object="true"
        @input="onOptionSelect($event, 'destination')"
    />
  </div>

  <div class="mb-3" :class="classes === undefined ? 'col-md-3' : 'col-md-' + classes[3]">
    <label for="destination_code" class="form-label">
      Code <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control"
        v-model="destination.selected"
        :searchable="true"
        :hideSelected="true"
        :options="destination.options"
        placeholder="Code"
        @search-change="getOptions($event, 'destination')"
        :object="true"
        label="code"
        @input="onOptionSelect($event, 'destination')"
    />
  </div>

</template>

<script>
import Multiselect from "@vueform/multiselect";
import CoreApi from "../../api/core/core_api.js";

export default {
  name: 'SelectStations',
  emits: ['onSelect'],
  data() {
    return {
      destination: {
        selected: null,
        options: []
      },
      departure: {
        selected: null,
        options: []
      }
    }
  },
  props: {
    ratio: Array
  },
  methods: {
    async getOptions(query, option_type) {
      if (query.length <= 2) return;
      let core_api = new CoreApi()

      if (option_type === 'departure') {
        let stations = (await core_api.getCoreList('stations', query, 7)).results
        this.departure.selected = null
        this.departure.options = stations.map((station) => {
          return {
            value: parseInt(station.id),
            label: station.name,
            code: station.code
          }
        })

      } else if (option_type === 'destination') {
        let stations = (await core_api.getCoreList('stations', query, 7)).results
        this.destination.selected = null
        this.destination.options = stations.map((station) => {
          return {
            value: parseInt(station.id),
            label: station.name,
            code: station.code
          }
        })

      }

    },
    onOptionSelect(event, option_type) {
      this.$emit('onSelect', {
        option: option_type,
        value: event === null ? 0 : event.value
      })
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