const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
}

async function getCategoryById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
    );
    return rows[0];
}

async function getProductsByCategory(id) {
    const { rows } = await pool.query(
        `SELECT products.* FROM products
        JOIN product_groups ON products.product_group_id = product_groups.id
        WHERE product_groups.category_id = $1`,
        [id]
    );
    return rows;
}

module.exports = { getAllCategories, getAllProducts, getCategoryById,
    getProductsByCategory
 };