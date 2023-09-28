const mysql  = require('mysql')

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
                    res.json(JSON.parse(JSON.stringify({ code: 1, data: result })));
                }
                connection.release();
            });
        });
    },
    //获取博客文章
    getBlogArticles(inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT * FROM articles WHERE id=${inputData.id}`, (err, result) => {
                if (err) {
                } else {
                    res.json(JSON.parse(JSON.stringify({ code: 1, data: result })));
                }
                connection.release();
            });
        });
    },
    loginVerification (inputData, res, next) {
        connection.getConnection((err, connection) => {
            connection.query(`SELECT * FROM account WHERE account_no = ${inputData.identifier}`, (err, result) => {
                try {
                    if (result[0].password === inputData.password) {
                        const rule = { id: result[0].id, name: result[0].name }
                        const secretKey = 'WQEASDWQAdsasdaDSAJKFDGHU'
                        // 设置token
                        jwt.sign(rule, secretKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) return err.message
                            res.json(JSON.parse(JSON.stringify({code: 1, data:{token: token}})));
                        })
                    } else {
                        res.json(JSON.parse(JSON.stringify({ code: 0, msg: "There is no account related" })))
                    }
                } catch {
                    res.json(JSON.parse(JSON.stringify({ code: 0, msg: "There is no account related" })))
                }
                connection.release();
            });
        });
    }
}
