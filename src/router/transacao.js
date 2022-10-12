const  express = require("express");
const transacaoSchema = require("../models/transacao");

const router = express.Router();

//create transacao
router.post("/transacao", (req, res) => {
    const transacao = transacaoSchema(req.body);
    transacao

    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get all transacao
router.get("/transacao", (req, res) => {
    transacaoSchema
    .find()
    .populate('item')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

// get a transacao
router.get("/transacao/:id", (req, res) => {
    const { id } = req.params;
    transacaoSchema
    .findById(id)
    .populate('item')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

//update a transacao
router.put("/transacao/:id", (req, res) => {
    const { id } = req.params;
    const { monto, pagamento, data, item } = req.body;
    transacaoSchema
    .updateOne({ _id: id }, { $set: {monto, pagamento, data, item }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

// delete a transacao
router.delete("/transacao/:id", (req, res) => {
    const { id } = req.params;
    transacaoSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

module.exports = router;
