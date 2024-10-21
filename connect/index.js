const connect = require('connect')
const app = connect()
app.use(logger)
app.use('/admin' , restrict)
app.use('/admin' , admin)
app.use(helloword)
app.listen('3000')

function helloword(req , res){
    res.setHeader('Content-Type' ,  'application/json')
    res.end('hello word')
}

function logger(req ,res, next){
    console.log('%s %s' , req.method  , req.url)
    next()
}

function restrict(req , res , next){
    var authorization = req.headers.authorization
    if(!authorization) return next(new Error('Unauthorization'))

    var parts = authorization.split(' ')
    var scheme = parts[0]
    var auth = new Buffer(parts[1] , 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    authenticateWithDatabase(user , pass , function(err){
        if(err) next(err)

        next()
    })
}

function admin(req ,res , next){
    switch(req.url){
        case '/' : 
            res.end('try /users')
            break
        case '/users' : 
            res.serHeader('Content-Type' , 'application/json')
            res.end(JSON.stringify(['tobi' , 'loki' , 'data']))
            break
    }
}

// function