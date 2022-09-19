const service = require("./serviceCrud");

const getall = async (req, res) => {
  try {
    const crud = await service.get(req);
    res.json({ data: crud, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};
const getById = async (req, res) => {
  try {
    const crud = await service.getBy(req);
    res.status(200).json({ data: crud, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const createCrud = async (req, res) => {
  try {
    const crud = await service.create(req);
    res.status(200).json({ data: crud, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const update = async (req, res) => {
  try {
    const crud = await service.update(req);
    res.json({ data: crud, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const deletes = async (req, res) => {
  try {
    const crud = await service.deletes(req);
    res.status(200).json({ data: crud, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};
module.exports = {
  getall,
  createCrud,
  update,
  deletes,
  getById,
};
