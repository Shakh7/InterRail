<script>
    export default {
        methods: {
            validatePassword() {
                // passowrd match
                var password = document.getElementById("password-input"),
                    confirm_password = document.getElementById("confirm-password-input");

                //Password validation

                if (password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                } else {
                    confirm_password.setCustomValidity("");
                }
            }
        },
        mounted() {
            var password = document.getElementById("password-input")
            password.onchange = this.validatePassword;
            document.querySelectorAll("form .auth-pass-inputgroup")
                .forEach(function (item) {
                    item.querySelectorAll(".password-addon").forEach(function (subitem) {
                        subitem.addEventListener("click", function () {
                            var passwordInput = item.querySelector(".password-input");
                            if (passwordInput.type === "password") {
                                passwordInput.type = "text";
                            } else {
                                passwordInput.type = "password";
                            }
                        });
                    });
                });



            var myInput = document.getElementById("password-input");
            var letter = document.getElementById("pass-lower");
            var capital = document.getElementById("pass-upper");
            var number = document.getElementById("pass-number");
            var length = document.getElementById("pass-length");

            // When the user clicks on the password field, show the message box
            myInput.onfocus = function () {
                document.getElementById("password-contain").style.display = "block";
            };

            // When the user clicks outside of the password field, hide the password-contain box
            myInput.onblur = function () {
                document.getElementById("password-contain").style.display = "none";
            };

            // When the user starts to type something inside the password field
            myInput.onkeyup = function () {
                // Validate lowercase letters
                var lowerCaseLetters = /[a-z]/g;
                if (myInput.value.match(lowerCaseLetters)) {
                    letter.classList.remove("invalid");
                    letter.classList.add("valid");
                } else {
                    letter.classList.remove("valid");
                    letter.classList.add("invalid");
                }

                // Validate capital letters
                var upperCaseLetters = /[A-Z]/g;
                if (myInput.value.match(upperCaseLetters)) {
                    capital.classList.remove("invalid");
                    capital.classList.add("valid");
                } else {
                    capital.classList.remove("valid");
                    capital.classList.add("invalid");
                }

                // Validate numbers
                var numbers = /[0-9]/g;
                if (myInput.value.match(numbers)) {
                    number.classList.remove("invalid");
                    number.classList.add("valid");
                } else {
                    number.classList.remove("valid");
                    number.classList.add("invalid");
                }

                // Validate length
                if (myInput.value.length >= 8) {
                    length.classList.remove("invalid");
                    length.classList.add("valid");
                } else {
                    length.classList.remove("valid");
                    length.classList.add("invalid");
                }
            };
        },

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
                                <a href="/" class="d-inline-block auth-logo">
                                    <img src="@/assets/images/logo-light.png" alt="" height="20">
                                </a>
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
                                    <h5 class="text-primary">Create new password</h5>
                                    <p class="text-muted">Your new password must be different from previous used
                                        password.</p>
                                </div>

                                <div class="p-2">
                                    <form>
                                        <div class="mb-3">
                                            <label class="form-label" for="password-input">Password</label>
                                            <div class="position-relative auth-pass-inputgroup">
                                                <input type="password" class="form-control pe-5 password-input"
                                                    onpaste="return false" placeholder="Enter password"
                                                    id="password-input" aria-describedby="passwordInput"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                                                <button
                                                    class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button" id="password-addon"><i
                                                        class="ri-eye-fill align-middle"></i></button>
                                            </div>
                                            <div id="passwordInput" class="form-text">Must be at least 8 characters.
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="confirm-password-input">Confirm
                                                Password</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input type="password" class="form-control pe-5 password-input"
                                                    onpaste="return false" placeholder="Confirm password"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    id="confirm-password-input" required>
                                                <button
                                                    class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button" id="confirm-password-input"><i
                                                        class="ri-eye-fill align-middle"></i></button>
                                            </div>
                                        </div>

                                        <div id="password-contain" class="p-3 bg-light mb-2 rounded">
                                            <h5 class="fs-13">Password must contain:</h5>
                                            <p id="pass-length" class="invalid fs-12 mb-2">Minimum <b>8 characters</b>
                                            </p>
                                            <p id="pass-lower" class="invalid fs-12 mb-2">At <b>lowercase</b> letter
                                                (a-z)</p>
                                            <p id="pass-upper" class="invalid fs-12 mb-2">At least <b>uppercase</b>
                                                letter (A-Z)</p>
                                            <p id="pass-number" class="invalid fs-12 mb-0">A least <b>number</b> (0-9)
                                            </p>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""
                                                id="auth-remember-check">
                                            <label class="form-check-label" for="auth-remember-check">Remember
                                                me</label>
                                        </div>

                                        <div class="mt-4">
                                            <button class="btn btn-success w-100" @click="validatepassword"
                                                type="submit">Reset Password</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->

                        <div class="mt-4 text-center">
                            <p class="mb-0">Wait, I remember my password... <a href="auth-signin-basic"
                                    class="fw-semibold text-primary text-decoration-underline"> Click here </a> </p>
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