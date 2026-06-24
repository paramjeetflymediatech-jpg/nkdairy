import { sequelize, connectDB } from '../lib/db';
import { User } from './User';
import { Category } from './Category';
import { Product } from './Product';
import { Lead } from './Lead';
import { BlogCategory } from './BlogCategory';
import { Blog } from './Blog';
import { Testimonial } from './Testimonial';
import { Certificate } from './Certificate';
import { Gallery } from './Gallery';
import { SeoMetadata } from './SeoMetadata';
import { Industry } from './Industry';
import { ProductIndustry } from './ProductIndustry';
import { Faq } from './Faq';

// Many-to-many associations between Product and Industry
Product.belongsToMany(Industry, { 
  through: ProductIndustry, 
  as: 'industries', 
  foreignKey: 'productId',
  otherKey: 'industryId'
});

Industry.belongsToMany(Product, { 
  through: ProductIndustry, 
  as: 'products', 
  foreignKey: 'industryId',
  otherKey: 'productId'
});

export const syncDB = async () => {
  try {
    await connectDB();
    // Use alter: true to safely update schema without dropping data.
    // In production, you would use migrations instead.
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

export {
  sequelize,
  User,
  Category,
  Product,
  Lead,
  BlogCategory,
  Blog,
  Testimonial,
  Certificate,
  Gallery,
  SeoMetadata,
  Industry,
  ProductIndustry,
  Faq,
};
