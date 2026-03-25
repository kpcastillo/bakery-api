const express = require('express');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;
const { getDb } = require('../db/connection');

const getAllUsers = async (req, res) => {
    try{
        const db = getDb();
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = new mongodb.ObjectId(req.params.id);
        const user = await getDb()?.collection('users').findOne({ _id: userId});
        if (!user) {
            return res.status(404).json({ error: 'User not found'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user'});
    }
};

const createUser =  async (req, res) => {
    const { name, email, password, position } = req.body;
    try {
        const result =  await getDb()?.collection('users').insertOne({
            name,
            email,
            password,
            position
        });
        if ((await result)?.acknowledged) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Sorry, an error happened while creating the user.'});
    }
};

const updateUser =  async (req, res) => {
    const userId = new mongodb.ObjectId(req.params.id);
    const { name, email, password, position} = req.body;
    try {
        const result = await getDb()?.collection('users').updateOne(
            { _id: userId},
            { $set: { name, email, password, position}}
        );
        if ((await result)?.acknowledged) {
      res.status(204).send();

     }
    } catch (error) {
    res.status(500).json({ error: 'Sorry an error happened while updating the user'});
  }
};

const deleteUser = async (req, res) => {
    const userId = new mongodb.ObjectId(req.params.id);
    try {
        const result = await getDb()?.collection('users').deleteOne({ _id: userId });
        if ((await result)?.acknowledged) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Sorry an error happened while deleting the user' });
    }
};
module.exports = {
    getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};