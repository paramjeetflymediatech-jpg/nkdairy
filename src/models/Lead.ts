import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Lead extends Model {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public company?: string;
  public country?: string;
  public productInterest?: string;
  public message?: string;
  public source?: string;
  public status!: string;
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
