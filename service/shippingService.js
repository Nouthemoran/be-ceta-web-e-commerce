const axios = require('axios');
const querystring = require('querystring');

const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY;
const RAJAONGKIR_BASE_URL = 'https://api.rajaongkir.com/starter';

const headers = {
  key: RAJAONGKIR_API_KEY,
};

exports.getProvinces = async () => {
  const response = await axios.get(`${RAJAONGKIR_BASE_URL}/province`, { headers });
  return response.data.rajaongkir.results;
};

exports.getCities = async (provinceId) => {
  const response = await axios.get(`${RAJAONGKIR_BASE_URL}/city?province=${provinceId}`, { headers });
  return response.data.rajaongkir.results;
};

exports.calculateShippingCost = async ({ origin, destination, weight, courier }) => {
  const payload = querystring.stringify({ origin, destination, weight, courier });

  const response = await axios.post(`${RAJAONGKIR_BASE_URL}/cost`, payload, {
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.rajaongkir.results[0].costs;
};
