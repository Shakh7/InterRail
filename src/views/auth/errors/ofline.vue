<script>
    export default {

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
                                    <img src="@/assets/images/auth-offline.gif" alt="" height="210">
                                    <h3 class="mt-4 fw-semibold">Access Denied</h3>
                                    <p class="text-muted mb-4 fs-14">You may not have sufficient privileges to access this page. If you continue to have problems, please contact the website administration.</p>
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