<template>

  <PageHeader :items="items" title="Application"></PageHeader>

  <div class="row justify-content-center mt-5" v-if="!allow_create">
    <div class="col-md-4">
      <!-- Warning Alert -->
      <div class="card card-body text-center mt-5 py-5 px-4">
        <div class="avatar-sm mx-auto mb-3">
          <div
              class="avatar-title bg-soft-danger text-danger fs-17 rounded"
          >
            <i class="ri-spam-line fs-3"></i>
          </div>
        </div>
        <h4 class="card-title">Application create is not allowed</h4>
        <p
            class="card-text text-muted"
        >We have found more than three applications with no codes attached. Please, fill these applications and come
          back again</p>
        <router-link :to="{name: 'applications_list'}" class="btn btn-success">Go applications</router-link>
      </div>
    </div>
  </div>


  <div v-else class="row justify-content-around m-auto" style="max-width: 1400px">
    <div class="col-8">
      <div class="card card-body">
        <section class="row justify-content-between align-items-start mt-0">
          <div class="col-6">
            <h6 class="text-dark fw-medium">
              Representative Office in Tashkent <br>
              InterRail Services AG
            </h6>
            <span>
          2 Rakatboshi street <br>
          Yakkasaroy district <br>
          100031 Tashkent, Uzbekistan <br>
          Tel/Fax: +998 71 2525600 <br>
          Website: <span class="fw-medium link-primary"> www.interrail.a </span>
        </span>
          </div>
          <div class="col-6 text-end" style="height: 100%">
            <b-img src="https://system.interrail.uz/img/interrail-logo.268299c8.png" class="img-fluid"
                   alt="Responsive image"></b-img>
          </div>
          <div class="col-12 my-3 mb-0">
            <div class="d-flex flex-row justify-content-between align-items-end">
              <div>

                <div class="position-relative">
                  <input v-model="form.date" type="date" placeholder="date" class="form-control form-control">
                </div>

              </div>
              <div style="min-width: 220px">
                <Multiselect
                    class="form-control"
                    v-model="forwarders.selected"
                    :searchable="true"
                    :hideSelected="true"
                    :options="forwarders.options"
                    placeholder="Forwarder"
                    :object="true"
                    @input="$event ? form.forwarder_id = $event.value : form.forwarder_id = null"
                />
              </div>
            </div>
          </div>
          <div class="col-12 my-3">
            <div class="text-dark fw-light text-center">
              <span class="fs-5"> “InterRail Services AG” просит Вас предоставить <span class="fw-bold">коды</span> на следующую перевозку: </span>
            </div>
          </div>
        </section>

        <section class="table-responsive">
          <table class="table table-bordered border-dark border-2">
            <tbody>
            <tr>
              <td class="w-50 py-1 fw-bolder">Период перевозки</td>
              <td class="w-50 py-1 ps-0">
                <Multiselect class="border-0" v-model="form.period" :options="['Январь', 'февраль', 'Март','Апрель','Май',
                'Июнь','Июнь','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']"
                             style="min-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид отправки</td>
              <td class="w-50 py-1 ps-0">
                <Multiselect class="border-0" v-model="form.sending_type" :options="sending_types"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Тип погрузки</td>
              <td class="w-50 py-1 ps-0">
                <Multiselect class="border-0" v-model="form.loading_type" :options="loading_types"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Станция отправления</td>
              <td class="w-50 py-1">
                <div v-if="form.departure_id">
                  <h6 class="text-dark my-0">{{ form.departure_id.name }} ({{ form.departure_id.code }})</h6>
                </div>
                <span v-else>--</span>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Станция назначения</td>
              <td class="w-50 py-1">
                <div v-if="form.destination_id">
                  <h6 class="text-dark my-0">{{ form.destination_id.name }} ({{ form.destination_id.code }})</h6>
                </div>
                <span v-else>--</span>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Грузоотправитель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.shipper">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Получатель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.consignee">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна отправления</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.departure_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна назначения</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.destination_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Наименование груза, Коды ГНГ и ЕТСНГ</td>
              <td class="w-50 py-1">
                <div class="text-dark" v-if="form.product_id">
                  <h6>{{ form.product_id.name }}</h6>
                  <h6>ГНГ - {{ form.product_id.hc_code }}</h6>
                  <h6 class="my-0">ЕТСНГ - {{ form.product_id.etcng_code }}</h6>
                </div>
                <span v-else>--</span>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Количество
              </td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" type="number" v-model="form.quantity">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид вагона/принадлежность подвижного <br>
                состава/принадлежность контейнера
              </td>
              <td class="w-50 py-1">
                <div class="row justify-content-between align-items-center w-100 m-auto px-0">
                  <div class="col-xl-6 pe-1 ps-0 py-0">
                    <Multiselect class="border-0" v-model="form.rolling_stock_1" :options="['A', 'B']"
                                 style="max-height: 28px;"/>
                  </div>
                  <div class="col-xl-6 ps-1 pe-0 py-0">
                    <Multiselect class="border-0" v-model="form.rolling_stock_2" :options="['A', 'B']"
                                 style="max-height: 28px"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="form.loading_type === 'container'">
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">
                <Multiselect class="border-0" v-model="form.container_type" :options="['20', '40']"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr v-else>
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" type="number" v-model="form.weight">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Номера вагонов/контейнеров</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.containers_or_wagons">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Запрашиваемые территории</td>
              <td class="w-50 py-1">
                <Multiselect
                    class="form-control border-0"
                    v-model="territories.selected"
                    mode="multiple"
                    :hideSelected="false"
                    :closeOnSelect="false"
                    :options="territories.options"
                    placeholder="Territories"
                    :object="true"
                    label="label"
                    @input="form.territories = $event.map(territory => {
                          return { id: territory.value, name: territory.label}
                        })"
                    style="max-height: 28px"
                />
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Условия перевозки</td>
              <td class="w-50 py-1"></td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Пограничные переходы</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.border_crossing">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="form.paid_telegram">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="number" v-model="form.agreed_rate">
              </td>
            </tr>
            </tbody>
          </table>
        </section>

        <section class="row justify-content-center">
          <div class="col-11 my-3 px-0 mb-4">
            <div class="text-dark fw-light">
              <span class="fs-5"> В случае отсутствия кодов, просим Вас предоставить <span class="fw-bold">коды</span> на следующую перевозку: </span>
            </div>
          </div>
          <div class="col-11 px-0 mb-5">
            <div class="d-flex flex-row justify-content-between align-items-end">
              <div>
                <span class="fs-5">С уважением,</span>
                <h5 class="text-dark fw-bolder my-0">Глава представительства</h5>
              </div>
              <div>
                <h5 class="text-dark fw-bolder my-0">Сулейманов Д.А.</h5>
              </div>
            </div>
          </div>

          <div class="col-11 px-0 mt-5">
            <div class="d-flex flex-row justify-content-between align-items-end">
              <div>
                <h6 class="lh-base" style="font-size: 10px">
                  Wir arbeiten ausschliesslich <br>
                  aufgrund unserer Transport- <br>
                  übernahmebedingungen.
                </h6>
              </div>
              <div>
                <h6 class="lh-base" style="font-size: 10px">
                  Credit Suisse <br>
                  CH-9001 St. Gallen <br>
                  SWIFT: CHRESCHZZ90A
                </h6>
              </div>

              <div>
                <h6 class="lh-base" style="font-size: 10px">
                  USD CH05 0483 5044 2540 8200 0 <br>
                  CHF CH39 0483 5044 2540 8100 0 <br>
                  EUR CH75 0483 5044 2540 8200 1
                </h6>
              </div>

              <div>
                <h6 class="lh-base" style="font-size: 10px">
                  Tel.: +41 71 227 15 40 <br>
                  Fax: +41 71 227 15 30 <br>
                  E-Mail: info@interrail.ag
                </h6>
              </div>

              <div>
                <h6 class="lh-base" style="font-size: 10px">
                  Website <br>
                  www.interrail.ag
                </h6>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
    <div class="col-3">

      <div class="row bg-white rounded-2 mb-3 py-2 pb-3">
        <div class="col-12">
          <label>Customer</label>
          <span class="text-danger ms-1">*</span>
          <Multiselect
              class="form-control"
              :searchable="true"
              :hideSelected="true"
              :options="clients"
              placeholder="Client"
              :object="true"
              @input="$event ? form.customer = $event.value : form.customer = null"
          />
        </div>
      </div>

      <div class="row bg-white rounded-2 pt-2">
        <SelectStations
            :ratio="[12,12,12,12]"
            @onSelect="onStationSelect($event)"
        />
      </div>

      <div class="row bg-white rounded-2 pt-2 mt-3">
        <SelectProduct
            :ratio="[12,12,12]"
            @onSelect="$event ? form.product_id = {id: $event.value, name: $event.label, hc_code: $event.hc_code, etcng_code: $event.etcng} : form.product_id = null"
        />
      </div>

      <div class="row mt-3">
        <div class="col-12 px-0">
          <b-button @click="createApplication()" class="btn-success waves-effect waves-light w-100">Create</b-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import OrdersApi from "../../../api/orders/orders_api.js";
