<script>
import animationData from "@/components/widgets/spxnqpau.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
    data() {
        return {
       defaultOptions: { animationData: animationData },
        };
    },
     components: {
         lottie: Lottie
     }
}
</script>

<template>
     <!-- auth-page wrapper -->
        <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <div class="bg-overlay"></div>
            <!-- auth-page content -->
            <div class="auth-page-content overflow-hidden pt-lg-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-5">
                            <div class="card overflow-hidden">
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        
                                          <lottie
                                                colors="primary:#405189,secondary:#0ab39c"
                                                :options="defaultOptions"
                                                style="height:7.5rem;width:7.5rem;"

                                                />
                                        <h1 class="text-primary mb-4">Oops !</h1>
                                        <h4 class="text-uppercase">Sorry, Page not Found 😭</h4>
                                        <p class="text-muted mb-4">The page you are looking for not available!</p>
                                        <router-link to="/" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</router-link>
                                    </div>
                                </div>
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
        </div>
        <!-- end auth-page-wrapper -->
</template>