const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
	Category.findAll({ attributes: ["id", "category_name"], include: [{ model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] }] })
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => {
			res.status(500).json(err);
			console.log(err);
		});
});

router.get("/:id", (req, res) => {
	Category.findOne({
		where: { id: req.params.id },
		attributes: ["id", "category_name"],
		include: [{ model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] }],
	})
		.then((category) => {
			res.json(category);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
// create a new category
router.post("/", (req, res) => {
	Category.create({ category_name: req.body.category_name })
		.then((category) => {
			res.json(category);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
// update a category by its `id` value
router.put("/:id", (req, res) => {
	Category.update({ category_name: req.body.category_name }, { where: { id: req.params.id } })
		.then((category) => {
			res.json(category);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", async (req, res) => {
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!categoryData) {
			res.status(404).json({ message: "No category found with this id!" });
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