import SelectStations from "../../../components/custom/SelectStations.vue";
import SelectProduct from "../../../components/custom/SelectProduct.vue";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import PageHeader from "../../../components/page-header.vue";
import store from "../../../state/store.js";

export default {
  name: "update",
  data() {
    return {
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Applications update",
          active: true,
        },
      ],
      loading_types: [
        {value: 'container', label: 'Container'},
        {value: 'wagon', label: 'Wagon'},
        {value: 'wagon_empty', label: 'Wagon(empty)'},
      ],
      sending_types: [
        {value: 'single', label: 'Одиночная'},
        {value: 'block_train', label: 'КП'}
      ],
      application: null,
      isLoading: false,
      forwarders: {
        selected: null,
        options: []
      },
      departure: {
        selected: null,
        options: []
      },
      territories: {
        selected: null,
        options: []
      },
      allow_create: true,
      form: {
        quantity: null,
        prefix: '',
        date: '',
        period: '',
        sending_type: '',
        shipper: '',
        consignee: '',
        condition_of_carriage: '',
        agreed_rate: '',
        border_crossing: '',
        departure_country: '',
        destination_country: '',
        rolling_stock_1: "string",
        rolling_stock_2: '',
        paid_telegram: '',
        departure_id: 0,
        destination_id: 0,
        containers_or_wagons: '',
        product_id: 0,
        loading_type: '',
        container_type: '',
        weight: '',
        territories: [],
        forwarder_id: 0,
        manager: store.state.user.id,
        customer: 0
      }
    }
  },
  methods: {

    async checkCreatePermission() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/check_create_permission/`)
      let response = await request.json()
      this.allow_create = response['access']
    },

    async getCounterpartyList() {
      let orders = new OrdersApi()
      let response = await orders.getCounterpartyList()
      this.forwarders.options = response.results.map(item => {
        return {
          value: item.id,
          label: item.name,
          is_used_for_code: item.is_used_for_code,
          prefix: item.name.split(' ').map(([v]) => v).join('').toUpperCase() + item.id.toString()[0] + '_'
        }
      })
    },

    async getTerritory() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/territories/`)
      let response = await request.json()
      this.territories.options = response.results.map(t => {
        return {
          value: t.id,
          label: t.name
        }
      })
    },

    onStationSelect(event) {
      if (event.option === 'departure') {
        if (event.value === null) return this.form.departure_id = null
        this.form.departure_id = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      } else {
        if (event.value === null) return this.form.destination_id = null
        this.form.destination_id = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      }
    },

    async createApplication() {
      let data = {
        ...this.form
      }
      data.departure_id = data.departure_id.id
      data.destination_id = data.destination_id.id
      data.product_id = data.product_id.id
      data.prefix = this.forwarders.selected.prefix

      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      let response = await request.json()

      await Swal.fire({
        icon: request.ok ? 'success' : 'error',
        title: request.ok ? 'Application created successfully' : 'Create failed',
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Ok',
      }).then(() => {
        if (request.ok) {
          this.$router.push({name: 'application_update', params: {id: response.application_id}})
        }
      })

    },
  },
  computed: {
    forwarderPrefix: {
      get() {
        return this.forwarders.selected === null ? '' : this.forwarders.options.find(item => item.label === this.forwarders.selected.label).prefix
      }
    },
    data: {
      get() {
        return this.application
      }
    },
    clients: {
      get() {
        return store.state.users_list.filter(item => item.role === 'client').map(i => {
          return {
            value: i.id,
            label: i.full_name
          }
        })
      }
    }
  },
  components: {
    SelectStations,
    SelectProduct,
    Multiselect,
    PageHeader
  },
  async mounted() {
    this.isLoading = true
    await this.checkCreatePermission()
    await this.getCounterpartyList()
    await this.getTerritory()
  }
}
</script>

<style scoped>

</style>