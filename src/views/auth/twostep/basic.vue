<script>
    export default {

    }
</script>

<template>
    <div class="auth-page-wrapper pt-5">
        <!-- auth page bg -->
        <!-- auth page bg -->
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
            <Particles id="tsparticles" :options="{
          particles: {
            number: {
              value: 90,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: false,
                speed: 4,
                size_min: 0.2,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 4,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          config_demo: {
            hide_card: false,
            background_color: '#b61924',
            background_image: '',
            background_position: '50% 50%',
            background_repeat: 'no-repeat',
            background_size: 'cover',
          },
        }" />
        </div>

        <!-- auth page content -->
        <div class="auth-page-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <router-link to="/" class="d-inline-block auth-logo">
                                    <img src="@/assets/images/logo-light.png" alt="" height="20">
                                </router-link>
                            </div>
                            <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card mt-4">

                            <div class="card-body p-4">
                                <div class="mb-4">
                                    <div class="avatar-lg mx-auto">
                                        <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                                            <i class="ri-mail-line"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-2 mt-4">
                                    <div class="text-muted text-center mb-4 mx-lg-3">
                                        <h4 class="">Verify Your Email</h4>
                                        <p>Please enter the 4 digit code sent to <span
                                                class="fw-semibold">example@abc.com</span></p>
                                    </div>

                                    <form>
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="mb-3">
                                                    <label for="digit1-input" class="visually-hidden">Dight 1</label>
                                                    <input type="text"
                                                        class="form-control form-control-lg bg-light border-light text-center"
                                                        onkeyup="moveToNext(this, 2)" maxLength="1" id="digit1-input">
                                                </div>
                                            </div><!-- end col -->

                                            <div class="col-3">
                                                <div class="mb-3">
                                                    <label for="digit2-input" class="visually-hidden">Dight 2</label>
                                                    <input type="text"
                                                        class="form-control form-control-lg bg-light border-light text-center"
                                                        onkeyup="moveToNext(this, 3)" maxLength="1" id="digit2-input">
                                                </div>
                                            </div><!-- end col -->

                                            <div class="col-3">
                                                <div class="mb-3">
                                                    <label for="digit3-input" class="visually-hidden">Dight 3</label>
                                                    <input type="text"
                                                        class="form-control form-control-lg bg-light border-light text-center"
                                                        onkeyup="moveToNext(this, 4)" maxLength="1" id="digit3-input">
                                                </div>
                                            </div><!-- end col -->

                                            <div class="col-3">
                                                <div class="mb-3">
                                                    <label for="digit4-input" class="visually-hidden">Dight 4</label>
                                                    <input type="text"
                                                        class="form-control form-control-lg bg-light border-light text-center"
                                                        onkeyup="moveToNext(this, 4)" maxLength="1" id="digit4-input">
                                                </div>
                                            </div><!-- end col -->
                                        </div>
                                    </form><!-- end form -->

                                    <div class="mt-3">
                                        <button type="button" class="btn btn-success w-100">Confirm</button>
                                    </div>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->

                        <div class="mt-4 text-center">
                            <p class="mb-0">Didn't receive a code ? <router-link to="/auth/reset-pwd-basic"
                                    class="fw-semibold text-primary text-decoration-underline">Resend</router-link>
                            </p>
                        </div>

                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end auth page content -->

        <!-- footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">&copy; {{new Date().getFullYear()}} Velzon. Crafted with <i
                                    class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
</template>