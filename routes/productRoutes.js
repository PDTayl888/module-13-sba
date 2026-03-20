const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(210).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'product not found'});
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'invalid'});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!product) {
        return res.status(404).json({ message: 'product not found'});
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
        return res.status(404).json({message: 'product not found'});
    }
    res.status(200).json({message: error.message});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
