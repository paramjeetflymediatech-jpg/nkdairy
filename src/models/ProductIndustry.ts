import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class ProductIndustry extends Model {
  declare productId: number;
  declare industryId: number;
}

ProductIndustry.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    industryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'industries',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'ProductIndustry',
    tableName: 'product_industries',
    timestamps: false,
  }
);
