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
        path: "/account/",
        name: "Users",
        meta: {title: "Users List", authRequired: true, permissions: ['admin']},
        component: () => import("../layouts/layout.vue"),
        redirect: {name: "users_list"},
        children: [
            {path: 'users/', name: 'users_list', component: () => import("../views/pages/users/UsersList.vue"),},
            {
                path: 'managers/',
                name: 'managers_list',
                component: () => import("../views/pages/users/ManagersList.vue"),
            },
            {path: 'clients/', name: 'clients_list', component: () => import("../views/pages/users/ClientsList.vue"),}
        ],
    },

    {
        path: "/orders/",
        name: "orders",
        meta: {title: "Orders", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        redirect: {name: "order_container_list"},
        children: [
            {
                path: 'container/',
                name: 'order_container_list',
                meta: {title: "Container Orders List",},
                component: () => import("../views/pages/orders/container/list.vue"),
            },
            {
                path: 'wagon/',
                name: 'order_wagon_list',
                meta: {title: "Wagon Orders List",},
                component: () => import("../views/pages/orders/wagon/list.vue"),
            },
            {
                path: 'empty-wagon/',
                name: 'order_empty_wagon_list',
                meta: {title: "Empty Wagon Orders List",},
                component: () => import("../views/pages/orders/empty_wagon/list.vue"),
            },
            {
                path: 'create-container/',
                name: 'create_container',
                meta: {title: "Container Order",},
                component: () => import("../views/pages/orders/container/create.vue"),
            },
            {
                path: 'create-wagon/',
                name: 'create_wagon',
                meta: {title: "Wagon Order",},
                component: () => import("../views/pages/orders/wagon/create.vue"),
            },
            {
                path: 'create-empty-wagon/',
                name: 'create_empty_wagon',
                meta: {title: "Empty Wagon Order",},
                component: () => import("../views/pages/orders/empty_wagon/create.vue"),
            },
            {
                path: 'container/update/:id',
                name: 'orders_container_update',
                meta: {title: "Container Orders Update",},
                component: () => import("../views/pages/orders/container/update.vue"),
            },
            {
                path: 'wagon/update/:id',
                name: 'orders_wagon_update',
                meta: {title: "Wagon Orders Update",},
                component: () => import("../views/pages/orders/wagon/update.vue"),
            },
            {
                path: 'empty-wagon/update/:id',
                name: 'orders_empty_wagon_update',
                meta: {title: "Empty Wagon Orders Update",},
                component: () => import("../views/pages/orders/empty_wagon/update.vue"),
            },
            {
                path: 'empty-wagon/update/:id',
                name: 'orders_empty-wagon_update',
                meta: {title: "Empty Wagon Orders Update",},
                component: () => import("../views/pages/orders/wagon/update.vue"),
            },
            {
                path: 'container/view/:id',
                name: 'orders_container_detail',
                meta: {title: "Container Order Detail",},
                component: () => import("../views/pages/orders/container/detail.vue"),
            },
            {
                path: 'wagon/view/:id',
                name: 'orders_wagon_detail',
                meta: {title: "Wagon Order Detail",},
                component: () => import("../views/pages/orders/wagon/detail.vue"),
            },
            {
                path: 'empty-wagon/view/:id',
                name: 'orders_empty_wagon_detail',
                meta: {title: "Empty Wagon Order Detail",},
                component: () => import("../views/pages/orders/empty_wagon/detail.vue"),
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
        redirect: {name: "products_list"},
        children: [
            {path: 'products/', name: 'products_list', component: () => import("../views/pages/products/index.vue"),},
            {
                path: 'stations/',
                name: 'stations_list',
                component: () => import("../views/pages/general/stations/index.vue"),
            },
            {
                path: 'categories/',
                name: 'categories_list',
                component: () => import("../views/pages/general/categories/index.vue"),
            },
            {
                path: 'counterparties/',
                name: 'counterparties_list',
                component: () => import("../views/pages/general/counterparties/index.vue"),
            },
        ],
    },

    {
        path: "/smgs/",
        name: "Smgs",
        meta: {title: "Smgs List", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        redirect: {name: "smgs_list"},
        children: [
            {path: 'list/', name: 'smgs_list', component: () => import("../views/pages/smgs/list.vue"),}
        ],
    },

    {
        path: "/invoices/",
        name: "Invoices",
        meta: {title: "Invoices List", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        children: [
            {path: 'list/', name: 'invoices_list', component: () => import("../views/pages/invoices/index.vue"),},
            {path: 'create/', name: 'invoices_create', component: () => import("../views/pages/invoices/create.vue"),}
        ],
    },

    {
        path: "/counterparty/",
        name: "Counterparty",
        meta: {title: "Counterparty List", authRequired: true, permissions: ['admin', 'staff', 'client']},
        component: () => import("../layouts/layout.vue"),
        redirect: {name: "counterparty_list"},
        children: [
            {
                path: 'list/',
                name: 'counterparty_list',
                component: () => import("../views/pages/counterparties/index.vue"),
            }
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