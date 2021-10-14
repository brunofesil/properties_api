var express = require('express');
var router = express.Router();

const Property = require('../models/property');

/* Search by index text */
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    let properties = await Property.find({ $text: { $search: query } });
    res.json(properties);
  } catch (error) {
    res.json({ error: error }).status(500);
  }
});

/* POST properties insert. */
router.post('/', async (req, res) => {

  const { _id, titulo, profissional, dataAnuncio, valor, descricao,
    categoria, tipo, condominio, iptu, areaConstruida,
    areaUtil, quartos, banheiros, vagasGaragem, detalhesImovel,
    detalhesCondominio, cep, municipio, bairro, logradouro, data,
    link, valoresAntigos, tamamnho, acomoda, caracteristicas } = req.body;

    console.log(req.body)

  try {
    let property = new Property({ 
      _id: _id, titulo: titulo, profissional: profissional, data_anuncio: dataAnuncio, valor: valor,
      descricao: descricao, categoria: categoria, tipo: tipo, condominio: condominio, iptu: iptu, area_construida: areaConstruida,
      area_util: areaUtil, quartos: quartos, banheiros: banheiros, vagas_garagem: vagasGaragem, detalhes_imovel: detalhesImovel,
      detalhes_condominio: detalhesCondominio, cep: cep, municipio: municipio, bairro: bairro, logradouro: logradouro, data: data,
      link: link, valoresAntigos: valoresAntigos, tamamnho: tamamnho, acomoda: acomoda, caracteristicas: caracteristicas
    });
    property._id = req.body._id
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Problem to create property.' });
  }
});

/* GET property show. */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById(id);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Problem to show property.' });
  }
});

/* GET properties listing. */
router.get('/', async (req, res) => {
  try {
    let properties = await Property.find({})
    res.json(properties)
  } catch (error) {
    res.status(500).json({ error: 'Problem to get properties.' });
  }
});

/* GET property edit. */
router.put('/:id', async (req, res) => {

  const { _id, titulo, profissional, dataAnuncio, valor, descricao,
    categoria, tipo, condominio, iptu, areaConstruida,
    areaUtil, quartos, banheiros, vagasGaragem, detalhesImovel,
    detalhesCondominio, cep, municipio, bairro, logradouro, data,
    link, valoresAntigos, tamamnho, acomoda, caracteristicas } = req.body;

  const { id } = req.params;

  try {
    let property = await Property.findByIdAndUpdate( 
      id,
      {  $set: { _id: _id, titulo: titulo, profissional: profissional, data_anuncio: dataAnuncio, valor: valor,
        descricao: descricao, categoria: categoria, tipo: tipo, condominio: condominio, iptu: iptu, area_construida: areaConstruida,
        area_util: areaUtil, quartos: quartos, banheiros: banheiros, vagas_garagem: vagasGaragem, detalhes_imovel: detalhesImovel,
        detalhes_condominio: detalhesCondominio, cep: cep, municipio: municipio, bairro: bairro, logradouro: logradouro, data: data,
        link: link, valoresAntigos: valoresAntigos, tamamnho: tamamnho, acomoda: acomoda, caracteristicas: caracteristicas } },
      { upsert: true, 'new': true }
    );
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Problem to edit properties.' });
  }
});

/* GET property delete. */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    let property = await Property.findById(id);
    console.log(property)
    await property.delete();
    res.json({ message: 'Ok' }).status(204);
  } catch (error) {
    res.status(500).json({ error: 'Problem to delete property.' });
  }
});

module.exports = router;
