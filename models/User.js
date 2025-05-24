import { Model } from 'sequelize';
import { genSalt, hash, compare } from 'bcrypt';

export default (sequelize, DataTypes) => {
  class User extends Model {
    async hashPassword() {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    }

    async comparePassword(password) {
      return await compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          await user.hashPassword();
        },
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
