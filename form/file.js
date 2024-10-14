var http = require('http')
var formidable = require('formidable')
var server = http.createServer(function (req, res) {
    if ('/' == req.url)
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case "POST":
                upload(req, res);
                break;
            default:
                badRequest(res)
        } else {
        notFound(res)
    }
}).listen(3000)

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400
        res.end('error')
        return
    }

    var form = new formidable.IncomingForm()
    // form.on('field' , function (field , value){
    //     console.log(field)
    //     console.log(value)
    // })

    // form.on('file' , function (name , file){
    //     console.log(name)
    //     console.log(file)
    // })

    // form.on('end' , function (){
    //     res.end('upload complete!')
    // })
    form.parse(req , function(err , fields , files){
        console.log(fields)
        console.log(files)
        res.end('upload complete!')
    })

}

function isFormData(req) {
    console.log(req.headers)
    var type = req.headers['content-type'] || ''
    return 0 == type.indexOf('multipart/form-data')
}

function show(res) {
    var html = ''
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="item" /></p>'
        + '<p><input type="file" name="file" /></p>'
        + '<p><input type="submit" value="add item" /> </p>'

    res.setHeader('Content-type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

function notFound(res) {
    res.statusCode = '404'
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
}

function badRequest(res) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end('Bad Request')
}