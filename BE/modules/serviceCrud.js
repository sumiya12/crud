const Crud = require("./model.crud");
const mongoose = require("mongoose");

const create = async (req) => {
  console.log(req.body);
  const crud = new Crud(req.body);
  return crud.save();
};

const get = async (req) => {
  return Crud.find();
};

const getBy = async (req) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) return Crud.findById(id);
};

const update = async (req) => {
  const { id } = req.query;
  console.log(id);
  await Crud.findByIdAndUpdate(id, req.body);
  return Crud.findById(id);
};

const deletes = async (req) => {
  const { id } = req.params;
  return Crud.findByIdAndDelete(id, req.body);
};
module.exports = { create, get, update, deletes, getBy };
