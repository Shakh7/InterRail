<template>
  <PageHeader title="General" :items="items" />
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-9 ps-0">
        <div class="card" id="contactList">
          <div class="card-header">
            <div class="row gy-3">
              <div class="col-md-4">
                <div class="search-box">
                  <input v-model="search" type="text" class="form-control search" placeholder="Search for stations...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-grid gap-2">
                  <b-button variant="soft-info" @click="createStation">Create</b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card">
                <table class="table table-nowrap mb-0 text-center">
                  <thead class="table-light">
                  <tr>
                    <th scope="col" style="width: 50px;">
                      №
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Railway name</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(station, index) in stations" :key="station.id"
                      @click="onRowClick(station)"
                      :class="station.id === preview.id ? 'text-success border-success': ''">
                    <th scope="row">
                      {{ currentPage.page * 25 - (25 - index) + 1 }}
                    </th>
                    <td style="white-space: pre-wrap;" class="text-start">
                      <span>
                        {{ station.name }}
                      </span>
                    </td>
                    <td>{{ station.code }}</td>
                    <td>{{ station.railway_name }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-3">

        <div class="btn-container w-100 p-0 m-0">
          <Transition name="slide-up">
            <div class="card p-0 m-0" v-if="preview.id > 0">
              <div class="card-body">
                <h6 class="text-muted text-uppercase fw-semibold mb-3">Stations Information</h6>
                <div class="d-md-flex bg-light mb-4">
                  <div class="p-3 mb-0 bg-light">
                    <h5><code>Name</code></h5>
                    <input v-model="preview.name" class="form-control w-100 fs-5 p-0 py-1 bg-transparent"
                           :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                           style="outline: none">
                  </div>
                </div>
                <div class="table-responsive table-card">
                  <table class="table table-borderless mb-0">
                    <tbody>
                    <tr>
                      <td class="fw-medium">CODE</td>
                      <td style="max-width: 100px">
                        <input v-model="preview.code"
                               class="form-control w-100 fs-6 text-end p-0 pe-2 bg-transparent"
                               :class="preview.isInEditMode ? 'border ps-2' : 'border-0'"
                               style="outline: none"
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">RAILWAY NAME</td>
                      <td class="text-end pe-3">
                        <span class="text-dark pe-2">{{ preview.railway_name }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-grid">
                          <b-button v-if="preview.isInEditMode" variant="info" class="w-100"
                                    @click="saveStation"
                                    :disabled="preview.name.trim().length === 0 || preview.code.trim().length === 0">
                            Save
                          </b-button>
                          <b-button v-else-if="!preview.isInEditMode" variant="soft-info"
                                    class="w-100"
                                    @click="preview.isInEditMode = true">
                            Edit
                          </b-button>
                        </div>
                      </td>
                      <td>
                        <div class="d-grid">
                          <b-button variant="soft-danger" class="w-100"
                                    @click="deleteStationConfirmation(preview)">Delete
                          </b-button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card p-0 m-0" v-else-if="preview.id === 0">
              <div class="card-body p-4 text-center">
                <div class="mx-auto avatar-lg mb-3">
                  <img src="https://cdn4.iconfinder.com/data/icons/Web_icons/PNG/512/explorer.png"
                       class="img-fluid">
                </div>
                <h5 class="card-title mb-1">Please, select a station to view</h5>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoreApi from "@/api/core/core_api.js";
import Swal from "sweetalert2";
import PageHeader from "../../../../components/page-header.vue";

export default {
  name: "StationsList",
  data() {
    return {
      currentPage: {
        per_page: 25,
        page: 1,
        all: 0,
      },
      stations: [],
      preview: {
        id: 0,
        name: "",
        code: "",
        railway_name: "",
        isInEditMode: false,
      },
      search: '',
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Stations List",
          active: true,
        },
      ]
    }
  },
  methods: {
    async setPage(page) {
      let page_case = Number.isInteger(Number(page))
          ? page < 1 ? 0 : page
          : page === undefined ? "default_page" : "NaN";

      switch (page_case) {
        case 0:
          await this.$router.push({path: "/stations", query: {page: 1}});
          this.currentPage.page = 1
          await this.getStations(this.currentPage.per_page, 0);
          break
        case 'default_page':
          this.currentPage.page = 1
          await this.getStations(this.currentPage.per_page, 0)
          break
        case 'NaN':
          alert("NOT A NUMBER")
          break
        default:
          this.currentPage.page = page
          await this.getStations(this.currentPage.per_page, (this.currentPage.page - 1) * this.currentPage.per_page)
          break
      }
    },
    async changePage(previous, next) {
      let page = parseInt(this.currentPage.page)
      if (previous) {
        await this.$router.push({path: "/stations", query: {page: page - 1}});
      } else if (next) {
        await this.$router.push({path: "/stations", query: {page: page + 1}});
      } else {
        await this.$router.push({path: "/stations", query: {page: 1}});
      }
    },
    async getStations(limit, offset) {
      let stationsApi = new CoreApi()
      let response = await stationsApi.getStations(limit, offset)
      this.currentPage.all = response.results.count
      this.stations = response.results
    },
    onRowClick(station) {
      if (this.preview.id === station.id) {
        this.preview = {
          id: 0,
          name: "",
          code: "",
          railway_name: "",
        }
      } else {
        this.preview.id = station.id
        this.preview.name = station.name
        this.preview.code = station.code
        this.preview.railway_name = station.railway_name
      }
    },

    async saveStation() {
      if (this.preview.name.trim().length === 0 || this.preview.code.trim().length === 0) return alert('Please, fill all fields')
      this.preview.isInEditMode = false
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/stations/${this.preview.id}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.preview.name,
          code: this.preview.code,
        })
      })

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      let error = (await response.json())['non_field_errors']

      await Toast.fire({
        icon: error === undefined ? 'success' : 'error',
        title: error === undefined ? 'Station updated successfully' : error[0]
      })
    },
    async createStation() {
      const {value: formValues} = await Swal.fire({
        title: 'Create a Counterparty',
        html:
            '<input id="create_station_name" class="form-control w-75 m-auto mt-2" placeholder="Station name">' +
            '<input id="create_station_code" class="form-control w-75 m-auto mt-2" placeholder="Station code">',
        focusConfirm: false,
        confirmButtonText: 'Create',
        confirmButtonColor: '#0AB39C',
        preConfirm: () => {
          return [
            document.getElementById('create_station_name').value,
            document.getElementById('create_station_code').value,
          ]
        }
      })

      if (formValues) {

        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/stations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": formValues[0],
            "code": formValues[1],
          }),
        });

        let error = (await response.json())['non_field_errors']

        await this.getStations()
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        await Toast.fire({
          icon: error === undefined ? 'success' : 'error',
          title: error === undefined ? 'Station created successfully' : error[0]
        })
      }
    },
    searchStations(query) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/core/stations/?limit=25&search=${query}`)
          .then(response => response.json()).then(data => {
        this.stations = data.results
      })
    },
    async deleteStationConfirmation(station) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete ${(station.name).toString()}`,
        text: 'Deleting this station will remove all of its information from our database',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type ${(station.name).toString()} to confirm`,
        input: 'email',
        inputPlaceholder: `${(station.name).toString()}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === (station.name).toString()) {
              resolve(this.deleteStation(station.id))
            } else {
              resolve('Counterparty name did not match :)')
            }
          })
        }
      });
    },
    deleteStation(id) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/core/stations/${id}/`, {method: 'DELETE'})
          .then(response => {
            this.getStations()
            this.preview = {
              id: 0,
              name: "",
              code: "",
              railway_name: "",
            }
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: response.ok ? 'success' : 'error',
              title: response.ok ? 'Station deleted successfully' : 'Station delete failed'
            })
          })
    }
  },
  async mounted() {
    await this.setPage(this.$route.query.page)
  },
  watch: {
    '$route.query.page': async function (page) {
      await this.setPage(page)
    },
    search: async function (newVal) {
      await this.searchStations(newVal)
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style scoped>
.btn-container {
  display: inline-block;
  position: relative;
}

.btn-container .card {
  position: absolute;
  width: 100%;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>