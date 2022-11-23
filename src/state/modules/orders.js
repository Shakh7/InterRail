export const state = {
    orders: [],
    currentlyUpdating: [],
};

// export const getters = {
//     todos: state => state.todos,
// };

export const mutations = {
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
    async updateCurrentUpdating({commit}, order) {
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
            order_number: order.order_number,
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
            customer: 1
        }


        let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/edit/`, {
            method: "PUT",
            body: JSON.stringify({
                order: thisorder,
                sending_type: "single",
                product_id: 3333
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        commit('setUpdatingOrder', order)
        return response
    },
};
