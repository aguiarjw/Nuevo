const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ClientesSchema = mongoose.Schema({
    name: {
        type: String,
     required: true,
      
    },
    cpf: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    compra: { type: Schema.ObjectId, ref: 'transacao' }
});

module.exports = mongoose.model('cliente', ClientesSchema);