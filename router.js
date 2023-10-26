const express = require('express')
const router = express.Router()
const api = require("./api");

router.get("/get-articles", (req, res, next) => {
    api.getBlogArticles(req, res, next);
});
router.get("/get-articles-list", (req, res, next) => {
    api.getBlogArticlesList(req.query, res, next);
});
router.post("/get-account", (req, res, next) => {
    api.loginVerification(req.body, res, next);
});
module.exports = router;
