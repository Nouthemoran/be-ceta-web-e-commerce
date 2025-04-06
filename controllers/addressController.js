const { Address } = require('../models/Index');

// Tambah alamat baru
const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { label, recipientName, phone, province, city, postalCode, fullAddress, isDefault } = req.body;

    // Jika user set isDefault true, update alamat lainnya jadi false
    if (isDefault) {
      await Address.update({ isDefault: false }, { where: { userId } });
    }

    const address = await Address.create({
      userId,
      label,
      recipientName,
      phone,
      province,
      city,
      postalCode,
      fullAddress,
      isDefault: isDefault || false,
    });

    res.status(201).json({ message: 'Alamat berhasil ditambahkan', data: address });
  } catch (error) {
    console.error('Create Address Error:', error);
    res.status(500).json({ message: 'Gagal menambahkan alamat' });
  }
};

// Ambil semua alamat milik user
const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.findAll({
      where: { userId },
      order: [['isDefault', 'DESC']],
    });

    res.status(200).json({ data: addresses });
  } catch (error) {
    console.error('Get Addresses Error:', error);
    res.status(500).json({ message: 'Gagal mengambil alamat' });
  }
};

// Hapus alamat user
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.id;

    const address = await Address.findByPk(addressId);
    if (!address || address.userId !== userId) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }

    await address.destroy();
    res.status(200).json({ message: 'Alamat berhasil dihapus' });
  } catch (error) {
    console.error('Delete Address Error:', error);
    res.status(500).json({ message: 'Gagal menghapus alamat' });
  }
};

// UPDATE ADDRESS
const updateAddress = async (req, res) => {
    try {
      const { addressId } = req.params;
      const userId = req.user.id;
      const { label, recipientName, phone, province, city, postalCode, fullAddress, isDefault } = req.body;
  
      const address = await Address.findByPk(addressId);
  
      if (!address || address.userId !== userId) {
        return res.status(404).json({ message: 'Alamat tidak ditemukan atau bukan milikmu' });
      }
  
      // Jika ingin menjadikan default, set semua yang lain false
      if (isDefault) {
        await Address.update({ isDefault: false }, { where: { userId } });
      }
  
      await address.update({
        label,
        recipientName,
        phone,
        province,
        city,
        postalCode,
        fullAddress,
        isDefault: isDefault || false,
      });
  
      res.status(200).json({ message: 'Alamat berhasil diperbarui', data: address });
    } catch (error) {
      console.error('Update Address Error:', error);
      res.status(500).json({ message: 'Gagal memperbarui alamat', error: error.message });
    }
  };
  

module.exports = {
  createAddress,
  getUserAddresses,
  deleteAddress,
  updateAddress,
};
