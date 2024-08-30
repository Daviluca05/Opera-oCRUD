const express = require('express');
const router = express.Router();
const Entity = require('../models/entity');

// Rota para criar uma nova entidade (POST)
router.post('/entities', async (req, res) => {
    try {
        const entity = new Entity(req.body);
        await entity.save();
        res.status(201).send(entity);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Rota para obter todas as entidades (GET)
router.get('/entities', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.send(entities);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Rota para obter uma entidade por ID (GET)
router.get('/entities/:id', async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).send();
    }
    res.send(entity);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Rota para atualizar uma entidade por ID (PATCH)
router.patch('/entities/:id', async (req, res) => {
    try {
      const entity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!entity) {
        return res.status(404).send();
      }
      res.send(entity);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  


// Rota para deletar uma entidade por ID (DELETE)
router.delete('/entities/:id', async (req, res) => {
    try {
        const entity = await Entity.findByIdAndDelete(req.params.id);
        if (!entity) {
            return res.status(404).send({ error: 'Entidade não encontrada' });
        }
        res.status(200).send(entity);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
