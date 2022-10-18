const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const ClientesSchema = require('../models/cliente');
const router = express.Router();

//create Clientes
/**
 * @swagger
 * components:
 *  schemas:
 *    cliente:
 *     type: object
 *     properties:
 *       name: 
 *        type: string
 *        description: nombre del cliente
 *       cpf: 
 *        type: integer
 *        description: numero CPF del cliente
 *       email: 
 *        type: string
 *        description: the user email
 *     required:
 *        -nombre
 *        -cpf
 *        -email
 *     ejemplo:
 *         name: ronnie escalante
 *         cpf: 71128221152
 *         email: escalantealvillar@email.com
 */

/**
 * @swagger
 * /api/Cliente:
 *  post: 
 *   summary: cliente nuevo
 *   tags: [cliente]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/cliente'
 *   responses:
 *    200:
 *     description: nuevo cliente creado!
 */

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
/**
 * @swagger
 * /api/Clientes:
 *  get: 
 *   summary: mostrar todos los clientes
 *   tags: [cliente]
 *   responses:
 *    200:
 *     description: todos los clientes
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *        $ref: '#/components/schemas/cliente'
 */

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
/**
 * @swagger
 * /api/Cliente/{id}:
 *  get: 
 *   summary: mostrar un cliente
 *   tags: [cliente]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: id del cliente
 *   responses:
 *    200:
 *     description: todos los clientes
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/cliente'
 *    404:
 *      description: cliente no encontrado
 */

router.get("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
        .findById(id)
        .populate({ path: 'compra', select: 'valor data' })
        .then((data) => await = res.status(200).json(data))
        .catch((error) => res.status(404).send("Cliente não encontrado"));
});

//update 
/**
 * @swagger
 * /api/Cliente/{id}:
 *  put: 
 *   summary: actualizar datos cliente
 *   tags: [cliente]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: cliente identificado
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/cliente'
 *   responses:
 *    200:
 *     description: actualizado datos cliente
 *    404:
 *      description: cliente no encontrado
 */
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
            await ClientesSchema
            .updateOne({ _id: id }, { $set: { name, cpf, email, compra } })
            .then((data) => res.json(data))
            res.status(200).json("Cliente actualizado con sucesso")
        }
    }

    catch { res.status(404).send("Cliente não encontrado") };

});


// delete a Clientes
/**
 * @swagger
 * /api/Cliente/{id}:
 *  delete: 
 *   summary: eliminar un cliente
 *   tags: [cliente]
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *     required: true
 *     description: cliente identificado
 *   responses:
 *    200:
 *     description: cliente deletado com sucesso
 *    404:
 *      description: Cliente não encontrado
 */
router.delete("/Cliente/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
        .findByIdAndRemove({ _id: id })
        .then((data) => await = res.status(200).send("cliente deletado com sucesso"))
        .catch((error) => res.status(404).send("Cliente não encontrado"));

});

module.exports = router;