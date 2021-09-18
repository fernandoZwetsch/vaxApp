const validationSchemaService = require('../services/validationSchemaService');

async function mapper(params) {
  const user = {
    name: params.name,
    surname: params.surname,
    cpf: params.cpf,
    email: params.email,
    phone: params.phone,
    address: address(params.address),
    password: params.password,
    refCode: params.refCode,
    susCode: params.susCode
  }
  let response = await validationSchemaService.validate(user, schema());

  return  {
    model: user,
    error_messages: response
  }
}

function address(params) {
  return {
    city: params.city,
    state: params.state,
    postalCode: params.postalCode,
    street: params.street,
    number: params.number,
    district: params.district
  }
}

function schema() {
  return {
    name: {
      required: true,
      type: 'string'
    },
    surname: {
      required: true,
      type: 'string'
    },
    cpf: {
      required: true,
      type: 'string'
    },
    email: {
      required: true,
      type: 'string'
    },
    phone: {
      required: true,
      type: 'string'
    },
    address: {
      required: true,
      type: 'Object',
      data: {
        city: {
          required: true,
          type: 'string'
        },
        state: {
          required: true,
          type: 'string'
        },
        postalCode: {
          required: true,
          type: 'string'
        },
        street: {
          required: true,
          type: 'string'
        },
        number: {
          required: true,
          type: 'string'
        },
        district: {
          required: true,
          type: 'string'
        }
      }
    },
    password: {
      required: true,
      type: 'string'
    },
    refCode: {
      required: true,
      type: 'string'
    },
    susCode: {
      required: true,
      type: 'string'
    }
  }
}

module.exports.mapper = mapper;
