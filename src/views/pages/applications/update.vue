<template>

  <PageHeader :items="items" title="Application"></PageHeader>

  <div class="row justify-content-around m-auto" v-if="data !== null" style="max-width: 1400px">
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
                <h6 class="text-dark fw-bold mb-0 mb-2">
                  Исх. №{{ forwarderPrefix + data.number }}
                </h6>

                <div class="position-relative">
                  <input v-model="data.date" type="date" placeholder="date" class="form-control form-control-sm">
                  <span v-if="application.date !== data.date"
                        class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-1">
                    <span class="visually-hidden"> -- Modified field -- </span>
                  </span>
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
                    @input="$event ? data.forwarder = { id: $event.value, name: $event.label, is_used_for_code: $event.is_used_for_code } : data.forwarder = null"
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
              <td class="w-50 py-1 px-1">
                <Multiselect class="border-0" v-model="data.period" :caret="false" :options="['Январь', 'февраль', 'Март','Апрель','Май',
                'Июнь','Июнь','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид отправки</td>
              <td class="w-50 py-1 px-1">

                <Multiselect class="border-0" v-model="data.sending_type" :caret="false" :options="sending_types"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Станция отправления</td>
              <td class="w-50 py-1">
                <div v-if="data.departure">
                  <h6 class="text-dark my-0 ps-2">{{ data.departure.name + ' (' + data.departure.code + ')' }}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Станция назначения</td>
              <td class="w-50 py-1">
                <div v-if="data.destination">
                  <h6 class="text-dark my-0 ps-2">{{ data.destination.name + ' (' + data.destination.code + ')' }}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Грузоотправитель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.shipper">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Получатель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.consignee">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна отправления</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.departure_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна назначения</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.destination_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Наименование груза, Коды ГНГ и ЕТСНГ</td>
              <td class="w-50 py-1">
                <div class="text-dark ps-2" v-if="data.product">
                  <h6>{{ data.product.name }}</h6>
                  <h6>ГНГ - {{ data.product.hc_code }}</h6>
                  <h6 class="my-0">ЕТСНГ - {{ data.product.etcng_code }}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Количество
              </td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.quantity">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид вагона/принадлежность подвижного <br>
                состава/принадлежность контейнера
              </td>
              <td class="w-50 py-1 px-1">
                <div class="row justify-content-between align-items-center w-100 m-auto px-0">
                  <div class="col-xl-6 p-0">
                    <Multiselect class="border-0 rounded-0" v-model="data.rolling_stock_1" :options="['A', 'B']" :caret="false"
                                 style="max-height: 28px;"/>
                  </div>
                  <div class="col-xl-6 p-0">
                    <Multiselect class="border-0 rounded-0" v-model="data.rolling_stock_2" :options="['A', 'B']" :caret="false"
                                 style="max-height: 28px"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="data.loading_type === 'Weight'">
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" type="number" v-model="data.weight">
              </td>
            </tr>
            <tr v-if="data.loading_type === 'Container'">
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">
                <Multiselect class="border-0 rounded-0" v-model="data.container_type" :options="['20', '40']" :caret="false"
                             style="max-height: 28px"/>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Номера вагонов/контейнеров</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.containers_or_wagons">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Запрашиваемые территории</td>
              <td class="w-50 py-1 px-1">
                <Multiselect
                    class="form-control border-0 rounded-0"
                    v-model="territories.selected"
                    mode="multiple"
                    :hideSelected="false"
                    :closeOnSelect="false"
                    :options="territories.options"
                    placeholder="Territories"
                    :object="true"
                    label="label"
                    :caret="false"
                    @input="data.territories = $event.map(territory => {
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
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.border_crossing">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="text" v-model="data.paid_telegram">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm border-0" typeof="number" v-model="data.agreed_rate">
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

      <div class="row bg-white rounded-2 pt-2">
        <SelectStations
            :ratio="[12,12,12,12]"
            :current_departure="data.departure"
            :current_destination="data.destination"
            @onSelect="onStationSelect($event)"
        />
      </div>

      <div class="row bg-white rounded-2 pt-2 mt-3">
        <SelectProduct
            :ratio="[12,12,12]"
            :current_product="data.product"
            @onSelect="$event ? data.product = {id: $event.value, name: $event.label, hc_code: $event.hc_code, etcng_code: $event.etcng} : data.product = null"
        />
      </div>

      <div class="row mt-3">
        <div class="col-12 px-0">
          <b-button @click="updateApplication()" class="btn-success waves-effect waves-light w-100">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrdersApi from "../../../api/orders/orders_api";
import SelectStations from "../../../components/custom/SelectStations.vue";
import SelectProduct from "../../../components/custom/SelectProduct.vue";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import PageHeader from "../../../components/page-header.vue";
import store from "../../../state/store";

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
    }
  },
  methods: {
    async getData() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/list/${this.$route.params.id}/`)
      this.application = await request.json()
      this.isLoading = false
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
      this.forwarders.selected = this.forwarders.options.find(item => item.value === this.application.forwarder.id)
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
      this.territories.selected = this.data.territories.map(t => {
        return {
          value: t.id,
          label: t.name
        }
      })
    },

    onStationSelect(event) {
      if (event.option === 'departure') {
        if (event.value === null) return this.data.departure = null
        this.data.departure = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      } else {
        if (event.value === null) return this.data.destination = null
        this.data.destination = {
          id: event.value.value,
          name: event.value.label,
          code: event.value.code,
        }
      }
    },

    async updateApplication() {
      let data = {
        ...this.data
      }
      data.departure_id = data.departure.id
      data.destination_id = data.destination.id
      data.product_id = data.product.id
      data.forwarder_id = data.forwarder.id
      data.sending_type = data.sending_type.toLowerCase()
      data.loading_type = data.loading_type.toLowerCase()

      delete data.departure
      delete data.destination
      delete data.product
      delete data.forwarder

      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/update/${this.$route.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      await this.getData()

      await Swal.fire({
        icon: request.ok ? 'success' : 'error',
        title: request.ok ? 'Updated successfully' : 'Update failed',
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Ok',
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
    await this.getData()
    await this.getCounterpartyList()
    await this.getTerritory()
  }
}
</script>

<style scoped>

</style>