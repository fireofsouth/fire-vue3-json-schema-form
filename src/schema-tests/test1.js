const Ajv = require('ajv').default
const localize = require('ajv-i18n')

// const addFormats = require('ajv-formats').default
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', format: 'email' },
    age: { type: 'number' },
    test: {
      type: 'string',
      format: 'test',
      minLength: 5,
      errorMessage: { type: '必须是字符串', minLength: '长度不能小于5' },
    },
    pets: { type: 'array', items: { type: 'string' } },
    isWorker: { type: 'boolean' },
  },
  required: ['name', 'age'],
}
const data = {
  name: 'hufangyi@xx.com',
  age: 12,
  test: 'huf',
  pets: ['dsh', 'asd'],
  isWorker: true,
}
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  formats: {
    email: true,
    time: true,
    test: (data) => {
      return typeof data === 'string'
    },
  },
}) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)
const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
console.log(valid)
