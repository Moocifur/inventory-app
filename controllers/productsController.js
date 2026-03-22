const db = require("../db/queries");

exports.listProducts = async (req, res) => {
    const products = await db.getAllProducts();
    res.render("products/index", { products });
}