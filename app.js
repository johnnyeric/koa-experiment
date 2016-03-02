var koa = require("koa");
var app = koa();
var router = require('koa-router');
var mount = require('koa-mount');
var api = require(__dirname+'/api/api.js');

app.use(api.createConnection);

var apiV1 = new router();
apiV1.get('/all',api.listAll);
apiV1.get('/single',api.single);

app.use(mount('/',apiV1.routes()));//ou apiVi.middleware()

app.use(api.closeConnection);

app.listen(process.env.PORT,process.env.IP);  