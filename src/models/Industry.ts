import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Industry extends Model {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare description?: string;
  declare image?: string;
  declare equipmentSolutions?: any;
  declare faqs?: any;
  declare metaTitle?: string;
  declare metaDescription?: string;
  declare products?: any[];
}

Industry.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'industrySlug',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    equipmentSolutions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    faqs: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Industry',
    tableName: 'industries',
    timestamps: true,
  }
);
