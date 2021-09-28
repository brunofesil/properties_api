const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
  _identificador: String,
  titulo : String,
  profissional : String,
  data_Anuncio : String,
  valor : String,
  descricao: String,
  categoria : String,
  tipo : String,
  condominio : String,
  iptu : String,
  area_construida : String,
  area_util : String,
  quartos : String,
  banheiros : String,
  vagas_garagem : String,
  detalhes_imovel : String,
  detalhes_condominio : String,
  cep : String,
  município : String,
  bairro : String,
  logradouro : String,
  data : String,
  link: String,
  tamamnho: String,
  acomoda: String,
  caracteristicas: String,
  valoresAntigos: [
    new mongoose.Schema({
      valorAntigo: String,
      dataAntiga: String
    })
  ],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Property', propertySchema);