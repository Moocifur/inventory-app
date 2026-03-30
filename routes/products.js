const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.listProducts);
router.get("/new", productsController.newProductForm);
router.post("/new", productsController.createProduct);
router.get("/:id/edit", productsController.editProductForm);
router.post("/:id/edit", productsController.updateProduct);
router.get("/:id", productsController.getProduct);

module.exports = router;