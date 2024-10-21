const http = require('http')
const work = require('./lib/timetrack')
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: 'admin123',
    database: 'timetrack'
})

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db,req, res);
                    break;
                case '/archive':
                    work.archive(db,req, res);
                    break;
                case '/delete':
                    work.delete(db,req, res)
            }

        case "GET":
            switch (req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archive':
                    work.showArchived(db, res);
                    break;
            }
        // default:
        //     badRequest(res)
    }
})

db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT,"
    + "hours DECIMAL(5, 2) DEFAULT 0,"
    + "date DATE,"
    + "archived INT(1) DEFAULT 0,"
    + "description LONGTEXT,"
    + "PRIMARY KEY(id))",
    function (err,result) {
        if (err) throw err;
        console.log('Serverstarted...'); 
        server.listen(3000, '127.0.0.1');
    }
)