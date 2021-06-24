const router = require("express").Router();
const cartController = require("../controllers/cart");
const cartById = require('../middleware/categoryById')

router.post("/addtocart", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);

module.exports = router;


