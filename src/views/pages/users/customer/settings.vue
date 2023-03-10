<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Swal from "sweetalert2";

import {
  getCompanyByName, updateCompany
} from '@/api/customer/CustomerApi.js'

export default {
  page: {
    title: "Setting",
    meta: [{
      name: "description",
    }],
  },
  data() {
    return {
      title: "Setting",
      items: [{
        text: "Velzon",
        href: "/",
      },
        {
          text: "Setting",
          active: true,
        },
      ],
      value: ['javascript'],
      date: null,

      company: {
        id: null,
        name: '',
        address: '',
        phone: '',
        email: '',
      }
    };
  },
  components: {
    Multiselect,
  },
  methods: {
    async updateProfile() {
      let response = await updateCompany({
        id: this.company.id,
        name: this.company.name,
        slug: this.company.slug,
        phone: this.company.phone,
        email: this.company.email,
        address: this.company.address,
      })
      if (response.name === this.company.name) {
        await Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        try {
          await this.$router.push({name: 'customer_profile_settings', params: {company_name: response.slug}})
        } catch {
          alert('error')
        }
      } else {
        await Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  },
  async mounted() {
    let response = await getCompanyByName(this.$route.params.company_name)
    this.company = response.ok ? response.data : {}
  },
  watch: {
    '$route.params.company_name': async function (newVal) {
      let response = await getCompanyByName(newVal)
      this.company = response.ok ? response.data : {}
    }
  }
};
</script>

<template>
  <div class="position-relative mx-n4 mt-n4 bg-success">
    <div class="profile-wid-bg profile-setting-img bg-danger">
      <img src="@/assets/images/profile-bg.jpg" class="profile-wid-img" alt=""/>
      <div class="overlay-content">
        <div class="text-end p-3">
          <div class="p-0 ms-auto rounded-circle profile-photo-edit">
            <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input"/>
            <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
              <i class="ri-image-edit-line align-bottom me-1"></i> Change
              Cover
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-xxl-3">
      <div class="card mt-n5">
        <div class="card-body p-4">
          <div class="text-center">
            <div class="
                  profile-user
                  position-relative
                  d-inline-block
                  mx-auto
                  mb-4
                ">
              <img src="@/assets/images/users/avatar-1.jpg" class="
                    rounded-circle
                    avatar-xl
                    img-thumbnail
                    user-profile-image
                  " alt="user-profile-image"/>
              <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                <input id="profile-img-file-input" type="file" class="profile-img-file-input"/>
                <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                </label>
              </div>
            </div>
            <h5 class="fs-16 mb-1">{{ company.name }}</h5>
            <p class="text-muted mb-0">Customer</p>
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
    <div class="col-xxl-9">
      <div class="card mt-xxl-n5">
        <div class="card-header">
          <ul class="
                nav nav-tabs-custom
                rounded
                card-header-tabs
                border-bottom-0
              " role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                <i class="fas fa-home"></i>
                Personal Details
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
                <i class="far fa-user"></i>
                Change Password
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#experience" role="tab">
                <i class="far fa-envelope"></i>
                Experience
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#privacy" role="tab">
                <i class="far fa-envelope"></i>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div class="card-body p-4">
          <div class="tab-content">
            <div class="tab-pane active" id="personalDetails" role="tabpanel">
              <form @submit.prevent="updateProfile()">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="firstnameInput" class="form-label">First Name</label>
                      <input v-model="company.name" type="text" class="form-control" id="firstnameInput"
                             placeholder="Enter firstname"/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="lastnameInput" class="form-label">Email</label>
                      <input v-model="company.email" type="email" class="form-control" id="lastnameInput"
                             placeholder="Enter email"/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="phonenumberInput" class="form-label">Phone Number</label>
                      <input v-model="company.phone" type="text" class="form-control" id="phonenumberInput"
                             placeholder="Enter phone number"/>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="emailInput" class="form-label">Email Address</label>
                      <input v-model="company.address" type="text" class="form-control" id="emailInput"
                             placeholder="Enter address"/>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3 pb-2">
                      <label for="exampleFormControlTextarea" class="form-label">About</label>
                      <textarea class="form-control" id="exampleFormControlTextarea"
                                placeholder="Enter your description" rows="3">
Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.
                      </textarea>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="hstack gap-2 justify-content-end">
                      <button type="submit" class="btn btn-primary">
                        Updates
                      </button>
                      <button type="button" class="btn btn-soft-success">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!--end tab-pane-->
            <div class="tab-pane" id="changePassword" role="tabpanel">
              <form action="javascript:void(0);">
                <div class="row g-2">
                  <div class="col-lg-4">
                    <div>
                      <label for="oldpasswordInput" class="form-label">Old Password*</label>
                      <input type="password" class="form-control" id="oldpasswordInput"
                             placeholder="Enter current password"/>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-4">
                    <div>
                      <label for="newpasswordInput" class="form-label">New Password*</label>
                      <input type="password" class="form-control" id="newpasswordInput"
                             placeholder="Enter new password"/>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-4">
                    <div>
                      <label for="confirmpasswordInput" class="form-label">Confirm Password*</label>
                      <input type="password" class="form-control" id="confirmpasswordInput"
                             placeholder="Confirm password"/>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <a href="javascript:void(0);" class="link-primary text-decoration-underline">Forgot Password
                        ?</a>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-12">
                    <div class="text-end">
                      <button type="submit" class="btn btn-success">
                        Change Password
                      </button>
                    </div>
                  </div>
                  <!--end col-->
                </div>
                <!--end row-->
              </form>
              <div class="mt-4 mb-3 border-bottom pb-2">
                <div class="float-end">
                  <a href="javascript:void(0);" class="link-primary">All Logout</a>
                </div>
                <h5 class="card-title">Login History</h5>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                    <i class="ri-smartphone-line"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6>iPhone 12 Pro</h6>
                  <p class="text-muted mb-0">
                    Los Angeles, United States - March 16 at 2:47PM
                  </p>
                </div>
                <div>
                  <a href="javascript:void(0);">Logout</a>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                    <i class="ri-tablet-line"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6>Apple iPad Pro</h6>
                  <p class="text-muted mb-0">
                    Washington, United States - November 06 at 10:43AM
                  </p>
                </div>
                <div>
                  <a href="javascript:void(0);">Logout</a>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                    <i class="ri-smartphone-line"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6>Galaxy S21 Ultra 5G</h6>
                  <p class="text-muted mb-0">
                    Conneticut, United States - June 12 at 3:24PM
                  </p>
                </div>
                <div>
                  <a href="javascript:void(0);">Logout</a>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 avatar-sm">
                  <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                    <i class="ri-macbook-line"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6>Dell Inspiron 14</h6>
                  <p class="text-muted mb-0">
                    Phoenix, United States - July 26 at 8:10AM
                  </p>
                </div>
                <div>
                  <a href="javascript:void(0);">Logout</a>
                </div>
              </div>
            </div>
            <!--end tab-pane-->
            <div class="tab-pane" id="experience" role="tabpanel">
              <form>
                <div id="newlink">
                  <div id="1">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label for="jobTitle" class="form-label">Job Title</label>
                          <input type="text" class="form-control" id="jobTitle" placeholder="Job title"
                                 value="Lead Designer / Developer"/>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-lg-6">
                        <div class="mb-3">
                          <label for="companyName" class="form-label">Company Name</label>
                          <input type="text" class="form-control" id="companyName" placeholder="Company name"
                                 value="Themesbrand"/>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-lg-6">
                        <div class="mb-3">
                          <label for="experienceYear" class="form-label">Experience Years</label>
                          <div class="row">
                            <div class="col-lg-5">
                              <Multiselect class="form-control" :close-on-select="true"
                                           :searchable="true" :create-option="true" :options="[
                            { value: '', label: 'Select years' },
                            { value: 'Choice 1', label: '2001' },
                            { value: 'Choice 2', label: '2002' },
                            { value: 'Choice 3', label: '2003' },
                            { value: 'Choice 4', label: '2004' },
                            { value: 'Choice 5', label: '2005' },
                            { value: 'Choice 6', label: '2006' },
                            { value: 'Choice 7', label: '2007' },
                            { value: 'Choice 8', label: '2008' },
                            { value: 'Choice 9', label: '2009' },
                            { value: 'Choice 10', label: '2010' },
                            { value: 'Choice 11', label: '2011' },
                            { value: 'Choice 12', label: '2012' },
                            { value: 'Choice 13', label: '2013' },
                            { value: 'Choice 14', label: '2014' },
                            { value: 'Choice 15', label: '2015' },
                            { value: 'Choice 16', label: '2016' },
                            { value: 'Choice 17', label: '2017' },
                            { value: 'Choice 18', label: '2018' },
                            { value: 'Choice 19', label: '2019' },
                            { value: 'Choice 20', label: '2020' },
                            { value: 'Choice 21', label: '2021' },
                            { value: 'Choice 22', label: '2022' }

                           
                          ]"/>
                            </div>
                            <!--end col-->
                            <div class="col-auto align-self-center">to</div>
                            <!--end col-->
                            <div class="col-lg-5">


                              <Multiselect class="form-control" :close-on-select="true"
                                           :searchable="true" :create-option="true" :options="[
                            { value: '', label: 'Select years' },
                            { value: 'Choice 1', label: '2001' },
                            { value: 'Choice 2', label: '2002' },
                            { value: 'Choice 3', label: '2003' },
                            { value: 'Choice 4', label: '2004' },
                            { value: 'Choice 5', label: '2005' },
                            { value: 'Choice 6', label: '2006' },
                            { value: 'Choice 7', label: '2007' },
                            { value: 'Choice 8', label: '2008' },
                            { value: 'Choice 9', label: '2009' },
                            { value: 'Choice 10', label: '2010' },
                            { value: 'Choice 11', label: '2011' },
                            { value: 'Choice 12', label: '2012' },
                            { value: 'Choice 13', label: '2013' },
                            { value: 'Choice 14', label: '2014' },
                            { value: 'Choice 15', label: '2015' },
                            { value: 'Choice 16', label: '2016' },
                            { value: 'Choice 17', label: '2017' },
                            { value: 'Choice 18', label: '2018' },
                            { value: 'Choice 19', label: '2019' },
                            { value: 'Choice 20', label: '2020' },
                            { value: 'Choice 21', label: '2021' },
                            { value: 'Choice 22', label: '2022' }

                           
                          ]"/>
                            </div>
                            <!--end col-->
                          </div>
                          <!--end row-->
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label for="jobDescription" class="form-label">Job Description</label>
                          <textarea class="form-control" id="jobDescription" rows="3" placeholder="Enter description">
