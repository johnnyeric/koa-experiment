var r = require('rethinkdb');
var config = require("../config.js");
var http = require('http');

/*  
    References:
    http://code.tutsplus.com/pt/tutorials/introduction-to-generators-koajs-part-2--cms-21756
    https://github.com/rethinkdb/rethinkdb-example-nodejs/blob/master/todo-angular-koa/app.js
    http://www.marcusoft.net/2015/04/koa-js-and-the-power-of-mouting.html
    https://github.com/koajs/mount
    https://github.com/marcusoftnet/mountDemos/blob/master/subapps/appWithRoutes.js
    https://github.com/marcusoftnet/mountDemos/blob/master/mountWithRouting.js
    https://github.com/koajs/route
    https://github.com/alexmingoia/koa-router#new_module_koa-router--Router_new
*/

/*create a connection and keep it during the request*/
exports.createConnection = function* (next){
    try{
        var conn = yield r.connect(config.rethinkdb);
        this._rdbConn = conn;
    } catch(err){
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

 /*closes a connection and keep it during the request*/
exports.closeConnection = function* (next){
   if(this._rdbConn != null) this._rdbConn.close();
}

/*GET all the results*/
exports.listAll = function* (next){
    if(this.request.query.word){
        var cursor = yield r.table('words').getAll(this.request.query.word,{index:'word'}).run(this._rdbConn);
        var array = yield cursor.toArray();
        this.body = JSON.stringify(array);
    } else {
        this.status = 404;
        this.body = "Not found";
    }
}

/*GET a single result*/
exports.single = function* (){
    if(this.request.query.word){
        var cursor = yield r.table('words').getAll(this.request.query.word,{index:'word'}).limit(1).run(this._rdbConn);
        var array = yield cursor.toArray();
        this.body = JSON.stringify(array);
    } else {
        this.status = 404;
        this.body = "Not found";
    }
}