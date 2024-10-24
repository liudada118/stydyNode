const { error } = require('console')

var parse = require('url').parse

module.exports = function (obj) {
    return function (req, res, next) {
        if (!obj[req.method]) {
            next()
            return
        }

        var routes = obj[req.method]
        var url = parse(req.url)
        var paths = Object.keys(routes)

        for (let i = 0; i < paths.length; i++) {
            var path = paths[i]
            var fn = routes[path]
            console.log(path , JSON.stringify(path))
            path = (path)
                .replace(/\//g, '\\/')
                .replace(/:(\w+)/g, '([^\\/]+)')

            var re = new RegExp('^' + path + '$')
            var captures = url.pathname.match(re)
            if (captures) {
                var args = [req, res].concat(captures.slice(1))
                fn.apply(null, args)
                return
            }
            
        }
        next(new Error('404'))

    }
}