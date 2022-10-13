const  express = require("express");
const Clientes = require('../models/cliente')
const ClientesSchema = require('../models/cliente');

const router = express.Router();

//create Clientes
router.post("/Cliente", async (req, res) => {
const clientes = ClientesSchema(req.body);
const erros = []
clientes
   try{  if (!req.body.name || req.body.name == null ) {
        erros.push("Inserir o nome")
    }

    if (typeof req.body.name ==  "number"){
        erros.push("Nome errado")
    }

    if (!req.body.cpf || req.body.cpf == null ) {
         erros.push("Inserir o cpf")
    }

    if (typeof req.body.cpf ==  "string"){
        erros.push("CPF errado")
    }

    if(erros.length > 0) {
       res.status (404)
       res.send(erros)
    }   
     else {
        await clientes.save()
     res.status(201).send("Cliente cadastrado con sucesso")
     } }
            
     catch { if (!req.body == ClientesSchema)
     res.status(500).send("Erro do lado do servidor")

    }
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