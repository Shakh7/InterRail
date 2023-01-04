export const state = {
    orders_lists: [],
    currentlyUpdating: [],
};

// export const getters = {
//     todos: state => state.todos,
// };

export const mutations = {
    setOrders(state, newValue) {
        state.orders = newValue
    },
    setUpdatingOrder(state, newValue) {
        state.currentlyUpdating = newValue
    },
    updateUpdatingOrder(state, newValue) {
        state.currentlyUpdating = newValue
    },
};

export const actions = {
    setCurrentlyUpdating({commit}, order) {
        commit('setUpdatingOrder', order)
    },
    async updateCurrentUpdating({commit}, order_data) {
        let order = order_data['order']
        let update_order_type = order_data['type']

        let order_payment_status = order.payment_status.toLowerCase()

        let order_position = order.position.toLowerCase().replace(' ', '_')

        let order_shipment_status = order.shipment_status.toLowerCase().replace(' ', '_')

        let order_type = order.type.toLowerCase()

        let thisorder = {
            lot_number: order.lot_number,
            date: order.date,
            position: order_position,
            type: order_type,
            shipment_status: order_shipment_status,
            payment_status: order_payment_status,
            shipper: order.shipper,
            consignee: order.consignee,
            departure_id: order.departure_id,
            destination_id: order.destination_id,
            border_crossing: order.border_crossing,
            conditions_of_carriage: order.conditions_of_carriage,
            rolling_stock: order.rolling_stock,
            departure_country: order.departure_country,
            destination_country: order.destination_country,
            comment: order.comment,
            manager: order.manager,
            customer: order.customer
        }

        let return_response = ''

        if (update_order_type === 'wagon') {
            let product_id = order_data['product']
            let quantity = order_data['quantity']
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/update/${order.order_number}/`, {
                method: "PUT",
                body: JSON.stringify({
                    order: thisorder,
                    product_id: product_id,
                    quantity: quantity
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return_response = response
        } else if (update_order_type === 'container') {
            let product_id = order_data['product']
            let sending_type = order_data['sending_type']
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/edit/`, {
                method: "PUT",
                body: JSON.stringify({
                    order: thisorder,
                    sending_type: sending_type,
                    product_id: product_id
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return_response = response
        } else {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/update/${order.order_number}/`, {
                method: "PUT",
                body: JSON.stringify({
                    order: thisorder,
                    quantity: order_data['quantity'],
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return_response = response
        }

        commit('setUpdatingOrder', order)
        return return_response
    },


    async fetchAllOrders({commit}, user) {
        if (user.role === "admin") {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/`);
            let data = await response.json();
            commit('setOrders', data)
        } else {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/?manager=${user.id}`);
            let data = await response.json();
            commit('setOrders', data)
        }
    }
};

export const getters = {
    orders_list: state => state.orders_lists,
};