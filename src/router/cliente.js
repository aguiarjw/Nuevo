const  express = require("express");
const Clientes = require('../models/cliente')
const ClientesSchema = require('../models/cliente');

const router = express.Router();

//create Clientes
router.post("/Cliente", (req, res) => {
    const clientes = ClientesSchema(req.body);
    clientes
    .save()
    .then((data) => res.status(201).send(clientes))
    .catch((error) => res.status(404).json({ message: error }));
});


// get all Clientes
router.get("/Clientes", (req, res) => {
    ClientesSchema
    .find()
    .populate({
        path: 'compra',
        populate: ({path: 'item', select: 'name'})
      })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).send("Erro na rota"));
});

// get a Clientes
router.get("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
    .findById(id)
    .populate({path: 'compra', select: 'valorr data'})
    .then((data) => await = res.status(200).json(data))
    .catch((error) => res.status(404).send("Cliente não encontrado"));
});



// update a clientes
router.put("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    const { name, cpf, email, compra } = req.body;
    ClientesSchema
    .updateOne({ _id: id }, { $set: {name, cpf, email, compra }})
    .then((data) => await = res.status(200).json("Cliente actualizado con sucesso"))
    .catch((error) => res.status(404).send("Cliente não encontrado"));
    });


// delete a Clientes
router.delete("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
    .remove({ _id: id })
    .then((data) => await = res.status(200).json(data))
    .catch((error) => res.json({ message: error }));
    });

module.exports = router;