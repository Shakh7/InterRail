<template>
  <b-modal v-model="isVisible" hide-footer size="lg" title="Application Preview" class="v-modal-custom">

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
              Исх. №F9_18
            </h6>
            <h6 class="my-0">
              Дата: 18.01.23 г.
            </h6>
          </div>
          <div>
            <h5 class="fw-medium text-dark my-0">FTT</h5>
          </div>
        </div>
      </div>
      <div class="col-12 my-3">
        <div class="text-dark fw-light text-center">
          <span class="fs-5"> “InterRail Services AG” просит Вас предоставить <span class="fw-bold">коды</span> на следующую перевозку: </span>
        </div>
      </div>
    </section>

    <section>
      <!-- Bordered Tables -->
      <table class="table table-bordered border-dark border-2 table-nowrap">
        <tbody>
        <tr>
          <td class="w-50 py-1">Период перевозки</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Вид отправки</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Станция отправления</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Станция назначения</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Грузоотправитель</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Получатель</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Страна назначения</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Наименование груза,
            Коды ГНГ и ЕТСНГ
          </td>
          <td class="w-50 py-1">000</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Количество
          </td>
          <td class="w-50 py-1">11111</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Вид вагона/принадлежность подвижного <br>
            состава/принадлежность контейнера
          </td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Вес/Фут</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Номера вагонов/контейнеров</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Запрашиваемые территории</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Условия перевозки</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Пограничные переходы</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Проплатная телеграмма</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
        </tr>
        <tr>
          <td class="w-50 py-1">Согласованная ставка</td>
          <td class="w-50 py-1">Lanora Sandoval</td>
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
  </b-modal>
</template>

<script>
export default {
  name: "PreviewModal",
  data() {
    return {}
  },
  props: {
    modalShow: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.modalShow;
      }
    }
  }
}
</script>

<style scoped>

</style>