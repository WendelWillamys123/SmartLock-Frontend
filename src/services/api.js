import axios from "axios";

var dataToken = sessionStorage.getItem("tokenLocal");
var tokenLocal = JSON.parse(dataToken);

const api = axios.create( { baseURL: 'http://localhost:3333' , headers:{
    authorization: "Bearer "+tokenLocal
}});

export default api;