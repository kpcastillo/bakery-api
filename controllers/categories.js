const express = require('express');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;
const { getDb } = require('../db/connection');

const getAllCategories = async (req, res) => {
  try {
    const categories = await getDb()?.collection('category').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  } catch (error) {
    console.error('getAllCategories error:', error);
    res.status(500).json({
      error: 'Sorry, an error happened while fetching all the categories.'
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = new mongodb.ObjectId(req.params.id);
    const category = await getDb()?.collection('category').findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await getDb()?.collection('category').insertOne({
      name,
      description
    });
    if ((await result)?.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Sorry, an error happened while creating the category.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Sorry, an error happened while creating the category.' });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = new mongodb.ObjectId(req.params.id);
  const { name, description } = req.body;
  try {
    const result = await getDb()?.collection('category').updateOne(
      { _id: categoryId },
      { $set: { name, description } }
    );
    if ((await result)?.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Sorry, an error happened while updating the category.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Sorry, an error happened while updating the category.' });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = new mongodb.ObjectId(req.params.id);
  try {
    const result = await getDb()?.collection('category').deleteOne({ _id: categoryId });
    if ((await result)?.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Sorry, an error happened while deleting the category.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Sorry, an error happened while deleting the category.' });
  }
};

module.exports = {
    getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};