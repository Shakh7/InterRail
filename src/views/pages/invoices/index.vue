<template>
  <Table name="Invoice Lists" :url="table.url" :headers="table.headers">
    <template v-slot:file="props">
      <span class="big_icon_on_hover" @click="downloadInvoice(props.row.file)">
        {{ getFileName(props.row.file) }}
        <i class="bx bxs-download text-secondary fs-16 ms-1"></i>
      </span>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/custom/table2.vue";

export default {
  name: "create",
  data() {
    return {
      order_number: this.$route.params.order_number,
      table: {
        url: '/invoice/list/',
        headers: [
          {
            field: 'id',
            label: 'ID',
            align: 'center',
            visible: false
          },
          {
            field: 'order_number',
            label: 'ORDER NUMBER',
            align: 'center'
          },
          {
            field: 'customer',
            label: 'CUSTOMER',
            align: 'center'
          },
          {
            field: 'file',
            label: 'FILE',
            align: 'center'
          },
          {
            field: 'date',
            label: 'DATE',
            align: 'center'
          },
          {
            field: 'total_cost',
            label: 'TOTAL COST',
            align: 'center'
          }
        ]
      }
    }
  },
  methods: {
    getFileName(file) {
      return file.split('/').pop()
    },
    downloadInvoice(file) {
      fetch(file)
          .then(resp => resp.blob())
          .then(blobobject => {
            const blob = window.URL.createObjectURL(blobobject);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blob;
            anchor.download = file.toString().split('/')[file.toString().split('/').length - 1];
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(blob);
          })
          .catch(() => alert('An error in downloading the file sorry'));
    }
  },
  components: {
    Table
  },
}
</script>

<style scoped>
.big_icon_on_hover {
  transition: 0.2s;
}

.big_icon_on_hover:hover {
  cursor: pointer;
  color: #0d6efd;
}

.big_icon_on_hover:hover i {
  transform: scale(1.5);
  transition: 0.2s;
}
</style>