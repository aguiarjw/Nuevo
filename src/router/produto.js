const  express = require("express");
const ProdutoSchema = require("../models/produto");

const router = express.Router();

//create produto
router.post("/produtos", (req, res) => {
    const produto = ProdutoSchema(req.body);
    produto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get all produtos
router.get("/produtos", (req, res) => {
    ProdutoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

// get a produto
router.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    ProdutoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

// update a produto
router.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { name, descricao, preco } = req.body;
    ProdutoSchema
    .updateOne({ _id: id }, { $set: {name, descricao, preco, }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

    
// delete a produt
router.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    ProdutoSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    });

module.exports = router;
