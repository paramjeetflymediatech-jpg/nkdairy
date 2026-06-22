import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const wpSlugs = [
  'paneer-plant',
  'dairy-turnkey-projects',
  'greek-yogurt-plant-in-india',
  'cream-pasteurizer-plant',
  'milk-plant',
  'ghee-plant',
  'dahi-and-lassi-plant',
  'milk-pasteurizer-plant',
  'khoya-mawa-making-machine',
  'butter-churner',
  'curd-making-plant-manufacturer',
  'dairy-plant',
  'milk-chilling-plant',
  'cream-separator',
  'batch-pasteurizer-200ltr-to-2000-ltr',
  'htst-milk-processing-plant'
];

export async function GET() {
  try {
    await connectDB();
    const results = [];
    const productsDir = path.join(process.cwd(), 'public', 'products');
    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true });
    }

    const allDbProducts = await Product.findAll();

    for (const slug of wpSlugs) {
      try {
        const { data } = await axios.get(`https://nkdairyequipments.com/wp-json/wp/v2/pages?slug=${slug}`);
        if (!data || data.length === 0) {
          results.push(`Not found on WP: ${slug}`);
          continue;
        }

        const page = data[0];
        const content = page.content.rendered;
        
        let dbProduct = allDbProducts.find((p: any) => p.slug === slug);
        if (!dbProduct) {
          dbProduct = allDbProducts.find((p: any) => p.slug.replace(/-/g, '') === slug.replace(/-/g, ''));
        }

        if (!dbProduct) {
          results.push(`Not found in local DB: ${slug}`);
          continue;
        }

        let imageUrl = null;
        if (page.yoast_head_json?.og_image && page.yoast_head_json.og_image.length > 0) {
          imageUrl = page.yoast_head_json.og_image[0].url;
        } else {
          const match = content.match(/<img[^>]+src="([^">]+)"/i);
          if (match && match[1]) {
            imageUrl = match[1];
          }
        }

        let localImagePath = null;
        if (imageUrl) {
          try {
            const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
            const filename = `${dbProduct.slug}${ext}`;
            const filepath = path.join(productsDir, filename);
            
            const imageRes = await axios.get(imageUrl, { responseType: 'stream' });
            const writer = fs.createWriteStream(filepath);
            imageRes.data.pipe(writer);
            await new Promise((resolve, reject) => {
              writer.on('finish', () => resolve(true));
              writer.on('error', reject);
            });
            
            localImagePath = `/products/${filename}`;
          } catch (imgErr: any) {
            console.error(`Failed to download image for ${slug}:`, imgErr.message);
          }
        }

        await dbProduct.update({
          description: content,
          images: localImagePath ? [localImagePath] : dbProduct.images
        });

        results.push(`Updated ${dbProduct.name} successfully (Image: ${localImagePath ? 'Yes' : 'No'})`);
      } catch (err: any) {
        results.push(`Error processing ${slug}: ${err.message}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
