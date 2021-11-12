const validationSchemaService = require('../services/validationSchemaService');

async function mapper(params) {
  const vaccination = {
    userId: params.userId,
    vaccineId: params.vaccineId,
    batch: params.batch,
    scheduling: date_formatter(params.scheduling) || null,
    applicationAt: date_formatter(params.applicationAt) || new Date().toISOString(),
    dose: params.dose
  }

  return vaccination
}

function date_formatter(date) {
  if (date){
    return  new Date(date).toISOString()
  }
  
  return false
}

function schema() {
  return {
    userId: {
      required: true,
      type: 'string'
    },
    vaccineId: {
      required: true,
      type: 'string'
    },
    scheduling: {
      required: false,
      type: 'date'
    },
    batch: {
      required: false,
      type: 'string'
    },
    applicationAt: {
      required: true,
      type: 'date'
    },
    dose: {
      required: true,
      type: 'number'
    }
  }
}

async function validate(vaccination) {
  return await validationSchemaService.validate(vaccination, schema());
}

module.exports.mapper = mapper;
module.exports.validate = validate;
