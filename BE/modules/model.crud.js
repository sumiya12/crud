const mongoose = require("mongoose");

const CrudSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
});

const Crud = mongoose.model("Crud", CrudSchema);
module.exports = Crud;
