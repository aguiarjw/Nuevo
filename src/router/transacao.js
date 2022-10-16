const express = require("express");
const transacaoSchema = require("../models/transacao");

const router = express.Router();

//create transacao
router.post("/transacao", async (req, res) => {
    const transacao = transacaoSchema(req.body);
    const item = (req.body.item);
    const erros = []
    transacao

    try {
        if (!req.body.valor || req.body.valor == null) {
            erros.push("Inserir o valor")
        }

        if (typeof req.body.valor == "string") {
            erros.push("Informar o valor numerico")
        }

        if (!req.body.forma_de_pagamento || req.body.forma_de_pagamento == null) {
            erros.push("Inserir a forma de pagamento")
        }

        if (typeof req.body.forma_de_pagamento == "number") {
            erros.push("forma de pagamento errada")
        }

        if (item.length < 24 || item.length > 24) {
            erros.push("Produto não existe")
        }

        if (erros.length > 0) {
            res.status(400)
            res.send(erros)
            return
        }
        else {
            await transacao.save()
            return res.status(201).send("Transacao foi realizada con sucesso")
        }

    }
    catch (error) {

        return res.status(400).send("É obrigatorio inserir o Item")
    }

});

// get all transacao
router.get("/transacao", (req, res) => {
    transacaoSchema
        .find()
        .populate('item')
        .then((data) => res.status(200).json(data))
        .catch((error) => res.json({ message: error }));
});

// get a transacao
router.get("/transacao/:id", (req, res) => {
    const { id } = req.params;
    transacaoSchema
        .findById(id)
        .populate('item')
        .then((data) => res.json(data))
        .catch((error) => res.status(404).send("Transacao não encontrada"));
});

//update a transacao
router.put("/transacao/:id", async (req, res) => {
    const { id } = req.params;
    const { valor, forma_de_pagamento, item } = transacaoSchema(req.body);
    const erros = []

    try {
        if (typeof req.body.valor == "string") {
            erros.push("Valor errado")
        }

        if (typeof req.body.forma_de_pagamento == "number") {
            erros.push("Forma de pagamento errrada")
        }

        if (erros.length > 0) {
            res.status(404)
            res.send(erros)
        }

        else {
            await transacaoSchema.updateOne({ _id: id }, { $set: { valor, forma_de_pagamento, item } })
            res.status(200).json("Transacao actualizada com sucesso")
        }
    }

    catch { res.status(404).send("Transacao não encontrada") };

});

// delete a transacao
router.delete("/transacao/:id", (req, res) => {
    const { id } = req.params;
    transacaoSchema
        .remove({ _id: id })
        .then((data) => await = res.status(200).send("transação deletada com sucesso"))
        .catch((error) => res.status(404).send("Transação não encontrada"));
});

module.exports = router;
