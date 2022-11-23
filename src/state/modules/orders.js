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
        let thisorder = {
            order_number: order.order_number,
            lot_number: order.lot_number,
            date: order.date,
            position: order.position,
            type: order.type,
            shipment_status: order.shipment_status,
            payment_status: order.payment_status,
            shipper: order.shipper,
            consignee: "FE MEDEX",
            departure_id: order.departure.id,
            destination_id: order.destination.id,
            border_crossing: "Келес эксп - Сарыагач эксп",
            conditions_of_carriage: "FOB-FOR",
            rolling_stock: "СПС контейнер",
            departure_country: "Uzbekistan",
            destination_country: "China",
            comment: order.comment,
            manager: 1,
            customer: 1
        }

        await fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/edit/`, {
            method: "PUT",
            body: JSON.stringify({
                order: thisorder,
                sending_type: "single",
                product_id: 3333
            })
        });
        commit('setUpdatingOrder', order)
    },
};
