<script>
    import Lottie from "@/components/widgets/lottie.vue";
    import animationData from "@/components/widgets/rhvddzym.json";

    export default {
        components: {
            lottie: Lottie
        },
        data() {
            return {
                defaultOptions: {
                    animationData: animationData
                },
            }
        }
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
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Forgot Password?</h5>
                                    <p class="text-muted">Reset password with velzon</p>

                                    <lottie class="avatar-xl" colors="primary:#0ab39c,secondary:#405189"
                                        :options="defaultOptions" :height="120" :width="120" />

                                </div>

                                <div class="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                    Enter your email and instructions will be sent to you!
                                </div>
                                <div class="p-2">
                                    <form>
                                        <div class="mb-4">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email"
                                                placeholder="Enter Email">
                                        </div>

                                        <div class="text-center mt-4">
                                            <button class="btn btn-success w-100" type="submit">Send Reset Link</button>
                                        </div>
                                    </form><!-- end form -->
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->

                        <div class="mt-4 text-center">
                            <p class="mb-0">Wait, I remember my password... <router-link to="/auth/signin-basic"
                                    class="fw-semibold text-primary text-decoration-underline"> Click here
                                </router-link>
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