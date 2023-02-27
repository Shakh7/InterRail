<script>
import TreeTable from '../../../components/custom/TreeTable.vue'
import PageHeader from "../../../components/page-header.vue";
export default {
  name: 'codes_list',
  data() {
    return {
      title: "Codes Statistics",
      items: [
        {
          text: "Codes",
        },
        {
          text: "Statistics",
          active: true,
        },
      ],
      treeUrl: '/code/list_year_month/'
    }
  },
  components: {
    TreeTable,
    PageHeader
  },
}
</script>

<template>
  <PageHeader :title="title" :items="items"/>
  <TreeTable :treeUrl="treeUrl"/>
</template>

<style>
</style>
