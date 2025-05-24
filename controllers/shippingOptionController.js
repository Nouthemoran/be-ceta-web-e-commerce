import { ShippingOption, Order } from '../models/Index';

// Menyimpan shipping option ke dalam order
async function createShippingOption(req, res) {
  try {
    const { orderId, courier, service, cost, etd } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan atau bukan milikmu.' });
    }

    const shipping = await ShippingOption.create({
      orderId,
      courier,
      service,
      cost,
      etd,
    });

    res.status(201).json({ message: 'Shipping option disimpan.', data: shipping });
  } catch (error) {
    console.error('Create Shipping Option Error:', error);
    res.status(500).json({ message: 'Gagal menyimpan shipping option.' });
  }
}

// Mengambil shipping option berdasarkan orderId
async function getShippingOptionByOrder(req, res) {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan atau bukan milikmu.' });
    }

    const shipping = await ShippingOption.findOne({ where: { orderId } });
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping option belum disimpan.' });
    }

    res.status(200).json({ data: shipping });
  } catch (error) {
    console.error('Get Shipping Option Error:', error);
    res.status(500).json({ message: 'Gagal mengambil shipping option.' });
  }
}

export default {
  createShippingOption,
  getShippingOptionByOrder,
};
