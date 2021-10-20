async function validate(user, schema, path = [], messages = []) {
  for (const key in schema) {
    const validation = schema[key];
    const field = user[key];
    const pathField = path.join('.') + `.${key}`;

    if (validation.type.toLowerCase() == "date")  {
      if (validation.required) {
        if (!field) {
          messages.push(`${pathField} is required`);
        }else{
          try {
            new Date(field)
          } catch (error) {
            messages.push(`${pathField} is invalid`);
          }
        }
      }
    }

    if (validation.type.toLowerCase() == "object") {
      let responses = await validate(field, validation.data, path.concat([key]), messages);
      messages.concat(responses);
    }else if(validation.type.toLowerCase() == "array"){
      if (Array.isArray(field)) {
        if (validation.required) {
          if (field.length > 0) {
            for (const index in field) {
              let responses = await validate(field[index], validation.data[0], path.concat([`${key}.[${index}]`]), messages);
              messages.concat(responses);
            }
          }else{
            messages.push(`${pathField} is required`);
          }
        }else{
          for (const index in field) {
            let responses = await validate(field[index], validation.data[0], path.concat([`${key}.[${index}]`]), messages);
            messages.concat(responses);
          }
        }
      }else{
        messages.push(`${pathField} needs to be the type ${validation.type}`);
      }
    }else {
      if (validation.required) {
        if (!field) {
          messages.push(`${pathField} is required`);
        }
      }

      if ((typeof field).toLowerCase() != validation.type.toLowerCase()) {
          messages.push(`${pathField} needs to be the type ${validation.type}`);
      }
    }
  }

  return messages
}

async function overwritingEmpty(obj_old, obj_new) {
  for (const key in obj_new) {
    const field_old = obj_old[key];
    const field = obj_new[key];

    if (field == null || field == undefined){
      obj_new[key] = obj_old[key]
    }else if (typeof field == "object") {
      obj_new[key] = await overwritingEmpty(field_old, field);
    }
  }

  return obj_new
}

module.exports.validate = validate;
module.exports.overwritingEmpty = overwritingEmpty;
