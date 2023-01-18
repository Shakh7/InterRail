<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-responsive-bs5';

DataTable.use(DataTablesLib);

// const columns = [
//   {data: 'name'},
//   {data: 'position'},
// ];
const data = [
  [1, 2],
  [3, 4],
];
</script>

<template>
  <div class="card card-body">
    <DataTable
        :data="data"
        class="table table-hover table-striped display"
        width="100%"
    >
      <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>
