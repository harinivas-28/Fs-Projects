require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Product.deleteMany();

  const categories = ["Electronics", "Clothing", "Books", "Toys"];
  const products = Array.from({ length: 100 }).map((_, i) => ({
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    category: categories[Math.floor(Math.random() * categories.length)],
    inStock: Math.random() > 0.5,
  }));

  await Product.insertMany(products);
  console.log("Seeded 100 products");
  mongoose.disconnect();
});
