const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.listCategories);
router.get("/new", categoriesController.newCategoryForm);
router.post("/new", categoriesController.createCategory)
router.get("/:id/edit", categoriesController.editCategoryForm);
router.post("/:id/edit", categoriesController.updateCategory);
router.post("/:id/delete", categoriesController.deleteCategory);
router.get("/:id", categoriesController.getCategory);

module.exports = router;