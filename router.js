const express = require('express')
const router = express.Router()
const api = require("./api");

router.get("/get-articles", (req, res, next) => {
    api.getBlogArticles(req.query, res, next);
});
router.get("/get-articles-list", (req, res, next) => {
    api.getBlogArticlesList(req.query, res, next);
});
module.exports = router;