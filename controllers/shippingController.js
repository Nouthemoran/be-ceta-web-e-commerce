const shippingService = require('../service/shippingService');
const { formatResponse } = require('../helpers/responseFormatter');

exports.getProvinces = async (req, res, next) => {
  try {
    const provinces = await shippingService.getProvinces();
    res.status(200).json(formatResponse(200, 'Daftar provinsi berhasil diambil', provinces));
  } catch (error) {
    next(error);
  }
};

exports.getCities = async (req, res, next) => {
  try {
    const { provinceId } = req.params;
    const cities = await shippingService.getCities(provinceId);
    res.status(200).json(formatResponse(200, 'Daftar kota berhasil diambil', cities));
  } catch (error) {
    next(error);
  }
};

exports.calculateShippingCost = async (req, res, next) => {
  try {
    const { origin, destination, weight, courier } = req.body;
    const costs = await shippingService.calculateShippingCost({ origin, destination, weight, courier });
    res.status(200).json(formatResponse(200, 'Ongkir berhasil dihitung', costs));
  } catch (error) {
    next(error);
  }
};
