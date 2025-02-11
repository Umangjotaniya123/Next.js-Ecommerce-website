import axios from "axios";

const Axios = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_SERVER}/api/v1`});

Axios.defaults.withCredentials = true;

export default Axios; 
