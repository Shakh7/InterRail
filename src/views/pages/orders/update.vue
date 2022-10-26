<script>
import animationData from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
  data() {
    return {
      defaultOptions: {animationData: animationData},
      order: {
        id: 1,
        order_number: "1000",
        lot_number: "e-1000",
        position: "rail_forwarder",
        order_type: "export",
        customer: "jennifer_carter",
        date: "2022-07-28",
        manager: "1",
        payment_status: "reserved",

        shipper: "АO “UZ AUTO MOTORS”",
        consignee: "OOO “AZERMASH PARK”",
        departure: "Tashkent",
        departure_code: "723507",
        destination: "Баку Торговая",
        destination_code: "547209",
        border_crossing: "Border crossing",
        conditions_of_carriage: "Conditions of carriage",
        rolling_stock: "Rolling stock",
        shipment_status: "in_process",
        departure_country: "Узбекистан",
        destination_country: "Азербайджан",
        comment: "This is a comment for order 1000",
        counterparties: {
          x_times: 1
        }
      }
    };
  },
  components: {
    lottie: Lottie
  },
  methods: {
    setOrderType(name) {
      this.order.type = name
    }
  },
  computed: {
    currentRoute() {
      this.setOrderType(this.$route.query.type)
      return this.$route;
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0">Create {{ currentRoute.query.type }} order</h4>
        </div>
        <div class="card-body form-steps">
          <form class="vertical-navs-step">
            <div class="row gy-5">
              <div class="col-lg-3">
                <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                  <button class="nav-link active done" id="v-pills-order-info-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-order-info" type="button" role="tab"
                          aria-controls="v-pills-order-info" aria-selected="true">
                    <span class="step-title me-2">
                      <i class="ri-close-circle-fill step-icon me-2"></i>
                      Step 1
                    </span>
                    Order Info
                  </button>
                  <button class="nav-link" id="v-pills-order-step-2-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-order-step-2" type="button" role="tab"
                          aria-controls="v-pills-order-step-2" aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 2
                                                            </span>
                    Product info
                  </button>
                  <button class="nav-link" id="v-pills-payment-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-payment" type="button" role="tab" aria-controls="v-pills-payment"
                          aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 3
                                                            </span>
                    Counterparty info
                  </button>
                  <button class="nav-link" id="v-pills-finish-tab" data-bs-toggle="pill"
                          data-bs-target="#v-pills-finish" type="button" role="tab" aria-controls="v-pills-finish"
                          aria-selected="false">
                                                            <span class="step-title me-2">
                                                                <i class="ri-close-circle-fill step-icon me-2"></i>
                                                                Step 4
                                                            </span>
                    Finish
                  </button>
                </div>

                <!-- end nav -->
              </div>
              <div class="col-lg-9">
                <div class="px-lg-4">
                  <div class="tab-content">
                    <div class="tab-pane fade show active" id="v-pills-order-info" role="tabpanel"
                         aria-labelledby="v-pills-order-info-tab">

                      <div>
                        <div class="row g-3">

                          <div class="col-md-4">
                            <label class="form-label">Order number</label>
                            <input v-model="order.order_number" type="number" class="form-control"
                                   placeholder="Enter order number">
                          </div>

                          <div class="col-md-4">
                            <label for="lotNumber" class="form-label">Lot number</label>
                            <input type="text" class="form-control" v-model="order.lot_number"
                                   id="lotNumber" placeholder="Enter lot number">
                          </div>

                          <div class="col-md-4 mb-3">
                            <label for="position" class="form-label">Position</label>
                            <select class="form-select" aria-label="order position" v-model="order.position">
                              <option selected disabled>Select position</option>
                              <option value="rail_forwarder">Rail forwarder</option>
                              <option value="block_train">Block train</option>
                              <option value="multi_modal">Multi modal</option>
                            </select>
                          </div>

                          <div class="col-md-4">
                            <label for="shipper" class="form-label">Shipper</label>
                            <input type="text" class="form-control" v-model="order.shipper"
                                   id="shipper" placeholder="Shipper">
                          </div>

                          <div class="col-md-4">
                            <label for="consignee" class="form-label">Consignee</label>
                            <input type="text" class="form-control" v-model="order.consignee"
                                   id="consignee" placeholder="Consignee">
                          </div>

                          <div class="col-md-4 mb-3">
                            <label for="orderType" class="form-label">Order type</label>
                            <select class="form-select" aria-label="order type select" v-model="order.order_type">
                              <option selected disabled>Select order type</option>
                              <option value="import">Import</option>
                              <option value="export">Export</option>
                              <option value="transit">Transit</option>
                            </select>
                          </div>

                          <div class="col-md-7">
                            <label for="departure" class="form-label">Departure</label>
                            <input type="text" class="form-control" v-model="order.departure"
                                   id="departure" placeholder="Departure">
                          </div>

                          <div class="col-md-5 mb-3">
                            <label for="departure_code" class="form-label">Departure code</label>
                            <input type="number" class="form-control" v-model="order.departure_code"
                                   id="departure_code" placeholder="Departure code">
                          </div>

                          <div class="col-md-7">
                            <label for="destination" class="form-label">Destination</label>
                            <input type="text" class="form-control" v-model="order.destination"
                                   id="destination" placeholder="Destination">
                          </div>

                          <div class="col-md-5">
                            <label for="destination_code" class="form-label">Destination code</label>
                            <input type="number" class="form-control"
                                   id="destination_code" v-model="order.destination_code"
                                   placeholder="Destination code">
                          </div>

                        </div>
                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab
                            nexttab" data-nexttab="v-pills-order-step-2-tab">
                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                          Go to next
                        </button>
                      </div>

                    </div>
                    <!-- end tab pane -->
                    <div class="tab-pane fade" id="v-pills-order-step-2" role="tabpanel"
                         aria-labelledby="v-pills-order-step-2-tab">

                      <div>
                        <div class="row g-3">

                          <div class="col-md-4">
                            <label class="form-label">Border crossing</label>
                            <input type="text" class="form-control" v-model="order.border_crossing"
                                   placeholder="Border crossing">
                          </div>

                          <div class="col-md-4">
                            <label class="form-label">Conditions of carriage</label>
                            <input type="text" class="form-control" v-model="order.conditions_of_carriage"
                                   placeholder="Conditions of carriage">
                          </div>

                          <div class="col-md-4 mb-3">
                            <label class="form-label">Rolling stock</label>
                            <input type="text" class="form-control" v-model="order.rolling_stock"
                                   placeholder="Rolling stock">
                          </div>

                          <div class="col-md-4">
                            <label for="shipment_status" class="form-label">Shipment status</label>
                            <select class="form-select" id="shipment_status" v-model="order.shipment_status">
                              <option selected disabled>Select shipment status</option>
                              <option value="in_process">In process</option>
                              <option value="delivered">Delivered</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div class="col-md-4">
                            <label for="payment_status" class="form-label">Payment status</label>
                            <select class="form-select" id="payment_status" v-model="order.payment_status">
                              <option selected disabled>Select payment status</option>
                              <option value="reserved">Reserved</option>
                              <option value="issued">Issued</option>
                              <option value="received">Received</option>
                            </select>
                          </div>

                          <div class="col-md-4 mb-3">
                            <label for="date" class="form-label">Date</label>
                            <input type="date" class="form-control" id="date" v-model="order.date">
                          </div>

                          <div class="col-md-4">
                            <label class="form-label">Departure country</label>
                            <input type="text" class="form-control" v-model="order.departure_country"
                                   placeholder="Departure country">
                          </div>

                          <div class="col-md-4">
                            <label class="form-label">Destination country</label>
                            <input type="text" class="form-control" v-model="order.destination_country"
                                   placeholder="Destination country">
                          </div>

                          <div class="col-md-4 mb-3">
                            <label for="payment_status" class="form-label">Customer</label>
                            <select class="form-select" id="payment_status" v-model="order.customer">
                              <option selected disabled>Select payment status</option>
                              <option value="frank_hook">Frank Hook</option>
                              <option value="jennifer_carter">Jennifer Carter</option>
                              <option value="donald_palmer">Donald Palmer</option>
                            </select>
                          </div>

                          <div class="col-12">
                            <label for="comment" class="form-label">Comment</label>
                            <textarea class="form-control" id="comment" rows="4" v-model="order.comment"
                                      placeholder="Enter comment here.."></textarea>
                          </div>

                        </div>

                        <hr class="my-4 text-muted">

                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" id="save-info">
                          <label class="form-check-label" for="save-info">Save this information for next
                            time</label>
                        </div>

                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab"
                                data-previous="v-pills-bill-info-tab"><i
                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to Order Info
                        </button>
                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab
nexttab" data-nexttab="v-pills-payment-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to
                          counterparty
                        </button>
                      </div>

                    </div>
                    <!-- end tab pane -->
                    <div class="tab-pane fade" id="v-pills-payment" role="tabpanel"
                         aria-labelledby="v-pills-payment-tab">
                      <!--                      <div>-->
                      <!--                        <h5>Counterparty details</h5>-->
                      <!--                        <p class="text-muted">Fill all information below</p>-->
                      <!--                      </div>-->

                      <div>
                        <!--                        <div class="my-3">-->
                        <!--                          <div class="form-check form-check-inline">-->
                        <!--                            <input id="credit" name="paymentMethod" type="radio" class="form-check-input"-->
                        <!--                                   checked-->
                        <!--                                   required>-->
                        <!--                            <label class="form-check-label" for="credit">Credit card</label>-->
                        <!--                          </div>-->
                        <!--                          <div class="form-check form-check-inline">-->
                        <!--                            <input id="debit" name="paymentMethod" type="radio" class="form-check-input"-->
                        <!--                                   required>-->
                        <!--                            <label class="form-check-label" for="debit">Debit card</label>-->
                        <!--                          </div>-->
                        <!--                          <div class="form-check form-check-inline">-->
                        <!--                            <input id="paypal" name="paymentMethod" type="radio" class="form-check-input"-->
                        <!--                                   required>-->
                        <!--                            <label class="form-check-label" for="paypal">PayPal</label>-->
                        <!--                          </div>-->
                        <!--                        </div>-->

                        <div class="row gy-3" v-for="c in order.counterparties.x_times" :key="c">

                          <div class="col-md-4">
                            <label for="containerType" class="form-label">Container type</label>
                            <select class="form-select" aria-label="order position">
                              <option selected disabled>Select container type</option>
                              <option value="20">20</option>
                              <option value="20HC">20HC</option>
                              <option value="40">40</option>
                              <option value="40HC">40HC</option>
                              <option value="45">45</option>
                            </select>
                          </div>

                          <div class="col-md-4">
                            <label class="form-label">Quantity</label>
                            <input type="number" class="form-control"
                                   placeholder="Quantity">
                          </div>

                          <div class="col-md-4 mb-4">
                            <label class="form-label">Agreed rate</label>
                            <input type="number" class="form-control"
                                   placeholder="Agreed rate">
                          </div>

                        </div>

                        <div>
                          <button type="button" class="btn btn-soft-success btn-label previestab"
                                  data-previous="v-pills-order-step-2-tab" @click="order.counterparties.x_times++">
                            <i class=" ri-add-fill label-icon align-middle fs-16 me-2"></i> Add
                          </button>
                        </div>

                      </div>

                      <div class="d-flex align-items-start gap-3 mt-4">
                        <button type="button" class="btn btn-light btn-label previestab"
                                data-previous="v-pills-order-step-2-tab"><i
                            class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to product
                          Info
                        </button>

                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab"
                                data-nexttab="v-pills-finish-tab">
                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> Order Complete
                        </button>

                      </div>
                    </div>
                    <!-- end tab pane -->
                    <div class="tab-pane" id="v-pills-finish" role="tabpanel"
                         aria-labelledby="v-pills-finish-tab">
                      <div class="text-center pt-4 pb-2">

                        <div class="mb-4">
                          <lottie
                              colors="primary:#0ab39c,secondary:#405189"
                              :options="defaultOptions"
                              :height="120"
                              :width="120"
                          />
                        </div>
                        <h5>Your Order is Completed !</h5>
                        <p class="text-muted">You Will receive an order confirmation email with details of your
                          order.</p>
                      </div>
                    </div>
                    <!-- end tab pane -->
                  </div>
                </div>
              </div>
              <!--              <div class="col-lg-3">-->
              <!--                <div class="d-flex justify-content-between align-items-center mb-3">-->
              <!--                  <h5 class="fs-14 text-primary mb-0"><i class="ri-shopping-cart-fill align-middle me-2"></i> Your-->
              <!--                    cart</h5>-->
              <!--                  <span class="badge bg-danger rounded-pill">3</span>-->
              <!--                </div>-->
              <!--                <ul class="list-group mb-3">-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Order number</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">{{ order.number }}</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Second product</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">$8</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between lh-sm">-->
              <!--                    <div>-->
              <!--                      <h6 class="my-0">Third item</h6>-->
              <!--                      <small class="text-muted">Brief description</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-muted">$5</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between bg-light">-->
              <!--                    <div class="text-success">-->
              <!--                      <h6 class="my-0">Discount code</h6>-->
              <!--                      <small>−$5 Discount</small>-->
              <!--                    </div>-->
              <!--                    <span class="text-success">−$5</span>-->
              <!--                  </li>-->
              <!--                  <li class="list-group-item d-flex justify-content-between">-->
              <!--                    <span>Total (USD)</span>-->
              <!--                    <strong>$20</strong>-->
              <!--                  </li>-->
              <!--                </ul>-->
              <!--              </div>-->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>