import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';
import { Category } from './Category';

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare categoryId: number;
  declare description: string;
  declare specifications?: any;
  declare capacity?: string;
  declare images?: string[];
  declare videos?: string[];
  declare brochurePdf?: string;
  declare features?: string[];
  declare applications?: string[];
  declare metaTitle?: string;
  declare metaDescription?: string;
}

Product.init(
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
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON, // Array of URLs
      allowNull: true,
    },
    videos: {
      type: DataTypes.JSON, // Array of URLs
      allowNull: true,
    },
    brochurePdf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,
    },
    applications: {
      type: DataTypes.JSON, // Array of strings
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
