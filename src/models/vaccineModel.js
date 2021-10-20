const validationSchemaService = require('../services/validationSchemaService');

async function mapper(params) {
  const vaccine = {
    image: params.image,
    name: params.name,
    validity: date_formatter(params.validity) || new Date().toISOString(),
    category: params.category,
    description: params.description
  }

  return vaccine
}

function date_formatter(date) {
  if (date){
    return  new Date(date).toISOString()
  }
  
  return false
}

function schema() {
  return {
    image: {
      required: false,
      type: 'string'
    },
    name: {
      required: true,
      type: 'string'
    },
    validity: {
      required: true,
      type: 'date'
    },
    category: {
      required: true,
      type: 'string'
    },
    description: {
      required: false,
      type: 'string'
    }
  }
}

async function validate(vaccine) {
  return await validationSchemaService.validate(vaccine, schema());
}

module.exports.mapper = mapper;
module.exports.validate = validate;
