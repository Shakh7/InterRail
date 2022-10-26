<script>
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/rhvddzym.json";

export default {
  components: { lottie: Lottie },
    data() {
        return {
            defaultOptions: { animationData: animationData },
        }
    },
}
</script>

<template>
       <!-- auth-page wrapper -->
        <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <div class="bg-overlay"></div>
            <!-- auth-page content -->
            <div class="auth-page-content overflow-hidden pt-lg-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card overflow-hidden">
                                <div class="row justify-content-center g-0">
                                    <div class="col-lg-6">
                                        <div class="p-lg-5 p-4 auth-one-bg h-100">
                                            <div class="bg-overlay"></div>
                                            <div class="position-relative h-100 d-flex flex-column">
                                                <div class="mb-4">
                                                    <router-link to="/" class="d-block">
                                                        <img src="@/assets/images/logo-light.png" alt="" height="18">
                                                    </router-link>
                                                </div>
                                                <div class="mt-auto">
                                                    <div class="mb-3">
                                                        <i class="ri-double-quotes-l display-4 text-success"></i>
                                                    </div>

                                                    <div id="qoutescarouselIndicators" class="carousel slide" data-bs-ride="carousel">
                                                        <div class="carousel-indicators">
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="0" class="active"
                                                                aria-current="true" aria-label="Slide 1"></button>
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="1"
                                                                aria-label="Slide 2"></button>
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="2"
                                                                aria-label="Slide 3"></button>
                                                        </div>
                                                        <div class="carousel-inner text-center text-white-50 pb-5">
                                                            <div class="carousel-item active">
                                                                <p class="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <p class="fs-15 fst-italic">" The theme is really great with an amazing customer support."</p>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <p class="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- end carousel -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->

                                    <div class="col-lg-6">
                                        <div class="p-lg-5 p-4">
                                            <h5 class="text-primary">Forgot Password?</h5>
                                            <p class="text-muted">Reset password with velzon</p>

                                            <div class="mt-2 text-center">
                                               <lottie
                                                    class="avatar-xl"
                                                    colors="primary:#0ab39c,secondary:#405189"
                                                    :options="defaultOptions"
                                                    :height="120"
                                                    :width="120"
                                                    />
                                            </div>
        
                                            <div class="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                Enter your email and instructions will be sent to you!
                                            </div>
                                            <div class="p-2">
                                                <form>
                                                    <div class="mb-4">
                                                        <label class="form-label">Email</label>
                                                        <input type="email" class="form-control" id="email" placeholder="Enter email address">
                                                    </div>
                                                    
                                                    <div class="text-center mt-4">
                                                        <button class="btn btn-success w-100" type="submit">Send Reset Link</button>
                                                    </div>
                                                </form><!-- end form -->
                                            </div>
    
                                            <div class="mt-5 text-center">
                                                <p class="mb-0">Wait, I remember my password... <router-link to="/auth/signin-cover" class="fw-semibold text-primary text-decoration-underline"> Click here </router-link> </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
                            </div>
                            <!-- end card -->
                        </div>
                        <!-- end col -->
    
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
                                <p class="mb-0">&copy; {{new Date().getFullYear()}} Velzon. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- end Footer -->
        </div>
        <!-- end auth-page-wrapper -->
</template>