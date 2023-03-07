import axios from 'axios'

const OrderService = axios.create({
  baseURL: process.env.VUE_APP_ORDER_URL,
  timeout: 10000
})

// request interceptor
// request.interceptors.request.use(config => {
//     config.headers['Authorization'] = "token"
// }, errorHandler)

export default OrderService