require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
    res.redirect("/categories");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));