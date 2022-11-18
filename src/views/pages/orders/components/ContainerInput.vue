<template>
  <input v-if="ctr.container !== null"
         maxlength="11" :class="inputClass"
         class="form-control form-control-sm"
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
      let response = await fetch(`http://178.62.91.121:5000/container_order/expanse/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "container_name": value
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