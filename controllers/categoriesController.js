const db = require("../db/queries");

exports.listCategories = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("categories/index", { categories });
};

exports.getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    const products = await db.getProductsByCategory(id);
    res.render("categories/show", { category, products });
}

exports.newCategoryForm = (req, res) => {
    res.render("categories/new");
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    await db.createCategory(name, description);
    res.redirect("/categories");
};