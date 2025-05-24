import { getProvinces, getCities, calculateShippingCost } from '../service/shippingService';
import { formatResponse } from '../helpers/responseFormatter';

export async function getProvinces(req, res, next) {
  try {
    const provinces = await getProvinces();
    res.status(200).json(formatResponse(200, 'Daftar provinsi berhasil diambil', provinces));
  } catch (error) {
    next(error);
  }
}

export async function getCities(req, res, next) {
  try {
    const { provinceId } = req.params;
    const cities = await getCities(provinceId);
    res.status(200).json(formatResponse(200, 'Daftar kota berhasil diambil', cities));
  } catch (error) {
    next(error);
  }
}

export async function calculateShippingCost(req, res, next) {
  try {
    const { origin, destination, weight, courier } = req.body;
    const costs = await calculateShippingCost({ origin, destination, weight, courier });
    res.status(200).json(formatResponse(200, 'Ongkir berhasil dihitung', costs));
  } catch (error) {
    next(error);
  }
}
