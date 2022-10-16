const express = require("express");
const ClientesSchema = require('../models/cliente');
const router = express.Router();

//create Clientes
router.post("/Cliente", async (req, res) => {
    const clientes = ClientesSchema(req.body);
    const erros = []
    clientes
    try {
        if (!req.body.name || req.body.name == null) {
            erros.push("Inserir o nome")
        }

        if (typeof req.body.name == "number") {
            erros.push("Nome errado")
        }

        if (!req.body.cpf || req.body.cpf == null) {
            erros.push("Inserir o cpf")
        }

        if (typeof req.body.cpf == "string") {
            erros.push("CPF errado")
        }

        if (erros.length > 0) {
            res.status(404)
            res.send(erros)

        }
        else {
            await clientes.save()
            res.status(201).send("Cliente cadastrado con sucesso")
        }
    }

    catch (error) {
        res.status(500).send("Error del lado del servidor" + error)
    }

});


// get all Clientes
router.get("/Clientes", (req, res) => {
    ClientesSchema
        .find()
        .populate({
            path: 'compra',
            populate: ({ path: 'item', select: 'name' })
        })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.json({ message: error }));

});

// get for id cliente
router.get("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
        .findById(id)
        .populate({ path: 'compra', select: 'valor data' })
        .then((data) => await = res.status(200).json(data))
        .catch((error) => res.status(404).send("Cliente não encontrado"));
});

//update
router.put("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    const { name, cpf, email, compra } = ClientesSchema(req.body);
    const erros = []

    try {
        if (typeof req.body.name == "number") {
            erros.push("Nome errado")
        }

        if (typeof req.body.cpf == "string") {
            erros.push("CPF errado")
        }

        if (typeof req.body.email == "number") {
            erros.push("email errado")
        }

        if (erros.length > 0) {
            res.status(404)
            res.send(erros)
        }

        else {
            await ClientesSchema.updateOne({ _id: id }, { $set: { name, cpf, email, compra } })
            res.status(200).json("Cliente actualizado con sucesso")
        }
    }

    catch { res.status(404).send("Cliente não encontrado") };

});


// delete a Clientes
router.delete("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
        .findByIdAndRemove({ _id: id })
        .then((data) => await = res.status(200).send("cliente deletado com sucesso"))
        .catch((error) => res.status(404).send("Cliente não encontrado"));

});

module.exports = router;