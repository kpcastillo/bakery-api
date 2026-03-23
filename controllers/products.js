const express = require('express');

const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const products = await db.collection('products').find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  const db = mongodb.getDb();
  const productId = new objectId(req.params.id);
  try {
    const product = await db.collection('products').findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const createProduct = async (req, res) => {
    const db = mongodb.getDb();
    const { name, categoryId, flavor, price, size, description, available, stock } = req.body;
    try {
        const result = await getDb()?.collection('contacts').insertOne({
            name,
            categoryId, 
            flavor, price, 
            size, 
            description, 
            available, 
            stock
        })
        if ((await result)?.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Sorry, an error happened while creating the product.'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Sorry, an error happened while creating the product.'});
    }
};

const updateProduct = async (req, res) => {
    const db = mongodb.getDb();
    const productId = new objectId(req.params.id);
    const product = { name: req.body.name,
        categoryId: req.body.categoryId,
        flavor: req.body.flavor,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        available: req.body.available,
        stock: req.body.stock
    };
    try {
        const result = await getDb()?.collection('products').updateOne({ _id: productId }, { $set: product });
        if ((await result)?.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Sorry, an error happened while updating the product.'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Sorry, an error happened while updating the product.'});
    }

};

const deleteProduct = async (req, res) => {
  const db = mongodb.getDb();
  const productId = new objectId(req.params.id);
  try {
    const result = await db.collection('products').deleteOne({ _id: productId });
    if (result?.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Sorry, an error happened while deleting the product.'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Sorry, an error happened while deleting the product.'});
  }
};

module.exports = {
    getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};