var express = require('express');
var router = express.Router();

const Property = require('../models/property');

/* POST properties insert. */
router.post('/', async (req, res) => {
  const{ type, area } = req.body;
  
  try {
    let property = new Property({ type: type, area: area});
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({error: 'Problem to create property.'});
  }
});

/* Search by index text */
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    let properties = await Property.find({ $text: {$search: query}});
    res.json(properties);
  } catch (error) {
    res.json({error: error}).status(500);
  }
});

/* GET property show. */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById(id);
    res.json(property);
  } catch (error) {
    res.status(500).json({error: 'Problem to show property.'});
  }
});

/* GET properties listing. */
router.get('/', async (req, res) => {
  try {
    let properties = await Property.find({})
    res.json(properties)
  } catch (error) {
    res.status(500).json({error: 'Problem to get properties.'});
  }
});

/* GET property edit. */
router.put('/:id', async (req, res) => {
  const { type, area } = req.body;
  const { id } = req.params;

  try {
    let property = await Property.findOneAndUpdate(
      {_id: id},
      { $set: { type: type, area: area }},
      { upsert: true, 'new': true }
    );
    res.json(property);
  } catch (error) {
    res.status(500).json({error: 'Problem to edit properties.'});
  }
});

/* GET property delete. */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById(id);
    await property.delete();
    res.json({message: 'Ok'}).status(204);
  } catch (error) {
    res.status(500).json({error: 'Problem to delete property.'});
  }
});

module.exports = router;
