import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class SeoMetadata extends Model {
  declare id: number;
  declare pagePath: string;
  declare metaTitle: string;
  declare metaDescription?: string;
  declare metaKeywords?: string;
  declare ogImage?: string;
  declare headScripts?: string;
  declare footerScripts?: string;
}

SeoMetadata.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'pagePath',
      comment: 'e.g. /, /about, /contact'
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ogImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    headScripts: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Scripts injected into the <head> (e.g. Google Analytics)'
    },
    footerScripts: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Scripts injected before </body> (e.g. tracking pixels)'
    },
  },
  {
    sequelize,
    modelName: 'SeoMetadata',
    tableName: 'seo_metadata',
    timestamps: true,
  }
);
