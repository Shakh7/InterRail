<template>
  <input v-if="ctr.container !== null"
         maxlength="11"
         class="form-control form-control-sm"
         :class="inputClass + ' ' + $route.query.container === undefined ? '' : searchedContainerColor()"
         type="text" placeholder="Container"
         v-model="ctr.container.name"
         v-on:keyup.enter="saveContainer(ctr.id, 'old')"
  >
  <input v-else-if="ctr.container === null"
         v-model="emptyName" maxlength="11"
         class="form-control form-control-sm" :class="inputClass"
         type="text" placeholder="Container"
         v-on:keyup.enter="saveContainer(ctr.id, 'empty')"
  >

  <div v-if="ctr.container !== null && ctr.code !== null" class="y position-relative">
    <span
      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"> {{ ctr.code }}
    </span>
  </div>

</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ContainerInput",
  data() {
    return {
      emptyName: '',
      inputClass: ''
    }
  },
  props: {
    container: {
      type: Object,
    },
    container_type_id: {
      type: Number,
    },
  },
  methods: {
    async saveContainer(id, type) {
      if (this.isInputValid('empty') && type === 'empty') {
        let data = await (await this.sendRequest(id, this.emptyName)).json()
        this.showResponseAlert(data)
      } else if (this.isInputValid('old') && type === 'old') {
        let data = await (await this.sendRequest(id, this.ctr.container.name)).json()
        this.showResponseAlert(data)
      }
    },
    async sendRequest(id, value) {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/expanse/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "container_name": value,
          "container_type_id": this.container_type_id
        })
      })
      return response
    },
    isInputValid(type) {
      if (type === 'empty') {
        return this.emptyName.length === 11 || this.emptyName.length === 0
      } else if (type === 'old') {
        return this.ctr.container.name.length === 11 || this.ctr.container.name.length === 0
      }
    },
    showResponseAlert(data) {
      if (data.error === undefined) {
        this.inputClass = 'border-success'
        this.showAlert('success', `Container name updated`)
      } else {
        this.inputClass = 'border-danger'
        this.showAlert('error', `${data.error}`)
      }
    },
    showAlert(icon, title, text, timer, position) {
      let iconOptions = ['success', 'error', 'warning', 'info', 'question']
      let positionOptions = ['top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end']

      const Toast = Swal.mixin({
        toast: true,
        position: positionOptions.includes(position) ? position : 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      this.$emit('update')

      text !== undefined
          ? Toast.fire({
            icon: iconOptions.includes(icon) ? icon : 'info',
            title: title,
            text: text,
          })
          : Toast.fire({
            icon: iconOptions.includes(icon) ? icon : 'info',
            title: title,
          })
    },

    searchedContainerColor() {
      if (this.$route.query.container !== undefined) {
        let query = this.$route.query.container.trim().toLowerCase()
        let container = this.ctr.container.name.trim().toLowerCase()
        if (container.includes(query)) {
          return 'border-success border-3'
        } else {
          return ''
        }
      }
    }
  },
  computed: {
    ctr: {
      get() {
        return this.container
      }
    }
  },
  // watch: {
  //   ctr: {
  //     handler(newValue) {
  //       let container = JSON.parse(JSON.stringify(newValue))
  //       if (container.container.name.length === 11) {
  //         this.saveContainer(container.id, 'old')
  //       }
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>

</style>