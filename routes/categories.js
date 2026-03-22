const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.listCategories);
router.get("/:id", categoriesController.getCategory);

module.exports = router;