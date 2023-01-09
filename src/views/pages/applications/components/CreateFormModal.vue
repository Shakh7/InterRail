<template>
  <!-- Default Modals -->
  <b-button variant="success" @click="modalShow = !modalShow">Create application</b-button>
  <b-modal v-model="modalShow" hide-footer title="CREATE APPLICATION FORM" class="v-modal-custom" size="lg">

    <div class="form-steps mb-0">
      <form action="#">
        <div class="step-arrow-nav mb-4">
          <ul class="nav nav-pills custom-nav nav-justified" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="steparrow-gen-info-tab" data-bs-toggle="pill"
                      data-bs-target="#steparrow-gen-info" type="button" role="tab"
                      aria-controls="steparrow-gen-info" aria-selected="true">General
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="steparrow-description-info-tab" data-bs-toggle="pill"
                      data-bs-target="#steparrow-description-info" type="button" role="tab"
                      aria-controls="steparrow-description-info" aria-selected="false">Description
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-experience-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-experience" type="button" role="tab" aria-controls="pills-experience"
                      aria-selected="false">Finish
              </button>
            </li>
          </ul>
        </div>

        <div class="tab-content pt-2">
          <div class="tab-pane fade show active" id="steparrow-gen-info" role="tabpanel"
               aria-labelledby="steparrow-gen-info-tab">

            <div>
              <div class="row">

                <div class="col-3">
                  <div class="mb-3">
                    <label for="prefixInput" class="form-label">Prefix</label>
                    <input v-model="form.prefix" type="number" class="form-control" placeholder="Prefix"
                           id="prefixInput">
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-3">
                    <label for="forwarderSelect" class="form-label">
                      Forwarder <span class="text-danger">*</span>
                    </label>
                    <Multiselect
                        class="form-control"
                        v-model="forwarders.selected"
                        :searchable="true"
                        :hideSelected="true"
                        :options="forwarders.options"
                        placeholder="Forwarder"
                        :object="true"
                        label="name"
                        value="id"
                        @input="$event === null ? form.forwarder_id = 0 : form.forwarder_id = $event.value"
                    />

                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-3">
                    <label for="forwarderSelect" class="form-label">
                      Sending type <span class="text-danger">*</span>
                    </label>
                    <Multiselect
                        class="form-control"
                        :searchable="true"
                        mode="single"
                        :hideSelected="false"
                        :closeOnSelect="false"
                        :options="['Single', 'Block train']"
                        placeholder="Sending type"
                        @input="$event === null ? form.sending_type = '' : form.sending_type = $event"
                    />
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-3">
                    <label for="applicationDate" class="form-label">
                      Date <span class="text-danger">*</span>
                    </label>
                    <input type="text" v-maska="'##/##/####'" placeholder="Type date" class="form-control"
                           id="applicationDate">
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="shipperName" class="form-label">
                      Shipper <span class="text-danger">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Enter shipper name" id="shipperName">
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="consigneeName" class="form-label">
                      Consignee <span class="text-danger">*</span>
                    </label>
                    <input type="text" class="form-control" placeholder="Enter consignee name" id="consigneeName">
                  </div>
                </div>

                <SelectStations :ratio="[3, 3, 3, 3]" @onSelect="onStationSelect"/>

                <SelectProduct :ratio="[6, 3, 3]" @onSelect="onProductSelect"/>

              </div>
            </div>

            <div class="d-flex align-items-start gap-3 mt-4">
              <button type="button" class="btn btn-success btn-label right ms-auto nexttab
nexttab" data-nexttab="steparrow-description-info-tab"><i
                  class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to more info
              </button>
            </div>

          </div>

          <div class="tab-pane fade" id="steparrow-description-info" role="tabpanel"
               aria-labelledby="steparrow-description-info-tab">

            <div>
              <div class="row">

                <div class="col-6">
                  <div class="mb-3">
                    <label for="loadingTypeSelect" class="form-label">Loading type</label>
                    <select id="loadingTypeSelect" class="form-select mb-3" aria-label=".form-select-lg example">
                      <option selected>Loading type</option>
                      <option value="container">Container</option>
                      <option value="wagon">Wagon</option>
                    </select>
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="numberInput" class="form-label">Quantity</label>
                    <input type="number" class="form-control" placeholder="Enter application number" id="numberInput">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="weightInput" class="form-label">Weight</label>
                    <input type="number" class="form-control" placeholder="Enter weight" id="weightInput">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="paidTelegram" class="form-label">Paid telegram</label>
                    <input type="number" class="form-control" placeholder="Paid telegram" id="paidTelegram">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="containers-wagons" class="form-label">Containers/Wagons</label>
                    <input type="number" class="form-control" placeholder="Containers/wagons" id="containers-wagons">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="rollingStock-1" class="form-label">Rolling stock</label>
                    <select id="rollingStock-1" class="form-select mb-3" aria-label=".form-select-lg example">
                      <option selected>Rolling stock</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                    </select>
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="rollingStock-2" class="form-label">Rolling stock</label>
                    <select id="rollingStock-2" class="form-select mb-3" aria-label=".form-select-lg example">
                      <option selected>Rolling stock</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                    </select>
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="periodInput" class="form-label">Period</label>
                    <input type="text" class="form-control" placeholder="Enter period" id="periodInput">
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="conditionsCarriage" class="form-label">Conditions of carriage</label>
                    <input type="text" class="form-control" placeholder="Conditions of carriage"
                           id="conditionsCarriage">
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="agreedRate" class="form-label">Agreed rate</label>
                    <input type="number" class="form-control" placeholder="Enter agreed rate" id="agreedRate">
                  </div>
                </div>

                <div class="col-6">
                  <div class="mb-3">
                    <label for="borderCrossing" class="form-label">Border crossing</label>
                    <input type="text" class="form-control" placeholder="Border crossing" id="borderCrossing">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="territoryInput" class="form-label">Territory</label>
                    <Multiselect
                        class="form-control"
                        :searchable="true"
                        mode="multiple"
                        :hideSelected="false"
                        :closeOnSelect="false"
                        :options="['A', 'B', 'C']"
                        placeholder="Choose territories"
                    />
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="countryInput" class="form-label">Country</label>
                    <input type="number" class="form-control" placeholder="Enter country" id="countryInput">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="countryInput" class="form-label">Country</label>
                    <input type="number" class="form-control" placeholder="Enter country" id="countryInput">
                  </div>
                </div>

                <div class="col-3">
                  <div class="mb-3">
                    <label for="borderCrossing" class="form-label">Customer</label>
                    <Multiselect
                        class="form-control"
                        :searchable="true"
                        mode="single"
                        :hideSelected="false"
                        :closeOnSelect="false"
                        :options="['A', 'B', 'C']"
                        placeholder="Choose territories"
                    />
                  </div>
                </div>


              </div>
            </div>

            <div class="d-flex align-items-start gap-3 mt-4">
              <button type="button" class="btn btn-light btn-label previestab"
                      data-previous="steparrow-gen-info-tab"><i
                  class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to General
              </button>
              <button type="button" class="btn btn-success btn-label right ms-auto nexttab
