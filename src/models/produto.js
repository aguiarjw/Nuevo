const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProdutoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('produto', ProdutoSchema);