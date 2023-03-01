<template>
  <div v-if="showDeparture" class="col-12 mb-3" :class="classes === undefined ? 'col-lg-3' : 'col-lg-' + classes[0]">
    <label for="departure" class="form-label" :class="errorDepColor">
      Departure <span class="text-danger">*</span>
    </label>
    <Multiselect
        class="form-control-sm"
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

  <div v-if="showDeparture" class="col-12 mb-3" :class="classes === undefined ? 'col-lg-3' : 'col-lg-' + classes[1]">
    <label for="departure_code" class="form-label" :class="errorDepColor">
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

  <div v-if="showDestination" class="col-12 mb-3" :class="classes === undefined ? 'col-lg-3' : 'col-lg-' + classes[2]">
    <label for="destination" class="form-label" :class="errorDesColor">
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

  <div v-if="showDestination" class="col-12 mb-3" :class="classes === undefined ? 'col-lg-3' : 'col-lg-' + classes[3]">
    <label for="destination_code" class="form-label" :class="errorDesColor">
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
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import CoreApi from "@/api/core/core";

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
    ratio: Array,
    current_departure: {
      type: Object,
      default: () => {
      },
      required: false
    },
    current_destination: {
      type: Object,
      default: () => {
      },
      required: false
    },
    showDeparture: {
      type: Boolean,
      default: true,
      required: false
    },
    showDestination: {
      type: Boolean,
      default: true,
      required: false
    },
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
        value: event === null ? null : event
      })
    },

    async searchStations(query) {
      if (query.length <= 2) return;
      let core_api = new CoreApi()
      let stations = (await core_api.getCoreList(query)).results
      return stations
    },
  },
  computed: {
    classes: {
      get() {
        return this.ratio
      }
    },
    errorDepColor: {
      get() {
        return this.departure.selected === null && this.current_departure ? 'text-danger' : ''
      }
    },
    errorDesColor: {
      get() {
        return this.destination.selected === null && this.current_destination ? 'text-danger' : ''
      }
    }
  },
  components: {
    Multiselect
  },
  mounted() {
    if (this.current_departure !== undefined) {
      this.departure.options = [{
        value: this.current_departure.id,
        label: this.current_departure.name,
        code: this.current_departure.code
      }] // set options
      this.departure.selected = this.departure.options[0] // set the selected option
    }
    if (this.current_destination !== undefined) {
      this.destination.options = [{
        value: this.current_destination.id,
        label: this.current_destination.name,
        code: this.current_destination.code
      }] // set options
      this.destination.selected = this.destination.options[0] // set the selected option
    }
  },
  watch: {
    current_departure: {
      handler(newValue) {
        if (newValue !== null) {
          this.departure.options = [{
            value: newValue.id,
            label: newValue.name,
            code: newValue.code
          }] // set options
          this.departure.selected = this.departure.options[0] // set the selected option
        } else {
          this.departure.selected = null
        }
      },
      deep: true
    },
    current_destination: {
      handler(newValue) {
        if (newValue !== null) {
          this.destination.options = [{
            value: newValue.id,
            label: newValue.name,
            code: newValue.code
          }] // set options
          this.destination.selected = this.destination.options[0] // set the selected option
        } else {
          this.destination.selected = null
        }
      },
      deep: true
    }
  }
}

</script>

<style scoped>

</style>