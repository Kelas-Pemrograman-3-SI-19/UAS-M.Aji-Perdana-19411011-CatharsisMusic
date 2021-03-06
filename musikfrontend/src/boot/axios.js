import { boot } from 'quasar/wrappers'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance
})

export { axios }
