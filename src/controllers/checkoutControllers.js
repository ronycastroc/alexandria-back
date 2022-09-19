import mongo from "../database/db.js";
import joi from "joi";
import dayjs from "dayjs";

let date = dayjs().locale('pt-br').format('DD/MM/YYYY, HH:mm:ss')

let db = await mongo();

const purchaseDataSchema = joi.object({
    books: joi.array(),
    name: joi.string().required(),
    phone: joi.string().required(),
    zipCode: joi.string().required(),
    adress: joi.string().required(),
    number: joi.string().required(),
    complement: joi.string(),
    reference: joi.string(),
    district: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    payment: joi.string().valid('credit', 'debit').required(),
    nameCard: joi.string().required(),
    numberCard: joi.string().required(),
    validity: joi.string().required(),
    codeCard: joi.string().required(),
    parcels: joi.string().required(),
    subTotal: joi.number().required()
});

const createPurchase = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const { name, phone, zipCode, adress, number, complement, reference, district, city, state, country, payment, nameCard,numberCard, validity, codeCard, parcels, subTotal } = req.body;

    const validation = purchaseDataSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);
        return res.status(422).send(error);
    }

    if(!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) {
            return res.sendStatus(401);
        }

        await db.collection('purchases').insertOne({
            ...req.body,
            date,
            userId: session.userId
        });

        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export { createPurchase };