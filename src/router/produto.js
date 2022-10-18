const express = require("express");
const ProdutoSchema = require("../models/produto");
const router = express.Router();

//create produto
/**
 * @swagger
 * components:
 *  schemas:
 *    produto:
 *     type: object
 *     properties:
 *       name: 
 *        type: string
 *        description: nombre del producto
 *       descricao: 
 *        type: string
 *        description: descripción del producto
 *       quantidade: 
 *        type: number
 *        description: calidad del producto
 *       preco:
 *        type: number
 *        description: precio del producto
 *     required:
 *        -name
 *        -descricao
 *        -quantidade
 *        -preco
 *     ejemplo:
 *         nome: leite
 *         descricao: dfdgdf
 *         quantidade: 2 tls
 *         preco: R$ 15.00
 */

 /**
 * @swagger
 * /api/produto:
 *  post: 
 *   summary: registre producto
 *   tags: [produto]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/produto'
 *   responses:
 *    200:
 *     description: producto registrado
 */

router.post("/produto", async (req, res) => {
    const produtos = ProdutoSchema(req.body);
    const erros = []
    produtos
    try {
        if (!req.body.name || req.body.name == null) {
            erros.push("Inserir o nome do produto")
        }

        if (typeof req.body.name == "number") {
            erros.push("Inserir o nome correto")
        }

        if (!req.body.descricao || req.body.descricao == null) {
            erros.push("Inserir o descricao")
        }

        if (typeof req.body.descricao == "number") {
            erros.push("descricao errado")
        }

        if (!req.body.quantidade || req.body.quantidade == null) {
            erros.push("Inserir o quantidade")
        }

        if (typeof req.body.quantidade == "string") {
            erros.push("quantidade errada, insirerir valor numerico")
        }

        
        if (!req.body.preco || req.body.preco == null) {
            erros.push("Inserir o preco")
        }

        if (typeof req.body.preco == "string") {
            erros.push("Preco errado, insirerir valor numerico")
        }

        if (erros.length > 0) {
            res.status(404)
            res.send(erros)
            return
        }
        else {
            await produtos.save()
            return res.status(201).send("Produto cadastrado con sucesso")
        }
    }
    catch (error){
        if (!req.body == ProdutoSchema)
        return res.status(400).send("Erro do lado do servidor" + error)
        console.log(error)
    }

});

// get all produtos
/**
 * @swagger
 * /api/produtos:
 *  get: 
 *   summary: mostrar todos los productos
 *   tags: [produto]
 *   responses:
 *    200:
 *     description: todos los productos
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *        $ref: '#/components/schemas/produto'
 */

router.get("/produtos", (req, res) => {
    ProdutoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get a produto
/**
 * @swagger
 * /api/produto/{id}:
 *  get: 
 *   summary: mostrar un producto
 *   tags: [produto]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: id del produto
 *   responses:
 *    200:
 *     description: id del produto
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/produto'
 *    404:
 *      description: produto no encontrado
 */

router.get("/produto/:id", (req, res) => {
    const { id } = req.params;
    ProdutoSchema
        .findById(id)
        .then((data) => await = res.status(200).json(data))
        .catch((error) => res.status(404).send("Produto não encontrado"));
});

// update a produto
/**
 * @swagger
 * /api/produto/{id}:
 *  put: 
 *   summary: actualizar produto
 *   tags: [produto]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: id del produto
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/produto'
 *   responses:
 *    200:
 *     description: produto atualizado
 *    404:
 *      description: produto no encontrado
 */

router.put("/produto/:id", async (req, res) => {
    const { id } = req.params;
    const { name, descricao, quantidade, preco } = ProdutoSchema(req.body);
    const erros = []

    try {
        if (typeof req.body.name == "number") {
            erros.push("Nome errado")
        }

        if (typeof req.body.descricao == "number") {
            erros.push("Descrição errrada")
        }

        if (typeof req.body.quantidade == "string") {
            erros.push("Quantidade errada, insira valor numerico")
        }
        
        if (typeof req.body.preco == "string") {
            erros.push("Preco errado, insira valor numerico")
        }
        
        if (erros.length > 0) {
            res.status(404)
            res.send(erros)
        }

        else {
            await ProdutoSchema.updateOne({ _id: id }, { $set: {  name, descricao, quantidade, preco } })
            res.status(200).json("Produto atualizado com sucesso")
        }
    }

    catch { res.status(404).send("Produto não encontrado") };

});

// delete a produto
/**
 * @swagger
 * /api/produto/{id}:
 *  delete: 
 *   summary: eliminar un produto
 *   tags: [produto]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: id del produto
 *   responses:
 *    200:
 *     description: Produto deletado com sucesso
 *    404:
 *      description: Produto não encontrado
 */

router.delete("/produto/:id", (req, res) => {
    const { id } = req.params;
    ProdutoSchema
        .remove({ _id: id })
        .then((data) => await = res.status(200).send("Produto deletado com sucesso"))
        .catch((error) => res.status(404).send("Produto não encontrado"));
});

module.exports = router;
