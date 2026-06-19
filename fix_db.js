const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('nk-dairy', 'root', 'root', { host: 'localhost', port: 3306, dialect: 'mysql', logging: false });
const Product = sequelize.define('Product', { slug: DataTypes.STRING, description: DataTypes.TEXT, equipmentSolutions: DataTypes.JSON }, { tableName: 'products' });

const rawHTML = `<section style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">

   <!-- Main Heading -->
   <div style="background:#0852A1; padding:20px; border-radius:8px; margin-bottom:20px;">
       <h2 style="color:#ffffff; margin:0; text-align:center; font-size:32px;">
           Milk Weighing Bowl
       </h2>
   </div>

   <!-- Introduction -->
   <p style="font-size:16px;">
       <strong style="color:#0852A1;">Milk Weighing Bowl</strong> is an essential dairy equipment used for
       <strong style="color:#E67E22;">collecting and accurately measuring raw milk</strong>
       before it enters the processing line. It is widely used in dairy plants, milk collection centres,
       and processing units to ensure precise milk reception and hygienic handling.
       Manufactured from high-quality
       <strong style="color:#16A085;">SS 304 / SS 316 stainless steel</strong>,
       the bowl provides durability, easy cleaning, and smooth milk transfer for further processing.
   </p>

   <!-- Features Section -->
   <div style="background:#F4F8FC; padding:15px 20px; border-left:5px solid #0852A1; margin:25px 0;">
       <h3 style="color:#0852A1; margin-top:0;">
           Key Features
       </h3>

       <ul style="padding-left:25px;">
           <li>
               Manufactured from
               <strong style="color:#16A085;">SS 304 / SS 316 stainless steel</strong>
               for maximum durability and hygiene.
           </li>
           <li>
               <strong style="color:#E67E22;">Smooth inner surface</strong>
               ensures clean and hygienic milk handling.
           </li>
           <li>
               Specially designed for
               <strong style="color:#0852A1;">accurate milk weighing and collection.</strong>
           </li>
           <li>
               Strong and sturdy
               <strong style="color:#16A085;">stainless steel support frame.</strong>
           </li>
           <li>
               Easy outlet connection for
               <strong style="color:#E67E22;">quick milk transfer.</strong>
           </li>
           <li>
               Corrosion-resistant construction for long service life.
           </li>
           <li>
               Easy to clean, operate, and maintain.
           </li>
           <li>
               Suitable for dairy plants, milk collection centres, and processing units.
           </li>
       </ul>
   </div>

   <!-- Benefits Section -->
   <div style="background:#FFF8F0; padding:15px 20px; border-left:5px solid #E67E22; margin:25px 0;">
       <h3 style="color:#E67E22; margin-top:0;">
           Benefits
       </h3>

       <ul style="padding-left:25px;">
           <li>
               Ensures
               <strong style="color:#0852A1;">accurate measurement of raw milk</strong>
               during reception.
           </li>
           <li>
               Maintains high levels of
               <strong style="color:#16A085;">hygiene and cleanliness.</strong>
           </li>
           <li>
               Helps reduce
               <strong style="color:#E67E22;">milk wastage during transfer.</strong>
           </li>
           <li>
               Improves overall dairy plant workflow and efficiency.
           </li>
           <li>
               Provides safe and contamination-free milk handling.
           </li>
           <li>
               Durable design offers
               <strong style="color:#0852A1;">low maintenance and long-term performance.</strong>
           </li>
       </ul>
   </div>

   <!-- Applications Section -->
   <div style="background:#F0FFF8; padding:15px 20px; border-left:5px solid #16A085; margin:25px 0;">
       <h3 style="color:#16A085; margin-top:0;">
           Applications
       </h3>

       <ul style="padding-left:25px;">
           <li>Milk Collection Centres</li>
           <li>Dairy Processing Plants</li>
           <li>Milk Chilling Centres</li>
           <li>Cooperative Dairy Societies</li>
           <li>Commercial Milk Reception Units</li>
           <li>Food & Beverage Processing Industries</li>
       </ul>
   </div>

</section>`;

Product.findOne({ where: { slug: 'milk-weighing-bowl' } }).then(async p => {
  if (p) {
    let eq = p.equipmentSolutions;
    if (typeof eq === 'string') eq = JSON.parse(eq);
    eq.generalDescription = rawHTML;
    
    // Also update description if it contains escaped HTML to be safe
    let desc = p.description;
    if (desc && desc.includes('&lt;')) {
      desc = rawHTML;
    }

    await p.update({ equipmentSolutions: eq, description: desc });
    console.log('Successfully updated product!');
  } else {
    console.log('Product not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
