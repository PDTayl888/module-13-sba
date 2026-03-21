const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(210).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "invalid" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: error.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, page, limit } = req.query;

    let queries = {};

    if (category) {
      queries.category = category;
    }

    if (minPrice || maxPrice) {
      queries.price = {};
      if (minPrice) {
        queries.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        queries.price.$lte = Number(maxPrice);
      }
    }
    let mongooseQuery = Product.find(queries);

    if (sortBy === "price_asc") {
      mongooseQuery = mongooseQuery.sort({ price: 1 });
    } else if (sortBy === "price_desc") {
      mongooseQuery = mongooseQuery.sort({ price: -1 });
    } else {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skipAmount = (pageNumber - 1) * limitNumber;

    mongooseQuery = mongooseQuery.skip(skipAmount).limit(limitNumber);

    const products = await mongooseQuery;
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
