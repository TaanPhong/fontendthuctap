
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 1000,
    headers: {'Authorization': 'Basic <Base 64 endcode {user:4f620691-d009-4fa9-89c8-248df92f5dc7}>'}
  });

  export default axiosInstance;