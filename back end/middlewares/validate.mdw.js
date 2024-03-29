const ajv_lib = require("ajv");

function validate(schema) {
    return function (req, res, next) {
        const ajv = new ajv_lib({
            allErrors: true
        }) ;
        const validate = ajv.compile(schema)
        const valid = validate(req.body)
        if (!valid) {
            return res.status(400).json(validate.errors);
        }
        next();
    }
}

module.exports = validate
