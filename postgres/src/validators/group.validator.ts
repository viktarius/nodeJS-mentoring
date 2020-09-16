import * as Joi from "@hapi/joi";

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required()
});
