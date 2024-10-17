var qs = require('querystring')

exports.sendHtml = function(res , html){
    res.setHeader('Content-Type' , 'text/html')
    res.setHeader('Content-Length' , Buffer.byteLength(html))
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


exports.parseReceiveData = function(req , cb){
    let body = ''
    req.setEncoding('utf8')
    req.on('data' , function(chunk) {body += chunk})
    req.on('end' , function(){
        const data = qs.parse(body)
        cb(data)
    })
}

{/* <form method="POST" action=" + path + i">
<input type="hidden" name="id" value="  + id +i>! */}

{/* <input type="submit" value="
+ label + 
</form>' */}

exports.actionForm = function(id, path ,label){
    var html = '<form method="POST" action="' + path + '">' + 
    '<input type="hidden" name="id" value="' + id + '"/>' +
    ' <input type="submit" value="' + label +  '"/>' +
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


exports.add = function(db , req , res){
    exports.parseReceiveData(req , function(work){
        db.query(
            "INSERT INTO work (hour , date , description) " + 
            "VALUES (?,?,?)",
            [work.hour , work.date , work.description],
            function(err){
                if(err) throw err
                exports.show(db , res)
            }
        )
    })
}

exports.delete = function(db, req  ,res){
    exports.parseReceiveData(req, function(work){
        db.query(
            "DELETE FROM work WHERE id=?",
            [work.id],
            function(err){
                if(err) throw err
                exports.show(db , res)
            }
        )
    })
}

exports.archive = function(db, req, res){
    exports.parseReceiveData(req , function(work){
        db.query(
            "UPDATA work SET acrhived=1 WHERE id=?"
            [work.id],
            function(err){
                if(err) throw err
                exports.show(db, res)
            }
        )
    })
}

exports.show = function(db, res, showArchived){
    var query = "SELECT * FROM wrok" + 
    "WHERE archived =?" + 
    "ORDER BY date DESC"
    var archivedValue = showArchived ? 1 : 0
    db.query(
        query,
        [archivedValue],
        function(err , rows){
            if(err) throw err
            html = showArchived ? ''
            : '<a href="/archived">Archived Work</a></br>'
            // html += exports.work
            exports.sendHtml(html)
        }
    )
}