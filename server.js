var restify = require('restify');
require('./connection/mongoConnect.js');
    user=require('./controller/userController.js'),
    server = restify.createServer();

server.use(restify.fullResponse());
server.use(restify.bodyParser());
//routes
server.post("/UserDetails", user.createUser)
server.get("/UserDetails", user.getUser)
server.get("/UserDetails/:id", user.getUserById)
server.del("/UserDetails/:id", user.deleteUser)
server.put("/UserDetails/:id", user.updateUser)

var port =3000;

server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})
