<template>

  <PageHeader :items="items" title="Application"></PageHeader>

  <div v-if="data !== null" style="max-width: 1400px">

    {{ data }}
    <Form class="row justify-content-around m-auto"
          :validation-schema="applicationSchema">
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
          Website: <span class="fw-medium link-primary"> www.interrail.ag</span>
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
                    Исх. №{{ data.number }}
                  </h6>

                  <input v-model="data.date" type="date" placeholder="date" class="form-control">

                </div>
                <div style="min-width: 220px">
                  <Field v-model="data.forwarder_id" name="forwarder" as="select"
                         class="form-select">
                    <option value="" selected></option>
                    <option v-for="option in forwarders" :key="option" :value="option.value">{{
                        option.label
                      }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="forwarder"/>
                    </small>
                  </div>
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
                  <Field v-model="data.period" name="period" as="select"
                         class="form-select form-select-sm border-0">
                    <option value="" disabled></option>
                    <option v-for="option in months" :key="option" :value="option.value">{{
                        option.label
                      }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="period"/>
                    </small>
                  </div>
                </td>
              </tr>


              <tr>
                <td class="w-50 py-1 fw-bolder">Тип погрузки<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field v-model="data.loading_type" name="loading_type" as="select"
                         class="form-select form-select-sm border-0">
                    <option value="" selected></option>
                    <option v-for="option in loading_types" :key="option" :value="option.value">{{
                        option.label
                      }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="loading_type"/>
                    </small>
                  </div>
                </td>
              </tr>
              <tr v-if="data.loading_type === 'container'">
                <td class="w-50 py-1 fw-bolder">Вид отправки<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field v-model="data.sending_type" name="sending_type" as="select"
                         class="form-select form-select-sm border-0">
                    <option value="" selected></option>
                    <option v-for="option in sending_types" :key="option" :value="option.value">{{
                        option.label
                      }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="sending_type"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder bg-light">Станция отправления<span
                    class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1 bg-light" v-if="data.departure">
                  <h6 class="text-dark my-0 ps-2">{{ data.departure.name + ' (' + data.departure.code + ')' }}</h6>
                </td>
                <td class="w-50 py-1 bg-soft-danger" v-else>
                  <small class="ps-2 text-danger fw-semibold">This field is required</small>
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder bg-light">Станция назначения<span
                    class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1 bg-light" v-if="data.destination">
                  <h6 class="text-dark my-0 ps-2">{{
                      data.destination.name + ' (' + data.destination.code + ')'
                    }}</h6>
                </td>
                <td class="w-50 py-1 bg-soft-danger" v-else>
                  <small class="ps-2 text-danger fw-semibold">This field is required</small>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Грузоотправитель<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="shipper"
                      v-model="data.shipper">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="shipper"/>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Получатель<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="consignee"
                      v-model="data.consignee">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="consignee"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Страна отправления<span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="departure_country"
                      v-model="data.departure_country">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="departure_country"/>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Страна назначения<span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="destination_country"
                      v-model="data.destination_country">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="destination_country"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolde bg-light">Наименование груза, Коды ГНГ и ЕТСНГ
                  <span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1 bg-light ps-3" v-if="data.product">
                  <h6>{{ data.product.name }}</h6>
                  <h6>ГНГ - {{ data.product.hc_code }}</h6>
                  <h6 class="my-0">ЕТСНГ - {{ data.product.etcng_code }}</h6>
                </td>
                <td class="w-50 py-1 bg-soft-danger" v-else>
                  <small class="ps-2 text-danger fw-semibold">This field is required</small>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Количество<span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">
                  <Field
                      type="number"
                      class="form-control form-control-sm border-0"
                      name="quantity"
                      v-model="data.quantity">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="quantity"/>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Вид вагона/принадлежность подвижного <br>
                  состава/принадлежность контейнера<span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">
                  <div class="row justify-content-between align-items-center w-100 m-auto px-0">
                    <div class="col-xl-6 pe-1 ps-0 py-0">
                      <Field v-model="data.rolling_stock_1" name="rolling_stock_1" as="select"
                             class="form-select form-select-sm border-0">
                        <option value="" selected></option>
                        <option v-for="option in rolling_stock_a" :key="option" :value="option.value">{{
                            option.label
                          }}
                        </option>
                      </Field>
                      <div class="fv-plugins-message-container">
                        <small class="text-danger py-0 my-0">
                          <ErrorMessage name="rolling_stock_1"/>
                        </small>
                      </div>
                    </div>
                    <div class="col-xl-6 ps-1 pe-0 py-0">
                      <Field v-model="data.rolling_stock_2" name="rolling_stock_2" as="select"
                             class="form-select form-select-sm border-0">
                        <option value="" selected></option>
                        <option v-for="option in rolling_stock_b" :key="option" :value="option.value">{{
                            option.label
                          }}
                        </option>
                      </Field>
                      <div class="fv-plugins-message-container">
                        <small class="text-danger py-0 my-0">
                          <ErrorMessage name="rolling_stock_2"/>
                        </small>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr v-if="data.loading_type === 'container'">
                <td class="w-50 py-1 fw-bolder">Вес/Фут<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field v-model="data.container_type" name="container_type" as="select"
                         class="form-select form-select-sm border-0">
                    <option value="" selected></option>
                    <option v-for="option in ['20', '40']" :key="option" :value="option">{{
                        option
                      }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="container_type"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr v-else>
                <td class="w-50 py-1 fw-bolder">Вес/Фут<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field
                      type="number"
                      class="form-control form-control-sm border-0"
                      name="weight"
                      v-model="data.weight">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="weight"/>
                    </small>
                  </div>

                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Номера вагонов/контейнеров</td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="containers_or_wagons"
                      v-model="data.containers_or_wagons">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="containers_or_wagons"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Запрашиваемые территории</td>
                <td class="w-50 py-1">
                  <Multiselect
                      v-model="territories.selected"
                      :closeOnSelect="false"
                      :hideSelected="false"
                      :object="true"
                      :options="territories.options"
                      class="form-control border-0"
                      label="label"
                      mode="multiple"
                      placeholder="Territories"
                      style="max-height: 28px"
                      @input="data.territories = $event.map(territory => {
                          return { id: territory.value, name: territory.label}
                        })"
                  />
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Условия перевозки</td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="condition_of_carriage"
                      v-model="data.condition_of_carriage">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="condition_of_carriage"/>
                    </small>
                  </div>

                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Пограничные переходы</td>
                <td class="w-50 py-1">
                  <input v-model="data.border_crossing" class="form-control form-control-sm border-0" typeof="text">
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
                <td class="w-50 py-1">
                  <input v-model="data.paid_telegram" class="form-control form-control-sm border-0" typeof="text">
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
                <td class="w-50 py-1">
                  <input v-model="data.agreed_rate" class="form-control form-control-sm border-0" typeof="number">
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
            <b-button class="btn-success waves-effect waves-light w-100" @click="updateApplication()" type="submit">
              Save
            </b-button>
          </div>
        </div>
      </div>
    </Form>
  </div>

</template>

<script>
import SelectStations from "../../../components/custom/SelectStations.vue";
import SelectProduct from "../../../components/custom/SelectProduct.vue";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import PageHeader from "../../../components/page-header.vue";
import store from "../../../state/store";
import RollingStocks from "../../../core/application/RollingStocks";
import Months from "../../../core/Months";

import * as Yup from "yup";
import {configure, ErrorMessage, Field, Form} from "vee-validate";
import CounterpartyApi from "../../../api/counterparty/CounterpartyApi";

export default {
  name: "update",
  data() {
    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    });
    return {
      configure: configure,
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
      forwarders: [],
      departure: {
        selected: null,
        options: []
      },
      territories: {
        selected: null,
        options: []
      },

      rolling_stock_a: RollingStocks.A,
      rolling_stock_b: RollingStocks.B,
      months: Months
    }
  },
  methods: {
    async getData() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/list/${this.$route.params.id}/`)
      this.application = await request.json()
      this.isLoading = false
    },
    async getCounterpartyList() {
      let api = new CounterpartyApi()
      let response = await api.getCounterparties('?is_used_for_code=true')
      this.forwarders = response.results.map(item => {
        return {value: item.id, label: item.name}
      })
      this.data.forwarder_id = this.application.forwarder.id
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

      let form = {
        forwarder: this.data.forwarder_id,
        period: this.data.period,
        loading_type: this.data.loading_type,
        sending_type: this.data.sending_type,
        departure: this.data.departure === null
            ? null : parseInt(this.data.departure.id),
        destination: this.data.destination === null
            ? null : parseInt(this.data.destination.id),
        shipper: this.data.shipper,
        consignee: this.data.consignee,
        departure_country: this.data.departure_country,
        destination_country: this.data.destination_country,
        product: this.data.product === null
            ? null : parseInt(this.data.product.id),
        quantity: parseFloat(this.data.quantity),
        rolling_stock_1: this.data.rolling_stock_1,
        rolling_stock_2: this.data.rolling_stock_2,
        weight: this.data.weight === null || this.data.weight === '' ? '' : parseInt(this.data.weight),
        container_type: this.data.container_type,
        containers_or_wagons: this.data.containers_or_wagons,
        condition_of_carriage: this.data.condition_of_carriage,
        border_crossing: this.data.border_crossing,
        paid_telegram: this.data.paid_telegram,
        agreed_rate: this.data.agreed_rate,
      }
      let isValid = await this.applicationSchema.isValid(form)

      alert(isValid)

      // let data = {
      //   ...this.data
      // }
      // data.departure_id = data.departure.id
      // data.destination_id = data.destination.id
      // data.product_id = data.product.id
      // data.forwarder_id = data.forwarder.id
      // data.sending_type = data.sending_type.toLowerCase()
      // data.loading_type = data.loading_type.toLowerCase()
      //
      // delete data.departure
      // delete data.destination
      // delete data.product
      // delete data.forwarder
      //
      // let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/update/${this.$route.params.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // })
      //
      // await this.getData()
      //
      // await Swal.fire({
      //   icon: request.ok ? 'success' : 'error',
      //   title: request.ok ? 'Updated successfully' : 'Update failed',
      //   showConfirmButton: true,
      //   showCloseButton: false,
      //   confirmButtonText: 'Ok',
      // })
    },
  },
  computed: {
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
    },

    applicationSchema: {
      get() {
        return Yup.object({
          forwarder: Yup.string().required().label('Forwarder'),
          period: Yup.string().required().label("Период перевозки"),
          loading_type: Yup.string().required().label("Тип погрузки"),
          sending_type: this.data.loading_type === 'container'
              ? Yup.string().required().label("Вид отправки")
              : Yup.string().notRequired().label("Вид отправки"),
          departure: Yup.number().required().label("Станция отправления").positive().integer(),
          destination: Yup.number().required().label("Станция назначения").positive().integer(),
          shipper: Yup.string().required().label("Грузоотправитель").nonNullable().trim(),
          consignee: Yup.string().required().label("Получатель").nonNullable().trim(),
          departure_country: Yup.string().required().label("Страна отправления").nonNullable().trim(),
          destination_country: Yup.string().required().label("Страна назначения").nonNullable().trim(),
          product: Yup.number().required().label("Продукт").positive().integer(),
          quantity: Yup.number().required().label("Количество").positive().integer().min(1),
          rolling_stock_1: Yup.string().required().label("Rolling stock 1"),
          rolling_stock_2: Yup.string().required().label("Rolling stock 2"),
          weight: Yup.number().notRequired().label("Вес/Фут"),
          container_type: this.data.loading_type === 'container'
              ? Yup.string().required().label("Вес/Фут")
              : Yup.string().notRequired().label("Вес/Фут"),
          containers_or_wagons: Yup.string().notRequired().label("Номера вагонов/контейнеров"),
          condition_of_carriage: Yup.string().notRequired().label('Условия перевозки'),
          border_crossing: Yup.string().notRequired().label('Пограничные переходы'),
          paid_telegram: Yup.string().notRequired().label('Проплатная телеграмма'),
          agreed_rate: Yup.string().notRequired().label('Согласованная ставка'),
        })
      }
    }
  },
  components: {
    SelectStations,
    SelectProduct,
    Multiselect,
    PageHeader,
    Field,
    Form,
    ErrorMessage
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