import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const recipes = [
  {
    title: "Nasi Goreng Spesial",
    description: "Nasi goreng khas Indonesia dengan aroma kecap manis dan bumbu kencur yang harum. Cocok untuk sarapan atau makan malam.",
    category: "Makanan Utama",
    cookTime: "20 menit",
    servings: "2 porsi",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
    ingredients: [
      { name: "Nasi putih", amount: "300 gram (nasi semalam)" },
      { name: "Dada ayam", amount: "100 gram, potong dadu" },
      { name: "Telur", amount: "2 butir" },
      { name: "Kecap manis", amount: "3 sdm" },
      { name: "Bawang merah", amount: "4 siung, iris tipis" },
      { name: "Bawang putih", amount: "2 siung, cincang" },
      { name: "Cabai merah", amount: "3 buah, iris serong" },
      { name: "Minyak goreng", amount: "3 sdm" },
      { name: "Garam", amount: "1/2 sdt" },
    ],
    steps: [
      "Panaskan minyak di wajan api besar.",
      "Tumis bawang merah, bawang putih, dan cabai hingga harum.",
      "Masukkan ayam, masak hingga matang.",
      "Pecahkan telur, aduk cepat orak-arik.",
      "Masukkan nasi, aduk rata dengan bumbu.",
      "Tambahkan kecap manis dan garam, aduk merata.",
      "Sajikan dengan irisan timun dan kerupuk.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+nasi+goreng+spesial" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+nasi+goreng" },
    ],
  },
  {
    title: "Soto Ayam Kuah Bening",
    description: "Soto ayam dengan kuah bening segar dan gurih. Kaya rempah dengan kunyit, jahe, dan daun jeruk.",
    category: "Makanan Utama",
    cookTime: "45 menit",
    servings: "4 porsi",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    ingredients: [
      { name: "Paha ayam", amount: "500 gram" },
      { name: "Kentang", amount: "2 buah, potong dadu" },
      { name: "Telur rebus", amount: "4 butir" },
      { name: "Bihun", amount: "100 gram" },
      { name: "Kunyit", amount: "3 cm, bakar dan haluskan" },
      { name: "Jahe", amount: "2 cm, memarkan" },
      { name: "Bawang merah", amount: "6 siung" },
      { name: "Bawang putih", amount: "3 siung" },
      { name: "Daun jeruk", amount: "3 lembar" },
      { name: "Serai", amount: "1 batang" },
      { name: "Air", amount: "1.5 liter" },
    ],
    steps: [
      "Rebus ayam hingga empuk, angkat dan suwir. Sisihkan kaldu.",
      "Haluskan bawang merah, bawang putih, dan kunyit.",
      "Tumis bumbu halus, masukkan jahe, serai, daun jeruk.",
      "Tuangkan tumisan ke kaldu, didihkan.",
      "Masukkan kentang, masak 10 menit.",
      "Tata bihun, ayam, telur dalam mangkuk. Siram kuah panas.",
      "Taburi daun bawang dan seledri. Sajikan.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+soto+ayam+bening" },
    ],
  },
  {
    title: "Rendang Daging Sapi",
    description: "Rendang autentik Minang dengan bumbu rich dan daging empuk. Dimasak perlahan hingga bumbu meresap.",
    category: "Makanan Utama",
    cookTime: "3 jam",
    servings: "6 porsi",
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
    ingredients: [
      { name: "Daging sapi", amount: "1 kg, potong besar" },
      { name: "Santan kelapa", amount: "2 liter" },
      { name: "Bawang merah", amount: "15 siung" },
      { name: "Bawang putih", amount: "5 siung" },
      { name: "Cabai merah keriting", amount: "10 buah" },
      { name: "Lengkuas", amount: "5 cm" },
      { name: "Serai", amount: "3 batang" },
      { name: "Daun kunyit", amount: "2 lembar" },
      { name: "Daun jeruk", amount: "5 lembar" },
      { name: "Garam", amount: "1 sdt" },
    ],
    steps: [
      "Haluskan bawang merah, bawang putih, dan cabai.",
      "Masukkan daging dan santan ke panci besar. Aduk dengan bumbu halus.",
      "Tambahkan lengkuas, serai, daun kunyit, daun jeruk.",
      "Masak api sedang hingga santan mendidih dan pecah minyak (1 jam).",
      "Kecilkan api, masak hingga kuah menyusut (2 jam).",
      "Aduk sesekali agar tidak gosong.",
      "Angkat saat kuah kental dan berwarna gelap. Sajikan.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+rendang+daging+sapi+padang" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+rendang" },
    ],
  },
  {
    title: "Es Teh Manis",
    description: "Minuman segar khas Indonesia. Teh dengan gula dan es batu, simpel tapi bikin ketagihan.",
    category: "Minuman",
    cookTime: "5 menit",
    servings: "1 gelas",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
    ingredients: [
      { name: "Teh celup", amount: "2 kantong" },
      { name: "Air panas", amount: "200 ml" },
      { name: "Gula pasir", amount: "2-3 sdm" },
      { name: "Es batu", amount: "secukupnya" },
    ],
    steps: [
      "Seduh teh dalam air panas 3-5 menit.",
      "Masukkan gula, aduk hingga larut.",
      "Siapkan gelas dengan es batu.",
      "Tuangkan teh manis ke gelas berisi es.",
      "Aduk rata dan sajikan segera.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+es+teh+manis" },
    ],
  },
  {
    title: "Klepon",
    description: "Jajanan pasar tradisional berupa bola ketan hijau berisi gula merah, diguling kelapa parut.",
    category: "Dessert",
    cookTime: "30 menit",
    servings: "20 buah",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    ingredients: [
      { name: "Tepung ketan", amount: "250 gram" },
      { name: "Pasta pandan", amount: "1 sdt" },
      { name: "Air hangat", amount: "150 ml" },
      { name: "Gula merah", amount: "100 gram, sisir" },
      { name: "Kelapa parut", amount: "150 gram" },
      { name: "Garam", amount: "1/4 sdt" },
    ],
    steps: [
      "Campur tepung ketan, pasta pandan, dan air hangat. Uleni hingga kalis.",
      "Ambil adonan, pipihkan, isi gula merah, bulatkan.",
      "Rebus bola klepon hingga mengambang.",
      "Sangrai kelapa parut dengan garam hingga harum.",
      "Gulingkan klepon yang sudah matang ke kelapa parut.",
      "Sajikan langsung selagi hangat.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+klepon+ketan" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+klepon" },
    ],
  },
  {
    title: "Martabak Mini",
    description: "Martabak manis versi mini yang fluffy dan legit. Variasi topping: meses, keju, kacang.",
    category: "Snack",
    cookTime: "25 menit",
    servings: "8 buah",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    ingredients: [
      { name: "Tepung terigu", amount: "200 gram" },
      { name: "Gula pasir", amount: "50 gram" },
      { name: "Ragi instant", amount: "1 sdt" },
      { name: "Baking powder", amount: "1/2 sdt" },
      { name: "Susu cair", amount: "200 ml" },
      { name: "Telur", amount: "1 butir" },
      { name: "Mentega cair", amount: "30 gram" },
      { name: "Garam", amount: "1/4 sdt" },
      { name: "Topping sesuai selera", amount: "meses, keju, kacang, SKM" },
    ],
    steps: [
      "Campur tepung, gula, ragi, baking powder.",
      "Tambahkan susu dan telur, aduk rata. Diamkan 30 menit.",
      "Tambahkan mentega cair dan garam, aduk.",
      "Panaskan cetakan mini, olesi mentega.",
      "Tuang adonan, tutup, masak hingga berlubang.",
      "Taburi topping, lipat dua, sajikan hangat.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+martabak+mini" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+martabak+mini" },
    ],
  },
  {
    title: "Ayam Geprek Sambal Bawang",
    description: "Ayam goreng crispy digeprek dengan sambal bawang pedas. Renyah dan pedas bikin nagih.",
    category: "Makanan Utama",
    cookTime: "35 menit",
    servings: "2 porsi",
    imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800",
    ingredients: [
      { name: "Paha ayam", amount: "4 buah" },
      { name: "Tepung terigu", amount: "200 gram" },
      { name: "Tepung maizena", amount: "50 gram" },
      { name: "Bawang putih", amount: "4 siung" },
      { name: "Cabai rawit", amount: "10 buah" },
      { name: "Bawang merah", amount: "5 siung" },
      { name: "Garam", amount: "1 sdt" },
      { name: "Kunyit bubuk", amount: "1/2 sdt" },
      { name: "Minyak goreng", amount: "secukupnya" },
    ],
    steps: [
      "Marinasi ayam dengan bawang putih, garam, kunyit 30 menit.",
      "Campur tepung terigu dan maizena untuk pelapis.",
      "Balur ayam ke tepung, celup air es, balur lagi.",
      "Goreng ayam hingga golden brown (12 menit).",
      "Ulek bawang merah, bawang putih, cabai rawit kasar.",
      "Siram sambal dengan minyak panas bekas goreng ayam.",
      "Geprek ayam di atas sambal. Sajikan dengan nasi.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+ayam+geprek" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+ayam+geprek" },
    ],
  },
  {
    title: "Mie Ayam",
    description: "Mie ayam dengan topping ayam bumbu kecap gurih-manis. Makanan kaki lima favorit semua orang.",
    category: "Makanan Utama",
    cookTime: "40 menit",
    servings: "2 porsi",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
    ingredients: [
      { name: "Mie telur basah", amount: "200 gram" },
      { name: "Dada ayam", amount: "200 gram, suwir" },
      { name: "Kecap manis", amount: "3 sdm" },
      { name: "Kecap asin", amount: "1 sdm" },
      { name: "Minyak wijen", amount: "1 sdt" },
      { name: "Bawang putih", amount: "3 siung, cincang" },
      { name: "Kaldu ayam", amount: "100 ml" },
      { name: "Sawi hijau", amount: "2 batang" },
      { name: "Daun bawang", amount: "2 batang, iris" },
    ],
    steps: [
      "Rebus mie telur hingga matang, tiriskan.",
      "Tumis bawang putih hingga harum.",
      "Masukkan ayam suwir, kecap manis, kecap asin, minyak wijen.",
      "Tambahkan kaldu ayam, masak hingga bumbu meresap.",
      "Rebus sawi sebentar, tiriskan.",
      "Tata mie dalam mangkuk, beri topping ayam dan sawi.",
      "Taburi daun bawang. Sajikan dengan pangsit goreng.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+mie+ayam" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+mie+ayam" },
    ],
  },
  {
    title: "Es Cendol",
    description: "Minuman tradisional berupa cendol hijau dengan santan, gula merah cair, dan es batu. Segar banget!",
    category: "Minuman",
    cookTime: "20 menit",
    servings: "4 gelas",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    ingredients: [
      { name: "Tepung hunkwe", amount: "100 gram" },
      { name: "Tepung beras", amount: "50 gram" },
      { name: "Air", amount: "500 ml" },
      { name: "Pasta pandan", amount: "1 sdt" },
      { name: "Santan", amount: "400 ml" },
      { name: "Gula merah", amount: "150 gram" },
      { name: "Air untuk gula merah", amount: "100 ml" },
      { name: "Garam", amount: "1/4 sdt" },
      { name: "Es batu", amount: "secukupnya" },
    ],
    steps: [
      "Campur tepung hunkwe, tepung beras, air, dan pasta pandan. Masak sambil aduk hingga kental.",
      "Cetak adonan menjadi cendol. Masukkan ke air es.",
      "Rebus gula merah dengan air hingga larut dan kental. Saring.",
      "Rebus santan dengan garam hingga mendidih, dinginkan.",
      "Tata cendol dalam gelas, beri gula merah cair dan santan.",
      "Tambahkan es batu, aduk rata. Sajikan segera.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+es+cendol" },
    ],
  },
  {
    title: "Bakso Sapi",
    description: "Bakso sapi homemade dengan kuah kaldu bening yang gurih. Kenyal dan penuh rasa daging sapi.",
    category: "Makanan Utama",
    cookTime: "1 jam",
    servings: "4 porsi",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
    ingredients: [
      { name: "Daging sapi giling", amount: "500 gram" },
      { name: "Tapioka", amount: "3 sdm" },
      { name: "Bawang putih", amount: "4 siung, haluskan" },
      { name: "Garam", amount: "1 sdt" },
      { name: "Lada", amount: "1/2 sdt" },
      { name: "Es batu", amount: "3-4 buah kecil" },
      { name: "Kaldu sapi", amount: "2 liter" },
      { name: "Bawang goreng", amount: "untuk taburan" },
      { name: "Daun bawang", amount: "2 batang, iris" },
      { name: "Mie kuning / bihun", amount: "untuk pelengkap" },
    ],
    steps: [
      "Masukkan daging giling, bawang putih, garam, lada ke food processor. Tambahkan es batu.",
      "Proses hingga adonan halus dan kenyal. Tambahkan tapioka, proses lagi.",
      "Didihkan air dalam panci. Bentuk bulatan adonan bakso, masukkan ke air mendidih.",
      "Rebus bakso hingga mengambang dan matang (5-7 menit). Angkat, tiriskan.",
      "Siapkan kuah kaldu sapi, didihkan dengan garam dan lada secukupnya.",
      "Tata bakso, mie, dan sayuran dalam mangkuk. Siram kuah panas.",
      "Taburi bawang goreng dan daun bawang. Sajikan dengan sambal dan kecap.",
    ],
    videos: [
      { platform: "youtube", url: "https://www.youtube.com/results?search_query=resep+bakso+sapi+kuah" },
      { platform: "tiktok", url: "https://www.tiktok.com/search?q=resep+bakso" },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const r of recipes) {
    const recipe = await prisma.recipe.create({
      data: {
        title: r.title,
        description: r.description,
        category: r.category,
        cookTime: r.cookTime,
        servings: r.servings,
        imageUrl: r.imageUrl,
        ingredients: { create: r.ingredients },
        steps: {
          create: r.steps.map((instruction, i) => ({
            stepNumber: i + 1,
            instruction,
          })),
        },
        videoLinks: { create: r.videos },
      },
    });
    console.log(`  Created: ${recipe.title}`);
  }

  console.log(`Seeded ${recipes.length} recipes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
