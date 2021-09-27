var express = require('express');
var router = express.Router();

const Property = require('../models/property');

/* POST properties insert. */
router.post('/', async (req, res) => {
  const { identificador, titulo, profissional, data_Anuncio, valor, descricao,
    categoria, tipo, condominio, iptu, area_construida,
    area_util, quartos, banheiros, vagas_garagem, detalhes_imovel,
    detalhes_condominio, cep, município, bairro, logradouro, data,
    link, valores_antigos, tamamnho, acomoda, caracteristicas } = req.body;

  try {
    let property = new Property({
      _identificador: identificador, titulo: titulo, profissional: profissional, data_Anuncio: data_Anuncio, valor: valor,
      descricao: descricao, categoria: categoria, tipo: tipo, condominio: condominio, iptu: iptu, area_construida: area_construida,
      area_util: area_util, quartos: quartos, banheiros: banheiros, vagas_garagem: vagas_garagem, detalhes_imovel: detalhes_imovel,
      detalhes_condominio: detalhes_condominio, cep: cep, município: município, bairro: bairro, logradouro: logradouro, data: data,
      link: link, valores_antigos: valores_antigos, tamamnho: tamamnho, acomoda: acomoda, caracteristicas: caracteristicas
    });
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Problem to create property.' });
  }
});

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
  const { identificador, titulo, profissional, data_Anuncio, valor, descricao,
    categoria, tipo, condominio, iptu, area_construida,
    area_util, quartos, banheiros, vagas_garagem, detalhes_imovel,
    detalhes_condominio, cep, município, bairro, logradouro, data,
    link, valores_antigos, tamamnho, acomoda, caracteristicas } = req.body;
  const { id } = req.params;

  try {
    let property = await Property.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          _identificador: identificador, titulo: titulo, profissional: profissional, data_Anuncio: data_Anuncio, valor: valor,
          descricao: descricao, categoria: categoria, tipo: tipo, condominio: condominio, iptu: iptu, area_construida: area_construida,
          area_util: area_util, quartos: quartos, banheiros: banheiros, vagas_garagem: vagas_garagem, detalhes_imovel: detalhes_imovel,
          detalhes_condominio: detalhes_condominio, cep: cep, município: município, bairro: bairro, logradouro: logradouro, data: data,
          link: link, valores_antigos: valores_antigos, tamamnho: tamamnho, acomoda: acomoda, caracteristicas: caracteristicas
        }
      },
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
    let property = await Property.findById(id);
    await property.delete();
    res.json({ message: 'Ok' }).status(204);
  } catch (error) {
    res.status(500).json({ error: 'Problem to delete property.' });
  }
});

module.exports = router;
