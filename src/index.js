const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const produtoRouter = require('./router/produto');
const clientesRouter = require('./router/cliente');
const transacaoRouter = require('./router/transacao');
const { response, request } = require('express');
const { use } = require('./router/cliente');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use('/api', produtoRouter);
app.use('/api', clientesRouter);
app.use('/api', transacaoRouter);

app.use((req, res, next) => {
    // const erro = new Error('Rota não encontrada');
    // erro.status = 404;
    // next(erro);
    res.status(404).send("Rota não encontrada")
    next()
});



app.use((error, req, res, next) => {
    res.status(500).send("Erro do lado do servidor")
    // res.status(error.status || 500);
    // return res.send({
    //     erro: {
    //         mensagem: error.message
    //     }
    // });
});

//routes
app.get('/', (req, res) => {
    res.send("API LOJA DE PRODUTOS");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to MONGODB atlas"))
    .catch((error) => console.error(error))

app.listen(port, () => console.log('Server listning on port', port));