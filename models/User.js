const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {
    // Method untuk hash password
    async hashPassword() {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Method untuk membandingkan password saat login
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users', // opsional: sesuaikan dengan nama tabel di DB
      timestamps: true,
      hooks: {
        // Hash password sebelum create
        beforeCreate: async (user) => {
          await user.hashPassword();
        },
        // Hash password sebelum update jika password berubah
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            await user.hashPassword();
          }
        },
      },
    }
  );

  return User;
};
