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
        let order_typee = order_data['type']
        let product = order_data['product']

        let order_payment_status = order.payment_status === 'Issued' ? 'issued'
            : order.payment_status === 'Reserved' ? 'reserved'
                : order.payment_status === 'Received' ? 'received'
                    : 'reserved'; // default

        let order_position = order.position === 'Block train' ? 'block_train'
            : order.position === 'Rail forwarder' ? 'rail_forwarder'
                : order.position === 'Multi modal' ? 'multi_modal'
                    : 'block_train'; // default

        let order_shipment_status = order.shipment_status === 'In process' ? 'in_process'
            : order.shipment_status === 'Delivered' ? 'delivered'
                : order.shipment_status === 'Completed' ? 'completed'
                    : 'in_process'; // default

        let order_type = order.type === 'Import' ? 'import'
            : order.type === 'Export' ? 'export'
                : order.type === 'Transit' ? 'transit'
                    : 'import'; // default

        let thisorder = {
            lot_number: order.lot_number,
            date: order.date,
            position: order_position,
            type: order_type,
            shipment_status: order_shipment_status,
            payment_status: order_payment_status,
            shipper: order.shipper,
            consignee: order.consignee,
            departure_id: order.departure.id,
            destination_id: order.destination.id,
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

        if (order_typee === 'wagon') {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/wagon_order/update/${order.order_number}/`, {
                method: "PUT",
                body: JSON.stringify({
                    order: thisorder,
                    sending_type: "single",
                    product_id: product.value
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return_response = response
        } else if (order_typee === 'container') {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/edit/`, {
                method: "PUT",
                body: JSON.stringify({
                    order: thisorder,
                    sending_type: "single",
                    product_id: product.value
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