var express=require('express');
var app = express();
var server= require('http').createServer(app);
var io=require('socket.io').listen(server);
users=[];
connections=[];

server.listen(process.env.PORT || 9000);
console.log('server running...')
app.use(express.static('./'));
app.get('/', function(req,res){
	res.sendFile(__dirname+'/views/index.html'); 
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('connected: %s sockets connected', connections.length);

	//discounnect
	socket.on('disconnect', function(data){
		//if(! socket.username)return;
		users.splice(users.indexOf(socket.username),1);
		connections.splice(connections.indexOf(socket),1);
    	console.log('Disconnected: %s sockets',connections.length) ;

	});
	//sendmessage
	socket.on("send message", function(data){
		console.log(data);
		io.sockets.emit('new message',{msg:data,user:socket.username});
    });

    //new user
    socket.on('new user',function(data,callback){
    	callback(true);
    	socket.username= data;
    	users.push(socket.username);
    	updateUsernames();
    })

    function updateUsernames(){
    	io.sockets.emit('get users',users);
    }



});