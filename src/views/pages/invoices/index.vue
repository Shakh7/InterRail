<template>
  <Table name="Invoice Lists" :url="table.url" :headers="table.headers" :getUpdate="table.getUpdate">
    <template v-slot:file="props">
      <span class="big_icon_on_hover link-info" @click="downloadInvoice(props.row.file)">
        {{ getFileName(props.row.file) }}
        <i class="bx bxs-download text-secondary fs-16 ms-1"></i>
      </span>
    </template>
    <template v-slot:total_cost="props">
      <span v-if="props.row.total_cost">
        ${{
          parseFloat(Math.round(parseFloat(props.row.total_cost) * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </span>
      <span v-else>-</span>
    </template>

    <template v-slot:paid_status="props">
      <span v-if="props.row.paid_status === 'paid'" class="badge bg-success">Paid</span>
      <span v-else-if="props.row.paid_status === 'unpaid'" class="badge bg-danger">Unpaid</span>
      <span v-else>-</span>
    </template>

    <template v-slot:actions="props">
      <b-button-group class="mt-4 mt-md-0" role="group" size="sm" aria-label="Basic example">
        <div class="dropdown">
          <b-button variant="light" data-bs-toggle="dropdown" class="px-2 py-1">
            <i class="ri-pencil-fill align-bottom ps-1"></i>
          </b-button>
          <div class="dropdown-menu dropdown-menu-end">

            <div v-if="props.row.paid_status === 'unpaid'"
                 class="dropdown-item cursor-pointer"
                 @click="changeInvoiceStatus(props.row, 'paid')"
            >
              <h6 class="my-0 py-0 d-inline align-middle">
                Change status to Paid
              </h6>
              <i class="bx bx-check-double text-success fs-20 align-middle ms-1"></i>
            </div>

            <div v-else-if="props.row.paid_status === 'paid'"
                 class="dropdown-item cursor-pointer"
                 @click="changeInvoiceStatus(props.row, 'unpaid')"
            >
              <i class="ri-file-paper-line me-2 my-0"></i>
              <h6 class="my-0 py-0 d-inline">
                Change status to Unpaid
              </h6>
            </div>

          </div>
        </div>
        <b-button @click="current_invoice_id = props.row.id" variant="light" href="#invoice_delete_modal"
                  data-bs-toggle="modal">
          <i class="ri-delete-bin-7-fill align-bottom text-danger"></i>
        </b-button>
      </b-button-group>
    </template>
  </Table>

  <InvoiceDeleteModal @deleted="table.getUpdate = !table.getUpdate" :invoiceId="current_invoice_id"/>
</template>

<script>
import Table from "@/components/custom/table2.vue";
import axios from "axios";
import Swal from "sweetalert2";

import InvoiceDeleteModal from './modals/invoice_delete.vue'

export default {
  name: "create",
  data() {
    return {
      order_number: this.$route.params.order_number,
      table: {
        url: '/invoice/list/',
        getUpdate: false,
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
            field: 'paid_status',
            label: 'STATUS',
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
          },
          {
            field: 'actions',
            label: 'ACTIONS',
            align: 'center'
          }
        ]
      },
      current_invoice_id: 0
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
    },

    async changeInvoiceStatus(invoice, invoiceNewStatus) {
      let res = await axios.post('/invoice/invoice_status/' + invoice.id + '/', {
        paid_status: invoiceNewStatus
      })
      if (res.status === 200) {
        this.table.getUpdate = !this.table.getUpdate
        await Swal.fire({
          title: 'Success',
          html: `Invoice status has been changed <br> from <span class="text-danger text-capitalize text-decoration-line-through">${invoice.paid_status}</span> to <span class="text-success text-capitalize fw-semibold">${invoiceNewStatus}</span>`,
          icon: 'success',
        })
      } else {
        await Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        })
      }
    }
  },
  components: {
    Table,
    InvoiceDeleteModal
  },
}
</script>

<style scoped>
.big_icon_on_hover {
  transition: 0.2s;
}

.big_icon_on_hover:hover {
  cursor: pointer;
}

.big_icon_on_hover:hover i {
  transform: scale(1.5);
  transition: 0.2s;
}
</style>