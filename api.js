const mysql  = require('mysql')

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
}
