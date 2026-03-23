const db = require("../db/queries");

exports.listProducts = async (req, res) => {
    const products = await db.getAllProducts();
    res.render("products/index", { products });
};

exports.getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await db.getProductById(id);
    res.render("products/show", { product });
};