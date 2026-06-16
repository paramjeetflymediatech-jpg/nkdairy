import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';
import { BlogCategory } from './BlogCategory';
import { User } from './User';

export class Blog extends Model {
  declare id: number;
  declare title: string;
  declare slug: string;
  declare content: string;
  declare excerpt?: string;
  declare image?: string;
  declare categoryId?: number | null;
  declare authorId: number;
  declare metaTitle?: string;
  declare metaDescription?: string;
  declare metaKeywords?: string;
  declare ogTitle?: string;
  declare ogDescription?: string;
  declare ogImage?: string;
  declare twitterTitle?: string;
  declare twitterDescription?: string;
  declare twitterImage?: string;
  declare headScripts?: string;
  
  declare createdAt: Date;
  declare updatedAt: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'blog_categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ogTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ogDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ogImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitterTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitterDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    twitterImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    headScripts: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: true,
  }
);

// Define associations
Blog.belongsTo(BlogCategory, { foreignKey: 'categoryId', as: 'category' });
BlogCategory.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });

Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });
