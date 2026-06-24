import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Faq extends Model {
  declare id: number;
  declare question: string;
  declare answer: string;
  declare order: number;
  declare isActive: boolean;
}

Faq.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Faq',
    tableName: 'faqs',
    timestamps: true,
  }
);
