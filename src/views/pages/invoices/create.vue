<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';

export default {
  data() {
    return {
      value: null,
      paymentvalue: null,
      value1: null,
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        enableTime: true,
      },
      paymentSign: "$",
      date: null,
      count: 1,
      taxRate: 0.125,
      shippingRate: 65.0,
      discountRate: 0.15,
      inputVal: 0,
      inputVal1: 5,
      products: [],
      allproductdata: [],
      productvalue: null,
      newproductvalue: ['', ''],
      productids: [],
    };
  },
  components: {
    Multiselect,
    flatPickr,
  },
  methods: {
    selectedv(val) {
      if (val) {
        let result = this.allproductdata.findIndex(o => o.name == val)
        var darray = JSON.parse(JSON.stringify(this.newproductvalue));
        for (var i = 1; i <= darray.length; i++) {
          if (darray[i - 1] == val) {
            document.getElementById('productprice' + i).value = this.allproductdata[result].price;
          }
        }
        this.productids.push(this.allproductdata[result]._id);
      }
    },
    createinvoice() {
      var data = {
        company_address: document.getElementById('companyAddress').value,
        postalcode: document.getElementById('companyaddpostalcode').value,
        registration_no: document.getElementById('registrationNumber').value,
        email: document.getElementById('companyEmail').value,
        website: document.getElementById('companyWebsite').value,
        contact: document.getElementById('compnayContactno').value,
        invoiceId: document.getElementById('invoicenoInput').value,
        dat: document.getElementById('invoicedate').value,
        status: document.getElementById('paymentstatus').value,
        billing_name: document.getElementById('billingName').value,
        billing_address: document.getElementById('billingAddress').value,
        billing_phone: document.getElementById('billingPhoneno').value,
        billing_taxno: document.getElementById('billingTaxno').value,
        shipping_name: document.getElementById('shippingName').value,
        shipping_address: document.getElementById('shippingAddress').value,
        shipping_phone: document.getElementById('shippingPhoneno').value,
        shipping_taxno: document.getElementById('shippingTaxno').value,
        sub_total: document.getElementById('cart-subtotal').value,
        estimated_tax: document.getElementById('cart-tax').value,
        discount: document.getElementById('cart-discount').value,
        shipping_charge: document.getElementById('cart-shipping').value,
        card_holder_name: document.getElementById('cardholderName').value,
        card_number: document.getElementById('cardNumber').value,
        total_amount: document.getElementById('amountTotalPay').value,
        notes: document.getElementById('exampleFormControlTextarea1').value,
        productDetails: this.productids,
      }
      axios.post('https://api-node.themesbrand.website/apps/invoice', data).then((data) => {
        console.log(data)
      }).catch((er) => {
        console.log(er)
      });
    },
    new_link() {
      this.newproductvalue[this.count] = '';
      this.count++;
      setTimeout(() => {
        this.remove();
      }, 400)
    },
    remove() {
      document.querySelectorAll(".product-removal a").forEach((el) => {
        el.addEventListener("click", (e) => {
          this.removeItem(e);
          this.resetRow();
          this.count--;
        });
      });
    },
    resetRow() {
      document
          .getElementById("newlink")
          .querySelectorAll("tr")
          .forEach((subItem, index) => {
            var incid = index + 1;
            subItem.querySelector(".product-id").innerHTML = incid;
          });
    },
    removeItem(removeButton) {
      removeButton.target.closest("tr").remove();
      this.recalculateCart();
    },
    recalculateCart() {
      var subtotal = 0;
      setTimeout(() => {
        Array.prototype.forEach.call(
            document.getElementsByClassName("product"),
            (item) => {
              Array.prototype.forEach.call(
                  item.getElementsByClassName("product-line-price"),
                  (e) => {
                    if (e.value) {
                      subtotal += parseFloat(e.value.slice(1));
                    }
                  }
              );
            },
            100
        );

        /* Calculate totals */
        var tax = subtotal * this.taxRate;
        var discount = subtotal * this.discountRate;

        var shipping = subtotal > 0 ? this.shippingRate : 0;
        var total = subtotal + tax + shipping - discount;

        document.getElementById("cart-subtotal").value =
            this.paymentSign + subtotal.toFixed(2);
        document.getElementById("cart-tax").value =
            this.paymentSign + tax.toFixed(2);
        document.getElementById("cart-shipping").value =
            this.paymentSign + shipping.toFixed(2);
        document.getElementById("cart-total").value =
            this.paymentSign + total.toFixed(2);
        document.getElementById("cart-discount").value =
            this.paymentSign + discount.toFixed(2);
        document.getElementById("totalamountInput").value =
            this.paymentSign + total.toFixed(2);
        document.getElementById("amountTotalPay").value =
            this.paymentSign + total.toFixed(2);
      }, 100);
    },
    isData() {

      const plus = document.getElementsByClassName("plus");
      const minus = document.getElementsByClassName("minus");

      if (plus) {
        console.log('dsfsd');
        Array.prototype.forEach.call(plus, (e) => {
          e.addEventListener("click", (event) => {
            console.log(event.target.previousElementSibling.value)

            if (parseInt(e.previousElementSibling.value) < 10) {
              event.target.previousElementSibling.value++;

              var itemAmount =
                  e.parentElement.parentElement.previousElementSibling.querySelector(
                      ".product-price"
                  ).value;

              var priceselection =
                  e.parentElement.parentElement.nextElementSibling.querySelector(
                      ".product-line-price"
                  );
              var productQty =
                  e.parentElement.querySelector(".product-quantity").value;

              this.updateQuantity(productQty, itemAmount, priceselection);
            }
          });
        });
      }

      if (minus) {
        Array.prototype.forEach.call(minus, (e) => {
          e.addEventListener("click", (event) => {
            if (parseInt(e.nextElementSibling.value) > 1) {
              event.target.nextElementSibling.value--;
              var itemAmount =
                  e.parentElement.parentElement.previousElementSibling.querySelector(
                      ".product-price"
                  ).value;
              var priceselection =
                  e.parentElement.parentElement.nextElementSibling.querySelector(
                      ".product-line-price"
                  );
              // var productQty = 1;
              var productQty =
                  e.parentElement.querySelector(".product-quantity").value;
              this.updateQuantity(productQty, itemAmount, priceselection);
            }
          });
        });
      }
    },
    updateQuantity(amount, itemQuntity, priceselection) {
      let linePrice = amount * itemQuntity;
      /* Update line price display and recalc cart totals */
      linePrice = linePrice.toFixed(2);
      priceselection.value = this.paymentSign + linePrice;

      this.recalculateCart();
    },
    amountKeyup() {
      Array.prototype.forEach.call(
          document.getElementsByClassName("product-price"),
          (item) => {
            item.addEventListener("keyup", (e) => {
              let priceselection =
                  item.parentElement.nextElementSibling.nextElementSibling.querySelector(
                      ".product-line-price"
                  );

              let amount = e.target.value;
              let itemQuntity =
                  item.parentElement.nextElementSibling.querySelector(
                      ".product-quantity"
                  ).value;

              this.updateQuantity(amount, itemQuntity, priceselection);
            });
          }
      );
    },
    plusamount() {
      event.target.previousElementSibling.value++;
      var itemAmount =
          event.target.parentElement.parentElement.previousElementSibling.querySelector(
              ".product-price"
          ).value;

      var priceselection =
          event.target.parentElement.parentElement.nextElementSibling.querySelector(
              ".product-line-price"
          );
      var productQty =
          event.target.parentElement.querySelector(".product-quantity").value;

      this.updateQuantity(productQty, itemAmount, priceselection);
    },
    minusamount() {
      event.target.nextElementSibling.value--;
      var itemAmount =
          event.target.parentElement.parentElement.previousElementSibling.querySelector(
              ".product-price"
          ).value;
      var priceselection =
          event.target.parentElement.parentElement.nextElementSibling.querySelector(
              ".product-line-price"
          );
      var productQty =
          event.target.parentElement.querySelector(".product-quantity").value;
      this.updateQuantity(productQty, itemAmount, priceselection);
    }
  },
  watch: {
    newproductvalue() {
      console.log('this.newproductvalue')
    },
    productvalue(value) {
      console.log(this.newproductvalue)
      this.newproductvalue.forEach(e => {
        console.log('the value', e)
      })
      document.getElementById('productprice').value = '';
      if (value) {
        let result = this.allproductdata.findIndex(o => o.name == value)
        document.getElementById('productprice').value = this.allproductdata[result].price;
        this.productids.push(this.allproductdata[result]._id);
      }
    }
  },
  beforeMount() {
    axios.get('https://api-node.themesbrand.website/apps/product').then((data) => {
      this.allproductdata = data.data.data;
      data.data.data.forEach(item => {
        var ndata = {
          value: item.name,
          label: item.name
        }
        this.products.push(ndata)
      });
    }).catch((er) => {
      console.log(er)
    });
  },
  mounted() {
    this.remove();
  },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-xxl-9">
      <div class="card">
        <form class="needs-validation" novalidate>
          <div class="card-body border-bottom border-bottom-dashed p-4">
            <div class="row">
              <div class="col-lg-4">
                <div class="profile-user mx-auto mb-3">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input" required/>
                  <label for="profile-img-file-input" class="d-block" tabindex="0">
                      <span
                          class="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                          style="height: 60px; width: 256px">
                        <img src="http://10.0.2.241:8080/img/interrail-logo.268299c8.png"
                             class="card-logo card-logo-dark user-profile-image img-fluid" alt="logo dark"/>
                        <img src="http://10.0.2.241:8080/img/interrail-logo.268299c8.png"
                             class="card-logo card-logo-light user-profile-image img-fluid" alt="logo light"/>
                      </span>
                  </label>
                </div>
                <div>
                  <div>
                    <label for="companyAddress">Address</label>
                  </div>
                  <div class="mb-2">
                      <textarea class="form-control bg-light border-0" id="companyAddress" rows="3"
                                placeholder="Company Address" required></textarea>
                    <div class="invalid-feedback">Please enter a address</div>
                  </div>
                  <div>
                    <input type="text" class="form-control bg-light border-0" id="companyaddpostalcode" minlength="5"
                           maxlength="6" placeholder="Enter Postal Code" required/>
                    <div class="invalid-feedback">
                      The US zip code must contain 5 digits, Ex. 45678
                    </div>
                  </div>
                </div>
              </div>
              <!--end col-->
              <div class="col-lg-4 ms-auto">
                <div class="mb-2">
                  <input type="text" class="form-control bg-light border-0" id="registrationNumber" maxlength="12"
                         placeholder="Legal Registration No" required/>
                  <div class="invalid-feedback">
                    Please enter a registration no, Ex., 012345678912
                  </div>
                </div>
                <div class="mb-2">
                  <input type="email" class="form-control bg-light border-0" id="companyEmail"
                         placeholder="Email Address" required/>
                  <div class="invalid-feedback">
                    Please enter a valid email, Ex., example@gamil.com
                  </div>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control bg-light border-0" id="companyWebsite" placeholder="Website"
                         required/>
                  <div class="invalid-feedback">
                    Please enter a website, Ex., www.example.com
                  </div>
                </div>
                <div>
                  <input type="text" class="form-control bg-light border-0" data-plugin="cleave-phone"
                         id="compnayContactno" placeholder="Contact No" required/>
                  <div class="invalid-feedback">
                    Please enter a contact number
                  </div>
                </div>
              </div>
            </div>
            <!--end row-->
          </div>
          <div class="card-body p-4">
            <div class="row g-3">
              <div class="col-lg-3 col-sm-6">
                <label for="invoicenoInput">Invoice No</label>
                <input type="text" class="form-control bg-light border-0" id="invoicenoInput" placeholder="Invoice No"
                       value="#VL25000355" readonly/>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-sm-6">
                <div>
                  <label for="date-field">Date</label>

                  <flat-pickr v-model="date" id="invoicedate" placeholder="Select date and time" :config="config"
                              class="form-control bg-light border-light border-0"></flat-pickr>
                </div>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-sm-6">
                <label for="choices-payment-status">Payment Status</label>
                <div class="input-light">
                  <Multiselect class="form-control w-md" id="paymentstatus" v-model="paymentvalue"
                               :close-on-select="true" :searchable="true" :create-option="true" :options="[
                        { value: '', label: 'Select Payment Status' },
                        { value: 'Paid', label: 'Paid' },
                        { value: 'Unpaid', label: 'Unpaid' },
                        { value: 'Refund', label: 'Refund' },
                      ]"/>
                </div>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-sm-6">
                <div>
                  <label for="totalamountInput">Total Amount</label>
                  <input type="text" class="form-control bg-light border-0" id="totalamountInput" placeholder="$0.00"
                         readonly/>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <div class="card-body p-4 border-top border-top-dashed">
            <div class="row">
              <div class="col-lg-4 col-sm-6">
                <div>
                  <label for="billingName" class="text-muted text-uppercase fw-semibold">Billing Address</label>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control bg-light border-0" id="billingName" placeholder="Full Name"
                         required/>
                  <div class="invalid-feedback">Please enter a full name</div>
                </div>
                <div class="mb-2">
                    <textarea class="form-control bg-light border-0" id="billingAddress" rows="3" placeholder="Address"
                              required></textarea>
                  <div class="invalid-feedback">Please enter a address</div>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control bg-light border-0" data-plugin="cleave-phone"
                         id="billingPhoneno" placeholder="(123)456-7890" required/>
                  <div class="invalid-feedback">
                    Please enter a phone number
                  </div>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control bg-light border-0" id="billingTaxno" placeholder="Tax Number"
                         required/>
                  <div class="invalid-feedback">
                    Please enter a tax number
                  </div>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="same" name="same"
                         onchange="billingFunction()"/>
                  <label class="form-check-label" for="same">
                    Will your Billing and Shipping address same?
                  </label>
                </div>
              </div>
              <!--end col-->
              <div class="col-sm-6 ms-auto">
                <div class="row">
                  <div class="col-lg-8">
                    <div>
                      <label for="shippingName" class="text-muted text-uppercase fw-semibold">Shipping Address</label>
                    </div>
                    <div class="mb-2">
                      <input type="text" class="form-control bg-light border-0" id="shippingName"
                             placeholder="Full Name" required/>
                      <div class="invalid-feedback">
                        Please enter a full name
                      </div>
                    </div>
                    <div class="mb-2">
                        <textarea class="form-control bg-light border-0" id="shippingAddress" rows="3"
                                  placeholder="Address" required></textarea>
                      <div class="invalid-feedback">
                        Please enter a address
                      </div>
                    </div>
                    <div class="mb-2">
                      <input type="text" class="form-control bg-light border-0" data-plugin="cleave-phone"
                             id="shippingPhoneno" placeholder="(123)456-7890" required/>
                      <div class="invalid-feedback">
                        Please enter a phone number
                      </div>
                    </div>
                    <div>
                      <input type="text" class="form-control bg-light border-0" id="shippingTaxno"
                             placeholder="Tax Number" required/>
                      <div class="invalid-feedback">
                        Please enter a tax number
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <div class="card-body p-4">
            <div class="table-responsive">
              <table class="invoice-table table table-borderless table-nowrap mb-0">
                <thead class="align-middle">
                <tr class="table-active">
                  <th scope="col" style="width: 50px">#</th>
                  <th scope="col">Product Details</th>
                  <th scope="col" style="width: 152px">
                    <div class="d-flex currency-select input-light align-items-center">
                      Rate

                      <Multiselect class="bg-light" v-model="value1" :close-on-select="true" :searchable="true"
                                   :create-option="true" :options="[
                              { value: '$', label: '($)' },
                              { value: '£', label: '(£)' },
                              { value: '₹', label: '(₹)' },
                              { value: '€', label: '(€)' },
                            ]"/>
                    </div>
                  </th>
                  <th scope="col" style="width: 120px">Quantity</th>
                  <th scope="col" class="text-end" style="width: 150px">
                    Amount
                  </th>
                  <th scope="col" class="text-end" style="width: 105px"></th>
                </tr>
                </thead>
                <tbody id="newlink">

                <tr v-for="n in count" :key="n" :id="n" class="product">
                  <th scope="row" class="product-id">{{ n }}</th>
                  <td class="text-start">
                    <Multiselect class="form-control w-md" v-model="newproductvalue[n-1]" :close-on-select="true"
                                 :searchable="true" :create-option="true" :options="products"
                                 @select="selectedv(newproductvalue[n-1])"/>
                  </td>
                  <td>
                    <input type="number" :id="'productprice'+n" class="form-control product-price bg-light border-0"
                           placeholder="0.00" required/>
                    <div class="invalid-feedback">Please enter a rate</div>
                  </td>
                  <td>
                    <div class="input-step">
                      <button type="button" @click="minusamount(this)">–</button>
                      <input type="number" class="product-quantity" readonly/>
                      <button type="button" @click="plusamount(this)">+</button>
                    </div>
                  </td>
                  <td class="text-end">
                    <div>
                      <input type="text" class="form-control bg-light border-0 product-line-price"
                             placeholder="$0.00" readonly/>
                    </div>
                  </td>
                  <td class="product-removal">
                    <a href="javascript:void(0)" class="btn btn-success">Delete</a>
                  </td>
                </tr>

                </tbody>
                <tr id="newForm" style="display: none"></tr>
                <tr>
                  <td colspan="9">
                    <a @click="new_link" class="btn btn-soft-secondary fw-medium"><i
                        class="ri-add-fill me-1 align-bottom"></i> Add
                      Item</a>
                  </td>
                </tr>
                <tr class="border-top border-top-dashed mt-2">
                  <td colspan="3"></td>
                  <td colspan="2" class="p-0">
                    <table class="table table-borderless table-sm table-nowrap align-middle mb-0">
                      <tbody>
                      <tr>
                        <th scope="row">Sub Total</th>
                        <td style="width: 150px">
                          <input type="text" class="form-control bg-light border-0" id="cart-subtotal"
                                 placeholder="$0.00" readonly/>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Estimated Tax (12.5%)</th>
                        <td>
                          <input type="text" class="form-control bg-light border-0" id="cart-tax"
                                 placeholder="$0.00" readonly/>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Discount
                          <small class="text-muted">(VELZON15)</small>
                        </th>
                        <td>
                          <input type="text" class="form-control bg-light border-0" id="cart-discount"
                                 placeholder="$0.00" readonly/>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Shipping Charge</th>
                        <td>
                          <input type="text" class="form-control bg-light border-0" id="cart-shipping"
                                 placeholder="$0.00" readonly/>
                        </td>
                      </tr>
                      <tr class="border-top border-top-dashed">
                        <th scope="row">Total Amount</th>
                        <td>
                          <input type="text" class="form-control bg-light border-0" id="cart-total"
                                 placeholder="$0.00" readonly/>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <!--end table-->
                  </td>
                </tr>
              </table>
              <!--end table-->
            </div>
            <div class="row mt-3">
              <div class="col-lg-4">
                <div class="mb-2">
                  <label for="choices-payment-type" class="form-label text-muted text-uppercase fw-semibold">Payment
                    Details</label>

                  <div class="input-light">
                    <Multiselect class="form-control w-md" v-model="value" :close-on-select="true" :searchable="true"
                                 :create-option="true" :options="[
                        { value: '', label: 'Payment Method' },
                        { value: 'Mastercard', label: 'Mastercard' },
                        { value: 'Credit Card', label: 'Credit Card' },
                        { value: 'Visa', label: 'Visa' },
                        { value: 'Paypal', label: 'Paypal' },
                      ]"/>
                  </div>
                </div>
                <div class="mb-2">
                  <input class="form-control bg-light border-0" type="text" id="cardholderName"
                         placeholder="Card Holder Name"/>
                </div>
                <div class="mb-2">
                  <input class="form-control bg-light border-0" type="text" id="cardNumber"
                         placeholder="xxxx xxxx xxxx xxxx"/>
                </div>
                <div>
                  <input class="form-control bg-light border-0" type="text" id="amountTotalPay" placeholder="$0.00"
                         readonly/>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
            <div class="mt-4">
              <label for="exampleFormControlTextarea1"
                     class="form-label text-muted text-uppercase fw-semibold">NOTES</label>
              <textarea class="form-control alert alert-info" id="exampleFormControlTextarea1" placeholder="Notes"
                        rows="2"
                        required>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</textarea>
            </div>
            <div class="hstack gap-2 justify-content-end d-print-none mt-4">
              <button type="button" class="btn btn-success" @click="createinvoice">
                <i class="ri-printer-line align-bottom me-1"></i> Save
              </button>
              <a href="javascript:void(0);" class="btn btn-primary"><i
                  class="ri-download-2-line align-bottom me-1"></i> Download
                Invoice</a>
              <a href="javascript:void(0);" class="btn btn-danger"><i
                  class="ri-send-plane-fill align-bottom me-1"></i> Send
                Invoice</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!--end col-->
  </div>
  <!--end row-->
</template>