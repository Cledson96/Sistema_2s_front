import axios from 'axios';

// const BASE_URL = 'https://sistema2s-api.onrender.com';
const BASE_URL = 'http://localhost:5000';

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
export async function getclientes() {
  const promise = await axios.get(`${BASE_URL}/cadastro_cliente`)
  return promise
}

export function postCadastro_cliente(body) {

  const promise = axios.post(`${BASE_URL}/cadastro_cliente`, body);
  return promise;
}

export function postCadastro_pedidos(body) {

  const promise = axios.post(`${BASE_URL}/entrada_pedidos`, body);
  return promise;
}

export function getpedidos(chave,filtro) {
 
console.log(chave)
console.log(filtro)
  const promise = axios.get(`${BASE_URL}/pedidos`, {
    headers: { chave : chave,
    filtro : filtro}
  });

  return promise;
}

export function deletepedido(pedido) {

  const promise = axios.delete(`${BASE_URL}/deletapedidos`, {
    headers: {
      pedido
    }
  });
  return promise;
}
export function putpedido(pedido) {
  console.log(pedido)
  const promise = axios.put(`${BASE_URL}/ausente`, {
    pedido
  });
  return promise;
}