import axios from 'axios';


const  instance = axios.create({
    baseURL:'https://localhost:44352/api',
});


//instance.defaults.headers.common['Authorization'] = "AUTH TOKEN";

export default instance;