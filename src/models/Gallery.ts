import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Gallery extends Model {
  public id!: number;
  public title?: string;
  public imageUrl!: string;
  public category?: string; // e.g., 'FACTORY', 'EXHIBITION'
}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Gallery',
    tableName: 'galleries',
    timestamps: true,
  }
);
