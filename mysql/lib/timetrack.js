var qs = require('querystring')

exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

// var qs = require['querystring')
// exports,sendHtml = function(res,html)t
// res,setHeader('content-Type",'text/html')
// res,setieader('content-iength',Buffer.bytetength(html)1
// res.end(html);
// exports,parseReceivedpata = function(req, cb] {
// 4
// var body s';
// req.setEncoding('utf8')
// ron on1idatai
// me3ae,ebsnkl1or.-.cbmti


exports.parseReceiveData = function (req, cb) {
    let body = ''
    req.setEncoding('utf8')
    req.on('data', function (chunk) { body += chunk })
    req.on('end', function () {
        const data = qs.parse(body)
        cb(data)
    })
}

{/* <form method="POST" action=" + path + i">
<input type="hidden" name="id" value="  + id +i>! */}

{/* <input type="submit" value="
+ label + 
</form>' */}

exports.actionForm = function (id, path, label) {
    var html = '<form method="POST" action="' + path + '">' +
        '<input type="hidden" name="id" value="' + id + '"/>' +
        ' <input type="submit" value="' + label + '"/>' +
        '</form>';
    return html
}

// exports.add = functlonldb,req,res
// exports,parseReceivedData[req, furctior(work)[
// db,queryt
// "TNsERT TNTO work (hours,date,description)"
// "VALUEs〔?,?,?)*,
// [work.hours, work.date, work.description]
// function(err) {
// if (err) throw err
// exports,show(db, res)
// )
// 1


exports.add = function (db, req, res) {
    exports.parseReceiveData(req, function (work) {
        db.query(
            "INSERT INTO work (hours , date , description) " +
            "VALUES (?,?,?)",
            [work.hours, work.date, work.description],
            function (err) {
                if (err) throw err
                exports.show(db, res)
            }
        )
    })
}

exports.delete = function (db, req, res) {
    exports.parseReceiveData(req, function (work) {
        db.query(
            "DELETE FROM work WHERE id=?",
            [work.id],
            function (err) {
                if (err) throw err
                exports.show(db, res)
            }
        )
    })
}

exports.archive = function (db, req, res) {
    exports.parseReceiveData(req, function (work) {
        db.query(
            "UPDATA work SET acrhived=1 WHERE id=?"
            [work.id],
            function (err) {
                if (err) throw err
                exports.show(db, res)
            }
        )
    })
}

exports.show = function (db, res, showArchived) {
    var query = "SELECT * FROM work " +
        "WHERE archived =? " +
        "ORDER BY date DESC"
    var archivedValue = showArchived ? 1 : 0
    db.query(
        query,
        [archivedValue],
        function (err, rows) {
            if (err) throw err
            html = showArchived ? ''
                : '<a href="/archived">Archived Work</a></br>'
            html += exports.workHitlistHtml(rows)
            html += exports.workFormHtml()
            exports.sendHtml(res, html)
        }
    )
}

exports.showArchived = function (db, res) {
    exports.show(db, res, true)
}

exports.workHitlistHtml = function (rows) {
    var html = '<table>';
    for (var i in rows) {
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>'
    return html
}

exports.workFormHtml = function() {var html = '<form method="posT" action="/">' +
'<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>'
+'<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
'<p>Description:<br/>' +
'<textarea name="description"></textarea></p>'+
'<input type="submit" value="Add" />'
+'</form>';
return html;
}
exports.workArchiveForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archive')};
exports.workDeleteForm = function(id) {return exports.actionForm(id, '/delete', 'Delete');}
