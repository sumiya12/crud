const Crud = require("./model.crud");
const mongoose = require("mongoose");

const create = async (req) => {
  const crud = new Crud(req.body);
  return crud.save();
};
const get = async (req) => {
  return await Crud.find();
};
const getBy = async (req) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) return Crud.findById(id);
};
const update = async (req) => {
  const { id } = req.query;
  await Crud.findByIdAndUpdate(id, req.body);
  return await Crud.findById(id);
};

const deletes = async (req) => {
  const { id } = req.params;
  return Crud.findByIdAndDelete(id, req.body);
};
module.exports = { create, get, update, deletes, getBy };
