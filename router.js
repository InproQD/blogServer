const express = require('express')
const router = express.Router()
const api = require("./api");

router.get("/get-articles", (req, res, next) => {
    api.getBlogArticles(req.query, res, next);
});
router.get("/get-articles-list", (req, res, next) => {
    api.getBlogArticlesList(req.query, res, next);
});
router.post("/get-account", (req, res, next) => {
    api.loginVerification(req.body, res, next);
});
router.post("/modify-article", (req, res, next) => {
    api.editArticle(req.body, res, next);
});
router.post("/add-article", (req, res, next) => {
    api.addArticle(req.body, res, next);
});
router.get("/verify-token", (req, res, next) => {
    api.verifyToken(req, res, next);
});
router.get("/get-pre-articles", (req, res, next) => {
    api.getPreArticle(req.query, res, next);
});
router.get("/get-next-articles", (req, res, next) => {
    api.getNextArticle(req.query, res, next);
});
router.post("/set-comment", (req, res, next) => {
    api.setComment(req.body, res, next);
});
router.get("/get-comment-list", (req, res, next) => {
    api.listComments(req.query, res, next);
});
router.get("/get-comment-list", (req, res, next) => {
    api.listComments(req.query, res, next);
});
module.exports = router;
