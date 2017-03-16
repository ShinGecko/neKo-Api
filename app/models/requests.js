const r = require('./../utils/thinky').r

const reqSingleArg = async (model, field, value) => model.filter(r.row(field).eq(value)).run()
const reqDoubleArg = async (model, field, value, field2, value2) => model.filter(r.row(field).eq(value).and(r.row(field2).eq(value2))).run()

module.exports = { reqSingleArg, reqDoubleArg }
