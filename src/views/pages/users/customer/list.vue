<template>
  <PageHeader :title="title" :items="items"/>
  <Table
      name="Customers List"
      :headers="table.header"
      url="/customer/companies/"
  >
    <template v-slot:name="props">
      <span>
        <router-link :to="{name: 'customer_profile', params: {company_name: props.row.slug}}">
          {{ props.row.name }}
        </router-link>
      </span>
    </template>

    <template v-slot:actions="props">
      <div class="w-100 text-center" :id="props.row.id">
        <font-awesome-icon
            icon="fa-solid fa-pen-to-square"
            class="c_icon me-1 c_icon_hoverable text-dark"
        />

        <font-awesome-icon icon="fa-solid fa-trash"
                           class="c_icon c_icon_hoverable text-danger"
        />
      </div>
    </template>
  </Table>
</template>

<script>
import PageHeader from "@/components/page-header.vue";
import Table from "@/components/custom/table2.vue";

export default {
  name: "customers_list",
  components: {
    PageHeader,
    Table
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
      }
    }
  }
}
</script>

<style scoped>

</style>