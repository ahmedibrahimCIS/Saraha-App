import joi from 'joi';

export const sendMessageSchema = joi.object({
    content:joi.string().required(),
    receiver:joi.string().length(24).hex().required(),
}).required()

export const getMessageSchema = joi.object({
    messageId:joi.string().length(24).hex().required(),
}).required()


export const flags ={
    inbox:"inbox",
    outbox:'outbox'
}
export const getAllMessagesSchema = joi.object({
    flag: joi.string().valid(...Object.values(flags)).required()
}).required()