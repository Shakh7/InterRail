<template>

  <div id="previewModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 overflow-hidden" v-if="data !== undefined">
        <div class="p-4">
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
                  <h6 class="text-dark fw-bold mb-0">
                    Исх. №{{ data.prefix + data.number }}
                  </h6>
                  <h6 class="my-0">
                    Дата: {{ data.date }} г.
                  </h6>
                </div>
                <div>
                  <h5 class="fw-medium text-dark my-0">{{ data.forwarder.name }}</h5>
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
                <td class="w-50 py-1">{{ data.period }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Вид отправки</td>
                <td class="w-50 py-1">{{ data.sending_type }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Станция отправления</td>
                <td class="w-50 py-1">{{ data.departure.name }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Станция назначения</td>
                <td class="w-50 py-1">{{ data.destination.name }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Грузоотправитель</td>
                <td class="w-50 py-1">{{ data.shipper }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Получатель</td>
                <td class="w-50 py-1">{{ data.consignee }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Страна отправления</td>
                <td class="w-50 py-1">{{ data.departure_country }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Страна назначения</td>
                <td class="w-50 py-1">{{ data.destination_country }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Наименование груза,
                  Коды ГНГ и ЕТСНГ
                </td>
                <td class="w-50 py-1 fw-medium">
                  {{ data.product.name }}<br>
                  ГНГ - {{ data.product.hc_code }}<br>
                  ЕТСНГ - {{ data.product.etcng_code }}
                </td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Количество
                </td>
                <td class="w-50 py-1">{{ data.quantity }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Вид вагона/принадлежность подвижного <br>
                  состава/принадлежность контейнера
                </td>
                <td class="w-50 py-1 align-items-center">{{ data.rolling_stock_1 }}, {{ data.rolling_stock_2 }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Вес/Фут</td>
                <td class="w-50 py-1">{{ data.weight }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Номера вагонов/контейнеров</td>
                <td class="w-50 py-1">{{ data.containers_or_wagons }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Запрашиваемые территории</td>
                <td class="w-50 py-1">{{ data.territories.map(t => t.name).join(', ') }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Условия перевозки</td>
                <td class="w-50 py-1"></td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Пограничные переходы</td>
                <td class="w-50 py-1">{{ data.border_crossing }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Проплатная телеграмма</td>
                <td class="w-50 py-1">{{ data.paid_telegram }}</td>
              </tr>
              <tr>
                <td class="w-50 py-1 fw-bolder">Согласованная ставка</td>
                <td class="w-50 py-1">{{ data.agreed_rate }}</td>
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
      <div class="modal-content border-0 overflow-hidden p-4" v-else>Loading..</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "PreviewModal",
  data() {
    return {}
  },
  props: {
    application: {
      type: Object,
    }
  },
  methods: {},
  computed: {
    data: {
      get() {
        if (this.application.number === undefined) {
          return undefined
        } else {
          return this.application
        }
      }
    }
  },
}
</script>

<style scoped>

</style>