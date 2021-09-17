var express = require('express');
var router = express.Router();

const Property = require('../models/property');

/* POST properties inserting. */
router.post('/', async (req, res) => {
  const{ type, area } = req.body;
  
  try {
    let property = new Property({ type: type, area: area});
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({error: 'Problem to create new property.'})
  }
})

/* GET properties listing. */
// router.get('/', async (req, res) => {
//   res.send('respond with a resource');
// });

module.exports = router;
