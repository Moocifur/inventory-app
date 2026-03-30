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

async function getProductById(id){
    const { rows } = await pool.query(
        "SELECT * FROM products WHERE id = $1",
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

async function createCategory(name, description) {
    await pool.query(
        "INSERT INTO categories (name, description) VALUES ($1, $2)",
        [name, description]
    );
}

async function getAllProductGroups() {
    const { rows } = await pool.query("SELECT * FROM product_groups");
    return rows;
}

async function createProduct(item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin) {
    await pool.query(
        `INSERT INTO products
        (item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin]
    );
}

async function updateCategory(id, name, description) {
    await pool.query(
        "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
        [name, description, id]
    )
}

async function updateProduct(id, item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin) {
    await pool.query(
        "UPDATE products SET item_no = $1, alliant_part_no = $2, name = $3, product_group_id = $4, quantity = $5, weight = $6, upc = $7, country_of_origin = $8 WHERE id = $9",
        [item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin, id]
    )
}

module.exports = { getAllCategories, getAllProducts, getCategoryById,
    getProductsByCategory, getProductById, createCategory, getAllProductGroups,
    createProduct, updateCategory, updateProduct
 };