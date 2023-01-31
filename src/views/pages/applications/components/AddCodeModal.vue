<template>

  <b-button variant="success" class="visually-hidden" data-bs-toggle="modal"
            data-bs-target="#addCodeModal" id="addCodem"> Add code
  </b-button>

  <div id="addCodeModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">

        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Add codes to order:
            <span class="badge badge-gradient-info"> {{ application.number }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="p-4">
          <div class="row g-3 mb-3" v-for="(li, index) in list" :key="li">
            <div class="col-12 py-0 text-start" v-if="index === 1">

              <div>
                <span class="text-warning"><i class="ri-alert-fill fs-5 my-0 me-2"></i></span>
                <span class="text-muted">All the codes below will be considered as sub codes of the code above.</span>
              </div>
              <!--              <div style="max-width: 150px">-->
              <!--                <VTooltip>-->
              <!--                  <h6 class="my-0">Sub codes: <i class="ri-question-fill my-0"></i></h6>-->
              <!--                  <template #popper>-->
              <!--                    All the codes below will be considered as sub codes of the code above.-->
              <!--                  </template>-->
              <!--                </VTooltip>-->
              <!--              </div>-->

            </div>
            <div class="col-2">
              <label for="prefixInput" class="form-label">Prefix</label>
              <input v-model="li.prefix" type="text" class="form-control" id="prefixInput" placeholder="Prefix">
            </div>
            <div class="col-3">
              <label for="startInput" class="form-label">Start</label>
              <span class="text-danger ms-1">*</span>
              <input v-model="li.start" type="text" class="form-control" id="startInput" placeholder="Start">
            </div>
            <div class="col-3">
              <label for="endInput" class="form-label">End</label>
              <span class="text-danger ms-1">*</span>

              <div @dblclick="li.manualEnd = false">
                <input v-if="li.manualEnd" v-model="li.end" type="text" class="form-control"
                       id="endInput"
                       :placeholder="li.start ? parseInt(li.start) + application.quantity - 1 : 'Manual end'"
                       :class="getClassName(index)">
              </div>

              <div @dblclick="li.manualEnd = true">
                <input v-if="!li.manualEnd" type="text" class="form-control"
                       id="endInput"
                       :value="li.start ? parseInt(li.start) + application.quantity - 1: ''"
                       placeholder="Double click to enter manually"
                       :class="getClassName(index)" disabled>
              </div>

            </div>
            <div class="col-md-3">
              <label for="territory" class="form-label">Territory</label>
              <span class="text-danger ms-1">*</span>
              <Multiselect v-model="li.territory" :close-on-select="true" :searchable="true"
                           :options="territories"
                           required
                           :placeholder="territories.length ? 'Select territory' : 'No territories available'"
              ></Multiselect>
            </div>
            <div class="col-1 text-center">
              <label for="endInput" class="form-label d-block">Delete</label>
              <b-button @click="removeList(index)" variant="danger">
                <font-awesome-icon icon="fa-solid fa-trash" class="c_icon fs-6"/>
              </b-button>
            </div>
          </div>

          <div class="row justify-content-start mt-4 pb-3 border-bottom mb-3">
            <div class="col">
              <div class="input-step step-primary">
                <button type="button" class="plus" @click="addList()">+</button>
                <input
                    type="number"
                    class="product-quantity"
                    v-model="quantity"
                    min="0"
                    readonly
                />
              </div>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-4">
              <label for="rateInput" class="form-label">Rate</label>
              <input v-model="agreed_rate" type="number" class="form-control" id="rateInput" placeholder="Rate">
            </div>
            <div class="col-4">
              <label for="addChargeInput" class="form-label">Add charge</label>
              <input v-model="add_charge" type="number" class="form-control" id="addChargeInput"
                     placeholder="Add charge">
            </div>
            <div class="col-4">
              <label for="chargesInput" class="form-label">Charges</label>
              <input v-model="charges" type="number" class="form-control" id="chargesInput" placeholder="Charges">
            </div>
          </div>

          <div class="w-100 text-center">
            <button v-if="formValid" @click="addCode()" class="btn btn-success w-100">+ Add</button>
            <button v-else class="btn btn-success w-100" disabled>+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  emits: ['update'],
  name: "AddCodeModal",
  data() {
    return {
      modalShow: false,
      quantity: 1,
      agreed_rate: '',
      add_charge: '',
      charges: '',
      customer: null,
      list: [
        {
          prefix: '',
          start: '',
          end: '',
          territory: '',
          manualEnd: false,
        }
      ],
      territories: []
    }
  },
  props: {
    application: {
      type: Object,
      default: () => {
      }
    }
  },
  components: {
    Multiselect
  },
  methods: {
    addList() {
      this.list.push({
        prefix: '',
        start: '',
        end: '',
        territory: '',
        manualEnd: false,
      })
      this.quantity++
    },

    removeList(index) {
      if (index === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning...',
          text: 'You cannot delete the main code!',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        this.list.splice(index, 1)
        this.quantity--
      }
    },

    getClassName(index) {
      if (this.list[index].start && this.list[index].end) {
        if ((parseInt(this.list[index].end) - parseInt(this.list[index].start) + 1 > this.application.quantity) && this.list[index].manualEnd) {
          return 'form-control border-danger'
        } else {
          if (parseInt(this.list[index].end) < parseInt(this.list[index].start)) {
            return 'form-control border-danger'
          }
        }
      } else {
        return 'form-control'
      }
    },

    async getTerritories() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/territories/`)
      let response = await request.json()
      this.territories = response['results'].map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },

    async addCode() {
      let form = {
        main_code: this.list.slice(0, 1).map(i => {
          return {
            prefix: i.prefix,
            start_code: parseInt(i.start),
            end_code: i.manualEnd ? i.end : parseInt(i.start) + this.application.quantity - 1,
            territory_id: i.territory
          }
        })[0],
        sub_codes: this.list.slice(1, this.list.length).map(i => {
          return {
            prefix: i.prefix,
            start_code: parseInt(i.start),
            end_code: i.manualEnd ? i.end : parseInt(i.start) + this.application.quantity - 1,
            territory_id: i.territory
          }
        }),
        rate: this.agreed_rate,
        charges: this.charges,
        add_charges: this.add_charge
      }

      // if (this.formIsValid(form)) {
      //   await Swal.fire({
      //     title: "Are you sure?",
      //     text: "You won't be able to revert this!",
      //     icon: "warning",
      //     showCancelButton: true,
      //   }).then(async (result) => {
      //     if (result.isConfirmed) {
      //       alert("Yess")
      //     }
      //   });
      // } else {
      //   await Swal.fire({
      //     title: "Invalid form",
      //     html: "<div class='text-start '>" +
      //         "<span class='fw-medium'>Potential causes : </span>" +
      //         "<br> - You have not selected a territory " +
      //         "<br> - You have duplicate territories " +
      //         "<br> - You have not entered a start code " +
      //         "<br> - The end code is greater than the start code + quantity </div>",
      //     showCancelButton: false,
      //     showConfirmButton: false,
      //     icon: "warning",
      //   })
      // }


      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/create_range/${this.application.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (request.ok) {

        this.$emit('update')

        this.resetForm()

        await Swal.fire({
          title: "Success",
          text: "Code added successfully",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        await Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000
        })
      }


    },

    resetForm() {
      this.list = [
        {
          prefix: '',
          start: '',
          end: '',
          territory: '',
          manualEnd: false,
          territoryList: []
        }
      ]

      this.add_charge = ''
      this.charges = ''
      this.agreed_rate = ''
      this.quantity = 1

      let btn = document.createElement('button')
      btn.setAttribute('data-bs-toggle', 'modal')
      btn.setAttribute('data-bs-target', '#addCodeModal')

      document.body.appendChild(btn)
      btn.click()
    }
  },
  computed: {
    formValid: {
      get() {
        let errors = 0
        this.list.forEach(item => {
          if (item.territory === '') {
            errors++
          }
          if (item.start === '') {
            errors++
          }
          if (item.manualEnd) {
            if (item.end === '') {
              errors++
            }
            if (parseInt(item.end) < parseInt(item.start)) {
              errors++
            }
            if (parseInt(item.end) - parseInt(item.start) + 1 > this.application.quantity) {
              errors++
            }
          }
        })
        if (this.agreed_rate === '') {
          errors++
        }
        let dublicateTerritories = new Set(this.list.map(i => i.territory))
        if (dublicateTerritories.size !== this.list.length) {
          errors++
        }
        return errors === 0
      }
    }
  },
  async mounted() {
    await this.getTerritories()
  }
}
</script>

<style scoped>

</style>