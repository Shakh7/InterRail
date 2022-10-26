<script>
import CustomTable from '../../../components/custom/table.vue'

export default {
  name: "ratesIndex",
  data() {
    return {
      headers: [
        {
          label: 'CONTRACTOR',
          field: 'contractor',
          align: 'center',
          searchable: true,
        },
        {
          label: 'LOADING TYPE',
          field: 'loading_type',
          align: 'center',
          searchable: true,
        },
        {
          label: 'WEIGHT TYPE',
          field: 'weight_type',
          align: 'center',
          searchable: true,
        },
        {
          label: 'CONDITION',
          field: 'condition',
          align: 'center',
          searchable: true,
        },
        {
          label: 'FROM',
          field: 'from',
          align: 'center',
          searchable: true,
        },
        {
          label: 'TO',
          field: 'too',
          align: 'center',
          searchable: true,
        },
        {
          label: 'RATE',
          field: 'rate',
          align: 'center',
          searchable: true,
        },
        {
          label: 'ADD CHARGES',
          field: 'add_charges',
          align: 'center',
          searchable: true,
        },
        {
          label: 'VALIDATION DATE',
          field: 'validation_date',
          align: 'center',
          searchable: true,
        },
        {
          label: 'MANAGER',
          field: 'manager',
          align: 'center',
          searchable: true,
        },
      ],
      rows: [
        {
          contractor: 'TRANSCONTAINER',
          loading_type: 'Container',
          weight_type: '40HC',
          condition: 'FOR-FOR',
          from: 'Poti',
          too: 'Tashkent',
          rate: '4600',
          add_charges: '150',
          validation_date: '11.09.2022',
          manager: 'Sanjar Rakhimov',
        },
        {
          contractor: 'FESCO',
          loading_type: 'Container',
          weight_type: '20HC',
          condition: 'FOR-FOR',
          from: 'Poti',
          too: 'Tashkent',
          rate: '3000',
          add_charges: '200',
          validation_date: '25.11.2022',
          manager: 'Nosir Mansurov',
        },
      ],
    }
  },
  components: {
    CustomTable
  },
}
</script>

<template>
  <CustomTable
      :headers="headers"
      :rows="rows"
      name="Rates list"
      :searchable="true"
  >

    <template v-slot:contractor="slotProps">
      <span class="badge bg-soft-secondary fs-6 text-secondary">{{ slotProps.row.contractor }}</span>
    </template>


    <template v-slot:validation_date="slotProps">
      <span :class="slotProps.row.validation_date === '11.09.2022' ? 'bg-danger' : 'bg-success'"
            class="badge fs-6">
        {{ slotProps.row.validation_date }}
      </span>
    </template>

    <template v-slot:rate="slotProps">
      <span class="badge fs-6 text-success">{{ slotProps.row.rate }}</span>
    </template>

    <template v-slot:add_charges="slotProps">
      <span class="badge bg-soft-secondary fs-6 text-secondary">{{ slotProps.row.add_charges }}</span>
    </template>

    <template v-slot:manager="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ slotProps.row.manager[0] }}
        </span>
        <span>
          {{ slotProps.row.manager }}
        </span>
      </div>
    </template>

  </CustomTable>
</template>

<style scoped>

</style>