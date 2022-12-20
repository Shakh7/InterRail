<script>
import Layout from "./main.vue";
// import PageHeader from "@/components/page-header";
import appConfig from "../../app.config.json";

export default {
    page: {
        title: "Starter",
        meta: [{ name: "description", content: appConfig.description }],
    },
    data() {
        return {
            title: "Dashboard",
            items: [
                {
                    text: "Home",
                    href: "/",
                },
                {
                    text: "Dashboard",
                    active: true,
                },
            ],
        };
    },
    components: {
        Layout,
        // PageHeader,
    },
};
</script>
    
<template>
    <Layout>
        <router-view/>
    </Layout>
</template>