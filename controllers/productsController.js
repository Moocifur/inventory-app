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

exports.newProductForm = async (req, res) => {
    const productGroups = await db.getAllProductGroups();
    res.render("products/new", { productGroups });
};

exports.createProduct = async (req, res) => {
    const { item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin } = req.body;
    await db.createProduct(item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin);
    res.redirect("/categories");
};

exports.editProductForm = async (req, res) => {
    const { id } = req.params;
    const product = await db.getProductById(id);
    res.render("products/edit", { product });
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin } = req.body;
    await db.updateProduct(id, item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin);
    res.redirect("/categories")
};

