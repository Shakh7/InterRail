import store from "@/state/store";

export default [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/account/login.vue"),
        meta: {
            title: "Login",
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    // Redirect to the home page instead
                    next({name: "default"});
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/account/register.vue"),
        meta: {
            title: "Register",
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    // Redirect to the home page instead
                    next({name: "default"});
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
    {
        path: "/forgot-password",
        name: "Forgot password",
        component: () => import("../views/account/forgot-password.vue"),
        meta: {
            title: "Forgot Password",
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    // Redirect to the home page instead
                    next({name: "default"});
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
    {
        path: "/",
        name: "entry",
        meta: {
            title: "Dashboard",
            authRequired: true,
            permissions: ['admin', 'staff', 'client']
        },
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: '/', name: 'HomePage', component: () => import("../views/pages/home/index.vue")}
        ],
    },

    {
        path: "/users/",
        name: "Users",
        meta: {title: "Dashboard", authRequired: true, permissions: ['admin']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: 'list/', name: 'users list', component: () => import("../views/pages/users/list.vue"),}
        ],
    },

    {
        path: "/orders/",
        name: "orders",
        meta: {title: "Orders", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {
                path: '',
                name: 'orders_list',
                meta: {title: "Orders List",},
                component: () => import("../views/pages/orders/list.vue"),
            },
            {
                path: 'create/',
                name: 'order_create',
                meta: {title: "New Order",},
                props: route => ({query: route.query.type}),
                component: () => import("../views/pages/orders/create.vue"),
            },
            {
                path: 'update/:id',
                name: 'orders_update',
                meta: {title: "Orders Update",},
                props: route => ({query: route.query.type}),
                component: () => import("../views/pages/orders/update.vue"),
            },
            {
                path: 'detail/:id',
                name: 'orders_detail',
                meta: {title: "Orders Detail",},
                props: route => ({query: route.query.type}),
                component: () => import("../views/pages/orders/detail.vue"),
            },
        ],
    },

    {
        path: "/rates/",
        name: "Rates",
        meta: {title: "Rates", authRequired: true, permissions: ['admin', 'client']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: '', name: 'rate list', component: () => import("../views/pages/rates/index.vue"),}
        ],
    },

    {
        path: "/general/",
        name: "General",
        meta: {title: "General", authRequired: true, permissions: ['admin']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: 'products/', name: 'products_list', component: () => import("../views/pages/products/index.vue"),},
            {path: 'stations/', name: 'stations_list', component: () => import("../views/pages/general/stations/index.vue"),},
            {path: 'categories/', name: 'categories_list', component: () => import("../views/pages/general/categories/index.vue"),},
            {path: 'counterparties/', name: 'counterparties_list', component: () => import("../views/pages/general/counterparties/index.vue"),},
        ],
    },

    {
        path: "/smgs/",
        name: "Smgs",
        meta: {title: "Smgs List", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: 'list/', name: 'smgs list', component: () => import("../views/pages/smgs/list.vue"),}
        ],
    },


    // ERRORS ERRORS ERRORS

    {
        path: "/errors/403",
        name: "forbidden",
        meta: {title: "Access denied", permissions: ['_all_']},
        component: () => import("../views/auth/errors/ofline.vue"),
    },

    {
        path: "/errors/ofline",
        name: "offline",
        meta: {title: "Access denied", permissions: ['_all_']},
        component: () => import("../views/auth/errors/500.vue"),
    },

    {
        path: '/:pathMatch(.*)*',
        component: () => import("../views/auth/errors/404-cover.vue"),
    }

];