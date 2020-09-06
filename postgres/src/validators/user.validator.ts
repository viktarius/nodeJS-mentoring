import * as Joi from "@hapi/joi";

export const userSchema = Joi.object({
    login: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    password: Joi.string().regex(/[a-z]/).regex(/[0-9]/).required()
});
