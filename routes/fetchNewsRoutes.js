const router = require("express").Router();
const fetchNewsController = require("../controllers/fetchNewsController");

router.post("/get-news", fetchNewsController.getNews);

module.exports = router;