You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. </textarea>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="hstack gap-2 justify-content-end">
                        <a class="btn btn-success" href="javascript:void(0);">Delete</a>
                      </div>
                    </div>
                    <!--end row-->
                  </div>
                </div>
                <div id="newForm" style="display: none"></div>
                <div class="col-lg-12">
                  <div class="hstack gap-2">
                    <button type="button" class="btn btn-success">
                      Update
                    </button>
                    <a href="javascript:void(0);" class="btn btn-primary">Add New</a>
                  </div>
                </div>
                <!--end col-->
              </form>
            </div>
            <!--end tab-pane-->
            <div class="tab-pane" id="privacy" role="tabpanel">
              <div class="mb-4 pb-2">
                <h5 class="card-title text-decoration-underline mb-3">
                  Security:
                </h5>
                <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                  <div class="flex-grow-1">
                    <h6 class="fs-14 mb-1">Two-factor Authentication</h6>
                    <p class="text-muted">
                      Two-factor authentication is an enhanced security
                      meansur. Once enabled, you'll be required to give two
                      types of identification when you log into Google
                      Authentication and SMS are Supported.
                    </p>
                  </div>
                  <div class="flex-shrink-0 ms-sm-3">
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary">Enable Two-facor Authentication</a>
                  </div>
                </div>
                <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                  <div class="flex-grow-1">
                    <h6 class="fs-14 mb-1">Secondary Verification</h6>
                    <p class="text-muted">
                      The first factor is a password and the second commonly
                      includes a text with a code sent to your smartphone, or
                      biometrics using your fingerprint, face, or retina.
                    </p>
                  </div>
                  <div class="flex-shrink-0 ms-sm-3">
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary">Set up secondary method</a>
                  </div>
                </div>
                <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                  <div class="flex-grow-1">
                    <h6 class="fs-14 mb-1">Backup Codes</h6>
                    <p class="text-muted mb-sm-0">
                      A backup code is automatically generated for you when
                      you turn on two-factor authentication through your iOS
                      or Android Twitter app. You can also generate a backup
                      code on twitter.com.
                    </p>
                  </div>
                  <div class="flex-shrink-0 ms-sm-3">
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary">Generate backup codes</a>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <h5 class="card-title text-decoration-underline mb-3">
                  Application Notifications:
                </h5>
                <ul class="list-unstyled mb-0">
                  <li class="d-flex">
                    <div class="flex-grow-1">
                      <label for="directMessage" class="form-check-label fs-14">Direct messages</label>
                      <p class="text-muted">
                        Messages from people you follow
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="directMessage" checked/>
                      </div>
                    </div>
                  </li>
                  <li class="d-flex mt-2">
                    <div class="flex-grow-1">
                      <label class="form-check-label fs-14" for="desktopNotification">
                        Show desktop notifications
                      </label>
                      <p class="text-muted">
                        Choose the option you want as your default setting.
                        Block a site: Next to "Not allowed to send
                        notifications," click Add.
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="desktopNotification"
                               checked/>
                      </div>
                    </div>
                  </li>
                  <li class="d-flex mt-2">
                    <div class="flex-grow-1">
                      <label class="form-check-label fs-14" for="emailNotification">
                        Show email notifications
                      </label>
                      <p class="text-muted">
                        Under Settings, choose Notifications. Under Select an
                        account, choose the account to enable notifications
                        for.
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="emailNotification"/>
                      </div>
                    </div>
                  </li>
                  <li class="d-flex mt-2">
                    <div class="flex-grow-1">
                      <label class="form-check-label fs-14" for="chatNotification">
                        Show chat notifications
                      </label>
                      <p class="text-muted">
                        To prevent duplicate mobile notifications from the
                        Gmail and Chat apps, in settings, turn off Chat
                        notifications.
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="chatNotification"/>
                      </div>
                    </div>
                  </li>
                  <li class="d-flex mt-2">
                    <div class="flex-grow-1">
                      <label class="form-check-label fs-14" for="purchaesNotification">
                        Show purchase notifications
                      </label>
                      <p class="text-muted">
                        Get real-time purchase alerts to protect yourself from
                        fraudulent charges.
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="purchaesNotification"/>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h5 class="card-title text-decoration-underline mb-3">
                  Delete This Account:
                </h5>
                <p class="text-muted">
                  Go to the Data & Privacy section of your profile Account.
                  Scroll to "Your data & privacy options." Delete your Profile
                  Account. Follow the instructions to delete your account :
                </p>
                <div>
                  <input type="password" class="form-control" id="passwordInput" placeholder="Enter your password"
                         value="make@321654987" style="max-width: 265px"/>
                </div>
                <div class="hstack gap-2 mt-3">
                  <a href="javascript:void(0);" class="btn btn-soft-danger">Close & Delete This Account</a>
                  <a href="javascript:void(0);" class="btn btn-light">Cancel</a>
                </div>
              </div>
            </div>
            <!--end tab-pane-->
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>
</template>