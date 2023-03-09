<template>
  <PageHeader :title="title" :items="items"/>

</template>

<script>
import PageHeader from "@/components/page-header.vue";

export default {
  name: "profile",
  components: {
    PageHeader
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
    }
  }
}
</script>

<style scoped>

</style>