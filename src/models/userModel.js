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

  return user
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

function generateCode(prefix) {
  return `${prefix}${randomString(6)}`
}

function randomString(len) {
  var str = "";                               
  for (var i = 0; i < len; i++) {              
    var rand = Math.floor(Math.random() * 62); 
    var charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48; 
    str += String.fromCharCode(charCode);      
  }
  
  return str; 
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

async function validate(user) {
  return await validationSchemaService.validate(user, schema());
}

module.exports.mapper = mapper;
module.exports.validate = validate;
module.exports.generateCode = generateCode;
