const validationSchemaService = require('../services/validationSchemaService');

async function mapper(params) {
  const vaccination = {
    userId: params.userId,
    vaccineId: params.vaccineId,
    scheduling: date_formatter(params.scheduling),
    applicationAt: date_formatter(params.applicationAt) || new Date().toISOString(),
    dose: params.dose
  }

  return vaccination
}

function date_formatter(date) {
  if (date)
    return null
  return  new Date(date).toISOString()
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
      type: 'data'
    },
    applicationAt: {
      required: true,
      type: 'data'
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
