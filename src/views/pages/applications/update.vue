<template>
  <div class="row justify-content-around" v-if="data !== null">
    <div class="col-7">
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
          <div class="col-12 my-3">
            <div class="d-flex flex-row justify-content-between align-items-end">
              <div>
                <h6 class="text-dark fw-bold mb-0 mb-2">
                  Исх. №{{ forwarderPrefix + data.number }}
                </h6>
                <input v-model="data.date" type="date" placeholder="date" class="form-control">
              </div>
              <div style="min-width: 180px">
                <small class="text-danger" v-if="forwarders.selected === null">This field can not be blank</small>
                <b-form-select v-model="forwarders.selected" :options="forwarders.options.map(i => i.name)"
                               class="mb-2">
                </b-form-select>
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
              <td class="w-50 py-1">
                <b-form-select class="form-select-sm" v-model="data.period"
                               :options="['Январь', 'февраль', 'Март','Апрель','Май',
                'Июнь','Июнь','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']">
                </b-form-select>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид отправки</td>
              <td class="w-50 py-1">
                <b-form-select class="form-select-sm" v-model="data.sending_type"
                               :options="['Одиночная', 'КП']">
                </b-form-select>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Грузоотправитель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.shipper">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Получатель</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.consignee">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна отправления</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.departure_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Страна назначения</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.destination_country">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Количество
              </td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.quantity">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Вид вагона/принадлежность подвижного <br>
                состава/принадлежность контейнера
              </td>
              <td class="w-50 py-1 align-items-center">
                <b-form-select v-model="data.rolling_stock_1" :options="['A', 'B']"
                               class="form-select-sm d-inline w-50">
                </b-form-select>

                <b-form-select v-model="data.rolling_stock_2" :options="['A', 'B']"
                               class="form-select-sm d-inline w-50">
                </b-form-select>
              </td>
            </tr>
            <tr v-if="data.loading_type === 'Weight'">
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">{{ data.weight }}</td>
            </tr>
            <tr v-if="data.loading_type === 'Container'">
              <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
              <td class="w-50 py-1">
                <b-form-select v-model="data.container_type" :options="['20', '40']"
                               class="form-select-sm">
                </b-form-select>
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Номера вагонов/контейнеров</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.containers_or_wagons">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Запрашиваемые территории</td>
              <td class="w-50 py-1">{{ data.territories.map(t => t.name).join('') }}</td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Условия перевозки</td>
              <td class="w-50 py-1"></td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Пограничные переходы</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.border_crossing">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="text" v-model="data.paid_telegram">
              </td>
            </tr>
            <tr>
              <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
              <td class="w-50 py-1">
                <input class="form-control form-control-sm" typeof="number" v-model="data.agreed_rate">
              </td>
            </tr>
            </tbody>
          </table>
        </section>

      </div>
    </div>
    <div class="col-3">
      <div class="row bg-white rounded-2 pt-2">
        <SelectStations :ratio="[12,12,12,12]"/>
      </div>

      <div class="row bg-white rounded-2 pt-2 mt-3">
        <SelectProduct :ratio="[12,12,12]"/>
      </div>

    </div>
  </div>
</template>

<script>
import OrdersApi from "../../../api/orders/orders_api";
import SelectStations from "../../../components/custom/SelectStations.vue";
import SelectProduct from "../../../components/custom/SelectProduct.vue";

export default {
  name: "update",
  data() {
    return {
      data: null,
      isLoading: false,
      forwarders: {
        selected: null,
        options: []
      },
      departure: {
        selected: null,
        options: []
      },
      territories: [],
    }
  },
  methods: {
    async getData() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/list/${this.$route.params.id}/`)
      this.data = await request.json()
      this.forwarders.selected = this.data.forwarder.name,
          this.isLoading = false
    },
    async getCounterpartyList() {
      let orders = new OrdersApi()
      this.forwarders.options = (await orders.getCounterpartyList()).results.map(item => {
        return {
          value: item.id,
          name: item.name,
          prefix: item.name.split(' ').map(([v]) => v).join('').toUpperCase() + item.id.toString()[0] + '_'
        }
      })
    },
  },
  computed: {
    forwarderPrefix: {
      get() {
        return this.forwarders.selected === null ? '' : this.forwarders.options.find(item => item.name === this.forwarders.selected).prefix
      }
    },
  },
  components: {
    SelectStations,
    SelectProduct
  },
  async mounted() {
    this.isLoading = true
    await this.getCounterpartyList()
    await this.getData()
  }
}
</script>

<style scoped>

</style>