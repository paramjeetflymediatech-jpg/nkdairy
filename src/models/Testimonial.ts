import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Testimonial extends Model {
  public id!: number;
  public clientName!: string;
  public company?: string;
  public content!: string;
  public rating?: number;
  public image?: string;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: true,
  }
);
