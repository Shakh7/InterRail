<template>
  <PageHeader :title="title" :items="items"/>
  <Table
      name="Customers List"
      :headers="table.header"
      url="/customer/companies/"
      :getUpdate="table.getUpdate"
  >
    <template v-slot:name="props">
      <span>
        <router-link :to="{name: 'customer_profile', params: {company_name: props.row.slug}}">
          {{ props.row.name }}
        </router-link>
      </span>
    </template>

    <template #top-right>
      <a class="btn btn-success" href="#CreateCustomerModal" data-bs-toggle="modal"><i
          class="ri-add-line align-bottom me-1"></i>
        Create Customer</a>
    </template>
    <template v-slot:actions="props">
      <div class="w-100 text-center" :id="props.row.id">
        <font-awesome-icon
            icon="fa-solid fa-pen-to-square"
            class="c_icon me-1 c_icon_hoverable text-dark"
        />

        <font-awesome-icon
            @click="current_company = props.row" href="#company_delete_modal" data-bs-toggle="modal"
            icon="fa-solid fa-trash"
            class="c_icon c_icon_hoverable text-danger"
        />
      </div>
    </template>
  </Table>

  <CreateCustomerModal @customer-created="table.getUpdate = !table.getUpdate"/>
  <DeleteCustomerModal @deleted="table.getUpdate = !table.getUpdate" :company="current_company"/>
</template>

<script>
import PageHeader from "@/components/page-header.vue";
import Table from "@/components/custom/table2.vue";


import CreateCustomerModal from './modals/customer_create.vue'
import DeleteCustomerModal from './modals/customer_delete.vue'

export default {
  name: "customers_list",
  components: {
    PageHeader,
    Table,
    CreateCustomerModal,
    DeleteCustomerModal
  },
  data() {
    return {
      title: "Users Management",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Customers",
          active: true,
        },
      ],
      table: {
        getUpdate: false,
        header: [
          {
            label: "Name",
            field: "name",
            align: "center",
          },
          {
            label: "Email",
            field: "email",
            align: "center",
          },
          {
            label: "Phone",
            field: "phone",
            align: "center",
          },
          {
            label: "Address",
            field: "address",
            align: "center",
          },
          {
            label: "Actions",
            field: "actions",
            align: "center",
          },
        ],
      },

      current_company: {},
    }
  }
}
</script>

<style scoped>

</style>