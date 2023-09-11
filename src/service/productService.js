import axios from "axios"

export const getAllProductHome = () =>{
    return axios.get("http://localhost:8081/product");
}