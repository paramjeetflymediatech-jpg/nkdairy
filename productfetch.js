const axios = require('axios');

const slugs = [
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

async function fetchPages() {
  const results = [];

  for (const slug of slugs) {
    try {
      const { data } = await axios.get(
        `https://nkdairyequipments.com/wp-json/wp/v2/pages?slug=${slug}`
      );

      if (data.length) {
        results.push(data[0]);
        console.log(`✓ ${slug}`);
      }
    } catch (err) {
      console.log(`✗ ${slug}`, err.message);
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

fetchPages();