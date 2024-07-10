const { getAllCategories } = require("../models/categories.model")

async function httpGetAllCategories(req,res) {
    return res.status(200).json(await getAllCategories());
}

module.exports = httpGetAllCategories;