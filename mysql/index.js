const http = require('http')
const work = require('./lib/timetrack')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: 'admin',
    database: 'timetrack'
})

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db, res, req);
                    break;
                case '/archive':
                    work.archive(db, res, req);
                    break;
                case '/delete':
                    work.delete(db, res, req)
            }

        case "GET":
            switch (req.url) {
                case '/':
                    work.show(db, res, req);
                    break;
                case '/archive':
                    work.archive(db, res, req);
                    break;
            }
        default:
            badRequest(res)
    }
})

db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT"
    + "hours DECIMAL(5, 2) DEFAULT 0,"
    + "date DATE,"
    + "archived INT(1) DEFAULT 0,"
    + "description LONGTEXT,"
    + "PRIMARY KEY(id))",
    function (err) {
        if (err) throw err;
        console.log('Serverstarted...'); server.listen(3000, '127.0.0.1');
    }
)