nexttab" data-nexttab="pills-experience-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Submit
              </button>
            </div>

          </div>

          <div class="tab-pane fade" id="pills-experience" role="tabpanel">
            <div class="text-center">

              <div class="avatar-md mt-5 mb-4 mx-auto">
                <div class="avatar-title bg-light text-success display-4 rounded-circle">
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
              </div>
              <h5>Well Done !</h5>
              <p class="text-muted">You have Successfully Signed Up</p>
            </div>
          </div>

        </div>
      </form>
    </div>

    <!--    <div class="modal-footer v-modal-footer p-0">-->
    <!--      <b-button type="button" variant="light" @click="modalShow = false">Close-->
    <!--      </b-button>-->
    <!--      <b-button type="button" variant="primary">Save Changes</b-button>-->
    <!--    </div>-->
  </b-modal>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import SelectProduct from '../../../../components/custom/SelectProduct.vue'
import SelectStations from '../../../../components/custom/SelectStations.vue'
import OrdersApi from "../../../../api/orders/orders_api.js";
import store from "../../../../state/store.js";

export default {
  name: "createFormModal",
  data() {
    return {
      modalShow: false,
      forwarders: {
        selected: null,
        options: []
      },
      form: {
        prefix: '',
        number: 0,
        period: '',
        quantity: '',
        date: '',
        sending_type: '',
        shipper: '',
        consignee: '',
        condition_of_carriage: '',
        agreed_rate: '',
        border_crossing: '',
        departure_country: '',
        destination_country: '',
        rolling_stock_1: '',
        rolling_stock_2: '',
        paid_telegram: '',
        departure_id: 0,
        destination_id: 0,
        product_id: 0,
        loading_type: '',
        container_type: '',
        weight: "",
        territories: [],
        forwarder_id: 0,
        manager: store.state.user.id,
        customer: 0
      }
    }
  },
  methods: {
    onProductSelect(product_id) {
      console.log(product_id)
    },
    onStationSelect(station_obj) {
      console.log(station_obj)
    },
    async getCounterpartyList() {
      let orders = new OrdersApi()
      this.forwarders.options = (await orders.getCounterpartyList()).results.map(item => {
        return {
          value: item.id,
          name: item.name
        }
      })
    },
  },
  components: {
    Multiselect,
    SelectProduct,
    SelectStations
  },
  async mounted() {
    await this.getCounterpartyList()
    document.querySelectorAll(".form-steps").forEach(function (form) {

      // next tab
      form.querySelectorAll(".nexttab").forEach(function (nextButton) {
        var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
        tabEl.forEach(function (item) {
          item.addEventListener('show.bs.tab', function (event) {
            event.target.classList.add('done');
          });
        });
        nextButton.addEventListener("click", function () {
          var nextTab = nextButton.getAttribute('data-nexttab');
          document.getElementById(nextTab).click();
        });
      });

      //Pervies tab
      form.querySelectorAll(".previestab").forEach(function (prevButton) {

        prevButton.addEventListener("click", function () {
          var prevTab = prevButton.getAttribute('data-previous');
          var totalDone = prevButton.closest("form").querySelectorAll(".custom-nav .done").length;
          for (var i = totalDone - 1; i < totalDone; i++) {
            (prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]) ? prevButton.closest("form").querySelectorAll(".custom-nav .done")[i].classList.remove('done') : '';
          }
          document.getElementById(prevTab).click();
        });
      });

      // Step number click
      var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
      tabButtons.forEach(function (button, i) {
        button.setAttribute("data-position", i);
        button.addEventListener("click", function () {
          var getProgreebar = button.getAttribute("data-progressbar");
          if (getProgreebar) {
            var totallength = document.getElementById("custom-progress-bar").querySelectorAll("li").length - 1;
            var current = i;
            var percent = (current / totallength) * 100;
            document.getElementById("custom-progress-bar").querySelector('.progress-bar').style.width = percent + "%";
          }
          (form.querySelectorAll(".custom-nav .done").length > 0) ?
              form.querySelectorAll(".custom-nav .done").forEach(function (doneTab) {
                doneTab.classList.remove('done');
              }) : '';
          for (var j = 0; j <= i; j++) {
            tabButtons[j].classList.contains('active') ? tabButtons[j].classList.remove('done') : tabButtons[j].classList.add('done');
          }
        });
      });
    });
  }
}
</script>
