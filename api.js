const mysql = require('mysql')

const jwt = require("jsonwebtoken")

const connection = mysql.createPool(
    {
        host: '123.207.40.28',
        user: 'blog',
        password: 'Qd2023blogsql',
        database: 'blog'
    }
)

module.exports = {
    getBlogArticlesList(inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT id, title, create_time, tag, author, introduction FROM articles`, (err, result) => {
                if (err) {
                } else {
                    res.json(JSON.parse(JSON.stringify({code: 1, data: result})));
                }
                connection.release();
            });
        });
    },
    //获取博客文章
    getBlogArticles(inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT * FROM articles WHERE id=${inputData.query.id}`, (err, result) => {
                if (err) {
                    res.json(JSON.parse(JSON.stringify({code: 1, data: {msg: "Failed to get data"}})));
                } else {
                    res.json(JSON.parse(JSON.stringify({code: 1, data: {list: result}})));
                }
                connection.release();
            });
        });
    },
    loginVerification(inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT * FROM account WHERE account_no = ${inputData.identifier}`, (err, result) => {
                try {
                    if (result[0].password === inputData.password) {
                        const rule = {id: result[0].id, name: result[0].name}
                        const secretKey = 'WQEASDWQAdsasdaDSAJKFDGHU'
                        // 设置token
                        // 时效性5个小时
                        jwt.sign(rule, secretKey, {expiresIn: 18000}, (err, token) => {
                            if (err) return err.message
                            res.json(JSON.parse(JSON.stringify({code: 1, data: {token: token}})));
                        })
                    } else {
                        res.json(JSON.parse(JSON.stringify({code: 0, data: {msg: "There is no account related"}})))
                    }
                } catch {
                    res.json(JSON.parse(JSON.stringify({code: 0, data: {msg: "There is no account related"}})))
                }
                connection.release();
            });
        });
    },
    editArticle(inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT id FROM articles WHERE id=${inputData.id}`, (err, result) => {
                try {
                    if (result[0].id === inputData.id) {
                        const {content, title, tag, author, id} = inputData;
                        connection.query('UPDATE articles SET content = ?, title = ?, tag = ?, author = ? WHERE id = ?', [content, title, tag, author, id], () => {
                            res.json(JSON.parse(JSON.stringify({code: 1, data: {msg: "Update success"}})))
                        })
                    }
                } catch {
                    res.json(JSON.parse(JSON.stringify({code: 0, data: {msg: "Fail to update"}})))
                }
                connection.release();
            });
        });
    },
    addArticle(inputData, res, next) {
        if (inputData.content && inputData.title && inputData.tag && inputData.author) {
            const create_time = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
            connection.getConnection((err, connection) => {
                connection.query('INSERT INTO articles (content, title, tag, author, create_time) VALUES (?, ?, ?, ?, ?)',
                    [inputData.content, inputData.title, inputData.tag, inputData.author, create_time],
                    (err, result) => {
                        if (err) {
                            res.json({code: 0, data: {msg: 'Fail to update'}});
                        } else {
                            res.json({code: 1, data: {msg: 'Success'}});
                        }
                        connection.release();
                    });
            });
        } else {
            res.json({ code: 0, data: { msg: 'Invalid input data' } });
        }
    },
    verifyToken(inputData, res, next) {
        const token = inputData.headers['authorization']
        const userInfo = jwt.decode(token)
        const current = new Date().getTime()
        const outOfTime = current - userInfo.exp * 1000 > 0
        if (!outOfTime) {
            res.json(JSON.parse(JSON.stringify({code: 1, data: {valid: true}})));
        } else {
            res.json(JSON.parse(JSON.stringify({code: 1, data: {valid: false}})));
        }
    }
}
