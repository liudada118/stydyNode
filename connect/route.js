const connect = require('connect')
const router  = require('./middleware/router')

const routes = {
    GET : { 
        '/users' : function (req , res) {
            res.end('tobi , loki , ferret')
        },
        '/user/:id' : function(req ,res , id){
            res.end('user ' + id)
        }
    },
    DELETE : {
        '/user/:id' : function(req , res , id){
            res.end('deleted user ' + id)
        }
    }


}

function errorHandler(){
    var env = process.env.NODE_ENV || 'development'
    return function(err , req , res , next){
        res.statusCode = 500;
        switch(env){
            case 'development' : 
                res.setHeader('Content-Type' , 'applocation/json')
                res.end(JSON.stringify(err))
                break
            default :
                res.end('Server error')
        }
    }
}

connect()
    .use(router(routes))
    .use(errorHandler)
    .listen(3000)