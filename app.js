//app.js
const express = require('express');
const connectDB = require('./db');
const Product = require('./models/Product');
const billRoutes = require('./routes/bills'); // Import bills route
const cors = require('cors');
require('dotenv').config();  // Load environment variables from the .env file

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware for JSON parsing
app.use(express.json());
app.use(billRoutes);





app.get('/api/test', (req, res) => {
  res.send('Test route works!');
});




// Routes
// 1. Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// 2. Add a new product
app.post('/api/products', async (req, res) => {
    const { productname, stock } = req.body;
  
    if (!productname || stock === undefined) {
      return res.status(400).json({ message: 'Product name and stock are required' });
    }
  
    try {
      // Check if the product name already exists
      const existingProduct = await Product.findOne({ productname });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with the same name already exists' });
      }
  
      const newProduct = new Product({ productname, stock });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  

// 3. Update product stock
app.put('/api/products/:id', async (req, res) => {
  const { stock } = req.body;

  if (stock === undefined) {
    return res.status(400).json({ message: 'Stock is required' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// 4. Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

