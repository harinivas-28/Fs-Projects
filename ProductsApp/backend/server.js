require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// JWT middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Add admin middleware
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      password: hashed,
      role: role || 'consumer'  // Use provided role or default to consumer
    });

    res.json({ message: "Registration successful. You can now login." });
  } catch (err) {
    res.status(400).json({ message: "Registration failed: " + err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Login failed. Please try again." });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Login failed. Please try again." });
    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );
    
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: "Login failed. Please try again." });
  }
});

// Protect all product routes
app.get("/", authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add or update this route for editing a product
app.put('/products/:id', authMiddleware, adminOnly, async (req, res) => {
  // Validate ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/products/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
