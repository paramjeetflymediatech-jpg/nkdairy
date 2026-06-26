import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Lead extends Model {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare company?: string;
  declare country?: string;
  declare productInterest?: string;
  declare message?: string;
  declare source?: string;
  declare status: string;
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productInterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'LOST'),
      defaultValue: 'NEW',
    },
  },
  {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true,
  }
);
