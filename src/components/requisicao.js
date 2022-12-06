import axios from 'axios';

const BASE_URL = 'https://sistema2s-api.onrender.com';

export function postLogin(body) {

    const promise = axios.post(`${BASE_URL}/`, body);
    return promise;
  }

  export function postCadastro(body) {

    const promise = axios.post(`${BASE_URL}/cadastro`, body);
    return promise;
  }
  export function postCadastro_motoboy(body) {

    const promise = axios.post(`${BASE_URL}/cadastro_motoboy`, body);
    return promise;
  }
  export async function getmotoboys() {
    const promise = await axios.get(`${BASE_URL}/cadastro_motoboy`)
    return promise
  }