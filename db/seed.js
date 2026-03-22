require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("./pool");

const filePath = path.join(__dirname, "../Consolidated_Inventory_Example_1__1_.txt");
const fileContent = fs.readFileSync(filePath, "utf8");
const lines = fileContent.split("\r\n").filter(line => line.trim() !== "");
const headers = lines[0].split("|");
const rows = lines.slice(1).map(line => line.split("|"));

async function seed() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Clear existing data in correct order
        await client.query("DELETE FROM cross_references");
        await client.query("DELETE FROM products");
        await client.query("DELETE FROM product_groups");
        await client.query("DELETE FROM categories");

        // Insert categories
        const categoryNames = [...new Set(rows.map(r => r[4]).filter(Boolean))];
        const categoryMap = {};
        for (const name of categoryNames) {
            const result = await client.query(
                "INSERT INTO categories (name) VALUES ($1) RETURNING id",
                [name]
            );
            categoryMap[name] = result.rows[0].id;
        }

        // Insert product groups
        const groupSeen = new Set();
        const groupMap = {};
        for (const row of rows) {
            const groupName = row[5]
            const categoryName = row [4];
            const key = `${groupName}__${categoryName}`;
            if (!groupSeen.has(key) && groupName && categoryName) {
                groupSeen.add(key);
                const result = await client.query(
                    "INSERT INTO product_groups (name, category_id) VALUES ($1, $2) RETURNING id",
                    [groupName, categoryMap[categoryName]]
                );
                groupMap[key] = result.rows[0].id;
            }
        }

        // Insert products and cross refences
        for (const row of rows) {
            const itemNo = row[0];
            const crossRefs = row[1];
            const alliantPartNo = row[2];
            const name = row[3];
            const groupName = row[5];
            const categoryName = row[4];
            const quantity = parseInt(row[7]) || 0;
            const weight = parseFloat(row[9]) || null;
            const upc = row[14] || null;
            const country = row[15] || null;
            const groupId = groupMap[`${groupName}__${categoryName}`];

            const productResult = await client.query(
                `INSERT INTO products
                (item_no, alliant_part_no, name, product_group_id, quantity, weight, upc, country_of_origin)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id`,
                [itemNo, alliantPartNo, name, groupId, quantity, weight, upc, country]
            );

            const productId = productResult.rows[0].id;

            // Insert cross references
            if (crossRefs) {
                const parts = crossRefs.split(";").filter(Boolean);
                for (const part of parts) {
                    await client.query(
                        "INSERT INTO cross_references (product_id, part_number) VALUES ($1, $2)",
                        [productId, part.trim()]
                    );
                }
            }
        }

        await client.query("COMMIT");
        console.log("Seed complete!");
    
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Seed failed:", err);
    } finally {
        client.release();
        process.exit();
    }
}

seed();