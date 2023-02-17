<template>

  <PageHeader :items="items" title="Application"></PageHeader>

  <div v-if="!allow_create" class="row justify-content-center mt-5">
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


  <div v-else style="max-width: 1400px" class="mx-auto">
    <Form
        class="form row justify-content-around m-auto"
        :validation-schema="applicationSchema"
    >
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
          Website: <span class="fw-medium link-primary"> www.interrail.ag </span>
        </span>
            </div>
            <div class="col-6 text-end" style="height: 100%">
              <b-img alt="Responsive image" class="img-fluid"
                     src="https://system.interrail.uz/img/interrail-logo.268299c8.png"></b-img>
            </div>
            <div class="col-12 my-3 mb-0">
              <div class="d-flex flex-row justify-content-between align-items-end">
                <div>

                  <div class="position-relative">
                    <input v-model="form.date" name="date" class="form-control form-control" placeholder="date"
                           type="date">
                  </div>
                </div>
                <div style="min-width: 220px">
                  <!--                  <Multiselect-->
                  <!--                      v-model="forwarders.selected"-->
                  <!--                      :hideSelected="true"-->
                  <!--                      :object="true"-->
                  <!--                      :options="forwarders.options"-->
                  <!--                      :searchable="true"-->
                  <!--                      class="form-control"-->
                  <!--                      placeholder="Forwarder"-->
                  <!--                      @input="$event ? form.forwarder_id = $event.value : form.forwarder_id = null"-->
                  <!--                  />-->

                  <Field v-model="form.forwarder_id" name="forwarder" as="select"
                         class="form-select">
                    <option value="" selected></option>
                    <option v-for="option in forwarders.options" :key="option" :value="option.value">{{
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
              <span class="fs-5"> “InterRail Services AG” просит Вас предоставить <span class="fw-bold">{{
                }} коды</span> на следующую перевозку: </span>
              </div>
            </div>
          </section>

          <section class="table-responsive">
            <table class="table table-bordered border-dark border-2">
              <tbody>
              <tr>
                <td class="w-50 py-1 fw-bolder">
                  Период перевозки
                  <span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">

                  <Field v-model="form.period" name="period" as="select"
                         class="form-select form-select-sm border-0">
                    <option value="" selected></option>
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
                  <Field v-model="form.loading_type" name="loading_type" as="select"
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
              <tr v-if="form.loading_type === 'container'">
                <td class="w-50 py-1 fw-bolder">Вид отправки<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field v-model="form.sending_type" name="sending_type" as="select"
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
                <td class="w-50 py-1" v-if="form.departure_id">
                  <div>
                    <h6 class="text-dark my-0">{{ form.departure_id.name }} ({{ form.departure_id.code }})</h6>
                  </div>
                </td>
                <td class="w-50 py-1 ps-3 bg-light" v-else><small></small></td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder bg-light">Станция назначения<span
                    class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1" v-if="form.destination_id">
                  <div>
                    <h6 class="text-dark my-0">{{ form.destination_id.name }} ({{ form.destination_id.code }})</h6>
                  </div>
                </td>
                <td class="w-50 py-1 ps-3 bg-light" v-else><small></small></td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder">Грузоотправитель<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">
                  <Field
                      type="text"
                      class="form-control form-control-sm border-0"
                      name="shipper"
                      v-model="form.shipper">
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
                      v-model="form.consignee">
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
                      v-model="form.departure_country">
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
                      v-model="form.destination_country">
                  </Field>
                  <div class="fv-plugins-message-container">
                    <small class="text-danger py-0 my-0">
                      <ErrorMessage name="destination_country"/>
                    </small>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="w-50 py-1 fw-bolder bg-light">Наименование груза, Коды ГНГ и ЕТСНГ<span
                    class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1" v-if="form.product_id">
                  <div class="text-dark">
                    <h6>{{ form.product_id.name }}</h6>
                    <h6>ГНГ - {{ form.product_id.hc_code }}</h6>
                    <h6 class="my-0">ЕТСНГ - {{ form.product_id.etcng_code }}</h6>
                  </div>
                </td>
                <td class="w-50 py-1 bg-light" v-else></td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Количество<span class="text-danger fw-semibold ms-1">*</span>
                </td>
                <td class="w-50 py-1">
                  <Field
                      type="number"
                      class="form-control form-control-sm border-0"
                      name="quantity"
                      v-model="form.quantity">
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
                      <Field v-model="form.rolling_stock_1" name="rolling_stock_1" as="select"
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
                      <Field v-model="form.rolling_stock_2" name="rolling_stock_2" as="select"
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
              <tr v-if="form.loading_type === 'container'">
                <td class="w-50 py-1 fw-bolder">Вес/Фут<span class="text-danger fw-semibold ms-1">*</span></td>
                <td class="w-50 py-1">

                  <Field v-model="form.container_type" name="container_type" as="select"
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
                      v-model="form.weight">
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
                      v-model="form.containers_or_wagons">
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
                      @input="form.territories = $event.map(territory => {
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
                      v-model="form.condition_of_carriage">
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
                  <input v-model="form.border_crossing" class="form-control form-control-sm border-0" typeof="text">
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
                <td class="w-50 py-1">
                  <input v-model="form.paid_telegram" class="form-control form-control-sm border-0" typeof="text">
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
                <td class="w-50 py-1">
                  <input v-model="form.agreed_rate" class="form-control form-control-sm border-0" typeof="number">
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
            <b-button class="btn-success waves-effect waves-light w-100" @click="createApplication()" type="submit">
              Create
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
import store from "../../../state/store.js";
import CounterpartyApi from "../../../api/counterparty/CounterpartyApi";


import RollingStocks from "../../../core/application/RollingStocks";
import Months from "../../../core/Months";
import * as Yup from "yup";
import {configure, ErrorMessage, Field, Form} from "vee-validate";
import Swal from "sweetalert2";

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

      text: '',

      allow_create: true,

      loading_types: [
        {value: 'container', label: 'Container', tag: 'option'},
        {value: 'wagon', label: 'Wagon', tag: 'option'},
        {value: 'wagon_empty', label: 'Wagon(empty)', tag: 'option'},
      ],

      sending_types: [
        {value: 'single', label: 'Одиночная'},
        {value: 'block_train', label: 'КП'}
      ],

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
      },

      rolling_stock_a: RollingStocks.A,
      rolling_stock_b: RollingStocks.B,
      months: Months,

      validText: 'Valid',
    }
  },
  methods: {

    async checkCreatePermission() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/check_create_permission/`)
      let response = await request.json()
      this.allow_create = response['access']
    },

    async getCounterpartyList() {
      let api = new CounterpartyApi()
      let response = await api.getCounterparties('?is_used_for_code=true')
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
      let form = {
        forwarder: this.form.forwarder_id,
        period: this.form.period,
        loading_type: this.form.loading_type,
        sending_type: this.form.sending_type,
        departure: this.form.departure_id === null || this.form.departure_id === ''
            ? null : parseInt(this.form.departure_id.id),
        destination: this.form.destination_id === null || this.form.destination_id === ''
            ? null : parseInt(this.form.destination_id.id),
        shipper: this.form.shipper,
        consignee: this.form.consignee,
        departure_country: this.form.departure_country,
        destination_country: this.form.destination_country,
        product: this.form.product_id === null || this.form.product_id === ''
            ? null : parseInt(this.form.product_id.id),
        quantity: parseFloat(this.form.quantity),
        rolling_stock_1: this.form.rolling_stock_1,
        rolling_stock_2: this.form.rolling_stock_2,
        weight: this.form.weight === null || this.form.weight === '' ? null : parseInt(this.form.weight),
        container_type: this.form.container_type,
        containers_or_wagons: this.form.containers_or_wagons,
        condition_of_carriage: this.form.condition_of_carriage,
        border_crossing: this.form.border_crossing,
        paid_telegram: this.form.paid_telegram,
        agreed_rate: this.form.agreed_rate,
      }
      let isValid = await this.applicationSchema.isValid(form)
      if (isValid) {
        let data = {
          ...this.form,
        }
        data.departure_id = data.departure_id.id
        data.destination_id = data.destination_id.id
        data.product_id = data.product_id.id
        data.prefix = 'TEST'


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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid form',
          text: 'Please fill all the required fields',
          showConfirmButton: true,
          showCloseButton: false,
          confirmButtonText: 'Try again',
        })
      }
    },

  },
  computed: {
    forwarderPrefix: {
      get() {
        return this.forwarders.selected === null ? '' : this.forwarders.options.find(item => item.label === this.forwarders.selected.label).prefix
      }
    },
    applicationSchema: {
      get() {
        return Yup.object({
          forwarder: Yup.string().required().label('Forwarder'),
          period: Yup.string().required().label("Период перевозки"),
          loading_type: Yup.string().required().label("Тип погрузки"),
          sending_type: this.form.loading_type === 'container'
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
          container_type: this.form.loading_type === 'container'
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
    ErrorMessage,
    Field, Form
  },
  async mounted() {
    await this.checkCreatePermission()
    if (this.allow_create === false) return
    await this.getCounterpartyList()
    await this.getTerritory()
  }
}
</script>

<style scoped>

</style>