<template>
  <PageHeader title="General" :items="items"/>
  <Table name="Shippers List" :headers="table.headers" :url="table.url" :perPage="20" :selectable="true" :getUpdate="table.getUpdate">
    <template #top-right>
      <b-button variant="success" data-bs-target="#shipperCreateModal" data-bs-toggle="modal">
        Create shipper
      </b-button>
    </template>
    <template v-slot:actions="props">
      <font-awesome-icon @click="current_shipper = props.row"
                         data-bs-target="#shipperUpdateModal" data-bs-toggle="modal"
                         icon="fa-solid fa-pen-to-square"
                         class="c_icon mx-2 c_icon_hoverable"/>

      <font-awesome-icon @click="current_shipper = props.row"
                         data-bs-target="#shipperDeleteModal" data-bs-toggle="modal"
                         icon="fa-solid fa-trash" class="c_icon c_icon_hoverable text-danger"/>
    </template>
  </Table>

  <CreateModal :shipper="current_shipper" @created="table.getUpdate = !table.getUpdate"/>
  <UpdateModal :shipper="current_shipper" @updated="table.getUpdate = !table.getUpdate"/>
  <DeleteModal :shipper="current_shipper" @deleted="table.getUpdate = !table.getUpdate"/>
</template>

<script>
import PageHeader from "@/components/page-header.vue";
import Table from "@/components/custom/table2.vue";
import CreateModal from "./CreateModal.vue";
import UpdateModal from "./UpdateModal.vue";
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "shipper_index",
  data() {
    return {
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Consignees List",
          active: true,
        },
      ],
      table: {
        getUpdate: false, // if changes, table will get an update
        url: '/core/shippers/',
        headers: [
          {
            label: 'ID',
            field: 'id',
            align: 'center',
          },
          {
            label: 'NAME',
            field: 'name',
            align: 'center',
          },
          {
            label: 'ACTIONS',
            field: 'actions',
            align: 'center',
          },
        ]
      },
      current_shipper: {},
    }
  },
  components: {
    PageHeader,
    Table,
    CreateModal,
    UpdateModal,
    DeleteModal
  }
}
</script>

<style scoped>

</style>