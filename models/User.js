const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    // Hash password sebelum create
    beforeCreate: async (user) => {
      await user.hashPassword();
    },
    // Hash password sebelum update, tapi cuma kalau password diubah
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        await user.hashPassword();
      }
    },
  },
  timestamps: true,
});

// Method untuk hash password (bisa dipake di hooks atau manual)
User.prototype.hashPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

// Method buat bandingin password waktu login
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
